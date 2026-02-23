// views/frontend/Test.jsx
import { NavLink, useSearchParams } from "react-router"; // 👈 改用 useSearchParams
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjectById, getProjectStats } from "@/utils/api/supabase/products";
import { getCurrentUser } from "@/utils/api/supabaseClient";
import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from "@/utils/api/supabase/favorites";
import { SVGColorComponent } from "@/components/SVGColorComponent";
import { useEffect } from "react";

// queryKey 定義
const favoriteQueryKeys = {
  all: ['favorites'],
  byUser: (userId) => ['favorites', 'user', userId],
};

const userQueryKeys = {
  current: ['user', 'current'],
};

export function Test() {
  const [searchParams] = useSearchParams(); // 👈 使用 useSearchParams
  const id = searchParams.get('id'); // 👈 從 query 參數取得 id
  const queryClient = useQueryClient();

  console.log('🎯 專案 ID (from query):', id); // 👈 測試用：確認 ID 是否正確

  // ============ 1. 查詢當前使用者 ============
  const { data: currentUser } = useQuery({
    queryKey: userQueryKeys.current,
    queryFn: getCurrentUser,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });

  const isLoggedIn = !!currentUser;
  const userId = currentUser?.id;

  // ============ 2. 清除收藏狀態（登入/登出時） ============
  useEffect(() => {
    queryClient.removeQueries({ 
      queryKey: favoriteQueryKeys.all,
      exact: false 
    });
  }, [userId, queryClient]);

  // ============ 3. 取得使用者收藏列表 ============
  const { data: userFavorites = new Set() } = useQuery({
    queryKey: favoriteQueryKeys.byUser(userId),
    queryFn: async () => {
      if (!userId) return new Set();
      const response = await getFavoritesByUser(userId);
      const favoritesData = response?.data || [];
      return new Set(favoritesData.map((fav) => fav.project_id));
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  // ============ 4. 查詢專案資料 ============
  const { data: project, isLoading: projectLoading, isError } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await getProjectById(id);
      return response?.data || response;
    },
    enabled: !!id,
  });

  // ============ 5. 查詢專案統計 ============
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['project', id, 'stats'],
    queryFn: async () => {
      const response = await getProjectStats(id);
      return response?.data || response;
    },
    enabled: !!id,
  });

  // ============ 6. 新增收藏 Mutation ============
  const addFavoriteMutation = useMutation({
    mutationFn: ({ userId, projectId }) => addFavorite(userId, projectId),
    onSuccess: (_, variables) => {
      const newFavorites = new Set(userFavorites);
      newFavorites.add(variables.projectId);
      queryClient.setQueryData(
        favoriteQueryKeys.byUser(variables.userId),
        newFavorites
      );
    },
    onError: (error) => {
      console.error('新增收藏失敗:', error);
    },
  });

  // ============ 7. 移除收藏 Mutation ============
  const removeFavoriteMutation = useMutation({
    mutationFn: ({ userId, projectId }) => removeFavorite(userId, projectId),
    onSuccess: (_, variables) => {
      const newFavorites = new Set(userFavorites);
      newFavorites.delete(variables.projectId);
      queryClient.setQueryData(
        favoriteQueryKeys.byUser(variables.userId),
        newFavorites
      );
    },
    onError: (error) => {
      console.error('移除收藏失敗:', error);
    },
  });

  // ============ 8. 處理函數 ============
  const isProjectFavorited = (projectId) => {
    if (!isLoggedIn || !userId) return false;
    return userFavorites.has(projectId);
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn || !currentUser) {
      alert('請先登入會員才能使用收藏功能');
      return;
    }

    try {
      if (isProjectFavorited(id)) {
        removeFavoriteMutation.mutate({
          userId: currentUser.id,
          projectId: id,
        });
      } else {
        addFavoriteMutation.mutate({
          userId: currentUser.id,
          projectId: id,
        });
      }
    } catch (error) {
      console.error('切換收藏失敗:', error);
    }
  };

  // ============ 9. 載入與錯誤狀態 ============
  if (!id) {
    return (
      <div className="container py-20 text-center">
        <p className="text-alert-500 text-h4">❌ 缺少專案 ID</p>
        <p className="text-neutral-500 mt-4">URL 應包含 ?id=專案ID</p>
        <NavLink 
          to="/" 
          className="inline-block mt-6 px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500"
        >
          返回首頁
        </NavLink>
      </div>
    );
  }

  if (projectLoading || statsLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-h4">⏳ 載入中...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="container py-20 text-center">
        <p className="text-alert-500 text-h4">❌ 找不到此專案</p>
        <p className="text-neutral-500 mt-4">專案 ID: {id}</p>
        <NavLink 
          to="/" 
          className="inline-block mt-6 px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500"
        >
          返回首頁
        </NavLink>
      </div>
    );
  }

  // ============ 10. 渲染測試頁面 ============
  return (
    <main className="py-10">
      <div className="container">
        {/* 返回首頁按鈕 */}
        <div className="mb-6">
          <NavLink 
            to="/" 
            className="inline-flex items-center text-primary-400 hover:text-primary-500"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="mr-2"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            返回首頁
          </NavLink>
        </div>

        {/* 測試資訊區塊 */}
        <div className="bg-primary-100 p-6 rounded-lg mb-10">
          <h2 className="text-h4 text-primary-700 mb-4">🧪 測試資訊（Test.jsx - Query 參數模式）</h2>
          <div className="space-y-2">
            <p className="text-text3">
              <strong>URL 格式:</strong> <code className="bg-white px-2 py-1 rounded">/product-detail?id={id}</code>
            </p>
            <p className="text-text3">
              <strong>專案 ID:</strong> <code className="bg-white px-2 py-1 rounded">{id}</code>
            </p>
            <p className="text-text3">
              <strong>使用者 ID:</strong> <code className="bg-white px-2 py-1 rounded">{userId || '未登入'}</code>
            </p>
            <p className="text-text3">
              <strong>登入狀態:</strong> {isLoggedIn ? '✅ 已登入' : '❌ 未登入'}
            </p>
            <p className="text-text3">
              <strong>收藏狀態:</strong> {isProjectFavorited(id) ? '❤️ 已收藏' : '🤍 未收藏'}
            </p>
            <p className="text-text3">
              <strong>取得方式:</strong> useSearchParams() → searchParams.get('id')
            </p>
          </div>
        </div>

        {/* 專案標題與收藏按鈕 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-h2 lg:text-h1 text-black mb-4">
              {project.title}
            </h1>
            <p className="text-text3 text-neutral-700">
              {project.tagline || project.description}
            </p>
          </div>

          {/* 收藏按鈕 */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className="ml-6 p-4 hover:bg-neutral-100 rounded-lg transition-colors"
            title={isProjectFavorited(id) ? '取消收藏' : '加入收藏'}
          >
            <SVGColorComponent
              url={
                isProjectFavorited(id)
                  ? "./icons/bookmark.svg"
                  : "./icons/bookmark_border.svg"
              }
              color={
                isProjectFavorited(id)
                  ? "bg-primary-400"
                  : "bg-neutral-500"
              }
              size="size-8"
            />
          </button>
        </div>

        {/* 專案封面圖 */}
        <div className="mb-10">
          <img 
            src={project.cover_image_url} 
            alt={project.title}
            className="w-full h-[400px] lg:h-[600px] object-cover rounded-xl"
          />
        </div>

        {/* 統計資訊 */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-neutral-100 p-6 rounded-lg">
              <p className="text-text4 text-neutral-500 mb-2">目標金額</p>
              <p className="text-h4 text-neutral-700">
                NT$ {stats.goalAmount?.toLocaleString()}
              </p>
            </div>
            <div className="bg-primary-100 p-6 rounded-lg">
              <p className="text-text4 text-primary-600 mb-2">已募集</p>
              <p className="text-h4 text-primary-700">
                NT$ {stats.currentAmount?.toLocaleString()}
              </p>
            </div>
            <div className="bg-secondary-100 p-6 rounded-lg">
              <p className="text-text4 text-secondary-600 mb-2">贊助人數</p>
              <p className="text-h4 text-secondary-700">
                {stats.backersCount} 人
              </p>
            </div>
            <div className="bg-neutral-100 p-6 rounded-lg">
              <p className="text-text4 text-neutral-500 mb-2">剩餘天數</p>
              <p className="text-h4 text-neutral-700">
                {stats.daysLeft} 天
              </p>
            </div>
          </div>
        )}

        {/* 進度條 */}
        {stats && (
          <div className="mb-10">
            <div className="flex justify-between mb-3">
              <span className="text-text3 text-neutral-700">募資進度</span>
              <span className="text-h5 text-primary-400">
                {stats.fundingPercentage}%
              </span>
            </div>
            <div className="relative h-4 bg-neutral-300 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-primary-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.fundingPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-text4 text-neutral-500">
              <span>NT$ {stats.currentAmount?.toLocaleString()}</span>
              <span>NT$ {stats.goalAmount?.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* 專案描述 */}
        <div className="bg-white rounded-lg p-8 border border-neutral-200">
          <h2 className="text-h3 text-black mb-6">專案說明</h2>
          <div className="prose max-w-none">
            <p className="text-text3 text-neutral-700 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        </div>

        {/* 測試用：顯示完整專案資料 */}
        <details className="mt-10">
          <summary className="cursor-pointer text-h5 text-neutral-700 mb-4 hover:text-primary-400">
            🔍 查看完整專案資料（開發測試用）
          </summary>
          <pre className="bg-neutral-900 text-white p-6 rounded-lg overflow-auto text-xs">
            {JSON.stringify({ 
              project, 
              stats, 
              userFavorites: Array.from(userFavorites),
              searchParams: Object.fromEntries(searchParams.entries()) 
            }, null, 2)}
          </pre>
        </details>

        {/* 測試收藏功能說明 */}
        <div className="mt-10 bg-secondary-100 p-6 rounded-lg">
          <h3 className="text-h5 text-secondary-700 mb-4">📝 測試步驟（Query 參數模式）</h3>
          <ol className="list-decimal list-inside space-y-2 text-text3 text-secondary-700">
            <li>確認 URL 格式：/product-detail?id=xxx</li>
            <li>確認專案 ID 顯示正確</li>
            <li>未登入時點擊收藏按鈕 → 應顯示「請先登入」提示</li>
            <li>登入後點擊收藏按鈕 → 圖示應從空心變實心</li>
            <li>重新整理頁面 → 收藏狀態應保持</li>
            <li>再次點擊收藏按鈕 → 圖示應從實心變空心</li>
            <li>返回首頁 → 此專案的收藏狀態應同步更新</li>
          </ol>
        </div>
      </div>
    </main>
  );
}