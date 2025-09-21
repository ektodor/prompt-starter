import { useMemo } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { formatThousands } from "@/commonJS/formatThousands";

/**
 * CircularProgress 元件
 *
 * @param {Object} props - 組件參數
 * @param {number} [props.percentage=0] - 進度百分比（0-100）
 * @param {number|{ [key: string]: number }} [props.size=100] - 圓圈尺寸，number(單一) || object(響應式) {"2xl", xl, lg, md, sm, base}
 * @param {string} [props.fullColor="#FF424D"] - 達成 100% 或以上時的顏色
 * @param {string} [props.strokeColor="#FFC449"] - 未達 100% 時的進度顏色
 * @param {string} [props.trackColor="#DBDBDB"] - 背景軌道的顏色（未填滿部分）
 * @param {number} [props.thickness=0.85] - 圓圈的粗細（0-1），數值越大，內圈越細
 * @param {boolean} [props.counterClockwise=false] - 是否逆時針（鏡像方向）
 * @param {{ [key: string]: number }} [props.breakpoints] - 響應式斷點對應的寬度定義（tailwind breakpoints）
 */
export function CircularProgress({
  percentage = 0,
  size = 100, // number(單一) || object(響應式) {"2xl", xl, lg, md, sm, base}
  fullColor = "#FF424D", // >= 100% 顏色
  strokeColor = "#FFC449", // < 100% 顏色
  trackColor = "#DBDBDB", // 未填滿顏色部份
  thickness = 0.85, // 粗細控制（內圈白色比例）
  counterClockwise = false, // 是否逆時針（鏡像）
  breakpoints = {
    "2xl": 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
    base: 0,
  },
}) {
  const windowSize = useWindowSize();

  const adjustedSize = useMemo(() => {
    if (typeof size === "number") {
      return size;
    }

    // 將斷點排序，以便找到最匹配的
    const sortedBreakpoints = Object.entries(breakpoints).sort(
      ([, a], [, b]) => a - b
    );

    const currentWidth = windowSize.width || 0;

    // 從大到小遍歷斷點，找到最匹配的
    for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
      const [key, minWidth] = sortedBreakpoints[i];
      if (currentWidth >= minWidth && size[key] !== undefined) {
        return size[key];
      }
    }

    // 如果沒有匹配到，則返回 base 值
    return size.base ?? 100;
  }, [size, breakpoints, windowSize.width]);

  const background = `conic-gradient(${percentage >= 100 ? fullColor : strokeColor} 0% ${percentage}%, ${trackColor} ${percentage}% 100%)`;

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: adjustedSize,
        height: adjustedSize,
        background,
        transform: counterClockwise ? "scaleX(-1)" : "none", // 決定是否鏡像
      }}
    >
      {/* 中間白色圓圈遮住，形成「環形」 */}
      <div
        className="absolute bg-neutral-0 rounded-full"
        style={{
          width: adjustedSize * thickness,
          height: adjustedSize * thickness,
        }}
      ></div>

      {/* 中央的百分比文字 */}
      <span
        className="absolute text-text3 lg:text-text2 text-neutral-700"
        style={{
          transform: counterClockwise ? "scaleX(-1)" : "none", // 若鏡像，還原文字方向
        }}
      >
        {formatThousands(percentage)}%
      </span>
    </div>
  );
}
