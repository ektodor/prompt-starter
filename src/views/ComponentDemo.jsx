import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { IconButtonComponent } from "@/components/buttons/IconButtonComponent";
// import { ProjectCardComponet } from "@/components/cards/ProjectCardComponet";
export function ComponentDemo() {
  return (
    <main className=" bg-amber-100  py-5 ">
      <div className="container flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <p>Filled Button</p>
          <ButtonComponent>Button</ButtonComponent>
          <ButtonComponent color="secondary">Button</ButtonComponent>
        </div>
        <div className="flex gap-3 items-center">
          <p>Outlined Button</p>
          <ButtonComponent type="outlined" iconUrl={"./icons/language.svg"}>
            Button
          </ButtonComponent>
          <ButtonComponent
            type="outlined"
            color="secondary"
            iconUrl={"./icons/language.svg"}
          >
            Button
          </ButtonComponent>
        </div>
        <div className="flex gap-3 items-center">
          <p>Icon Button</p>
          <IconButtonComponent iconUrl={"./icons/language.svg"} />
          <IconButtonComponent iconUrl={"./icons/language.svg"} size="lg" />
          <IconButtonComponent iconUrl={"./icons/language.svg"} type="filled" />
          <IconButtonComponent
            iconUrl={"./icons/language.svg"}
            type="outlined"
          />
        </div>
        {/* <div>
        <p>Project Card</p>
        <div className="grid grid-cols-3 gap-3">
          <ProjectCardComponet
            imageUrl="/images/image-13.webp"
            title="超強自動訂房助手：熱門房型不錯過"
            description="熬夜刷房間？再也不必！讓 AI 幫你自動搶下超熱門住宿時段，快速又安心，旅遊控必備神器"
          />
          <ProjectCardComponet imageUrl="/images/image-13.webp" />
          <ProjectCardComponet imageUrl="/images/image-13.webp" />
        </div>
      </div> */}
      </div>
    </main>
  );
}
