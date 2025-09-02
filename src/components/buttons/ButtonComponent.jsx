import { SVGColorComponent } from "../SVGColorComponent";

/**
 * @type 按鈕種類，預設為 filled，提供 filled、outlined
 * @color 按鈕顏色，預設為 primary，提供 primary、secondary
 * @enabled 是否啟用，預設為 true
 * @size 按鈕大小，預設為 sm，提供 lg、sm
 * @iconUrl 按鈕圖示，預設為 null，使用方法請輸入圖示url，如 iconUrl={"/icons/language.svg"}
 * @style 按鈕額外樣式
 */
export function ButtonComponent({
  type = "filled",
  color = "primary",
  enabled = true,
  size = "sm",
  iconUrl = null,
  style = "",
  children,
}) {
  const typeMap = {
    filled: {
      primary: "bg-primary text-[#FAFAFA]  hover:bg-primary-600",
      secondary:
        "bg-neutral-0 text-primary hover:bg-primary hover:text-neutral-0",
    },
    outlined: {
      primary:
        "bg-white border border-neutral-500 text-neutral-700  hover:bg-neutral-300",
      secondary:
        "bg-neutral-0 text-primary hover:bg-primary hover:text-neutral-0 border border-primary-300",
    },
  };
  const iconColorMap = {
    primary: "bg-neutral-700",
    secondary: "bg-primary  group-hover:bg-neutral-0",
  };
  const sizeMap = {
    lg: "px-6 py-[14.5px] text-h6 ",
    sm: "text-text4 py-2 px-3",
  };
  const enableStyle = enabled
    ? "cursor-pointer"
    : "opacity-40 pointer-events-none";
  return (
    <button
      type="button"
      className={`${typeMap[type][color]} ${sizeMap[size]} rounded-xl  ${enableStyle} ${style} flex items-center justify-center gap-2 group `}
      onClick={() => {
        console.log("click");
      }}
    >
      {iconUrl && (
        <SVGColorComponent
          url={iconUrl}
          style={iconColorMap[color]}
          size="size-[19px]"
        />
      )}
      {children}
    </button>
  );
}
