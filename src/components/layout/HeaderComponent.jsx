import { NavLink } from "react-router";
import { IconButtonComponent } from "../buttons/IconButtonComponent";
import { ButtonComponent } from "../buttons/ButtonComponent";
import { ModalComponent } from "../common/ModalComponent";
import { useState } from "react";
import { SearchBarComponent } from "../SearchBarComponent";
import { supabase } from "@/utils/api/supabaseClient";
import GoogleLoginBtn from "../buttons/GoogleLoginBtn";
import { useGetUserProfile } from "@/hooks/useUser";

export function HeaderComponent() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const trendingKeyWords = ["文案生成", "創作者工具", "商業應用", "旅遊規劃"];
  const [isLogin, setIsLogin] = useState(false);
  const { data: userProfile } = useGetUserProfile(isLogin);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("登出失敗：", error);
    }
  };
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
            <GoogleLoginBtn
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              userProfile={userProfile}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            ></GoogleLoginBtn>
            {/* PC版 選單 */}
            {userProfile && (
              <div
                className={`rounded-xl shadow-[0px_4px_10px_0px_#88888866] absolute top-[calc(100%+16px)] ${isDropdownOpen ? " opacity-100" : " opacity-0 pointer-events-none"} bg-neutral-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 ease-in-out z-50`}
              >
                <div className="flex flex-col border-b-2 border-neutral-200 min-w-[192px]">
                  <NavLink
                    to={`/member-home-page`}
                    className={"text-text4 text-center py-3 hover:text-primary"}
                  >
                    個人頁面
                  </NavLink>
                  <NavLink
                    className={"text-text4 text-center py-3 hover:text-primary"}
                  >
                    追蹤計畫
                  </NavLink>
                  <NavLink
                    to={"sponsor-plan"}
                    className={"text-text4 text-center py-3 hover:text-primary"}
                  >
                    贊助紀錄
                  </NavLink>
                  <NavLink
                    to={"project-proposal"}
                    className={"text-text4 text-center py-3 hover:text-primary"}
                  >
                    提案紀錄
                  </NavLink>
                  {userProfile.role === "admin" && (
                    <NavLink
                      to={"api"}
                      className={
                        "text-text4 text-center py-3 hover:text-primary"
                      }
                    >
                      API 文件
                    </NavLink>
                  )}
                </div>
                <div className="py-3 flex justify-center">
                  <ButtonComponent
                    type="outlined"
                    color={"secondary"}
                    size="sm"
                    clickEvent={logout}
                    style="px-6"
                  >
                    登出
                  </ButtonComponent>
                </div>
              </div>
            )}
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

          {userProfile && (
            <div className={`flex flex-col mb-8`}>
              {/* 使用者名稱 */}
              <div className="pb-4 border-b-2 border-neutral-300 mb-4 flex gap-4 items-center">
                <button className="rounded-xl  overflow-hidden   cursor-pointer max-w-12 ">
                  <img
                    src={userProfile?.avatar_url}
                    alt="avatar"
                    className="w-full object-center"
                  />
                </button>
                <h5 className="text-h5">{userProfile.display_name}</h5>
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
                {userProfile?.role === "admin" && (
                  <NavLink
                    to={"api"}
                    className={"text-text2 py-3 hover:text-primary"}
                  >
                    API 文件
                  </NavLink>
                )}
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
            {!isLogin ? (
              <GoogleLoginBtn
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                userProfile={userProfile}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
              ></GoogleLoginBtn>
            ) : (
              <ButtonComponent
                type="outlined"
                color={isLogin ? "secondary" : "primary"}
                size="lg"
                style="w-full"
                clickEvent={logout}
              >
                登出
              </ButtonComponent>
            )}
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
