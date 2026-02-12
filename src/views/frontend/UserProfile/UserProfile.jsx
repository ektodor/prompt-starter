import { useState } from "react";
import { useGetUserProfile } from "@/hooks/useUser";
import AccountSettingsTab from "./AccountSettingsTab";

export function UserProfile() {
  const { data: userProfile, isLoading } = useGetUserProfile(true);
  console.log("user profile data:", userProfile);

  const [activeTab, setActivateTab] = useState("settings");

  if (isLoading) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <>
      <div className="py-6 bg-neutral-100">
        <div className="container flex gap-10 text-neutral-500 font-bold">
          <button
            onClick={() => setActivateTab('profile')}
            className={`py-[14.5px] border-b ${activeTab === 'profile'
                ? 'border-primary-500 text-primary'
                : 'border-neutral-500'
              }
            `}
          >
            個人頁面
          </button>

          <button
            onClick={() => setActivateTab('sponsRecord')}
            className={`py-[14.5px] border-b ${activeTab === 'sponsRecord'
                ? 'border-primary-500 text-primary'
                : 'border-neutral-500'
              }
            `}
          >
            贊助紀錄
          </button>
          <button
            onClick={() => setActivateTab('proposals')}
            className={`py-[14.5px] border-b ${activeTab === 'proposals'
                ? 'border-primary-500 text-primary'
                : 'border-neutral-500'
              }
            `}
          >
            提案紀錄
          </button>
          <button
            onClick={() => setActivateTab('settings')}
            className={`py-[14.5px] border-b ${activeTab === 'settings'
                ? 'border-primary-500 text-primary'
                : 'border-neutral-500'
              }
            `}
          >
            帳號設定
          </button>
        </div>
      </div>
      <div className="container py-10">
        {activeTab === 'profile' && (
          <div>
            個人頁面
          </div>
        )}
        {activeTab === 'sponsRecord' && (
          <div>
            贊助紀錄
          </div>
        )}
        {activeTab === 'proposals' && (
          <div>
            提案紀錄
          </div>
        )}
        {activeTab === 'settings' && (
          <div>
            <AccountSettingsTab userProfile={userProfile.data}/>
          </div>
        )}

      </div>
    </>
  );
}