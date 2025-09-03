import { NavLink } from "react-router";
import { IconButtonComponent } from "../buttons/IconButtonComponent";
import { TextButtonComponent } from "../buttons/TextButtonComponent";

export function FooterComponent() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <IconButtonComponent
        type="outlined"
        iconUrl="./icons/arrow_upward.svg"
        clickEvent={backToTop}
        btnStyle="fixed right-3 bottom-3"
      />
      <footer className="py-6 bg-neutral-100 lg:py-10">
        <div className="pb-10 lg:border-b-2 lg:border-neutral-300">
          <div className="container lg:grid lg:grid-cols-2 lg:grid-rows-2">
            {/* logo */}
            <NavLink to={""} className={"mb-10 block lg:mb-0"}>
              {/* 手機版 logo */}
              <div className="lg:hidden">
                <img src="./images/logo-sm.webp" alt="logo" />
              </div>
              {/* PC版 logo */}
              <div className="hidden lg:block">
                <img src="./images/logo-lg.webp" alt="logo" />
              </div>
            </NavLink>
            {/* 關於 和 支援 */}
            <div className="flex gap-10 lg:gap-20 mb-10 lg:row-span-2 lg:mb-0 lg:justify-end">
              <div className="w-[112px] lg:w-fit">
                <h5 className="text-h5 mb-4">關於</h5>
                <div className="py-[12.5px] mb-1 lg:mb-2">
                  <TextButtonComponent to={""} size="lg">
                    關於我們
                  </TextButtonComponent>
                </div>
                <div className="py-[12.5px]">
                  <TextButtonComponent to={""} size="lg">
                    聯繫我們
                  </TextButtonComponent>
                </div>
              </div>
              <div className="w-[112px] lg:w-fit">
                <h5 className="text-h5 mb-4">支援</h5>
                <div className="py-[12.5px] mb-1 lg:mb-2">
                  <TextButtonComponent to={""} size="lg">
                    常見問題
                  </TextButtonComponent>
                </div>
                <div className="py-[12.5px]">
                  <TextButtonComponent to={""} size="lg">
                    服務條款
                  </TextButtonComponent>
                </div>
              </div>
            </div>
            {/* 社群連結 */}
            <div className="flex gap-2 lg:gap-4 lg:pb-[26px] lg:items-end">
              <IconButtonComponent
                to={""}
                iconUrl="./icons/facebook.svg"
                btnStyle="lg:p-0"
              />
              <IconButtonComponent
                to={""}
                iconUrl="./icons/instagram.svg"
                btnStyle="lg:p-0"
              />
              <IconButtonComponent
                to={""}
                iconUrl="./icons/threads.svg"
                btnStyle="lg:p-0"
              />
              <IconButtonComponent
                to={""}
                iconUrl="./icons/twitter-x.svg"
                btnStyle="lg:p-0"
              />
              <IconButtonComponent
                to={""}
                iconUrl="./icons/mail.svg"
                btnStyle="lg:p-0"
              />
            </div>
          </div>
        </div>
        {/* 版權 */}
        <div className="container lg:mt-10">
          <p className="text-text3 text-neutral-500 lg:text-center">
            © {new Date().getFullYear()} Promptstarter
          </p>
        </div>
      </footer>
    </>
  );
}
