import { SVGColorComponent } from "@/components/SVGColorComponent";
import { useState, useEffect  } from 'react';
import { NavLink, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getSession, supabase } from "@/utils/api/supabaseClient";
import { getFavoritesByUser } from "@/utils/api/supabase/favorites";
import { getProjectStats } from "@/utils/api/supabase/products";
import { getUserStats, getUserProfile } from "@/utils/api/supabase/users";


const favoriteQueryKeys = {
  all: ["member-favorites"],
  byUser: (userId) => [...favoriteQueryKeys.all, "user", userId],
};

const userQueryKeys = {
  all: ["users"],
  profile: () => [...userQueryKeys.all, "profile"],
  stats: (userId) => [...userQueryKeys.all, "stats", userId],
};

const getTagStyle = (tagName) => {
  const map = {
    '科技': 'text-purple-700 bg-purple-100',
    '商業應用': 'text-green-700 bg-green-100',
    '教育學習': 'text-secondary-700 bg-secondary-100',
    '數位內容': 'text-primary-700 bg-primary-100',
    '生活風格': 'text-blue-700 bg-blue-100',
    '行銷工具': 'text-neutral-700 bg-neutral-100',
    '寫作工具': 'text-pink-700 bg-pink-100',
  };
  return map[tagName] || 'text-secondary-700 bg-secondary-100';
};

