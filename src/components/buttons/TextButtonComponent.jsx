import { NavLink } from "react-router";
/**
 * @size 按鈕大小，預設為 sm，提供 lg、sm
 * @clickEvent 按鈕事件，預設為 null
 * @to 預設為 null 使用button，如果有路徑則會使用 NavLink
 */
export function TextButtonComponent({
  size = "sm",
  to = null,
  clickEvent = null,
  children,
}) {
  const sizeMap = {
    sm: "text-text4",
    lg: "text-text3",
  };
  return (
    <>
      {to != null ? (
        <NavLink
          to={to}
          className={` ${sizeMap[size]} hover:text-primary active:text-primary`}
        >
          {children}
        </NavLink>
      ) : (
        <button
          className={` ${sizeMap[size]} hover:text-primary active:text-primary`}
          onClick={clickEvent}
        >
          {children}
        </button>
      )}
    </>
  );
}
