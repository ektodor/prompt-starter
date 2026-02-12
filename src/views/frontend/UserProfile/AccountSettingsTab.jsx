import { useState } from "react";
import { InterestTag } from "@/components/Tag/InterestTag";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";


export default function AccountSettingsTab({ userProfile }) {
  const [bio, setBio] = useState(userProfile?.bio || "");
  const maxLength = 100;
  const isOverLimit = bio.length >= maxLength;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* left side avatar */}
      <div className="lg:col-span-4">
        <div className="flex justify-center">
          <div className="relative">
            <img
              className="rounded-full w-48"
              src={userProfile?.avatar_url}
              alt="avatar"
            />
            <button
              className="
                rounded-full w-13 h-13
                flex justify-center items-center 
                bg-primary-100 hover:bg-primary-200
                absolute bottom-0 right-0
                cursor-pointer transition-colors
              "
              onClick={() => console.log('上傳圖片')}
            >
              <img
                src="/icons/add_a_photo.svg"
                alt="上傳照片"
              />
            </button>
          </div>
          <div>
          </div>
        </div>
      </div>
      {/* right side setting contect */}
      <div className="lg:col-span-8">
        {/* account info */}
        <div className="mb-30">
          <h2
            className="
              text-center
              text-h5 
              py-3 mb-9
              rounded-md
              bg-[linear-gradient(270deg,rgba(255,66,77,0.32)_0%,rgba(255,66,77,0.2)_40.85%,rgba(233,180,14,0.2)_73.09%)]            "
          >
            帳戶資訊
          </h2>
          {/* 姓名 ＋ Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
            <div>
              <label htmlFor="userName" className="block font-bold mb-2">
                姓名
              </label>
              <input
                id="userName"
                type="text"
                defaultValue={userProfile?.display_name}
                className="
                  w-full px-3 py-2 
                  border border-neutral-300
                  rounded-sm 
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
              />
            </div>
            <div>
              <label htmlFor="userEmail" className="block font-bold mb-2">
                電子郵件
              </label>
              <input
                id="userEmail"
                type="email"
                defaultValue={userProfile?.email}
                placeholder="user@email.com"
                className="
                  w-full px-3 py-2
                  border border-neutral-300
                  bg-neutral-100
                  rounded-sm
                  text-neutral-500
                  opacity-60
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
                disabled
              />
              <p className="text-text4 text-neutral-300">
                ＊Email 為​登入​帳號，​無法​自行​修改
              </p>
            </div>
          </div>

          {/* 電話 + 地址 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
            <div>
              <label htmlFor="phone" className="block font-bold mb-2">
                電話
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue={userProfile?.phone}
                placeholder="0988-123-456"
                className="
                  w-full px-3 py-2 
                  border border-neutral-300
                  rounded-sm 
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-bold mb-2">
                地址
              </label>
              <input
                id="address"
                type="text"
                defaultValue={userProfile?.address}
                placeholder="臺北市大安區新生南路234號"
                className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
              />
            </div>
          </div>

          {/* github */}
          <div className="mb-7">
            <label htmlFor="github" className="block font-bold mb-2">
              GitHub
            </label>
            <input
              id="github"
              type="url"
              defaultValue={userProfile?.github_url}
              placeholder="https://github.com/username"
              className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
            />
          </div>
          {/* linkedin */}
          <div className="mb-7">
            <label htmlFor="linkedin" className="block font-bold mb-2">
              Linkedin
            </label>
            <input
              id="linkedin"
              type="url"
              defaultValue={userProfile?.linkedin_url}
              placeholder="https://linkedin.com/in/username"
              className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
            />
          </div>
          {/* personalWeb */}
          <div className="mb-7">
            <label htmlFor="personalWeb" className="block font-bold mb-2">
              我的網站
            </label>
            <input
              id="personalWeb"
              type="url"
              defaultValue={userProfile?.website_url}
              placeholder="https://personal-web.com"
              className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
            />
          </div>

          {/* Interest */}
          <div className="mb-7">
            <p className="mb-3 font-bold">興趣領域（可複選）</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2">
              {['寫作工具', '設計創作', '商業應用', '程式開發', '娛樂遊戲', '教育學習', '生活應用', '其他'].map((interest) => (
                <InterestTag key={interest} value={interest} />
              ))}
            </div>
          </div>

          {/* About me */}
          <div className="mb-22">
            <label htmlFor="bio" className="block font-bold mb-3">
              關於我
            </label>
            <textarea
              id="bio"
              rows="4"
              value={bio}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.length <= maxLength) {
                  setBio(newValue)
                }
              }}
              placeholder="熱愛 A​I ​技術​的​創作者，​專精於​寫作​和​設計​相關​的​提示​詞​開發。​希望​透過 AI 工具​幫助​更​多​人​提升​創​作​效率。​"
              className="
                w-full px-3 py-2
                border border-neutral-300
                text-neutral-500
                rounded-sm
                focus:outline-none focus:border-primary
              "
            />
            <p className={`text-right ${isOverLimit ? "text-red-500" : "text-neutral-500"}`}>
              {bio.length}/100
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6">
            <ButtonComponent
              type="outlined"
              color="secondary"
              size="lg"
              style="w-full col-start-3"
            >
              取消變更
            </ButtonComponent>

            <ButtonComponent
              type="filled"
              color="primary"
              size="lg"
              style="w-full"
              clickEvent={() => console.log("saving data")}
            >
              儲存變更
            </ButtonComponent>
          </div>
        </div>

        {/* password change */}
        <div>
          <h2
            className="
              text-center
              text-h5 
              py-3 mb-9
              rounded-md
              bg-[linear-gradient(270deg,rgba(255,66,77,0.32)_0%,rgba(255,66,77,0.2)_40.85%,rgba(233,180,14,0.2)_73.09%)]            "
          >
            變更密碼
          </h2>
          <div className="mb-22">
            <div className="mb-7">
              <label htmlFor="currentPwd" className="block font-bold mb-2">
                目前密碼
              </label>
              <input
                id="currentPwd"
                type="password"
                defaultValue={userProfile?.password}
                placeholder="輸入目前密碼"
                className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
              />
            </div>
            <div className="mb-7">
              <label htmlFor="newPwd" className="block font-bold mb-2">
                新密碼
              </label>
              <input
                id="newPwd"
                type="password"
                placeholder="輸入新密碼"
                className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
              />
              <p className="text-text-5 text-neutral-500">＊密碼需至少8個字符，包含大小寫英文和數字</p>
            </div>
            <div className="mb-7">
              <label htmlFor="checkNewPwd" className="block font-bold mb-2">
                確認新密碼
              </label>
              <input
                id="checkNewPwd"
                type="password"
                placeholder="再次輸入新密碼"
                className="
                  w-full px-3 py-2
                  border border-neutral-300
                  rounded-sm
                  text-neutral-500
                  shadow-sm
                  focus:outline-none focus:border-primary
                "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6">
            <ButtonComponent
              type="outlined"
              color="secondary"
              size="lg"
              style="w-full col-start-3"
            >
              取消變更
            </ButtonComponent>

            <ButtonComponent
              type="filled"
              color="primary"
              size="lg"
              style="w-full"
              clickEvent={() => console.log("saving data")}
            >
              儲存變更
            </ButtonComponent>
          </div>
        </div>

      </div>
    </div>
  );
}