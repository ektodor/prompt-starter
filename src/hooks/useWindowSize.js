import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 第一次載入時設定一次尺寸
    handleResize();

    // 監聽視窗大小改變
    window.addEventListener("resize", handleResize);

    // 在元件卸載時移除監聽器
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 依賴項為空，只在元件初次載入時執行一次

  return windowSize;
}
