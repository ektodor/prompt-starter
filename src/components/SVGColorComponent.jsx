/**
 * @url icon 位置
 * @color 顏色，以 tailwindcss 色彩為主，預設為 bg-black，這邊是要使用『 bg 』，如 bg-alert-10
 * @size icon 大小，預設為24px，根據 tailwindcss 的 utility 名稱，如 16px => size-4
 * @style 其他樣式
 */
export function SVGColorComponent({
  url,
  color = "bg-black",
  size = "size-6",
  style = "",
}) {
  return (
    <div
      className={`mask-alpha mask-center mask-cover ${color} ${size} ${style}`}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
      }}
    ></div>
  );
}
