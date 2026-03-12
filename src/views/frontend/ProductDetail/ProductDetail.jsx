import { useState } from "react";
import { useSearchParams } from "react-router";

import { risksAndChallenges } from "@/js/ProductDetail/risksAndChallenges";
import { pricingCard } from "@/js/ProductDetail/pricingCard";

import { useProject } from "@/hooks/tansstackQuery/projects/useProjectById";

import { ProductDetailItem } from "@/components/ProductDetail/ProductDetailItem";
import { RisksAndChallenges } from "@/components/ProductDetail/RisksAndChallenges";
import { PricingCard } from "@/components/ProductDetail/PricingCard";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";

export function ProductDetail() {
  const [searchParams] = useSearchParams();
  const [isFullContentVisible, setIsFullContentVisible] = useState(false);

  const projectId = searchParams.get("id");

  const { data: project, isLoading, isError, error } = useProject(projectId);

  const handleToggleContent = () =>
    setIsFullContentVisible(!isFullContentVisible);

  // 初次載入
  if (isLoading) return <div className="py-6 text-center">Loading...</div>;

  // 錯誤處理
  if (isError)
    return (
      <div className="py-6 text-center text-red-500">{error?.message}</div>
    );

  // 已經有 project 資料了
  const productDetails = project?.detailSections || [];

  return (
    <div className="container flex flex-col lg:flex-row gap-6 py-6 lg:py-10">
      {/* 左側內容 */}
      <div
        className={`relative w-full lg:w-3/5 xl:w-2/3 ${isFullContentVisible ? "h-auto" : "h-[794.35px] lg:h-auto mb-6 lg:mb-0 overflow-y-hidden"}`}
      >
        {productDetails.map((detail) => (
          <ProductDetailItem key={detail.id} detailItem={detail} />
        ))}

        <hr className="border border-neutral-300 mb-6 lg:mb-10" />

        <section className="mb-6 lg:mb-10">
          <RisksAndChallenges risksAndChallenges={risksAndChallenges} />
        </section>

        {/* 遮罩 */}
        {!isFullContentVisible && (
          <div className="block lg:hidden h-[213px] w-full absolute bottom-0 bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-white"></div>
        )}
      </div>

      {/* 手機版展開按鈕 */}
      {!isFullContentVisible && (
        <div className="block lg:hidden container">
          <ButtonComponent
            type="outlined"
            color="secondary"
            size="lg"
            style="w-full"
            clickEvent={handleToggleContent}
          >
            點擊查看完整內容
          </ButtonComponent>
        </div>
      )}

      {/* 右側方案列表 */}
      <div
        className={`w-full lg:w-2/5 xl:w-1/3 ${isFullContentVisible ? "pt-0" : "pt-6 lg:pt-0"}`}
      >
        <ul className="flex flex-col gap-6 lg:gap-10">
          {pricingCard.map((pricing) => (
            <PricingCard key={pricing.id} pricing={pricing} />
          ))}
        </ul>
      </div>
    </div>
  );
}
