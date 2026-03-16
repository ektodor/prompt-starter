import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { SVGColorComponent } from "@/components/SVGColorComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "../../assets/swiperCus.css";
import "swiper/css/navigation";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTags, getProjectsByTag } from "@/utils/api/supabase/tags";
import {
  getProjects,
  getProjectStats,
  getHotProjects,
  getFeaturedProjects,
} from "@/utils/api/supabase/products";
import { getSession, supabase } from "@/utils/api/supabaseClient";
import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from "@/utils/api/supabase/favorites";

const projectQueryKeys = {
  all: ["projects"],
  lists: () => [...projectQueryKeys.all, "list"],
  hot: () => [...projectQueryKeys.all, "hot"],
  featured: () => [...projectQueryKeys.all, "featured"],
  stats: (id) => [...projectQueryKeys.all, "stats", id],
  byTag: (tagId) => [...projectQueryKeys.all, "byTag", tagId],
};

const tagQueryKeys = {
  all: ["tags"],
};

const favoriteQueryKeys = {
  all: ["favorites"],
  byUser: (userId) => [...favoriteQueryKeys.all, "user", userId],
};

const getTagStyle = (tagName) => {
  const map = {
    科技: "text-purple-700 bg-purple-100",
    商業應用: "text-green-700 bg-green-100",
    教育學習: "text-secondary-700 bg-secondary-100",
    數位內容: "text-primary-700 bg-primary-100",
    生活風格: "text-blue-700 bg-blue-100",
    行銷工具: "text-neutral-700 bg-neutral-100",
    寫作工具: "text-pink-700 bg-pink-100",
  };
  return map[tagName] || "text-secondary-700 bg-secondary-100";
};

