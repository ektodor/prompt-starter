import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import DotStyleTree from "@/components/DotStyleTree/DotStyleTree";
import { useGetOrderById, usePutOrderById } from "@/hooks/useOrder";
import {
  formatThousands,
  transformToPricingCard,
} from "@/utils/api/transformers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

export default function SponsorshipOrder() {
  const { orderId } = useParams();
  const { data } = useGetOrderById(orderId);
  const [reward, setReward] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [regulation, setRegulation] = useState([]);
  const {
    register, // 用來註冊表單元素
    handleSubmit, // 用來處理表單提交
    formState: { errors }, // 錯誤訊息
    watch,
  } = useForm({
    mode: "onChange", // 表單驗證的時機
    defaultValues: {
      payMethod: "信用卡一次付清",
    },
  });

  const payMethod = watch("payMethod");
  const isOnce = payMethod === "信用卡一次付清";
  const [order, setOrder] = useState({});
  useEffect(() => {
    if (data) {
      setOrder(data.data);
      setReward(transformToPricingCard(data.data.reward_tier));
    }
  }, [data]);
  const mutation = usePutOrderById();
  const navigate = useNavigate();
  async function onSubmit(data) {
    setIsLoading(true);
    try {
      await mutation.mutateAsync({
        orderId: order.id,
        orderData: {
          amount: Number.parseInt(reward?.sellingPrice) + 15,
          shipping_name: data.name ? data.name : "",
          shipping_email: data.email ? data.email : "",
          shipping_address: data.address ? data.address : "",
          payment_method: data.payMethod,
          invoice_carrier: data.barcode ? data.barcode : "",
          status: "paid",
          paid_at: new Date().toISOString(),
        },
      });
      Swal.fire("付款成功！！！");
      navigate(`/`);
    } catch {
      Swal.fire("付款失敗！！！ 請稍後試");
    } finally {
      setIsLoading(false);
    }
  }
  function checkRegulation(r) {
    if (regulation.includes(r)) {
      setRegulation(regulation.filter((item) => item != r));
    } else {
      setRegulation([...regulation, r]);
    }
  }
  return (
    <section className="bg-white">
      <div className="py-6 lg:py-30">
        <form
          className="container flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <div className="w-[24%] h-0.5 bg-primary-400"></div>
            {/* step 2 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-100 rounded-full border-3 border-primary-400"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-primary-400 whitespace-nowrap">
                選擇方案
              </span>
            </div>
            {/* connection line */}
            <div className="w-[24%] h-0.5 bg-primary-400"></div>
            {/* step 3 */}
            <div className="relative">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-100 rounded-full border-3 border-primary-400"></div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-text4 md:text-text3 text-primary-400 whitespace-nowrap">
                前往購買
              </span>
            </div>
          </div>
          <div className="text-center mb-10 lg:mb-20">
            <h2 className="inline-block text-h4 lg:text-h2 border-b-2 lg:border-b-4 border-primary-400 pb-4 ">
              方案明細
            </h2>
          </div>
          {/* main */}
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:gap-6">
            {/* plan */}
            <div className="order-1 lg:order-2 mb-6 lg:mb-0">
              <div
                className={`w-full py-6 px-3 border border-neutral-300 rounded-xl shadow-[2px_2px_4px_#00000040]
`}
              >
                <div className="w-full h-[139px] mb-6 lg:mb-6">
                  <img
                    src={reward?.cardImg}
                    alt="圖片"
                    className="w-full h-full rounded-[10px] object-cover"
                  ></img>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-text2 font-medium text-neutral-700 mb-2 lg:mb-3">
                      {reward?.title}
                    </h4>
                    <ButtonComponent
                      type="outlined"
                      color="secondary"
                      style="px-4 font-bold"
                    >
                      修改方案
                    </ButtonComponent>
                  </div>
                  <div className="flex  gap-3 mb-2 lg:mb-3">
                    <h5 className="text-h5 2xl:text-h4 text-neutral-900">
                      NT$ {formatThousands(reward?.sellingPrice)} |{" "}
                      {reward?.subtitle}
                    </h5>
                  </div>
                </div>

                {reward.packageContents && (
                  <DotStyleTree
                    data={reward.packageContents}
                    groupStyle="mb-2"
                  />
                )}
              </div>
            </div>
            {/* pay */}
            <div className="order-2 lg:order-1 lg:row-span-2  lg:col-span-2 ">
              <div className="py-6 lg:p-6">
                <h4 className="text-h4 lg:text-h2 mb-5">付款方式</h4>
                <div className="mb-5 border p-3 rounded-[10px] border-blue-300 flex bg-blue-100">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4.628L12.0045 2L21 4.628V10.017C20.9996 12.7788 20.1304 15.4704 18.5154 17.7108C16.9004 19.9512 14.6216 21.6267 12.0015 22.5C9.38048 21.627 7.10065 19.9514 5.48505 17.7105C3.86946 15.4696 3.00004 12.7771 3 10.0145V4.628Z"
                      stroke="#347397"
                      stroke-width="2"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 11.5L11 15L17 9"
                      stroke="#347397"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p className="text-text3 text-blue-800 ms-2">
                    您所有的交易資訊皆獲得安全保護
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:gap-6">
                  <div className="border border-neutral-300 rounded-xl px-3 py-6 lg:p-6">
                    <div className="lg:flex text-neutral-700 border-b border-neutral-300 items-center justify-between lg:pb-4">
                      <div className="flex items-center mb-3 lg:mb-0">
                        <input
                          autoComplete="off"
                          type="radio"
                          name="payMethod"
                          className="appearance-none outline-2 ml-1 outline-neutral-300  size-3 block rounded-full checked:bg-primary-200 checked:outline-1 checked:outline-primary-200 outline-offset-2"
                          value={"信用卡一次付清"}
                          id="once"
                          {...register("payMethod")}
                        />
                        <label htmlFor="once" className="ml-3 block text-h6">
                          信用卡一次付清
                        </label>
                      </div>
                      <p className="text-text5  pb-4 lg:pb-0 lg:text-text4">
                        支援 VSIA、MasterCard、JCB 。立即完成，快速開通。
                      </p>
                    </div>
                    <div className="py-5 px-3 rounded-xl bg-[#F5F5F580] mt-4 flex flex-col gap-4 lg:ml-6">
                      <div>
                        <h6 className="text-h6 mb-2">
                          信用卡卡號<span className="text-red-700"> *</span>
                        </h6>
                        <input
                          autoComplete="off"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm bg-white"
                          {...register("cardNumber", {
                            validate: (value) => {
                              if (!isOnce) return true;

                              if (!value) return "請輸入卡號";

                              const cleaned = value.replace(/\s/g, "");

                              if (!/^\d{16}$/.test(cleaned)) {
                                return "卡號需為16位數字";
                              }

                              return true;
                            },
                          })}
                        />
                        <p className="mt-1 text-text4 text-neutral-500">
                          請輸入16位數字
                        </p>
                        {errors.cardNumber && (
                          <p className="mt-1 text-red-600 text-sm">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-6 lg:gap-4">
                        <div className="w-full">
                          <h6 className="text-h6 mb-2">
                            有效日期<span className="text-red-700"> *</span>
                          </h6>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="10 / 26"
                            className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm bg-white"
                            {...register("validDate", {
                              validate: (value) => {
                                if (!isOnce) return true;

                                if (!value) return "請輸入有效日期";

                                const regex = /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/;

                                if (!regex.test(value)) {
                                  return "格式需為 MM / YY";
                                }

                                return true;
                              },
                            })}
                          />

                          {errors.validDate && (
                            <p className="mt-1 text-red-600 text-sm">
                              {errors.validDate.message}
                            </p>
                          )}
                        </div>
                        <div className="w-full">
                          <h6 className="text-h6 mb-2">
                            安全碼<span className="text-red-700"> *</span>
                          </h6>
                          <input
                            autoComplete="off"
                            type="text"
                            placeholder="456"
                            className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm bg-white"
                            {...register("securityCode", {
                              validate: (value) => {
                                if (!isOnce) return true;

                                if (!value) return "請輸入安全碼";

                                if (!/^\d{3,4}$/.test(value)) {
                                  return "安全碼需為3或4位數字";
                                }

                                return true;
                              },
                            })}
                          />

                          {errors.securityCode && (
                            <p className="mt-1 text-red-600 text-sm">
                              {errors.securityCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h6 className="text-h6 mb-2">持卡人英文姓名</h6>
                        <input
                          autoComplete="off"
                          type="text"
                          className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm bg-white"
                          placeholder="WANG DA MIN"
                          {...register("englishName")}
                        />
                      </div>
                      <div>
                        <h6 className="text-h6 mb-2">帳單地址</h6>
                        <input
                          autoComplete="off"
                          type="text"
                          className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm bg-white"
                          placeholder="臺北市信義區信義路五段7號"
                          {...register("address")}
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-text5 text-neutral-500 lg:text-text4 lg:text-end">
                      本公司不會留下您的信用卡資料，以保障你的權益，資料傳輸過程採用嚴密的加密技術保護。
                    </p>
                  </div>
                  <div className="border border-neutral-300 rounded-xl p-3 lg:flex lg:justify-between lg:items-center lg:p-6">
                    <div className="flex items-center mb-2 lg:mb-0">
                      <input
                        autoComplete="off"
                        type="radio"
                        name="payMethod"
                        className="appearance-none outline-2 ml-1 outline-neutral-300  size-3 block rounded-full checked:bg-primary-200 checked:outline-1 checked:outline-primary-200 outline-offset-2"
                        value={"ATM轉帳"}
                        id="atm"
                        {...register("payMethod")}
                      />
                      <label htmlFor="atm" className="ml-3 block text-h6">
                        ATM轉帳
                      </label>
                    </div>
                    <p className="text-text5 text-neutral-700 lg:text-text4">
                      需1-2個工作天確認，轉帳後請上傳收據。
                    </p>
                  </div>
                  <div className="border border-neutral-300 rounded-xl p-3 lg:flex lg:justify-between lg:items-center lg:p-6">
                    <div className="flex items-center mb-2 lg:mb-0">
                      <input
                        autoComplete="off"
                        type="radio"
                        name="payMethod"
                        className="appearance-none outline-2 ml-1 outline-neutral-300  size-3 block rounded-full checked:bg-primary-200 checked:outline-1 checked:outline-primary-200 outline-offset-2"
                        value={"超商付款"}
                        id="store"
                        {...register("payMethod")}
                      />
                      <label htmlFor="store" className="ml-3 block text-h6">
                        超商付款
                      </label>
                    </div>
                    <p className="text-text5 text-neutral-700 lg:text-text4">
                      7-11、全家、萊爾富便利商店，24小時內需完成付款。
                    </p>
                  </div>
                  <div className="border border-neutral-300 rounded-xl p-3 lg:flex lg:justify-between lg:items-center lg:p-6">
                    <div className="flex items-center mb-2 lg:mb-0">
                      <input
                        autoComplete="off"
                        type="radio"
                        name="payMethod"
                        className="appearance-none outline-2 ml-1 outline-neutral-300  size-3 block rounded-full checked:bg-primary-200 checked:outline-1 checked:outline-primary-200 outline-offset-2"
                        value={"LINE Pay"}
                        id="line"
                        {...register("payMethod")}
                      />
                      <label htmlFor="line" className="ml-3 block text-h6">
                        LINE Pay
                      </label>
                    </div>
                    <p className="text-text5 text-neutral-700 lg:text-text4">
                      使用LINE Pay付款，將導入付款頁面進行安全結帳。
                    </p>
                  </div>
                  <div className="border border-neutral-300 rounded-xl p-3 lg:flex lg:justify-between lg:items-center lg:p-6">
                    <div className="flex items-center mb-2 lg:mb-0">
                      <input
                        autoComplete="off"
                        type="radio"
                        name="payMethod"
                        className="appearance-none outline-2 ml-1 outline-neutral-300  size-3 block rounded-full checked:bg-primary-200 checked:outline-1 checked:outline-primary-200 outline-offset-2"
                        value={"Apple Pay"}
                        id="apple"
                        {...register("payMethod")}
                      />
                      <label htmlFor="apple" className="ml-3 block text-h6">
                        Apple Pay
                      </label>
                    </div>
                    <p className="text-text5 text-neutral-700 lg:text-text4">
                      使用Apple Pay付款，需綁定Apple Pay。
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-6 lg:p-6 lg:mt-6">
                <h4 className="text-h4 lg:text-h2 mb-2">發票資訊</h4>
                <p className="text-text3 text-neutral-500 mb-5">
                  發票一經開立後不可更改，請確認資訊是否填寫正確
                </p>
                <div className="border border-neutral-300 rounded-xl p-5 flex flex-col gap-4">
                  <div className="lg:flex lg:gap-4 ">
                    <div className="lg:w-full">
                      <h6 className="text-h6 mb-2">姓名</h6>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="王大明"
                        className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm"
                        {...register("name", {
                          validate: (value) => {
                            if (!value) return true;

                            if (
                              !/^[\u4e00-\u9fa5a-zA-Z\s]{2,20}$/.test(value)
                            ) {
                              return "姓名需為2~20字（中英文）";
                            }

                            return true;
                          },
                        })}
                      />

                      {errors.name && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="lg:w-full mt-4 lg:mt-0">
                      <h6 className="text-h6 mb-2">電子發票寄送信箱</h6>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="abc123@gmail.com"
                        className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm"
                        {...register("email", {
                          validate: (value) => {
                            if (!value) return true;

                            const emailRegex =
                              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

                            if (!emailRegex.test(value)) {
                              return "請輸入正確的Email格式";
                            }

                            return true;
                          },
                        })}
                      />

                      {errors.email && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="lg:flex lg:gap-4">
                    <div className="lg:w-full">
                      <h6 className="text-h6 mb-2">發票類型</h6>
                      <div className=" relative">
                        <select
                          type="text"
                          className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm appearance-none text-neutral-500"
                          {...register("bill", {
                            validate: (value) => {
                              if (!value) return true;

                              const allowTypes = ["電子發票", "統編發票"];

                              if (!allowTypes.includes(value)) {
                                return "發票類型錯誤";
                              }

                              return true;
                            },
                          })}
                        >
                          <option value="電子發票">電子發票</option>
                        </select>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" absolute end-2 top-2"
                        >
                          <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="black" />
                        </svg>
                      </div>
                      <p className="mt-1 text-text4 text-neutral-500">
                        ＊如需開立統編，請選擇統編發票
                      </p>
                    </div>
                    <div className="lg:w-full mt-4 lg:mt-0">
                      <h6 className="text-h6 mb-2">手機條碼</h6>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="/ABC24DE"
                        className="border border-neutral-300 shadow-[0px_1px_2px_#0000000D] py-2 px-3 w-full rounded-sm"
                        {...register("barcode", {
                          validate: (value) => {
                            if (!value) return true;

                            if (!/^\/[A-Z0-9]{7}$/.test(value)) {
                              return "手機條碼格式錯誤（例：/ABC1234）";
                            }

                            return true;
                          },
                        })}
                      />

                      {errors.barcode && (
                        <p className="mt-1 text-red-600 text-sm">
                          {errors.barcode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-3 lg:order-3 lg:row-span-2">
              <div className="border border-neutral-300 rounded-xl p-6 shadow-[2px_2px_4px_#00000040]">
                <h5 className="text-h5 mb-5">付款明細</h5>
                <div className="bg-neutral-100 rounded-[99px] py-[8.5px] px-3">
                  <p className="text-h6">總計</p>
                </div>
                <div className="mt-4 px-3">
                  <div className="flex justify-between text-text4 text-neutral-500">
                    <p>方案費用</p>
                    <p>NT$ {reward?.sellingPrice?.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between text-text4 text-neutral-500 mt-1 pb-3 border-b-2 border-b-neutral-300">
                    <p>平台服務費</p>
                    <p>NT$ 15</p>
                  </div>
                  <div className="flex justify-between text-h6  mt-3">
                    <p>總計金額</p>
                    <p>
                      NT${" "}
                      {(
                        Number.parseInt(reward?.sellingPrice) + 15
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="my-5">
                    <div className="flex gap-1 text-neutral-500 items-center">
                      <div
                        className="flex items-center gap-1"
                        onClick={() => checkRegulation("r1")}
                      >
                        <div className="p-[1.5px]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${regulation.includes("r1") ? "hidden" : "block"}`}
                          >
                            <path
                              d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
                              fill="#888888"
                            />
                          </svg>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${regulation.includes("r1") ? "block" : "hidden"}`}
                          >
                            <path
                              d="M7.6 10.4L5.45 8.25C5.26667 8.06667 5.03333 7.975 4.75 7.975C4.46667 7.975 4.23333 8.06667 4.05 8.25C3.86667 8.43333 3.775 8.66667 3.775 8.95C3.775 9.23333 3.86667 9.46667 4.05 9.65L6.9 12.5C7.1 12.7 7.33333 12.8 7.6 12.8C7.86667 12.8 8.1 12.7 8.3 12.5L13.95 6.85C14.1333 6.66667 14.225 6.43333 14.225 6.15C14.225 5.86667 14.1333 5.63333 13.95 5.45C13.7667 5.26667 13.5333 5.175 13.25 5.175C12.9667 5.175 12.7333 5.26667 12.55 5.45L7.6 10.4ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H16C16.55 0 17.021 0.196 17.413 0.588C17.805 0.98 18.0007 1.45067 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2ZM2 16H16V2H2V16Z"
                              fill="#888888"
                            />
                          </svg>
                        </div>
                        <label htmlFor="c1" className="text-text4">
                          我已閱讀並同意服務條款與隱私權政策。
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-1 text-neutral-500 items-center mt-1">
                      <div
                        className="flex items-center gap-1"
                        onClick={() => checkRegulation("r2")}
                      >
                        <div className="p-[1.5px]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${regulation.includes("r2") ? "hidden" : "block"}`}
                          >
                            <path
                              d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
                              fill="#888888"
                            />
                          </svg>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${regulation.includes("r2") ? "block" : "hidden"}`}
                          >
                            <path
                              d="M7.6 10.4L5.45 8.25C5.26667 8.06667 5.03333 7.975 4.75 7.975C4.46667 7.975 4.23333 8.06667 4.05 8.25C3.86667 8.43333 3.775 8.66667 3.775 8.95C3.775 9.23333 3.86667 9.46667 4.05 9.65L6.9 12.5C7.1 12.7 7.33333 12.8 7.6 12.8C7.86667 12.8 8.1 12.7 8.3 12.5L13.95 6.85C14.1333 6.66667 14.225 6.43333 14.225 6.15C14.225 5.86667 14.1333 5.63333 13.95 5.45C13.7667 5.26667 13.5333 5.175 13.25 5.175C12.9667 5.175 12.7333 5.26667 12.55 5.45L7.6 10.4ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H16C16.55 0 17.021 0.196 17.413 0.588C17.805 0.98 18.0007 1.45067 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2ZM2 16H16V2H2V16Z"
                              fill="#888888"
                            />
                          </svg>
                        </div>
                        <label htmlFor="c1" className="text-text4">
                          我已閱讀並同意退款政策。
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-1 text-neutral-500 items-center mt-1">
                      <div
                        className="flex items-center gap-1"
                        onClick={() => checkRegulation("r3")}
                      >
                        <div className="p-[1.5px]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${regulation.includes("r3") ? "hidden" : "block"}`}
                          >
                            <path
                              d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
                              fill="#888888"
                            />
                          </svg>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${regulation.includes("r3") ? "block" : "hidden"}`}
                          >
                            <path
                              d="M7.6 10.4L5.45 8.25C5.26667 8.06667 5.03333 7.975 4.75 7.975C4.46667 7.975 4.23333 8.06667 4.05 8.25C3.86667 8.43333 3.775 8.66667 3.775 8.95C3.775 9.23333 3.86667 9.46667 4.05 9.65L6.9 12.5C7.1 12.7 7.33333 12.8 7.6 12.8C7.86667 12.8 8.1 12.7 8.3 12.5L13.95 6.85C14.1333 6.66667 14.225 6.43333 14.225 6.15C14.225 5.86667 14.1333 5.63333 13.95 5.45C13.7667 5.26667 13.5333 5.175 13.25 5.175C12.9667 5.175 12.7333 5.26667 12.55 5.45L7.6 10.4ZM2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H16C16.55 0 17.021 0.196 17.413 0.588C17.805 0.98 18.0007 1.45067 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2ZM2 16H16V2H2V16Z"
                              fill="#888888"
                            />
                          </svg>
                        </div>
                        <label htmlFor="c1" className="text-text4">
                          我確認以上資訊無誤。
                        </label>
                      </div>
                    </div>
                  </div>
                  <ButtonComponent
                    htmlType="submit"
                    style="w-full"
                    size="lg"
                    enabled={regulation.length === 3 && isLoading === false}
                  >
                    {isLoading ? "正在付款請稍後...." : "結帳"}
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
