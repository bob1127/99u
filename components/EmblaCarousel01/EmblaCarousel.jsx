"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "next-i18next";
import { NextButton, PrevButton } from "./EmblaCarouselArrowButtons";
import { useDotButton } from "./EmblaCarouselDotButton";

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
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );
  const onNextButtonClick = useCallback(
    () => emblaApi?.scrollNext(),
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

const EmblaCarousel = ({ options }) => {
  const { t } = useTranslation("common");

  // 嘗試取得多語系 slides 陣列
  const slides = t("carousel.slides", { returnObjects: true });

  // fallback 預設卡片資料（若 t() 回傳不是陣列時使用）
  const fallbackSlides = [
    {
      title: "精彩遊戲",
      description: "立即體驗最刺激的老虎機與桌上遊戲！",
    },
    {
      title: "專屬優惠",
      description: "參加我們的獎勵活動，獲得超值回饋。",
    },
    {
      title: "信賴保障",
      description: "我們提供安全、快速的交易與支援。",
    },
  ];

  const validSlides = Array.isArray(slides) ? slides : fallbackSlides;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const { onDotButtonClick } = useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [slideSize, setSlideSize] = useState("60%");

  useEffect(() => {
    const handleResize = () => {
      setSlideSize(window.innerWidth < 640 ? "85%" : "60%");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector(".embla__slide__number"));
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
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        if (tweenNode) {
          tweenNode.style.transform = `scale(${scale})`;
        }
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
  }, [emblaApi, tweenScale]);

  return (
    <div
      style={{
        "--slide-height": "auto",
        "--slide-spacing": "1rem",
        "--slide-size": slideSize,
      }}
    >
      <div className="flex justify-center mb-8">
        <div className="embla__controls grid grid-cols-[auto_1fr] gap-4 mt-6">
          <div className="embla__buttons hidden sm:grid grid-cols-2 gap-3">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>

      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div
          className="embla__container flex touch-pan-y touch-pinch-zoom"
          style={{ marginLeft: "calc(var(--slide-spacing) * -1)" }}
        >
          {validSlides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide flex-none min-w-0"
              style={{
                flex: "0 0 var(--slide-size)",
                paddingLeft: "var(--slide-spacing)",
              }}
            >
              <div
                className="embla__slide__number border flex justify-center items-center border-gray-300 !h-[400px] bg-white shadow-2xl rounded-2xl overflow-hidden"
                style={{ height: "100%", userSelect: "none" }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
                  <img
                    src={slide.image} // ✅ 改成動態圖片
                    alt={slide.title}
                    className="w-full md:w-1/2 rounded-xl object-cover max-h-[300px]"
                  />

                  <div className="text-area flex flex-col justify-center items-center md:items-start w-full md:w-1/2 text-center md:text-left">
                    <b className="text-xl md:text-2xl mb-2">{slide.title}</b>
                    <p className="text-sm md:text-base text-gray-700">
                      {slide.description}
                    </p>
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
