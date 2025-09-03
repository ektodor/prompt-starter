import { useEffect } from "react";

/**
 *
 * @type modal 出現位置，預設為 full-screen，提供 full-screen、center
 * @isOpen 是否開啟 modal , 預設為 false
 * @rwdShowStyle 用來設定響應式顯示狀況，例如 lg:hidden
 */
export function ModalComponent({
  type = "full-screen",
  rwdShowStyle,
  isOpen,
  children,
}) {
  const typeMap = {
    "full-screen": "inset-0",
    center: "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
  };
  //   讓背景頁面無法滑動
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      return;
    }
    document.body.classList.remove("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <>
      {/* modal */}
      <div
        className={`fixed ${typeMap[type]} ${type != "full-screen" && "rounded-xl"} bg-neutral-0 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200 z-50  ease-in-out ${rwdShowStyle}`}
      >
        {children}
      </div>
      {/* 背景暗色 */}
      <div
        className={`fixed inset-0 z-40 bg-black ${isOpen ? "opacity-40 " : "opacity-0 pointer-events-none"} transition-opacity duration-150  ease-in-out ${rwdShowStyle}`}
      />
    </>
  );
}
