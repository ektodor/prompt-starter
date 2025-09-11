import { ButtonComponent } from "@/components/buttons/ButtonComponent"
import { SVGColorComponent } from "@/components/SVGColorComponent"


export function SponsorPlan() {
  return (
    <main>
      {/* banner */}
      <section
        className="bg-white bg-center bg-cover"
        style={{ backgroundImage: 'url("./images/bg-linear.webp")' }}
      >
        <div className="py-6 lg:py-16">
          <div className="container">
            <div 
              className="p-6 lg:p-20 rounded-[20px]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
              <div className="block lg:flex gap-10">
                <img 
                  src="./images/sponsor-plan-product.png" 
                  alt="project 2"
                  className="w-full mb-4 lg:mb-0 lg:w-[36.35%] aspect-[16/9] rounded-[10px] object-cover flex-auto" 
                />
                <div className="w-full lg:w-3/5 flex-auto">
                  <h2 className="text-h3 lg:text-h3 mb-2 lg:mb-3">AdPrompt Lab</h2>
                  <div className="flex items-center mb-6">
                    <span className="inline-block p-1 bg-neutral-300 rounded-full mr-1">
                      <SVGColorComponent
                        url={"./icons/person.svg"}
                        color="bg-neutral-0"
                        size="size-[16px]"
                      />
                    </span>
                    <span className="text-neutral-500 text-text5 lg:text-text4">
                      江戶川柯南
                    </span>
                  </div>
                  <p className="text-h5 lg:text-h2">NT$ 859,618 </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* sponsor plan */}
      <section
        className="bg-white"
      >
        <div className="py-6 lg:py-30">
          <div className="container flex flex-col items-center">
            {/* sponsor progress bar*/}
            <div className="roadmap-steps w-full lg:w-[45%] flex items-center justify-center gap-3 mb-20 lg:mb-30">
              {/* step 1 */}
              <div className="relative">
                <div 
                  className="w-5 h-5 md:w-6 md:h-6 bg-primary-100 rounded-full border-3 border-primary-400">
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-primary-400 whitespace-nowrap">贊助指南</span>
              </div>
              {/* connection line */}
              <div className="w-[24%] h-0.5 bg-neutral-300"></div>
              {/* step 2 */}
              <div className="relative">
                <div 
                  className="w-5 h-5 md:w-6 md:h-6 bg-neutral-300 rounded-full">
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-neutral-500 whitespace-nowrap">選擇方案</span>
              </div>
              {/* connection line */}
              <div className="w-[24%] h-0.5 bg-neutral-300"></div>
              {/* step 3 */}
              <div className="relative">
                <div 
                  className="w-5 h-5 md:w-6 md:h-6 bg-neutral-300 rounded-full">
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-neutral-500 whitespace-nowrap">前往購買</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="inline-block text-h4 lg:text-h2 border-b-2 lg:border-b-4 border-primary-400 pb-4 mb-10">贊助指南路線圖</h2>
            </div>
            {/* roadmap context */}
            <div className="grid grid-cols-4 py-6 lg:py-20 lg:px-55 mb-10 lg:mb-20 bg-neutral-100/80 rounded-[20px] gap-6 lg:flex lg:flex-col lg:gap-20">
              <div className="col-start-2 col-end-4 flex flex-col lg:flex-row items-center justify-center 2xl:justify-start">
                <img 
                  src="./roadmap-img/package-confirm.svg" 
                  alt="package confirm"
                  className="2xl:mr-10 w-[22.9%] h-auto hidden lg:block lg:order-2 2xl:order-1" 
                />
                <div className="w-full lg:mr-10 lg:max-w-[290px] lg:py-[24.5px] lg:order-1 2xl:order-2">
                  <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">01</h3>
                  <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">確認方案</h4>
                  <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">檢查專案名稱、方案內容、價格和交付時間 確認無誤後點擊「開始贊助」</p>
                </div>
                <img 
                  src="./roadmap-img/package-confirm.svg" 
                  alt="package confirm"
                  className="w-20 h-20 lg:hidden" 
                />
              </div>
              <div className="col-start-2 col-end-4 flex flex-col lg:flex-row items-center justify-center">
                <img 
                  src="./roadmap-img/roadmap-arrow-right.svg" 
                  alt="arrow-right" 
                  className="w-[12.8%] h-auto object-contain ml-22 mr-23 hidden 2xl:inline-block lg:order-2 2xl:order-1"
                />
                <div className="w-full lg:max-w-[290px] lg:py-[24.5px] lg:mr-10 lg:order-1 2xl:order-2">
                  <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">02</h3>
                  <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">付款方式</h4>
                  <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">提供信用卡、ATM轉帳、超商付款或電子錢包。請填寫付款資訊並確認金額</p>
                </div>
                <img 
                  src="./roadmap-img/payment.svg" 
                  alt="payment"
                  className="w-20 h-20 lg:w-[22.9%] lg:h-auto object-contain order-2 2xl:order-3"
                />
              </div>
              <div className="col-start-2 col-end-4 flex flex-col lg:flex-row items-center justify-center">
                <img 
                  src="./roadmap-img/wait.svg" 
                  alt="wait"
                  className="2xl:mr-10 hidden w-[22.9%] lg:inline-block lg:order-2 2xl:order-1"
                />
                <div className="w-full lg:mr-10 lg:w-[290px] lg:py-[24.5px] lg:order-1 2xl:order-2">
                  <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">03</h3>
                  <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">交易處理</h4>
                  <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">請耐心等候，勿關閉頁面或重複操作。通常需要 10-30 秒完成驗證</p>
                </div>
                <img 
                  src="./roadmap-img/roadmap-arrow-left.svg" 
                  alt="arrow left" 
                  className="w-[12.8%] h-auto mr-22 ml-23 hidden 2xl:inline-block 2xl:order-3"
                />
                <img 
                  src="./roadmap-img/wait.svg" 
                  alt="wait"
                  className="w-20 h-20 lg:hidden"
                />
              </div>
              <div className="col-start-2 col-end-4 flex flex-col lg:flex-row items-center justify-center">
                <img 
                  src="./roadmap-img/roadmap-arrow-right.svg" 
                  alt="arrow right" 
                  className="w-[12.8%] h-auto ml-22 mr-23 hidden 2xl:inline-block 2xl:order-1"
                />
                <div className="w-full lg:w-[290px] lg:py-[24.5px] lg:mr-10 lg:order-1 2xl:order-2">
                  <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">04</h3>
                  <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">購買成功</h4>
                  <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">贊助完成！確認信將發送至您的信箱</p>
                </div>
                <img 
                  src="./roadmap-img/success.svg" 
                  alt="success" 
                  className="w-20 h-20 lg:w-[22.9%] lg:h-auto lg:order-2 2xl:order-3"
                />
              </div>
              <div className="col-start-2 col-end-4 flex flex-col lg:flex-row items-center justify-center">
                <img 
                  src="./roadmap-img/process.svg" 
                  alt="process"
                  className="2xl:mr-10 hidden w-[22.9%] lg:inline-block lg:order-2 2xl:order-1"
                />
                <div className="w-full lg:mr-10 lg:w-[290px] lg:py-[24.5px] lg:order-1 2xl:order-2">
                  <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">05</h3>
                  <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">等待商品上線</h4>
                  <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">等待專案製作，收到系統上線通知後即可開始使用</p>
                </div>
                <img 
                  src="./roadmap-img/roadmap-arrow-left.svg" 
                  alt="arrow left" 
                  className="w-[12.8%] h-auto mr-22 ml-23 hidden 2xl:inline-block 2xl:order-3"
                />
                <img 
                  src="./roadmap-img/process.svg" 
                  alt="process"
                  className="w-20 h-20 lg:hidden"
                />
              </div>
              <div className="col-start-2 col-end-4 flex flex-col lg:flex-row items-center justify-center">
                <img 
                  src="./roadmap-img/roadmap-arrow-right.svg" 
                  alt="arrow right" 
                  className="w-[12.8%] h-auto ml-22 mr-23 hidden 2xl:inline-block"
                />
                <div className="w-full lg:w-[290px] lg:py-[24.5px] lg:mr-10">
                  <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">06</h3>
                  <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">查看商品</h4>
                  <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">可進入個人後台下載AI指令包、觀看教學影片、使用服務</p>
                </div>
                <img 
                  src="./roadmap-img/view.svg" 
                  alt="view" 
                  className="w-20 h-20 lg:w-[22.9%] lg:h-auto"
                />
              </div>
            </div>
            <ButtonComponent
              size="lg"
              style="w-full lg:w-auto"
            >下一步</ButtonComponent>
          </div>
        </div>

      </section>
    </main>
  )
}
