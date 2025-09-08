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
                  src="./images/project-2.webp" 
                  alt="project 2"
                  className="w-full mb-4 lg-mb-0 lg:w-2/5 h-60 rounded-[10px] object-center flex-auto" 
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
        <div className="py-30">
          <div className="container text-center">
            <div className="progress-steps flex items-center justify-center gap-3 mb-30">
              {/* step 1 */}
              <div className="relative">
                <div 
                  className="w-6 h-6 bg-primary-100 rounded-full border-3 border-primary-400">
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-primary-400 whitespace-nowrap">贊助指南</span>
              </div>
              {/* connection line */}
              <div className="w-35 h-0.5 bg-neutral-300"></div>
              {/* step 2 */}
              <div className="relative">
                <div 
                  className="w-6 h-6 bg-neutral-300 rounded-full">
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-neutral-500 whitespace-nowrap">選擇方案</span>
              </div>
              {/* connection line */}
              <div className="w-35 h-0.5 bg-neutral-300"></div>
              {/* step 3 */}
              <div className="relative">
                <div 
                  className="w-6 h-6 bg-neutral-300 rounded-full">
                </div>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-neutral-500 whitespace-nowrap">前往購買</span>
              </div>
            </div>
            <h2 className="inline-block text-h2 border-b-4 border-primary-400 pb-4">贊助指南路線圖</h2>
          </div>
        </div>

      </section>
    </main>
  )
}
