export function Tag({
  bgColor = "#FFF8E5",
  textColor = "#9A7012",
  text,
  otherClass = "",
  customClass = "",
}) {
  return (
    <li>
      <span
        className={`${customClass ? customClass : `inline-block py-1 lg:py-2 px-3 rounded-xl text-text5 lg:text-text4 w-fit ${otherClass}`}`.trim()}
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {text}
      </span>
    </li>
  );
}
