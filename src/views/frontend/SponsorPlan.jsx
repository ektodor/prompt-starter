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
        <div className="py-16">
          <div className="container">
            <div 
              className="p-20 rounded-[20px]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
              <div className="flex gap-10">
                <img src="./images/project-2.webp" alt="project 2" className="w-2/5 h-60 rounded-[10px] object-center flex-auto" />
                <div className="w-3/5 flex-auto">
                  <h2 className="text-h2 mb-3">AdPrompt Lab</h2>
                  <div className="flex items-center mb-6">
                    <span className="inline-block p-1 bg-neutral-300 rounded-full mr-1">
                      <SVGColorComponent
                        url={"./icons/person.svg"}
                        color="bg-neutral-0"
                        size="size-[16px]"
                      />
                    </span>
                    <span className="text-neutral-500 text-text4">
                      江戶川柯南
                    </span>
                  </div>
                  <p className="text-h2">NT$ 859,618 </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
