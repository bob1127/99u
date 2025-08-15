import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Card = forwardRef(
  ({ id, frontImageSrc, frontAlt, backText, linkUrl }, ref) => {
    return (
      <div className="puk-card group" id={id} ref={ref}>
        <div className="puk-card-wrapper">
          <div className="puk-flip-card-inner group-hover:rotate-y-180 transition-transform duration-200 ease-in-out">
            {/* 背面：card-front.png */}
            <div className="puk-flip-card-front">
              <Image
                priority
                src="/card-front.png"
                width={500}
                height={500}
                alt="Card Back"
              />
            </div>

            {/* 正面：自訂圖片 + 可點擊 */}
            <div className="puk-flip-card-back">
              {linkUrl ? (
                <Link href={linkUrl} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={frontImageSrc}
                    width={500}
                    height={500}
                    alt={frontAlt}
                    className="object-cover w-full h-full cursor-pointer"
                  />
                </Link>
              ) : (
                <Image
                  src={frontImageSrc}
                  width={500}
                  height={500}
                  alt={frontAlt}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
