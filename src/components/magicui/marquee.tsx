import { cn } from "../../lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div className="relative z-50">
      <div
        {...props}
        className={cn(
          "group flex overflow-hidden p-4 [--duration:40s] [--gap:2rem] [gap:var(--gap)]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex shrink-0 justify-around items-center [gap:var(--gap)]",
                {
                  "animate-marquee flex-row": !vertical,
                  "animate-marquee-vertical flex-col": vertical,
                  "group-hover:[animation-play-state:paused]": pauseOnHover,
                  "[animation-direction:reverse]": reverse,
                }
              )}
            >
              {/* ✨ 新增統一圖片樣式容器 */}
              {Array.isArray(children) ? (
                children.map((child, index) => (
                  <div
                    key={index}
                    className="w-[300px] h-[200px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    {child}
                  </div>
                ))
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                  {children}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
