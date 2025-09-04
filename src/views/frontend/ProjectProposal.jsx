import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { SVGColorComponent } from "@/components/SVGColorComponent";
import { Index } from "./Index";
export function ProjectProposal() {
  const stepList = [
    {
      id: 1,
      image: "./images/proposal-step1.webp",
      title: "準備專案資料",
      describe: "撰寫吸引人的標題和描述，選擇合適的分類標籤",
      minInterval: 15,
      maxInterval: 30,
      checkList: ["清楚的專案標題", "詳細的功能說明", "明確的使用場景"],
    },
    {
      id: 2,
      image: "./images/proposal-step2.webp",
      title: "準備視覺素材",
      describe: "上傳專案封面圖和產品展示圖，讓專案更具吸引力",
      minInterval: 15,
      maxInterval: 20,
      checkList: ["專業的封面設計", "實際使用截圖", "清晰的效果展示"],
    },
    {
      id: 3,
      image: "./images/proposal-step3.webp",
      title: "設定募資目標",
      describe: "計算合理的募資金額，制定可行的時程規劃",
      minInterval: 10,
      maxInterval: 15,
      checkList: ["實際的成本計算", "合理的目標金額", "明確的交付時間"],
    },
    {
      id: 4,
      image: "./images/proposal-step4.webp",
      title: "設計回饋方案",
      describe: "為不同贊助金額設計有價值的回饋內容",
      minInterval: 20,
      maxInterval: 35,
      checkList: ["多層次的價格選擇", "有吸引力的回饋內容", "限量特殊方案"],
    },
  ];
  return (
    <main>
      {/* banner */}
      <section
        className=" bg-white bg-center bg-cover"
        style={{ backgroundImage: 'url("./images/banner.webp")' }}
      >
        <div className="bg-black/60 py-10 px-3 lg:px-0 lg:py-[120px]   inset-0">
          <div className="p-6 mb-6 lg:p-0 lg:mb-20 lg:flex flex-col items-center ">
            <h1 className="lg:text-h1 text-h3 text-neutral-0 text-center mb-4">
              開始你的 AI Prompt 募資之旅
            </h1>
            <div className="mb-6">
              <p className="text-text3 lg:text-text2 text-neutral-0 text-center lg:text-start">
                只需 4 個簡單步驟，約 60-90 分鐘即可完成專案設定。
              </p>
              <p className="text-text3 lg:text-text2 text-neutral-0 text-center lg:text-start">
                讓我們幫你將創意變現，建立屬於你的 AI 產品事業！
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              <ButtonComponent style="w-full lg:order-2" size="lg">
                立即開始提案 →
              </ButtonComponent>
              <ButtonComponent
                style="w-full lg:order-1"
                color="secondary"
                size="lg"
              >
                了解詳細流程
              </ButtonComponent>
            </div>
          </div>

          <div className=" bg-white/70 p-6 rounded-xl grid grid-cols-2 grid-rows-2 lg:flex lg:p-10 lg:gap-20 lg:mx-auto lg:w-fit gap-6 backdrop-blur-[20px]">
            <div className="flex flex-col items-center gap-2 lg:px-[14.5px]">
              <p className="text-text5 lg:text-text4">平均成功率</p>
              <p className=" font-black lg:text-[32px] text-2xl leading-[1.2] text-primary">
                87%
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 lg:px-[14.5px]">
              <p className="text-text5 lg:text-text4">平均募資金額</p>
              <p className=" font-black text-2xl lg:text-[32px] leading-[1.2] text-primary">
                NT$ 85k
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 lg:px-[14.5px]">
              <p className="text-text5 lg:text-text4">平均募資持者數</p>
              <p className=" font-black text-2xl lg:text-[32px] leading-[1.2] text-primary">
                125
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 lg:px-[14.5px]">
              <p className="text-text5 lg:text-text4">平均募資期間</p>
              <p className=" font-black text-2xl lg:text-[32px] leading-[1.2] text-primary">
                32 天
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 簡單 4 步驟，輕鬆完成提案 */}
      <section className="py-6 lg:py-20">
        <div className="container">
          <h2 className="lg:text-h2 text-h4 mb-4 text-center">
            簡單 4 步驟，輕鬆完成提案
          </h2>
          <p className="mb-6 text-text4 text-center lg:text-text3 lg:mb-10">
            跟著我們的指引，你將能夠創建一個專業且吸引人的募資專案
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
            {stepList.map((item) => {
              return (
                <div
                  className="p-6 rounded-xl border-2 border-neutral-300 lg:p-10"
                  key={item.id}
                >
                  <h3 className=" text-xl font-medium text-secondary-700 mb-6 text-center leading-[1.2] lg:text-2xl">
                    Step {item.id}
                  </h3>
                  <div className=" bg-secondary-100 rounded-xl min-h-[200px] flex justify-center items-center mb-6">
                    <img src={item.image} alt="step1" />
                  </div>
                  <div>
                    <div className="flex gap-2 items-center mb-2">
                      <h4 className="text-h5 lg:text-h4">{item.title}</h4>
                      <span className="rounded-[100px] bg-neutral-100 flex gap-1 py-1 px-2 justify-center items-center text-text5  lg:text-text4 text-neutral-500">
                        <SVGColorComponent
                          color="bg-neutral-500"
                          size="size-4 lg:size-[18px]"
                          url={"./icons/access_time.svg"}
                        />
                        {item.minInterval}-{item.maxInterval} 分鐘
                      </span>
                    </div>
                    <div className="pb-6 border-b-2 border-neutral-300">
                      <p className="text-text4 lg:text-text3">
                        {item.describe}
                      </p>
                    </div>
                    <ul className="pt-6 flex flex-col gap-4">
                      {item.checkList.map((checkItem, index) => {
                        return (
                          <li className="flex gap-2 items-center" key={index}>
                            <SVGColorComponent
                              url={"./icons/check.svg"}
                              color="bg-green-400"
                              size="size-[18px] lg:size-5"
                            />
                            <p className="text-text5 lg:text-text4">
                              {checkItem}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* 成功募資的關鍵因素 */}
      <section className="py-6 lg:py-20">
        <div className="container">
          <h2 className="lg:text-h2 text-center text-h4 mb-4">
            成功募資的關鍵因素
          </h2>
          <p className="mb-6 text-text4 text-center lg:text-text3 lg:mb-10">
            根據平台成功專案分析，這些要素最為重要
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
            <div className="rounded-xl bg-primary-100/20 flex p-6 gap-4 lg:gap-6 lg:p-10">
              <SVGColorComponent
                url={"./icons/target.svg"}
                size="size-8 lg:size-12"
                color="bg-primary-300"
                style="shrink-0"
              />
              <div>
                <h3 className="mb-2 font-medium text-lg leading-[1.2] lg:text-xl">
                  明確的價值主張
                </h3>
                <p className="text-text4 lg:text-text3">
                  清楚說明你的AI提示詞解決什麼問題，帶來什麼價值
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-primary-100/20 flex p-6 gap-4 lg:gap-6 lg:p-10">
              <SVGColorComponent
                url={"./icons/lightbulb.svg"}
                size="size-8 lg:size-12"
                color="bg-primary-300"
                style="shrink-0"
              />
              <div>
                <h3 className="mb-2 font-medium text-lg leading-[1.2] lg:text-xl">
                  真實的使用案例
                </h3>
                <p className="text-text4 lg:text-text3">
                  提供具體的使用範例和效果展示，讓支持者看到實際成果
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-primary-100/20 flex p-6 gap-4 lg:gap-6 lg:p-10">
              <SVGColorComponent
                url={"./icons/attach_money.svg"}
                size="size-8 lg:size-12"
                color="bg-primary-300"
                style="shrink-0"
              />
              <div>
                <h3 className="mb-2 font-medium text-lg leading-[1.2] lg:text-xl ">
                  合理的定價策略
                </h3>
                <p className="text-text4 lg:text-text3">
                  參考市場行情，設定合理的募資目標和回饋方案
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 常見問題 */}
      <section className="py-6 bg-neutral-100 lg:py-20">
        <div className="container">
          <h2 className="lg:text-h2 text-center text-h4 mb-4">常見問題</h2>
          <p className="mb-6 text-text4 text-center lg:text-text3 lg:mb-10">
            快速解答你的疑惑
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
            <div className="rounded-xl border-2 border-neutral-300 p-10 bg-neutral-0">
              <div className="mb-4 flex gap-2 items-center">
                <SVGColorComponent
                  url={"./icons/help.svg"}
                  size="size-5 lg:size-6"
                  color="bg-neutral-700"
                />
                <h4 className="text-h6 lg:text-h5">提案審核需要多長時間？</h4>
              </div>
              <p className="text-text4 lg:text-text3">
                通常 3-5 個工作天完成審核，審核通過後專案立即上線開始募資。
              </p>
            </div>
            <div className="rounded-xl border-2 border-neutral-300 p-10 bg-neutral-0">
              <div className="mb-4 flex gap-2 items-center">
                <SVGColorComponent
                  url={"./icons/help.svg"}
                  size="size-5 lg:size-6"
                  color="bg-neutral-700"
                />
                <h4 className="text-h6 lg:text-h5">募資失敗會怎麼樣？</h4>
              </div>
              <p className="text-text4 lg:text-text3">
                採用「全有全無」模式，未達目標將金額退還給支持者，不收取任何費用。
              </p>
            </div>
            <div className="rounded-xl border-2 border-neutral-300 p-10 bg-neutral-0">
              <div className="mb-4 flex gap-2 items-center">
                <SVGColorComponent
                  url={"./icons/help.svg"}
                  size="size-5 lg:size-6"
                  color="bg-neutral-700"
                />
                <h4 className="text-h6 lg:text-h5">平台收取多少手續費？</h4>
              </div>
              <p className="text-text4 lg:text-text3">
                成功募資後收取 5% 手續費，募資失敗不收取任何費用。
              </p>
            </div>
            <div className="rounded-xl border-2 border-neutral-300 p-10 bg-neutral-0">
              <div className="mb-4 flex gap-2 items-center">
                <SVGColorComponent
                  url={"./icons/help.svg"}
                  size="size-5 lg:size-6"
                  color="bg-neutral-700"
                />
                <h4 className="text-h6 lg:text-h5">
                  什麼樣的 AI 提示詞適合募資？
                </h4>
              </div>
              <p className="text-text4 lg:text-text3">
                具有明確應用場景、能解決實際問題，有市場需求的 AI 提示詞都適合。
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 準備好開始了嗎？ */}
      <section className="py-6 lg:py-20">
        <div className="container">
          <div
            className="rounded-[20px] p-6 bg-center bg-cover lg:p-20 lg:relative"
            style={{ backgroundImage: 'url("./images/bg-linear.webp")' }}
          >
            <h2 className="lg:text-h1 mb-6 text-h3 text-neutral-0">
              準備好開始了嗎？
            </h2>
            <p className="text-text3 lg:text-text2 text-neutral-100">
              現在你已經了解了完整的提案流程和成功要素。
            </p>
            <p className="text-text3 lg:text-text2 text-neutral-100 mb-6 lg:mb-10">
              讓我們一起將你的 AI 創意變成現實，開始你的募資之旅！
            </p>
            <div className="flex flex-col gap-4 mb-10 lg:flex-row lg:gap-6 lg:mb-16">
              <ButtonComponent style="w-full lg:w-fit lg:order-2" size="lg">
                立即開始提案 →
              </ButtonComponent>
              <ButtonComponent
                style="w-full lg:w-fit lg:order-1"
                color="secondary"
                size="lg"
              >
                了解詳細流程
              </ButtonComponent>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <span className="bg-white/20 rounded-[20px] py-1 px-3 flex gap-1 items-center w-fit">
                <SVGColorComponent
                  url={"./icons/star.svg"}
                  size="size-5"
                  color="bg-neutral-0"
                />
                <p className="text-text3 text-neutral-0">平均 4.8 星評價</p>
              </span>
              <span className="bg-white/20 rounded-[20px] py-1 px-3 flex gap-1 items-center w-fit">
                <SVGColorComponent
                  url={"./icons/supervisor_account.svg"}
                  size="size-5"
                  color="bg-neutral-0"
                />
                <p className="text-text3 text-neutral-0">1200+ 成功專案</p>
              </span>
              <span className="bg-white/20 rounded-[20px] py-1 px-3 flex gap-1 items-center w-fit">
                <SVGColorComponent
                  url={"./icons/done_all.svg"}
                  size="size-5"
                  color="bg-neutral-0"
                />
                <p className="text-text3 text-neutral-0">87% 成功率</p>
              </span>
            </div>
            {/* 右側箭頭 */}
            <div className=" absolute hidden lg:block bottom-20 right-20">
              <img src="./icons/arrow-down.svg" alt="裝飾" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
