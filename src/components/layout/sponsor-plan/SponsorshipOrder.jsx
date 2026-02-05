import { ButtonComponent } from "@/components/buttons/ButtonComponent";

export default function SponsorshipOrder() {
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
          <div className="text-center">
            <h2 className="inline-block text-h4 lg:text-h2 border-b-2 lg:border-b-4 border-primary-400 pb-4 mb-10">
              方案明細
            </h2>
          </div>
          {/* roadmap context */}
          <div className="grid grid-cols-4 py-6 lg:py-20 lg:px-55 mb-10 lg:mb-20 bg-neutral-100/80 rounded-[20px] gap-6 lg:flex lg:flex-col lg:gap-20">
            付費
          </div>
          <ButtonComponent size="lg" style="w-full lg:w-auto">
            上一步
          </ButtonComponent>
        </div>
      </div>
    </section>
  );
}
