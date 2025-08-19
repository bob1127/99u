"use client";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = [""], // 紫色系
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle: React.CSSProperties = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      backgroundSize: "200% auto", // 保證有漸層移動的空間
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      animation: `auroraMove ${10 / speed}s linear infinite`, // 自訂動畫
    };

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span style={gradientStyle} aria-hidden="true">
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";
