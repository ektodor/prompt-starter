import { productDetails } from "@/js/ProductDetail/productDetails";
import { risksAndChallenges } from "@/js/ProductDetail/risksAndChallenges";
import { pricingCard } from "@/js/ProductDetail/pricingCard";

import { ProductDetailItem } from "@/components/ProductDetail/ProductDetailItem";
import { RisksAndChallenges } from "@/components/ProductDetail/RisksAndChallenges";
import { PricingCard } from "@/components/ProductDetail/PricingCard";

export function ProductDetail() {
  return (
    <>
      <div className="container flex flex-col lg:flex-row gap-6 py-6 lg:py-10">
        <div className="w-full lg:w-3/5 xl:w-2/3">
          {productDetails.map((detail) => (
            <ProductDetailItem key={detail.id} detailItem={detail} />
          ))}

          <hr className="border border-neutral-300 mb-6 lg:mb-10" />

          <section className="mb-6 lg:mb-10">
            <RisksAndChallenges risksAndChallenges={risksAndChallenges} />
          </section>
        </div>

        <div className="w-full lg:w-2/5 xl:w-1/3">
          <ul className="flex flex-col gap-6 lg:gap-10 mb-6 lg:mb-10">
            {pricingCard.map((pricing) => (
              <PricingCard key={pricing.id} pricing={pricing} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
