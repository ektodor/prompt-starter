import { useState } from "react";
import { IconButtonComponent } from "./buttons/IconButtonComponent";
import { SVGColorComponent } from "./SVGColorComponent";

/**
 *
 * @style 額外樣式，主要是用來寫 lg:hidden、margin、padding 等，不建議增加其他樣式
 */
export function SearchBarComponent({ style }) {
  const [text, setText] = useState("");
  const handleText = (e) => {
    setText(e.target.value);
  };
  const clearText = () => {
    setText("");
  };
  return (
    <div className={`relative max-w-[606px] grow ${style}`}>
      <input
        id="search"
        type="text"
        className="py-3 pl-[51px] pr-16 max-h-12 outline focus:outline-2 focus:outline-primary  appearance-none rounded-xl outline-neutral-500 hover:bg-neutral-100 text-text3 placeholder:text-neutral-500 focus:bg-neutral-0 w-full"
        placeholder="搜尋 AI 提詞專案、創作者或關鍵字"
        onChange={(e) => handleText(e)}
        value={text}
      />
      <label
        htmlFor="search"
        className=" absolute left-6 top-1/2 -translate-y-1/2"
      >
        <SVGColorComponent
          size="size-[19px]"
          color="bg-neutral-700"
          url="./icons/search.svg"
        />
      </label>
      <div className=" absolute right-6 top-1/2 -translate-y-1/2">
        <IconButtonComponent
          iconUrl={"./icons/close.svg"}
          clickEvent={clearText}
        />
      </div>
    </div>
  );
}
