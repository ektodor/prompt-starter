import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { PricingCard } from "@/components/ProductDetail/PricingCard";
import { useCreateOrder } from "@/hooks/useOrder";
import { useGetRewardsByProject } from "@/hooks/useReward";
import { transformToPricingCards } from "@/utils/api/transformers";
import { queryClient } from "@/utils/queries/queryClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

function GuideComponent({ setIsGuide }) {
  return (
    <section className="bg-white">
      <div className="py-6 lg:py-30">
        <div className="container flex flex-col items-center">
          {/* sponsor progress bar*/}
          <div className="roadmap-steps w-full lg:w-[45%] flex items-center justify-center gap-3 mb-20 lg:mb-30">
            {/* step 1 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-100 rounded-full border-3 border-primary-400"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-primary-400 whitespace-nowrap">
                贊助指南
              </span>
            </div>
            {/* connection line */}
            <div className="w-[24%] h-0.5 bg-neutral-300"></div>
            {/* step 2 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-neutral-300 rounded-full"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-neutral-500 whitespace-nowrap">
                選擇方案
              </span>
            </div>
            {/* connection line */}
            <div className="w-[24%] h-0.5 bg-neutral-300"></div>
            {/* step 3 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-neutral-300 rounded-full"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-neutral-500 whitespace-nowrap">
                前往購買
              </span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="inline-block text-h4 lg:text-h2 border-b-2 lg:border-b-4 border-primary-400 pb-4 mb-10">
              贊助指南路線圖
            </h2>
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
                <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">
                  01
                </h3>
                <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">確認方案</h4>
                <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">
                  檢查專案名稱、方案內容、價格和交付時間
                  確認無誤後點擊「開始贊助」
                </p>
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
                <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">
                  02
                </h3>
                <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">付款方式</h4>
                <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">
                  提供信用卡、ATM轉帳、超商付款或電子錢包。請填寫付款資訊並確認金額
                </p>
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
                <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">
                  03
                </h3>
                <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">交易處理</h4>
                <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">
                  請耐心等候，勿關閉頁面或重複操作。通常需要 10-30 秒完成驗證
                </p>
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
                <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">
                  04
                </h3>
                <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">購買成功</h4>
                <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">
                  贊助完成！確認信將發送至您的信箱
                </p>
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
                <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">
                  05
                </h3>
                <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">
                  等待商品上線
                </h4>
                <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">
                  等待專案製作，收到系統上線通知後即可開始使用
                </p>
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
                <h3 className="text-h4 lg:text-h2 text-primary mb-2 lg:mb-4">
                  06
                </h3>
                <h4 className="text-h5 lg:text-h4 mb-1 lg:mb-3">查看商品</h4>
                <p className="text-text4 lg:text-text3 mb-4 lg:mb-0">
                  可進入個人後台下載AI指令包、觀看教學影片、使用服務
                </p>
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
            clickEvent={() => {
              setIsGuide(false);
            }}
          >
            下一步
          </ButtonComponent>
        </div>
      </div>
    </section>
  );
}

function OptionComponent({ setIsGuide, projectId }) {
  const { data } = useGetRewardsByProject(projectId);
  const [rewardList, setRewardList] = useState([]);
  const [selectReward, setSelectReward] = useState({});
  const userData = queryClient.getQueryData(["getUserProfile"]);
  //   const {data:project}
  const mutation = useCreateOrder();
  async function createOrder() {
    if (!selectReward) {
      Swal.fire("請至少選擇一個方案");
      return;
    }
    console.log(selectReward);
    const order = {
      project_id: selectReward.projectId,
      reward_tier_id: selectReward.id,
      amount: selectReward.sellingPrice,
    };
    try {
      console.log({
        order,
        userData: userData ? userData.data.id : "",
      });
      const { data } = await mutation.mutateAsync({
        orderData: order,
        userId: userData ? userData.data.id : "",
      });
      console.log(data);
      Swal.fire("新增訂單成功");
    } catch (err) {
      console.log(err);
      Swal.fire("新增訂單失敗");
    }
  }

  useEffect(() => {
    if (data) {
      const transformData = transformToPricingCards(data.data);
      setRewardList(transformData);
      //   默認選第一個
      setSelectReward(transformData[0]);
    }
  }, [data]);
  return (
    <section className="bg-white">
      <div className="py-6 lg:py-30">
        <div className=" flex flex-col items-center">
          {/* sponsor progress bar*/}
          <div className="container roadmap-steps w-full lg:w-[45%] flex items-center justify-center gap-3 mb-20 lg:mb-30">
            {/* step 1 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-100 rounded-full border-3 border-primary-400"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-primary-400 whitespace-nowrap">
                贊助指南
              </span>
            </div>
            {/* connection line */}
            <div className="w-[24%] h-0.5 bg-primary-400"></div>
            {/* step 2 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-100 rounded-full border-3 border-primary-400"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-primary-400 whitespace-nowrap">
                選擇方案
              </span>
            </div>
            {/* connection line */}
            <div className="w-[24%] h-0.5 bg-neutral-300"></div>
            {/* step 3 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-neutral-300 rounded-full"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-neutral-500 whitespace-nowrap">
                前往購買
              </span>
            </div>
          </div>
          <div className="container text-center">
            <h2 className="inline-block text-h4 lg:text-h2 border-b-2 lg:border-b-4 border-primary-400 pb-4 mb-10">
              方案種類
            </h2>
          </div>
          <div className="px-10 py-6 lg:py-20 lg:px-10  ">
            <ul className="flex gap-10 mb-10  lg:flex-row flex-col ">
              {rewardList &&
                rewardList.map((item) => {
                  return (
                    <PricingCard
                      pricing={item}
                      key={item.id}
                      clickEvent={() => setSelectReward(item)}
                      style={
                        item.id === selectReward.id
                          ? "lg:scale-105 bg-neutral-100/80 transition-all duration-150"
                          : "lg:hover:scale-105 transition-all duration-150 cursor-pointer "
                      }
                    />
                  );
                })}
            </ul>
          </div>
          <div className="container py-6 lg:pb-40  px-6 flex gap-4  justify-between">
            <ButtonComponent
              size="lg"
              style="w-full lg:w-auto"
              clickEvent={() => setIsGuide(true)}
            >
              上一步
            </ButtonComponent>
            <ButtonComponent
              size="lg"
              style={`${selectReward ? "pointer-events-auto" : "pointer-events-none"} w-full lg:w-auto`}
              clickEvent={createOrder}
            >
              建立訂單
            </ButtonComponent>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SponsorshiOption() {
  const [isGuide, setIsGuide] = useState(true);
  const { projectId } = useParams();
  return (
    <>
      {isGuide ? (
        <GuideComponent setIsGuide={setIsGuide} />
      ) : (
        <OptionComponent setIsGuide={setIsGuide} projectId={projectId} />
      )}
    </>
  );
}
