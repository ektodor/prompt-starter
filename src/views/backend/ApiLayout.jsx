import { useState } from "react";
import { apiCategories, apiEndpoints } from "@/utils/api/apiData";
import ApiCardEnhanced from "@/components/ApiCardEnhanced";
import { NavLink } from "react-router";

export default function ApiLayout() {
  const [selectedCategory, setSelectedCategory] = useState("tags");
  const [expandedApi, setExpandedApi] = useState(null);

  const handleToggleExpand = (apiName) => {
    setExpandedApi(expandedApi === apiName ? null : apiName);
  };

  const currentApis = apiEndpoints[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text">
                Prompt Starter API Documentation
              </h1>
              <p className="text-gray-400 mt-1">API 文件</p>
            </div>
            <div>
              <NavLink
                to={"/"}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40 text-wrap"
              >
                回到首頁
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-3">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/15 hover:-translate-y-0.5 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                API 分類
              </h2>
              <nav className="space-y-2">
                {apiCategories.map((category) => {
                  const count = apiEndpoints[category.id]?.length || 0;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setExpandedApi(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <div className="font-semibold">{category.name}</div>
                            <div className="text-xs text-gray-400">
                              {category.description}
                            </div>
                          </div>
                        </div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-500/20 text-gray-400 border border-gray-500">
                          {count}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main - API Cards */}
          <main className="lg:col-span-9">
            {/* Category Header */}
            <div className="mb-6">
              {apiCategories.map((category) => {
                if (category.id === selectedCategory) {
                  return (
                    <div
                      key={category.id}
                      className="bg-gray-800 border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/15 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">{category.icon}</span>
                        <div>
                          <h2 className="text-2xl font-bold">
                            {category.name}
                          </h2>
                          <p className="text-gray-400">
                            {category.description}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div className="inline-block rounded-full font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-500 border border-blue-500 text-lg px-4 py-2">
                            {currentApis.length} APIs
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* API Cards */}
            <div className="space-y-4">
              {currentApis.length === 0 ? (
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/15 hover:-translate-y-0.5 text-center py-12">
                  <p className="text-gray-400">此分類目前沒有 API</p>
                </div>
              ) : (
                currentApis.map((apiInfo) => (
                  <ApiCardEnhanced
                    key={apiInfo.name}
                    api={apiInfo}
                    isExpanded={expandedApi === apiInfo.name}
                    onToggle={() => handleToggleExpand(apiInfo.name)}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-6 py-6 text-center text-gray-400 text-sm">
          <p>Prompt Starter API Documentation v2.0</p>
          <p className="mt-1">
            特色：統一回傳格式 {"{data, error}"} | Supabase Backend
          </p>
        </div>
      </footer>
    </div>
  );
}
