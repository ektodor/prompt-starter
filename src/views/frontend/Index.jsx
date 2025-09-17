import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { SVGColorComponent } from "@/components/SVGColorComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import '../../assets/swiperCus.css';
import 'swiper/css/navigation';
import { useState } from 'react';
export function Index() {
  const [bannerImgData] = useState([
    {
      id: 1,
      imgUrl: "./images/carousal-2.webp",
      title: "Moodboard Generator",
      dayLine: 4
    },
    {
      id: 2,
      imgUrl: "./images/carousal-3.webp",
      title: "智能寫作助手 Pro",
      dayLine: 3
    },
    {
      id: 3,
      imgUrl: "./images/carousal-1.webp",
      title: "烘培廚師助理",
      dayLine: 6
    },
  ]);
  const [popularProductsData] = useState([
    {
      id: 1,
      imgUrl: "./images/project-5.webp",
      title: "超強自動訂房助手：熱門房型不錯過",
      describe: "熬夜刷房間？再也不必！讓 AI 幫你自動搶下超熱門住宿時段，快速又安心，旅遊控必備神器",
      price: "11,234",
      percentageCompleted: "123%",
      dayLine: 32
    },
    {
      id: 2,
      imgUrl: "./images/project-1.webp",
      title: "PromptForge: 創作者的靈感鍛造機",
      describe: "",
      price: "",
      percentageCompleted: "3456%",
      dayLine: 32
    },
    {
      id: 3,
      imgUrl: "./images/project-4.webp",
      title: "ResumePro Prompter：生成頂尖履歷",
      describe: "",
      price: "",
      percentageCompleted: "0%",
      dayLine: 32
    },
    {
      id: 4,
      imgUrl: "./images/project-3.webp",
      title: "LegalPrompt: AI 法律助手模組",
      describe: "",
      price: "",
      percentageCompleted: "0%",
      dayLine: 32
    },
    {
      id: 5,
      imgUrl: "./images/project-6.webp",
      title: "EmailPrompt Pro：商業寫信 AI 工具包",
      describe: "",
      price: "",
      percentageCompleted: "298%",
      dayLine: 56
    },
  ]);
  const [sponsorStepData] = useState([
    {
      id: 1,
      imgUrl: "./icons/manage_search.svg",
      title: "瀏覽專案",
      describe: "探索各種創新的 AI 提示詞專案"
    },
    {
      id: 2,
      imgUrl: "./icons/payment.svg",
      title: "選擇贊助",
      describe: "選擇適合的贊助方案並完成付款"
    },
    {
      id: 3,
      imgUrl: "./icons/card_giftcard.svg",
      title: "獲得回饋",
      describe: "收到專案創作者提供的獨家內容"
    },
    {
      id: 4,
      imgUrl: "./icons/star.svg",
      title: "支持創新",
      describe: "成為 AI 創新生態系的重要推手"
    }
  ]);
  const [groupProductsData] = useState([
    {
      id: 1,
      tag: "教育學習",
      imgUrl: "./images/project-7.webp",
      title: "MindPrompt 冥想引導語",
      describe: "放鬆心靈，每天一則 AI 提詞冥想語",
      price: "11,234",
      percentageCompleted: 83,
      dayLine: 32
    },
    {
      id: 2,
      tag: "教育學習",
      imgUrl: "./images/project-8.webp",
      title: "StudyPrompt 學習神器",
      describe: "提問、摘要、筆記樣樣行，學習不再枯燥",
      price: "68,234",
      percentageCompleted: 154,
      dayLine: 12
    },
    {
      id: 3,
      tag: "教育學習",
      imgUrl: "./images/project-9.webp",
      title: "BlogBoss 內容寫作包",
      describe: "自媒體主必備：從標題到段落全都包",
      price: "98,134",
      percentageCompleted: 54,
      dayLine: 62
    },
    {
      id: 4,
      tag: "教育學習",
      imgUrl: "./images/project-10.webp",
      title: "BizPrompt Toolkit",
      describe: "商業計畫書、簡報、品牌定位一站搞定",
      price: "226,234",
      percentageCompleted: 1085,
      dayLine: 19
    },
    {
      id: 5,
      tag: "教育學習",
      imgUrl: "./images/project-11.webp",
      title: "Travel Caption Maker",
      describe: "自動幫你的旅行照產生超懂梗文字",
      price: "8,234",
      percentageCompleted: 20,
      dayLine: 92
    },
    {
      id: 6,
      tag: "教育學習",
      imgUrl: "./images/project-12.webp",
      title: "YouTube Prompt Lab",
      describe: "快速生成腳本、標題與精華摘要文字",
      price: "188,134",
      percentageCompleted: 254,
      dayLine: 2
    },
    {
      id: 7,
      tag: "教育學習",
      imgUrl: "./images/project-13.webp",
      title: "Meeting Pro AI",
      describe: "只要複製會議摘要，幫你整理出重點紀錄，會後直接寄出不用操心！",
      price: "111,234",
      percentageCompleted: 156,
      dayLine: 22
    },
    {
      id: 8,
      tag: "教育學習",
      imgUrl: "./images/project-15.webp",
      title: "Moodboard Generator",
      describe: "幫你快速生成 DALL·E 專用提示詞，打造色調一致、主題清晰的靈感版面！",
      price: "6,234",
      percentageCompleted: 94,
      dayLine: 29
    },
    {
      id: 9,
      tag: "商業應用",
      imgUrl: "./images/project-14.webp",
      title: "PromptSpeaker",
      describe: "讓 AI 幫你撰稿、配音並自動轉成 TTS 語音，支援多語系與 YouTube Shorts 快速產出！",
      price: "591,134",
      percentageCompleted: 554,
      dayLine: 62
    },
  ]);
  return (
    <main>
      {/* banner */}
      <section className="swiper-navigation px-3 lg:px-0">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          centeredSlides={true}
          centerInsufficientSlides={true}
          initialSlide={1}
          breakpoints={{
            768: {
              slidesPerView: 1.4,
              spaceBetween: 24,
            },
            576: {
              slidesPerView: 1,
              spaceBetween: 0,
            }
          }}
        >
          {
            bannerImgData.map( item => (
              <SwiperSlide key={item.id}>
                <div className="flex justify-center">
                  <div 
                    className="w-full lg:w-[1296px] h-[313px] lg:h-[580px] bg-cover bg-center bg-no-repeat rounded-xl relative"
                    style={{ backgroundImage: `url(${item.imgUrl})` }}
                  >
                    <ul className="text-white absolute inset-0 flex flex-col justify-end lg:justify-center items-center lg:items-start mb-6 lg:mb-0 pl-0 lg:pl-16">
                      <li className="mb-2 lg:mb-6">
                        <p className="text-h3 lg:text-h1">{item.title}</p>
                      </li>
                      <li className="flex justify-start items-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                          <path d="M12.49 2.00012C6.97 2.00012 2.5 6.48012 2.5 12.0001C2.5 17.5201 6.97 22.0001 12.49 22.0001C18.02 22.0001 22.5 17.5201 22.5 12.0001C22.5 6.48012 18.02 2.00012 12.49 2.00012ZM12.5 20.0001C8.08 20.0001 4.5 16.4201 4.5 12.0001C4.5 7.58012 8.08 4.00012 12.5 4.00012C16.92 4.00012 20.5 7.58012 20.5 12.0001C20.5 16.4201 16.92 20.0001 12.5 20.0001ZM13 7.00012H11.5V13.0001L16.75 16.1501L17.5 14.9201L13 12.2501V7.00012Z" fill="#FFFFFF"/>
                        </svg>
                        <p className="text-text3 lg:text-text1 ml-1">倒數 {item.dayLine} 天</p>
                      </li>
                      <li>
                        <ButtonComponent 
                          size="lg"
                          href="/project-proposal"
                        >
                          立即贊助
                        </ButtonComponent>
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </section>
      {/* 熱門募集 */}
      <section className="py-6 lg:py-16">
        <div className="container">
          <div className="text-center lg:text-start mb-6 lg:mb-10">
            <h2 className="text-h4 lg:text-h2 text-black">熱門募集</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-1 lg:grid-rows-2 gap-6 lg:gap-10">
            {
              popularProductsData.map( (products, index)  => (
                <div key={products.id}
                  className={`flex flex-col group ${index === 0 ? 'col-span-1 row-span-1 lg:col-span-2 row-span-2' : ''}`}
                >
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img 
                    className={`w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.2] ${
                      index === 0 ? 'h-[215px] lg:h-[546px]' : ' h-[215px]'
                    }`}
                    src={products.imgUrl} alt={`banner${products.id}`} />
                  </div>

                  <div 
                    className={`flex justify-between items-center ${ index === 0 ? `mb-2` : `mb-2 lg:mb-4`}`}
                  >
                    <h4 className="text-h5 lg:text-h4 line-clamp-2 text-neutral-700">{products.title}</h4>
                    <div className="p-2 ml-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#454545">
                        <path d="M17.5 3.00012H7.5C6.4 3.00012 5.5 3.90012 5.5 5.00012V21.0001L12.5 18.0001L19.5 21.0001V5.00012C19.5 3.90012 18.6 3.00012 17.5 3.00012ZM17.5 18.0001L12.5 15.8201L7.5 18.0001V5.00012H17.5V18.0001Z" fill="#454545"/>
                      </svg>
                    </div>
                  </div>
                  <p 
                    className={`text-neutral-500 text-text3 ${
                      index === 0 ? 'hidden lg:block mb-4' : 'hidden'
                    }`}
                  >{products.describe}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center">
                      <p className="hidden lg:block text-h6 lg:text-h5 text-neutral-700">{products.price}</p>
                      <p 
                        className={`${
                          index === 0 ? 'hidden lg:block text-neutral-300 text-h5 mx-2' : 'hidden'
                        }`}
                      >|</p>
                      <p className="text-h6 lg:text-h5 text-neutral-700">{products.percentageCompleted}</p>
                    </div>
                    <div className="flex justify-start items-center">
                      <SVGColorComponent
                          url={"./icons/access_time.svg"}
                          color="bg-neutral-500"
                          size="size-5"
                      />
                      <p className="ml-1 text-neutral-500 text-text3">倒數 {products.dayLine} 天</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      {/* 贊助流程 */}
      <section className="bg-neutral-100">
        <div className="container py-6 lg:py-16">
          <div className="text-center mb-6 lg:mb-10">
            <h2 className="text-h4 lg:text-h2 text-black mb-2 lg:mb-6">贊助流程</h2>
            <p className="text-text4 lg:text-text3 text-neutral-700">簡單四步驟，輕鬆支持優質的 AI 提示詞專案，與創作者一起推動人工智慧的創新應用</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {
              sponsorStepData.map(sponsorstep => (
                <ul key={sponsorstep.id} className="flex flex-col items-center text-center py-4 lg:py-6">
                  <li className="w-[64px] lg:w-[80px] h-[64px] lg:h-[80px] rounded-full bg-white flex justify-center items-center mb-4 lg:mb-6">
                    <SVGColorComponent
                      url={sponsorstep.imgUrl}
                      color="bg-primary-300"
                      size="size-[34px] lg:size-[50px]"
                    />
                  </li>
                  <li className="mb-2">
                    <h4 className="text-h6 lg:text-h4 text-black">{sponsorstep.title}</h4>
                  </li>
                  <li>
                    <p className="text-text5 lg:text-text3 text-neutral-700">{sponsorstep.describe}</p>
                  </li>
                </ul>
              ))
            }
          </div>
        </div>
      </section>
      {/* 搜尋類別 & 群眾募集*/}
      <section className="py-6 lg:py-16">
        <div className="container">
          {/* 搜尋類別 */}
          <div className="mb-10">
            <div className="text-center mb-4">
              <h4 className="text-h4 text-neutral-700">搜尋類別</h4>
            </div>
            <div className="flex justify-center items-center border-y-1 border-neutral-300 py-4">
              <Swiper
                className="[&_.swiper-slide]:!w-auto [&_.swiper-slide]:!mr-0"
                slidesPerView={5}
                spaceBetween={24}
                breakpoints={{
                  0: {
                    slidesPerView: 3.4,
                    spaceBetween: 8,
                  },
                  768: { 
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
              >
                <SwiperSlide>
                  <button type="button" className="text-text3 text-neutral-600 py-[13.5px] lg:py-3 px-4 lg:px-6 whitespace-nowrap">商業應用</button>
                </SwiperSlide>
                <SwiperSlide>
                  <button type="button" className="text-text3 text-neutral-600 py-[13.5px] lg:py-3 px-4 lg:px-6 whitespace-nowrap">教育學習</button>
                </SwiperSlide>
                <SwiperSlide>
                  <button type="button" className="text-text3 text-neutral-600 py-[13.5px] lg:py-3 px-4 lg:px-6 whitespace-nowrap">日常生活</button>
                </SwiperSlide>
                <SwiperSlide>
                  <button type="button" className="text-text3 text-neutral-600 py-[13.5px] lg:py-3 px-4 lg:px-6 whitespace-nowrap">寫作創作</button>
                </SwiperSlide>
                <SwiperSlide>
                  <button type="button" className="text-text3 text-neutral-600 py-[13.5px] lg:py-3 px-4 lg:px-6 whitespace-nowrap">行銷文案</button>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          {/* 群眾募集 */}
          <div className="mb-6 lg:mb-10">
            <div className="text-center lg:text-start mb-6 lg:mb-10">
              <h2 className="text-h3 lg:text-h2 text-black">群眾集資</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-10">
              {
                groupProductsData.map((groupProducts, index)  => (
                  <div key={groupProducts.id} 
                    className={`flex flex-col group ${index > 2 ? 'hidden lg:flex' : 'flex'}`}>
                    <div className="overflow-hidden rounded-xl mb-4">
                      <img 
                      className="h-[292.1px] w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.2]"
                      src={groupProducts.imgUrl} alt={`banner${groupProducts.id}`} />
                    </div>
                    <div className="mb-2 lg:mb-4 flex justify-between items-center">
                      <tag 
                        className={`rounded-xl text-text5 lg:text-text4 py-1 lg:py-2 px-3 ${index === 8 ? 'text-green-700 bg-green-100' : 'text-secondary-700 bg-secondary-100'}`}
                      >
                        {groupProducts.tag}
                      </tag>
                      <div className="p-2">
                        <SVGColorComponent
                          url={"./icons/bookmark_border.svg"}
                          color="bg-neutral-700"
                        />
                      </div>
                    </div>
                    <h4 className="text-h5 lg:text-h4 line-clamp-2 text-neutral-700 mb-2 lg:mb-3">{groupProducts.title}</h4>
                    <p className="text-neutral-500 text-text4 lg:text-text3 mb-4 lg:mb-6">{groupProducts.describe}</p>
                    <div className="relative mb-5">
                      <div className="bg-neutral-300 w-full h-[6px] rounded-[3px] absolute top-0"></div>
                      <div 
                        className={`h-[6px] rounded-[3px] absolute top-0 ${
                          groupProducts.percentageCompleted > 100 
                            ? 'bg-primary-400' 
                            : 'bg-secondary-400'
                        }`}
                        style={{
                          width: groupProducts.percentageCompleted > 100 
                            ? '100%' 
                            : `${groupProducts.percentageCompleted}%`
                        }}
                      >
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center">
                        <p className="text-h6 lg:text-h5 text-neutral-700">{groupProducts.price}</p>
                        <p className="text-neutral-300 text-h6 lg:text-h5 mx-2">|</p>
                        <p className="text-h6 lg:text-h5 text-neutral-700">{`${groupProducts.percentageCompleted}%`}</p>
                      </div>
                      <div className="flex justify-start items-center">
                        <SVGColorComponent
                          url={"./icons/access_time.svg"}
                          color="bg-neutral-500"
                          size="size-5"
                        />
                        <p className="ml-1 text-neutral-500 text-text4 lg:text-text3">倒數 {groupProducts.dayLine} 天</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {/* 分頁 */}
          <ul className="flex justify-center items-center gap-2">
            <li>
              <SVGColorComponent
                url={"./icons/keyboard-arrow-left.svg"}
                color="bg-neutral-500"
              />  
            </li>
            <li>
              <button type="button"
                className="text-text2 text-[#1E1E1E] py-[6px] px-[14px] hover:bg-primary-100 rounded-lg focus:bg-primary-400 focus:text-neutral-100 focus:outline-none" autoFocus
              >
                1
              </button>
            </li>
            <li>
              <button type="button"
                className="text-text2 text-[#1E1E1E] py-[6px] px-[14px] hover:bg-primary-100 rounded-lg focus:bg-primary-400 focus:text-neutral-100"
              >
                2
              </button>
            </li>
            <li>
              <button type="button"
                className="text-text2 text-[#1E1E1E] py-[6px] px-[14px] hover:bg-primary-100 rounded-lg focus:bg-primary-400 focus:text-neutral-100 hidden lg:block"
              >
                3
              </button>
            </li>
            <li>
              <p lassName="text-text2 text-black">...</p>
            </li>
            <li>
              <button type="button"
                className="text-text2 text-[#1E1E1E] py-[6px] px-[14px] hover:bg-primary-100 rounded-lg focus:bg-primary-400 focus:text-neutral-100 hidden lg:block"
              >
                12
              </button>
            </li>
            <li>
              <button type="button"
                className="text-text2 text-[#1E1E1E] py-[6px] px-[14px] hover:bg-primary-100 rounded-lg focus:bg-primary-400 focus:text-neutral-100"
              >
                13
              </button>
            </li>
            <li>
              <SVGColorComponent
                url={"./icons/keyboard-arrow-right.svg"}
                color="bg-neutral-500"
              />  
            </li>
          </ul>
        </div>
      </section>
      {/* 成為提案者 */}
      <section className="py-6 lg:py-16 overflow-x-hidden">
        <div className="container">
          <div className="p-10 lg:p-20 rounded-[20px]"
            style={{ backgroundImage: 'url("./images/bg-linear.webp")', backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12  gap-6 lg:gap-20">
              <div className="col-span-full lg:col-span-5 l">
                <h3 className="text-h3 lg:text-h1 text-white mb-4">成為提案者</h3>
                <p className="text-text4 lg:text-text2 text-white mb-4 lg:mb-6">你有創新的 AI 提示詞想法嗎？在 Promtstarter 發起募資，讓更多人看見你的創意， 並獲得資金支持實現你的夢想專案。</p>
                <ButtonComponent 
                  size="lg"
                  color="secondary"
                >
                  立即提案
                </ButtonComponent>
              </div>
              <div className="col-span-full lg:col-span-7">
                {/* 手機版用 Swiper */}
                <div className="block lg:hidden">
                  <Swiper
                    slidesPerView={1.2}
                    spaceBetween={16}
                    className="!overflow-visible"
                  >
                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/lightbulb.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">創意變現</h4>
                        <p className="text-text5 text-neutral-700">
                          將你的 AI 提示詞創意轉化為實際收益
                        </p>
                      </div>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/supervisor_account.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">社群支持</h4>
                        <p className="text-text5 text-neutral-700">
                          獲得來自全球 AI 愛好者的支持與回饋
                        </p>
                      </div>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/trending_up.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">快速啟動</h4>
                        <p className="text-text5 text-neutral-700">
                          透過群眾募資快速啟動你的 AI 專案
                        </p>
                      </div>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/bolt.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">持續成長</h4>
                        <p className="text-text5 text-neutral-700">
                          建立長期的創作者品牌與收入來源
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                
                {/* 大螢幕用 CSS Grid */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-10">
                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/lightbulb.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">創意變現</h4>
                    <p className="text-text3 text-neutral-700">
                      將你的 AI 提示詞創意轉化為實際收益
                    </p>
                  </div>
                  
                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/supervisor_account.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">社群支持</h4>
                    <p className="text-text3 text-neutral-700">
                      獲得來自全球 AI 愛好者的支持與回饋
                    </p>
                  </div>
                  
                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/trending_up.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">快速啟動</h4>
                    <p className="text-text3 text-neutral-700">
                      透過群眾募資快速啟動你的 AI 專案
                    </p>
                  </div>
                  
                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/bolt.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">持續成長</h4>
                    <p className="text-text3 text-neutral-700">
                      建立長期的創作者品牌與收入來源
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
