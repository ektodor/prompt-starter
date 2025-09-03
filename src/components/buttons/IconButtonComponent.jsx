import { NavLink } from "react-router";
import { SVGColorComponent } from "../SVGColorComponent";
/**
 * @type 按鈕種類，預設為 default，提供 default、filled、outlined
 * @iconUrl 按鈕圖示，使用方法請輸入圖示url，如 iconUrl={"/icons/language.svg"}
 * @size 按鈕大小，預設為 sm，提供 lg、sm
 * @clickEvent 按鈕事件，預設為 null
 * @to 預設為 null 使用button，如果有路徑則會使用 NavLink
 * @enabled 是否啟用，預設為 true
 * @btnStyle 按鈕額外樣式
 * @iconStyle 圖是額外樣式
 */
export function IconButtonComponent({
  type = "default",
  iconUrl = "",
  size = "sm",
  iconColor = null,
  clickEvent = null,
  to = null,
  enabled = true,
  btnStyle = "",
  iconStyle = "",
}) {
  const typeMap = {
    default: "rounded-[100px] hover:bg-neutral-100 p-2 ",
    filled: "rounded-xl bg-neutral-300 p-3 hover:bg-neutral-500",
    outlined:
      "p-4 rounded-xl border border-neutral-700 bg-neutral-0 hover:bg-neutral-300",
  };
  const defaultIconColor = {
    default: "bg-neutral-700",
    filled: "bg-neutral-0",
    outlined: "bg-neutral-700",
  };
  const sizeMap = {
    lg: "size-12",
    sm: "size-6",
  };
  const enableStyle = enabled
    ? "cursor-pointer"
    : "opacity-40 pointer-events-none";
  return (
    <>
      {to != null ? (
        <NavLink
          to={to}
          className={`${enableStyle} ${typeMap[type]} flex items-center justify-center ${btnStyle}`}
        >
          <SVGColorComponent
            url={iconUrl}
            size={sizeMap[size]}
            color={iconColor || defaultIconColor[type]}
            style={iconStyle}
          />
        </NavLink>
      ) : (
        <button
          className={`${enableStyle} ${typeMap[type]} flex items-center justify-center ${btnStyle}`}
          onClick={clickEvent}
        >
          <SVGColorComponent
            url={iconUrl}
            size={sizeMap[size]}
            color={iconColor || defaultIconColor[type]}
            style={iconStyle}
          />
        </button>
      )}
    </>
  );
}
