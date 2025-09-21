import { formatThousands } from "@/commonJS/formatThousands";
import DotStyleTree from "@/components/DotStyleTree/DotStyleTree";

export function PricingCard({ pricing }) {
  const {
    cardImg,
    imgAlt,
    title,
    subtitle,
    sellingPrice,
    listPrice,
    sponsored,
    sponsorshipsAvailable,
    packageContents,
    recommendedTo,
    emphasizeContent,
    estimatedDelivery,
  } = pricing;

  const discount = listPrice - sellingPrice;
  const discountPercentage =
    Math.ceil((sellingPrice / listPrice) * 100) % 10 === 0
      ? Math.ceil((sellingPrice / listPrice) * 100) / 10
      : Math.ceil((sellingPrice / listPrice) * 100);
  const remainingSponsorship = sponsorshipsAvailable - sponsored;

  return (
    <li className="w-full p-6 border border-neutral-300 rounded-xl">
      <div className="w-full h-[139px] mb-4 lg:mb-6">
        <img
          src={cardImg}
          alt={imgAlt}
          className="w-full h-full rounded-[10px] object-cover"
        ></img>
      </div>
      <div className="mb-4 lg:mb-6">
        <h4 className="text-text3 lg:text-text2 font-medium text-neutral-700 mb-2 lg:mb-3">
          {title}
        </h4>
        <div className="flex gap-3 mb-2 lg:mb-3">
          <h5 className="text-h5 2xl:text-h4 text-neutral-900">
            NT$ {formatThousands(sellingPrice)} | {subtitle}
          </h5>
          <p className="font-bold text-text5 2xl:text-text4 text-neutral-700 py-1 px-2 bg-secondary-300 rounded-sm">
            {discountPercentage} 折
          </p>
        </div>
        <p className="text-text4 text-neutral-500">
          預定售價 NT${formatThousands(listPrice)}，現省 NT$
          {formatThousands(discount)}
        </p>
      </div>
      <div className="mb-4 lg:mb-6">
        <div className="flex gap-2">
          <p className="text-text5 lg:text-text4 text-neutral-0 py-1 px-2 bg-primary-600 rounded-sm">
            剩餘
            <strong className="font-bold px-1">{remainingSponsorship}</strong>份
          </p>
          <p className="text-text5 lg:text-text4 text-neutral-700 py-1 px-2 bg-neutral-300 rounded-sm">
            已被贊助
            <strong className="font-bold px-1">
              {sponsored}/{sponsorshipsAvailable}
            </strong>
            次
          </p>
        </div>
      </div>
      <div className="mb-4 lg:mb-6">
        <div className="mb-4">
          <DotStyleTree data={packageContents} />
        </div>
        <div>
          <h6 className="text-h6 text-neutral-700 mb-2">推薦給：</h6>
          <p className="text-text3 text-neutral-700">{recommendedTo}</p>
        </div>
      </div>
      <div className="py-4 lg:py-6 border-y border-neutral-300">
        <ul className="flex flex-wrap gap-4">
          {emphasizeContent.map((content) => (
            <li key={content.id} className="flex items-baseline gap-1">
              <span className="text-text4">{content.emoji}</span>
              <p className="whitespace-nowrap text-text4 text-neutral-700">
                {content.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-4 lg:pt-6">
        <p className="text-text4 text-neutral-500 text-center">
          {estimatedDelivery}
        </p>
      </div>
    </li>
  );
}