export function Index() {
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const initAuth = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session?.user);
      setUserId(session?.user?.id || null);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session?.user);
      setUserId(session?.user?.id || null);
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ITEMS_PER_PAGE = isMobile ? 3 : 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  const { data: rawFavorites = new Set(), isLoading: isFavoritesLoading } =
    useQuery({
      queryKey: favoriteQueryKeys.byUser(userId),
      queryFn: async () => {
        if (!userId) return new Set();
        const resFavorites = await getFavoritesByUser(userId);
        return resFavorites.data.map((fav) => fav.project_id);
      },
      enabled: !!userId,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    });

  const userFavorites = new Set(rawFavorites);

  const { data: tags = [] } = useQuery({
    queryKey: tagQueryKeys.all,
    queryFn: async () => {
      const resTag = await getAllTags();
      return resTag.data;
    },
    staleTime: 15 * 60 * 1000,
  });

  const { data: products = [] } = useQuery({
    queryKey: projectQueryKeys.lists(),
    queryFn: async () => {
      const resProducts = await getProjects();
      return resProducts.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: productsWithStats = [] } = useQuery({
    queryKey: [...projectQueryKeys.lists(), "stats"],
    queryFn: async () => {
      if (products.length === 0) return [];

      const statsPromises = products.map(async (product) => {
        const statsResponse = await getProjectStats(product.id);
        const stats = statsResponse?.data || statsResponse;

        return {
          ...product,
          price: stats?.currentAmount
            ? `NT$ ${stats.currentAmount.toLocaleString()}`
            : product.price || "N/A",
          percentageCompleted: Math.round(stats?.fundingPercentage || 0),
          dayLine: stats?.daysLeft || 0,
          currentAmount: stats?.currentAmount || 0,
          goalAmount: stats?.goalAmount || 0,
          backersCount: stats?.backersCount || 0,
        };
      });

      return Promise.all(statsPromises);
    },
    enabled: products.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const { data: filteredProducts = [] } = useQuery({
    queryKey: projectQueryKeys.byTag(selectedTagId),
    queryFn: async () => {
      const resProductsByTag = await getProjectsByTag(selectedTagId);
      const data = resProductsByTag.data;

      const statsPromises = data.map(async (product) => {
        const statsResponse = await getProjectStats(product.id);
        const stats = statsResponse.data;

        return {
          ...product,
          price: stats?.currentAmount
            ? `NT$ ${stats.currentAmount.toLocaleString()}`
            : product.price || "N/A",
          percentageCompleted: Math.round(stats?.fundingPercentage || 0),
          dayLine: stats?.daysLeft || 0,
          currentAmount: stats?.currentAmount || 0,
          goalAmount: stats?.goalAmount || 0,
          backersCount: stats?.backersCount || 0,
        };
      });

      return Promise.all(statsPromises);
    },
    enabled: selectedTagId !== null,
    staleTime: 5 * 60 * 1000,
  });

  const { data: hotProducts = [] } = useQuery({
    queryKey: projectQueryKeys.hot(),
    queryFn: async () => {
      const resHotProducts = await getHotProjects();
      const data = resHotProducts.data;

      const statsPromises = data.map(async (product) => {
        const statsResponse = await getProjectStats(product.id);
        const stats = statsResponse.data;

        return {
          ...product,
          price: stats?.currentAmount
            ? `NT$ ${stats.currentAmount.toLocaleString()}`
            : product.price || "N/A",
          percentageCompleted: Math.round(stats?.fundingPercentage || 0),
          dayLine: stats?.daysLeft || 0,
          currentAmount: stats?.currentAmount || 0,
          goalAmount: stats?.goalAmount || 0,
          backersCount: stats?.backersCount || 0,
        };
      });

      return Promise.all(statsPromises);
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: bannerProducts = [] } = useQuery({
    queryKey: projectQueryKeys.featured(),
    queryFn: async () => {
      const resFeaturedProducts = await getFeaturedProjects();
      const data = resFeaturedProducts.data;

      const statsPromises = data.map(async (product) => {
        const statsResponse = await getProjectStats(product.id);
        const stats = statsResponse.data;

        return {
          ...product,
          price: stats?.currentAmount
            ? `NT$ ${stats.currentAmount.toLocaleString()}`
            : product.price || "N/A",
          percentageCompleted: Math.round(stats?.fundingPercentage || 0),
          dayLine: stats?.daysLeft || 0,
          currentAmount: stats?.currentAmount || 0,
          goalAmount: stats?.goalAmount || 0,
          backersCount: stats?.backersCount || 0,
        };
      });

      return Promise.all(statsPromises);
    },
    staleTime: 5 * 60 * 1000,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: ({ userId, projectId }) => addFavorite(userId, projectId),
    onMutate: async ({ userId, projectId }) => {
      await queryClient.cancelQueries({
        queryKey: favoriteQueryKeys.byUser(userId),
      });

      const previousFavorites = queryClient.getQueryData(
        favoriteQueryKeys.byUser(userId),
      );

      queryClient.setQueryData(
        favoriteQueryKeys.byUser(userId),
        (old = new Set()) => {
          const next = new Set(old);
          next.add(projectId);
          return next;
        },
      );

      return { previousFavorites };
    },
    onError: (error, variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          favoriteQueryKeys.byUser(variables.userId),
          context.previousFavorites,
        );
      }
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: favoriteQueryKeys.byUser(variables.userId),
      });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: ({ userId, projectId }) => removeFavorite(userId, projectId),
    onMutate: async ({ userId, projectId }) => {
      await queryClient.cancelQueries({
        queryKey: favoriteQueryKeys.byUser(userId),
      });

      const previousFavorites = queryClient.getQueryData(
        favoriteQueryKeys.byUser(userId),
      );

      queryClient.setQueryData(
        favoriteQueryKeys.byUser(userId),
        (old = new Set()) => {
          const next = new Set(old);
          next.delete(projectId);
          return next;
        },
      );

      return { previousFavorites };
    },
    onError: (error, variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          favoriteQueryKeys.byUser(variables.userId),
          context.previousFavorites,
        );
      }
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: favoriteQueryKeys.byUser(variables.userId),
      });
    },
  });

  const isProjectFavorited = (projectId) => {
    if (!isLoggedIn || !userId || isFavoritesLoading) return false;
    return userFavorites.has(projectId);
  };

  const handleToggleFavorite = async (projectId, event) => {
    event.preventDefault();
    event.stopPropagation();

    const session = await getSession();

    if (!session?.user) {
      alert("請先登入才能收藏專案");
      return;
    }

    const currentUserId = session.user.id;

    try {
      const isFavorited = userFavorites.has(projectId);

      if (isFavorited) {
        removeFavoriteMutation.mutate({
          userId: currentUserId,
          projectId,
        });
      } else {
        addFavoriteMutation.mutate({
          userId: currentUserId,
          projectId,
        });
      }
    } catch (error) {
      console.error("切換收藏失敗:", error);
    }
  };

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId === selectedTagId ? null : tagId);
    setCurrentPage(1);
  };

  const displayProducts =
    selectedTagId === null ? productsWithStats : filteredProducts;

  const totalPages = Math.max(
    1,
    Math.ceil(displayProducts.length / ITEMS_PER_PAGE),
  );

  const paginatedProducts = displayProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfWindow = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - halfWindow);
      const endPage = Math.min(totalPages, currentPage + halfWindow);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (
      typeof page === "number" &&
      page !== currentPage &&
      page >= 1 &&
      page <= totalPages
    ) {
      setCurrentPage(page);
      document.querySelector('[data-section="products"]')?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const pageNumbers = generatePageNumbers();

  // 贊助流程資料
  const sponsorStepData = [
    {
      id: 1,
      imgUrl: "./icons/manage_search.svg",
      title: "瀏覽專案",
      describe: "探索各種創新的 AI 提示詞專案",
    },
    {
      id: 2,
      imgUrl: "./icons/payment.svg",
      title: "選擇贊助",
      describe: "選擇適合的贊助方案並完成付款",
    },
    {
      id: 3,
      imgUrl: "./icons/card_giftcard.svg",
      title: "獲得回饋",
      describe: "收到專案創作者提供的獨家內容",
    },
    {
      id: 4,
      imgUrl: "./icons/star.svg",
      title: "支持創新",
      describe: "成為 AI 創新生態系的重要推手",
    },
  ];

  return (
    <main>
      {/* banner */}
      <section className="swiper-navigation px-3 lg:px-0">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          centeredSlides={true}
          centerInsufficientSlides={true}
          initialSlide={1}
          className="banner-swiper-slide"
          breakpoints={{
            992: { slidesPerView: "auto", spaceBetween: 24 },
            768: { slidesPerView: 1, spaceBetween: 24 },
            0: { slidesPerView: 1, spaceBetween: 12 },
          }}
        >
          {bannerProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex justify-center">
                <div
                  className="w-[351px] lg:w-[1296px] h-[313px] lg:h-[580px] bg-cover bg-center bg-no-repeat rounded-xl relative"
                  style={{ backgroundImage: `url(${item.cover_image_url})` }}
                >
                  <ul className="text-white absolute inset-0 flex flex-col justify-end lg:justify-center items-center lg:items-start mb-6 lg:mb-0 pl-0 lg:pl-16">
                    <li className="mb-2 lg:mb-6">
                      <p className="text-h3 lg:text-h1">{item.title}</p>
                    </li>
                    <li className="flex justify-start items-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#FFFFFF"
                      >
                        <path d="M12.49 2.00012C6.97 2.00012 2.5 6.48012 2.5 12.0001C2.5 17.5201 6.97 22.0001 12.49 22.0001C18.02 22.0001 22.5 17.5201 22.5 12.0001C22.5 6.48012 18.02 2.00012 12.49 2.00012ZM12.5 20.0001C8.08 20.0001 4.5 16.4201 4.5 12.0001C4.5 7.58012 8.08 4.00012 12.5 4.00012C16.92 4.00012 20.5 7.58012 20.5 12.0001C20.5 16.4201 16.92 20.0001 12.5 20.0001ZM13 7.00012H11.5V13.0001L16.75 16.1501L17.5 14.9201L13 12.2501V7.00012Z" />
                      </svg>
                      <p className="text-text3 lg:text-text1 ml-1">
                        倒數 {item.dayLine} 天
                      </p>
                    </li>
                    <li>
                      <NavLink to={`/sponsor-plan/${item.id}`}>
                        <ButtonComponent size="lg" href="/project-proposal">
                          立即贊助
                        </ButtonComponent>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 熱門募集 */}
      <section className="py-6 lg:py-16">
        <div className="container">
          <div className="text-center lg:text-start mb-6 lg:mb-10">
            <h2 className="text-h4 lg:text-h2 text-black">熱門募集</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-1 lg:grid-rows-2 gap-6 lg:gap-10">
            {hotProducts.map((product, index) => (
              <NavLink
                to={`/product-detail?id=${product.id}`}
                key={product.id}
                className={`flex flex-col group ${
                  index === 0
                    ? "col-span-1 row-span-1 lg:col-span-2 row-span-2"
                    : ""
                }`}
              >
                <div className="overflow-hidden rounded-xl mb-4 relative">
                  <img
                    className={`w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.2] ${
                      index === 0 ? "h-[215px] lg:h-[546px]" : "h-[215px]"
                    }`}
                    src={product.cover_image_url}
                    alt={`banner${product.id}`}
                  />
                </div>

                <div
                  className={`flex justify-between items-center ${
                    index === 0 ? "mb-2" : "mb-2 lg:mb-4"
                  }`}
                >
                  <h4 className="text-h5 lg:text-h4 line-clamp-2 text-neutral-700">
                    {product.title}
                  </h4>
                  <button
                    type="button"
                    className="p-2 ml-6"
                    onClick={(e) => handleToggleFavorite(product.id, e)}
                  >
                    <SVGColorComponent
                      url={
                        isProjectFavorited(product.id)
                          ? "./icons/bookmark.svg"
                          : "./icons/bookmark_border.svg"
                      }
                      color={
                        isProjectFavorited(product.id)
                          ? "bg-primary-400"
                          : "bg-neutral-500"
                      }
                    />
                  </button>
                </div>

                <p
                  className={`text-neutral-500 text-text3 ${
                    index === 0 ? "hidden lg:block mb-4" : "hidden"
                  }`}
                >
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center">
                    {index === 0 && (
                      <>
                        <p className="hidden lg:block text-h6 lg:text-h5 text-neutral-700">
                          {product.price}
                        </p>
                        <p className="hidden lg:block text-neutral-300 text-h5 mx-2">
                          |
                        </p>
                      </>
                    )}
                    <p className="text-h6 lg:text-h5 text-neutral-700">
                      {product.percentageCompleted}%
                    </p>
                  </div>
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
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* 贊助流程 */}
      <section className="bg-neutral-100">
        <div className="container py-6 lg:py-16">
          <div className="text-center mb-6 lg:mb-10">
            <h2 className="text-h4 lg:text-h2 text-black mb-2 lg:mb-6">
              贊助流程
            </h2>
            <p className="text-text4 lg:text-text3 text-neutral-700">
              簡單四步驟，輕鬆支持優質的 AI
              提示詞專案，與創作者一起推動人工智慧的創新應用
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {sponsorStepData.map((sponsorstep) => (
              <ul
                key={sponsorstep.id}
                className="flex flex-col items-center text-center py-4 lg:py-6"
              >
                <li className="w-[64px] lg:w-[80px] h-[64px] lg:h-[80px] rounded-full bg-white flex justify-center items-center mb-4 lg:mb-6">
                  <SVGColorComponent
                    url={sponsorstep.imgUrl}
                    color="bg-primary-300"
                    size="size-[34px] lg:size-[50px]"
                  />
                </li>
                <li className="mb-2">
                  <h4 className="text-h6 lg:text-h4 text-black">
                    {sponsorstep.title}
                  </h4>
                </li>
                <li>
                  <p className="text-text5 lg:text-text3 text-neutral-700">
                    {sponsorstep.describe}
                  </p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* 搜尋類別 & 群眾募集 */}
      <section className="py-6 lg:py-16" data-section="products">
        <div className="container">
          {/* 搜尋類別 */}
          <div className="mb-10">
            <div className="text-center mb-4">
              <h4 className="text-h4 text-neutral-700">搜尋類別</h4>
            </div>

            {tags.length > 0 && (
              <div className="flex justify-center items-center border-y-1 border-neutral-300 py-4">
                <Swiper
                  className="[&_.swiper-slide]:!w-auto [&_.swiper-slide]:!mr-0"
                  slidesPerView="auto"
                  spaceBetween={24}
                  freeMode={true}
                  breakpoints={{
                    0: { slidesPerView: "auto", spaceBetween: 8 },
                    768: { slidesPerView: 5, spaceBetween: 24 },
                  }}
                >
                  {tags.map((tag) => (
                    <SwiperSlide key={tag.id}>
                      <button
                        type="button"
                        onClick={() => handleTagClick(tag.id)}
                        className={`text-text3 py-[13.5px] lg:py-3 px-4 lg:px-6 whitespace-nowrap transition-all ${
                          selectedTagId === tag.id
                            ? "text-primary-400 border-b-2 border-primary-400"
                            : "text-neutral-500 hover:text-neutral-700 hover:border-b-2 hover:border-neutral-700"
                        }`}
                      >
                        {tag.tag_name}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          {/* 群眾募集 */}
          <div className="mb-6 lg:mb-10">
            <div className="text-center lg:text-start mb-6 lg:mb-10">
              <h2 className="text-h3 lg:text-h2 text-black">群眾集資</h2>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 gap-10">
                {paginatedProducts.map((product) => {
                  const tagName =
                    product.project_tags?.[0]?.tags?.tag_name || "未分類";
                  const tagStyle = getTagStyle(tagName);

                  return (
                    <NavLink
                      to={`/product-detail?id=${product.id}`}
                      key={product.id}
                      className="flex"
                    >
                      <div className="flex flex-col group w-full">
                        <div className="overflow-hidden rounded-xl mb-4 relative">
                          <img
                            className="h-[292.1px] w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.2]"
                            src={product.cover_image_url}
                            alt={`product${product.id}`}
                          />
                        </div>

                        <div className="mb-2 lg:mb-4 flex justify-between items-center relative">
                          <span
                            className={`rounded-xl text-text5 lg:text-text4 py-1 lg:py-2 px-3 ${tagStyle}`}
                          >
                            {tagName}
                          </span>

                          {/* 收藏按鈕 */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleFavorite(product.id, e)}
                            className="absolute top-1 right-3 p-2"
                          >
                            <SVGColorComponent
                              url={
                                isProjectFavorited(product.id)
                                  ? "./icons/bookmark.svg"
                                  : "./icons/bookmark_border.svg"
                              }
                              color={
                                isProjectFavorited(product.id)
                                  ? "bg-primary-400"
                                  : "bg-neutral-500"
                              }
                            />
                          </button>
                        </div>

                        <h4 className="text-h5 lg:text-h4 line-clamp-2 text-neutral-700 mb-2 lg:mb-3">
                          {product.title}
                        </h4>
                        <p className="text-neutral-500 text-text4 lg:text-text3 mb-4 lg:mb-6 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        {/* 進度條 */}
                        <div className="relative mb-5">
                          <div className="bg-neutral-300 w-full h-[6px] rounded-[3px] absolute top-0"></div>
                          <div
                            className={`h-[6px] rounded-[3px] absolute top-0 ${
                              product.percentageCompleted > 100
                                ? "bg-primary-400"
                                : "bg-secondary-400"
                            }`}
                            style={{
                              width:
                                product.percentageCompleted > 100
                                  ? "100%"
                                  : `${product.percentageCompleted}%`,
                            }}
                          ></div>
                        </div>

                        {/* 目前募集贊助金額、百分比 */}
                        <div className="flex justify-between items-center">
                          <div className="flex justify-start items-center">
                            <p className="text-h6 lg:text-h5 text-neutral-700">
                              {product.price}
                            </p>
                            <p className="text-neutral-300 text-h6 lg:text-h5 mx-2">
                              |
                            </p>
                            <p className="text-h6 lg:text-h5 text-neutral-700">
                              {`${product.percentageCompleted}%`}
                            </p>
                          </div>
                          <div className="flex justify-start items-center">
                            <SVGColorComponent
                              url={"./icons/access_time.svg"}
                              color="bg-neutral-500"
                              size="size-5"
                            />
                            <p className="ml-1 text-neutral-500 text-text4 lg:text-text3">
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
                <p className="text-text3 text-neutral-500">目前沒有相關專案</p>
              </div>
            )}
          </div>

          {/* 分頁 */}
          {displayProducts.length > ITEMS_PER_PAGE && (
            <ul className="flex justify-center items-center gap-2">
              {/* 上一頁 */}
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SVGColorComponent
                    url={"./icons/keyboard-arrow-left.svg"}
                    color="bg-neutral-500"
                  />
                </button>
              </li>

              {/* 頁碼按鈕 */}
              {pageNumbers.map((page, index) => (
                <li key={index}>
                  {page === "..." ? (
                    <span className="text-text2 text-[#1E1E1E] py-[6px] px-[14px]">
                      ...
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePageClick(page)}
                      className={`text-text2 py-[6px] px-[14px] rounded-lg transition-all ${
                        currentPage === page
                          ? "bg-primary-400 text-neutral-100"
                          : "text-[#1E1E1E] hover:bg-primary-100"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}

              {/* 下一頁 */}
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SVGColorComponent
                    url={"./icons/keyboard-arrow-right.svg"}
                    color="bg-neutral-500"
                  />
                </button>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* 成為提案者 */}
      <section className="py-6 lg:py-16 overflow-x-hidden">
        <div className="container">
          <div
            className="p-10 lg:p-20 rounded-[20px]"
            style={{
              backgroundImage: 'url("./images/bg-linear.webp")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20">
              <div className="col-span-full lg:col-span-5">
                <h3 className="text-h3 lg:text-h1 text-white mb-4">
                  成為提案者
                </h3>
                <p className="text-text4 lg:text-text2 text-white mb-4 lg:mb-6">
                  你有創新的 AI 提示詞想法嗎？在 Promtstarter
                  發起募資，讓更多人看見你的創意，並獲得資金支持實現你的夢想專案。
                </p>
                <NavLink to="/project-proposal">
                  <ButtonComponent size="lg" color="secondary">
                    立即提案
                  </ButtonComponent>
                </NavLink>
              </div>

              <div className="col-span-full lg:col-span-7">
                {/* 手機版用 Swiper */}
                <div className="block lg:hidden">
                  <Swiper
                    slidesPerView={1.2}
                    spaceBetween={16}
                    className="!overflow-visible"
                  >
                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/lightbulb.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">
                          創意變現
                        </h4>
                        <p className="text-text5 text-neutral-700">
                          將你的 AI 提示詞創意轉化為實際收益
                        </p>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/supervisor_account.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">
                          社群支持
                        </h4>
                        <p className="text-text5 text-neutral-700">
                          獲得來自全球 AI 愛好者的支持與回饋
                        </p>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/trending_up.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">
                          快速啟動
                        </h4>
                        <p className="text-text5 text-neutral-700">
                          透過群眾募資快速啟動你的 AI 專案
                        </p>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="border-2 border-neutral-300 bg-white rounded-xl p-6">
                        <div className="mb-4">
                          <SVGColorComponent
                            url={"./icons/bolt.svg"}
                            color="bg-neutral-700"
                            size="size-10"
                          />
                        </div>
                        <h4 className="text-h6 text-neutral-700 mb-2">
                          持續成長
                        </h4>
                        <p className="text-text5 text-neutral-700">
                          建立長期的創作者品牌與收入來源
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>

                {/* 大螢幕用 CSS Grid */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 gap-10">
                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/lightbulb.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">創意變現</h4>
                    <p className="text-text3 text-neutral-700">
                      將你的 AI 提示詞創意轉化為實際收益
                    </p>
                  </div>

                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/supervisor_account.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">社群支持</h4>
                    <p className="text-text3 text-neutral-700">
                      獲得來自全球 AI 愛好者的支持與回饋
                    </p>
                  </div>

                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/trending_up.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">快速啟動</h4>
                    <p className="text-text3 text-neutral-700">
                      透過群眾募資快速啟動你的 AI 專案
                    </p>
                  </div>

                  <div className="border-2 border-neutral-300 bg-white rounded-xl p-10">
                    <div className="mb-4">
                      <SVGColorComponent
                        url={"./icons/bolt.svg"}
                        color="bg-neutral-700"
                        size="size-10"
                      />
                    </div>
                    <h4 className="text-h4 text-neutral-700 mb-4">持續成長</h4>
                    <p className="text-text3 text-neutral-700">
                      建立長期的創作者品牌與收入來源
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
