export default function AccountSettingsTab({ userProfile }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
            <label htmlFor="" className="block font-bold mb-2">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
        <div className="mb-6">
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
        <div className="mb-6">
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
        <div className="mb-6">
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
      </div>
    </div>
  );
}