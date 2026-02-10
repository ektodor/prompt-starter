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
      <div className="lg:col-span-8 border">
        <h2>帳戶資訊</h2>
      </div>
    </div>
  );
}