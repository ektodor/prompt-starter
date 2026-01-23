import { NavLink } from "react-router";
import { IconButtonComponent } from "../buttons/IconButtonComponent";
import { ButtonComponent } from "../buttons/ButtonComponent";
import { ModalComponent } from "../common/ModalComponent";
import { useContext, useState } from "react";
import { SearchBarComponent } from "../SearchBarComponent";
import { UserContext } from "@/context";
import GoogleLoginBtn from "../buttons/GoogleLoginBtn";

export function HeaderComponent() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const trendingKeyWords = ["文案生成", "創作者工具", "商業應用", "旅遊規劃"];
  // const [isLogin, setIsLogin] = useState(false);
  return (
    <header className="py-6 bg-[#FAFAFA]" id="topAnchor">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          {/* 手機版 選單按鈕 */}
          <IconButtonComponent
            iconUrl="./icons/dehaze.svg"
            btnStyle="lg:hidden"
            clickEvent={() => setIsOpenModal(true)}
          />
          <NavLink to={""}>
            {/* 手機版 logo */}
            <div className="lg:hidden">
              <img src="./images/logo-sm.webp" alt="logo" />
            </div>
            {/* PC版 logo */}
            <div className="hidden lg:block">
              <img src="./images/logo-lg.webp" alt="logo" />
            </div>
          </NavLink>
          {/* 手機版 搜索按鈕 */}
          <IconButtonComponent
            iconUrl="./icons/search.svg"
            btnStyle="lg:hidden"
            clickEvent={() => setIsOpenSearchModal(true)}
          />
          {/* PC版 搜索元件 */}
          <SearchBarComponent style={"hidden lg:block"} />
          <div className="hidden lg:flex gap-4 relative">
            {/* PC版 語言按鈕 */}
            <ButtonComponent
              type="outlined"
              size="lg"
              iconUrl={"./icons/language.svg"}
            >
              中文
            </ButtonComponent>
            {/* PC版 登入狀態按鈕 */}
            <GoogleLoginBtn></GoogleLoginBtn>
          </div>
        </div>
      </div>
      {/* 登入、註冊 modal */}
      <ModalComponent isOpen={isOpenModal} rwdShowStyle={"lg:hidden"}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <img src="./images/logo-sm.webp" alt="logo" />
            <IconButtonComponent
              iconUrl="./icons/close.svg"
              clickEvent={() => setIsOpenModal(false)}
            />
          </div>

          {userInfo && (
            <div className={`flex flex-col mb-8`}>
              {/* 使用者名稱 */}
              <div className="pb-4 border-b-2 border-neutral-300 mb-4 flex gap-4 items-center">
                <IconButtonComponent
                  iconUrl="./icons/person.svg"
                  type="filled"
                />
                <h5 className="text-h5">{userInfo.name}</h5>
              </div>
              {/* 頁面切換 */}
              <div className="flex flex-col gap-4">
                <NavLink className={"text-text2 py-3 hover:text-primary"}>
                  個人頁面
                </NavLink>
                <NavLink className={"text-text2 py-3 hover:text-primary"}>
                  追蹤計畫
                </NavLink>
                <NavLink
                  to={"sponsor-plan"}
                  className={"text-text2 py-3 hover:text-primary"}
                >
                  贊助紀錄
                </NavLink>
                <NavLink
                  to={"project-proposal"}
                  className={"text-text2 py-3 hover:text-primary"}
                >
                  提案紀錄
                </NavLink>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6">
            <ButtonComponent
              type="outlined"
              size="lg"
              iconUrl={"./icons/language.svg"}
              style="w-full"
            >
              中文
            </ButtonComponent>
            <GoogleLoginBtn>
              <div className={`flex flex-col mb-8`}>
                {/* 使用者名稱 */}
                <div className="pb-4 border-b-2 border-neutral-300 mb-4 flex gap-4 items-center">
                  <IconButtonComponent
                    iconUrl="./icons/person.svg"
                    type="filled"
                  />
                  <h5 className="text-h5">sss</h5>
                </div>
                {/* 頁面切換 */}
                <div className="flex flex-col gap-4">
                  <NavLink className={"text-text2 py-3 hover:text-primary"}>
                    個人頁面
                  </NavLink>
                  <NavLink className={"text-text2 py-3 hover:text-primary"}>
                    追蹤計畫
                  </NavLink>
                  <NavLink
                    to={"sponsor-plan"}
                    className={"text-text2 py-3 hover:text-primary"}
                  >
                    贊助紀錄
                  </NavLink>
                  <NavLink
                    to={"project-proposal"}
                    className={"text-text2 py-3 hover:text-primary"}
                  >
                    提案紀錄
                  </NavLink>
                </div>
              </div>
            </GoogleLoginBtn>
            {/* <ButtonComponent
              type="outlined"
              color={userInfo ? "secondary" : "primary"}
              size="lg"
              style="w-full"
              clickEvent={userInfo ? logout : login}
            >
              {userInfo ? "登出" : "登入 / 註冊"}
            </ButtonComponent> */}
          </div>
        </div>
      </ModalComponent>
      {/* 搜索 modal */}
      <ModalComponent isOpen={isOpenSearchModal} rwdShowStyle={"lg:hidden"}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <img src="./images/logo-sm.webp" alt="logo" />
            <IconButtonComponent
              iconUrl="./icons/close.svg"
              clickEvent={() => setIsOpenSearchModal(false)}
            />
          </div>
          <SearchBarComponent />
          <div className="mt-6">
            <h6 className="text-h6 mb-4">熱門關鍵字</h6>
            <div className="flex flex-wrap gap-3">
              {trendingKeyWords.map((item) => {
                return (
                  <ButtonComponent type="outlined" key={item}>
                    {item}
                  </ButtonComponent>
                );
              })}
            </div>
          </div>
        </div>
      </ModalComponent>
    </header>
  );
}
