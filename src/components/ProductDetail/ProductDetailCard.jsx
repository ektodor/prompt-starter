import dayjs from "dayjs";

import { Tag } from "@/components/Tag/Tag";
import { CircularProgress } from "@/components/CircularProgress/CircularProgress";
import { formatThousands } from "@/commonJS/formatThousands";
import { SVGColorComponent } from "../SVGColorComponent";

export function ProductDetailCard({ productDetailCardInfo }) {
  const {
    img,
    tag,
    title,
    owner,
    targetCrowdfundingAmount,
    currentCrowdfundingAmount,
    donors,
    introduction,
    crowdfundingStartDate,
    crowdfundingEndDate,
    socialMedia,
  } = productDetailCardInfo;

  const today = dayjs();
  const daysLeft = dayjs(crowdfundingEndDate)
    .startOf("day")
    .diff(today.startOf("day"), "day");

  const achievementPercentage = Math.floor(
    (currentCrowdfundingAmount / targetCrowdfundingAmount) * 100
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-3/5 xl:w-2/3">
        <div className="rounded-[10px]">
          <img src={img} alt={title} />
        </div>
      </div>
      <div className="w-full lg:w-2/5 xl:w-1/3">
        <div className="flex flex-col gap-3 mb-6">
          {tag.length && (
            <ul>
              {tag.map((t) => (
                <Tag key={t.id} text={t.tag} />
              ))}
            </ul>
          )}
          <h1 className="text-h5 lg:text-h4 text-neutral-700">{title}</h1>
          <div className="flex items-center gap-1">
            <img
              src="./icons/User.svg"
              alt="user"
              className="size-[18px] lg:size-5"
            />
            <span className="text-text4 lg:text-text5 text-neutral-500">
              {owner}
            </span>
          </div>
        </div>
        <div className="flex gap-6 mb-4 lg:mb-6">
          <CircularProgress
            size={{ base: 88, lg: 108 }}
            percentage={achievementPercentage}
            counterClockwise={true}
          />
          <div className="flex flex-col">
            <h3 className="text-text4 lg:text-text3 text-neutral-700 mb-1 lg:mb-2">
              目標 NT$ {formatThousands(targetCrowdfundingAmount)}
            </h3>
            <h2 className="text-h3 lg:text-h2 text-neutral-900 mb-2 lg:mb-4">
              NT$ {formatThousands(currentCrowdfundingAmount)}
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <SVGColorComponent
                  url="./icons/person_gray.svg"
                  size="size-[18px] lg:size-5"
                  color="bg-neutral-500"
                />
                <span className="text-text4 lg:text-text3 text-neutral-500">
                  {donors} 人
                </span>
              </div>
              <div className="flex items-center gap-1">
                <SVGColorComponent
                  url="./icons/access_time.svg"
                  size="size-[18px] lg:size-5"
                  color="bg-neutral-500"
                />
                <span className="text-text4 lg:text-text3 text-neutral-500">
                  倒數 {daysLeft} 天
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 lg:mb-6">
          <p className="text-text3 text-neutral-700">{introduction}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-text4 text-neutral-700">
            募資期間：
            <span className="text-neutral-500">
              {crowdfundingStartDate} ~ {crowdfundingEndDate}
            </span>
          </p>
          {socialMedia.length && (
            <ul className="flex items-center gap-4">
              {socialMedia.map((media) => (
                <li key={media.id}>
                  <img src={media.img} alt={media.name} className="size-6" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
