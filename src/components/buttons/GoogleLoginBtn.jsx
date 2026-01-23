import { supabase } from "@/utils/api/supabaseClient";
import { useEffect } from "react";
import { ButtonComponent } from "./ButtonComponent";
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

export default function GoogleLoginBtn({
  isLogin,
  setIsLogin,
  isDropdownOpen,
  setIsDropdownOpen,
  userProfile,
}) {
  // 監聽登入狀態變化
  useEffect(() => {
    // 登入狀況改變會觸發
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
  }, []);

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
  }, []);

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
      //   TODO
      //   測試時先用 false， 正式環境需要使用 ture 防止一直登入登出
      use_fedcm_for_prompt: false,
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
    </>
  );
}