export function MemberHomePage() {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session?.user);
      setUserId(session?.user?.id || null);
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      alert('請先登入才能查看個人頁面');
      setTimeout(() => {
        navigate('/');
      }, 100);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session?.user);
      setUserId(session?.user?.id || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const {
    data: userProfileData,
    isLoading: isProfileLoading,
  } = useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: async () => {
      const res = await getUserProfile();
      return res.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: userStatsData,
    isLoading: isStatsLoading,
  } = useQuery({
    queryKey: userQueryKeys.stats(userId),
    queryFn: async () => {
      if (!userId) return null;
      const statsRes = await getUserStats(userId);
      return statsRes.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: favoriteProjects = [],
    isLoading: isFavoritesLoading,
    isError,
  } = useQuery({
    queryKey: favoriteQueryKeys.byUser(userId),
    queryFn: async () => {
      if (!userId) return [];

      const res = await getFavoritesByUser(userId);
      const favorites = res.data;
      console.log('favorites:', favorites); // 加這行看資料長什麼樣
      const statsPromises = favorites.map(async (fav) => {
        const project = fav.project;
        if (!project) return null;

        const statsResponse = await getProjectStats(project.id);
        const stats = statsResponse?.data;

        return {
          ...project,
          favoriteCreatedAt: fav.created_at,
          price: stats?.currentAmount
            ? `NT$ ${stats.currentAmount.toLocaleString()}`
            : "N/A",
          percentageCompleted: Math.round(stats?.fundingPercentage || 0),
          dayLine: stats?.daysLeft || 0,
          currentAmount: stats?.currentAmount || 0,
          goalAmount: stats?.goalAmount || 0,
          backersCount: stats?.backersCount || 0,
        };
      });

      const results = await Promise.all(statsPromises);
      return results.filter(Boolean);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoggedIn === null || isLoggedIn === false) return null;

  const isLoading = isProfileLoading || isStatsLoading || isFavoritesLoading;

  if (isLoading) {
    return (
      <p className="flex justify-center items-center min-h-screen text-text2" >載入中...</p>
    );
  }

  if (isError) {
    return (
      <p className="flex justify-center items-center min-h-screen text-text2">載入失敗，請重試</p>
    );
  }

  const displayFavorites = favoriteProjects.slice(0, 9);
  
  const formatJoinDate = (dateString) => {
    if (!dateString) return '未知';
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  const githubLink = userProfileData?.github_url;
  const linkedinLink = userProfileData?.linkedin_url;
  const websiteLink = userProfileData?.website_url;
  const interests = userProfileData?.interests || [];

  return (
    <main>
      <section className="my-6 lg:my-[60px]">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              {/* 會員資料 */}
              <div className="p-6 bg-white border-1 border-neutral-300 rounded-xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] flex flex-col mb-6">
                <div className="flex flex-row lg:flex-col">
                  <div className="mb-0 lg:mb-7 mr-7 lg:mr-0">
                    <img
                      className="h-[100px] w-[100px] rounded-full"
                      src={userProfileData?.avatar_url || "./images/member.webp"}
                      alt="會員頭像"
                    />
                  </div>
                  <div>
                    <h4 className="text-h4 text-black mb-1">
                      {userProfileData?.display_name || '江戶川柯南'}
                    </h4>
                    <p className="text-text4 text-neutral-500 mb-[22px] lg:mb-5">加入於{formatJoinDate(userProfileData?.created_at)}</p>
                    <div className="flex justify-start items-center gap-4">
                      {githubLink && (
                        <a href={githubLink} target="_blank">
                          <SVGColorComponent
                            url={"./icons/github.svg"}
                            color="bg-neutral-500"
                            size="size-6"
                          />
                        </a>
                      )}
                      {linkedinLink && (
                        <a href={linkedinLink} target="_blank">
                          <SVGColorComponent
                            url={"./icons/linkedin.svg"}
                            color="bg-neutral-500"
                            size="size-6"
                          />
                        </a>
                      )}
                      {websiteLink && (
                        <a href={websiteLink} target="_blank">
                          <SVGColorComponent
                            url={"./icons/web-fill.svg"}
                            color="bg-neutral-500"
                            size="size-6"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="my-6 lg:my-8 border-2 border-neutral-300 bg-neutral-300"></div>
                <div className="mb-4 lg:mb-5">
                  <p className="text-text4 mb-3">成就徽章</p>
                  <div className="flex gap-3">
                    <div className="text-text5 text-black border-1 border-black rounded-full py-1 px-3 whitespace-nowrap">早期支持者</div>
                    <div className="text-text5 text-black border-1 border-black rounded-full py-1 px-3 whitespace-nowrap">活動支持者</div>
                    <div className="text-text5 text-black border-1 border-black rounded-full py-1 px-3 whitespace-nowrap">創作者</div>
                  </div>
                </div>
                <div>
                  <p className="text-text4 mb-3">興趣領域</p>
                  <div className="flex gap-3">
                    {interests.map((interest, index) => {
                      const tagStyle = getTagStyle(interest);
                      return (
                        <span
                          key={index}
                          className={`text-text5 rounded-xl py-1 px-3 whitespace-nowrap ${tagStyle}`}
                        >
                          {interest}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* 會員專案統計 */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-3">
                <div className="py-3 px-6 lg:p-6 bg-neutral-100 rounded-xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]">
                  <p className="text-text4 text-neutral-700 mb-1">發起專案</p>
                  <p className="text-h3 text-black">
                    {userStatsData?.projectsCreated || 0}
                  </p>
                </div>
                <div className="py-3 px-6 lg:p-6 bg-neutral-100 rounded-xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]">
                  <p className="text-text4 text-neutral-700 mb-1">支持專案</p>
                  <p className="text-h3 text-black">
                    {userStatsData?.projectsBacked || 0}
                  </p>
                </div>
                <div className="col-span-2 lg:col-span-1 py-3 px-6 lg:p-6 bg-neutral-100 rounded-xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]">
                  <p className="text-text4 text-neutral-700 mb-1">總支持金額（元）</p>
                  <p className="text-h3 text-black">
                    {userStatsData?.totalBacked?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="col-span-2 lg:col-span-1 py-3 px-6 lg:p-6 bg-neutral-100 rounded-xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]">
                  <p className="text-text4 text-neutral-700 mb-1">總募資金額（元）</p>
                  <p className="text-h3 text-black">
                    {userStatsData?.totalFundingRaised?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              {/* 關於我 */}
              <div 
                className="rounded-xl px-6 py-6 lg:py-8 mb-6 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] bg-linear-[270deg,rgba(255,66,77,0.32)_0%,rgba(255,66,77,0.2)_40.85%,rgba(233,180,14,0.2)_73.09%]"
              >
                <h5 className="text-h5 text-black mb-2 lg:mb-4 text-center">關於我</h5>
                <p className="text-text3 text-neutral-700 text-center">熱愛AI技術的創作者，專精於寫作和設計相關的提示詞開發與最佳化。期望透過AI工具賦能更多人有效率完成創作。</p>
              </div>
              {/* 收藏專案 */}
              <div>
                <h5 className="text-h5 text-black mb-4 lg:mb-6 text-center">收藏專案</h5>
                {displayFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {displayFavorites.map((product) => {
                      const tagName = product.project_tags?.[0]?.tags?.tag_name || '未分類';
                      const tagStyle = getTagStyle(tagName);

                      return (
                        <NavLink
                          to={`/product-detail?id=${product.id}`}
                          key={product.id}
                          className="flex group"
                        >
                          <div className="flex flex-col w-full p-3 rounded-xl border-1 border-neutral-300 transition-all group-hover:border-primary-400">
                            <div className="overflow-hidden rounded-xl mb-4 relative">
                              <img
                                className="h-[216px] w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.2]"
                                src={product.cover_image_url}
                                alt={`product${product.id}`}
                              />
                            </div>

                            <div className="mb-1 flex items-center">
                              {/* 不同分類不同標籤顏色 */}
                              <span className={`rounded-xl text-text4 py-2 px-3 ${tagStyle}`}>
                                {tagName}
                              </span>
                            </div>

                            <h4 className="text-h5 line-clamp-1 text-neutral-700 group-hover:text-primary-400 mb-1 transition-colors">
                              {product.title}
                            </h4>
                            <p className="text-neutral-500 text-text4 line-clamp-2 flex-grow mb-3">
                              {product.description}
                            </p>

                            {/* 進度條 */}
                            <div className="relative mb-5">
                              <div className="bg-neutral-300 w-full h-[6px] rounded-[3px] absolute top-0"></div>
                              <div
                                className={`h-[6px] rounded-[3px] absolute top-0 ${
                                  product.percentageCompleted > 100
                                    ? 'bg-primary-400'
                                    : 'bg-secondary-400'
                                }`}
                                style={{
                                  width:
                                    product.percentageCompleted > 100
                                      ? '100%'
                                      : `${product.percentageCompleted}%`,
                                }}
                              ></div>
                            </div>

                            <div className="flex justify-between items-center">
                              <p className="text-h5 text-neutral-700">
                                {`${product.percentageCompleted}%`}
                              </p>
                              <div className="flex justify-start items-center">
                                <SVGColorComponent
                                  url={"./icons/access_time.svg"}
                                  color="bg-neutral-500"
                                  size="size-5"
                                />
                                <p className="ml-1 text-neutral-500 text-text3">
                                  倒數 {product.dayLine} 天
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-text3 text-neutral-500">目前沒有收藏專案</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}