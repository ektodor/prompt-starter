import { supabase } from "@/utils/api/supabaseClient";
import { useEffect, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import { NavLink } from "react-router";
import { useGetUserProfile } from "@/hooks/useUser";
import { queryClient } from "@/utils/queries/queryClient";
const generateNonce = async () => {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
  );
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return [nonce, hashedNonce];
};

let test = 0;
export default function GoogleLoginBtn() {
  test++;
  console.log(test);
  const [isLogin, setIsLogin] = useState(false);
  const { data: userProfile } = useGetUserProfile(isLogin);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("登出失敗：", error);
    }
  };
  // 監聽登入狀態變化
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        console.log("登入成功:", event);
        setIsLogin(true);
        queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
      } else if (event === "SIGNED_OUT") {
        console.log("登出成功:", event);
        setIsLogin(false);
        setIsDropdownOpen(false);
        queryClient.removeQueries({ queryKey: ["getUserProfile"] });
      }
    });

    // 初始檢查登入狀態
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIsLogin(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  useEffect(() => {
    // 載入 Google GIS script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => initializeGoogle();
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [isLogin]); // 沒有舔加會導致第二次登出登入被禁止，需要重新觸發初始化

  async function initializeGoogle() {
    console.log("init");
    const [nonce, hashedNonce] = await generateNonce();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.credential,
          nonce: nonce,
        });
        if (error) {
          console.error("登入錯誤:", error);
          return;
        }
      },
      nonce: hashedNonce,
      use_fedcm_for_prompt: true,
    });
  }

  function handleClick() {
    // 顯示 Google One Tap
    window.google.accounts.id.prompt();
  }

  return (
    <>
      {isLogin ? (
        <button
          className="rounded-xl  overflow-hidden   cursor-pointer max-w-12 "
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src={userProfile?.avatar_url}
            alt="avatar"
            className="w-full object-center"
          />
        </button>
      ) : (
        <ButtonComponent type="outlined" size="lg" clickEvent={handleClick}>
          使用 Google 登入 / 註冊
        </ButtonComponent>
      )}
      {/* PC版 選單 */}
      <div
        className={`rounded-xl shadow-[0px_4px_10px_0px_#88888866] absolute top-[calc(100%+16px)] ${isDropdownOpen ? " opacity-100" : " opacity-0 pointer-events-none"} bg-neutral-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 ease-in-out z-50`}
      >
        <div className="flex flex-col border-b-2 border-neutral-200 min-w-[192px]">
          <NavLink className={"text-text4 text-center py-3 hover:text-primary"}>
            個人頁面
          </NavLink>
          <NavLink className={"text-text4 text-center py-3 hover:text-primary"}>
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
          <NavLink
            to={"api"}
            className={"text-text4 text-center py-3 hover:text-primary"}
          >
            API 文件
          </NavLink>
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
    </>
  );
}
