import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton } from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Image from "next/image";
const TWEEN_FACTOR_BASE = 0.52;
const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const onPrevButtonClick = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const onNextButtonClick = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);

    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi, tweenScale, setTweenFactor, setTweenNodes]);

  return (
    <div
      className="sm:[--slide-size:50%] [--slide-size:80%]"
      style={{
        "--slide-height": "auto",
        "--slide-spacing": "1rem",
      }}
    >
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div
          className="embla__container flex touch-pan-y touch-pinch-zoom"
          style={{ marginLeft: "calc(var(--slide-spacing) * -1)" }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide flex-none min-w-0"
              style={{
                flex: "0 0 var(--slide-size)",
                paddingLeft: "var(--slide-spacing)",
              }}
            >
              <div
                className="embla__slide__number border-3 relative overflow-hidden border-gray-300 bg-gradient-to-r from-[#d4145a] to-[#6610f2] shadow-2xl rounded-2xl  text-white"
                style={{ height: "100%", userSelect: "none" }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center aspect-[6/2.5] gap-6 p-6">
                  {slide.content ? (
                    slide.content
                  ) : (
                    <Image
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="w-full md:w-1/2 rounded-xl object-cover max-h-[450px]"
                    />
                  )}
                  <div className="text-area absolute px-10 left-6 top-1/2 -translate-y-1/2 backdrop-blur-md bg-[#990ca3]/20 py-10 rounded-xl shadow-2xl w-[90%] md:w-1/2 text-center md:text-left border border-white/20">
                    <b className="text-xl md:text-2xl mb-4 text-white block">
                      {slide.title}
                    </b>
                    <p className="text-sm md:text-base text-white/90 mb-6">
                      {slide.description}
                    </p>
                    <button className="inline-block rounded-[30px] bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-semibold px-6 py-3  shadow-lg transition duration-300">
                      了解更多
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
