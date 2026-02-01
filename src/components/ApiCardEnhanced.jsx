import { useState } from "react";
import * as api from "@/utils/api/api";
const apiModules = {
  tags: api,
  products: api,
  rewards: api,
  orders: api,
  favorites: api,
  interactions: api,
  users: api,
  admin: api,
};

// HTTP 方法顏色對應
const methodColors = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  PATCH: "bg-orange-500",
  DELETE: "bg-red-500",
};

export default function ApiCardEnhanced({ api, isExpanded, onToggle }) {
  const [testParams, setTestParams] = useState(
    JSON.stringify(api.exampleRequest, null, 2)
  );
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("response"); // response, errors, code

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Parse test parameters
      const params = JSON.parse(testParams);

      // Find the API module and function
      const categoryKey = Object.keys(apiModules).find((key) => {
        return apiModules[key][api.name] !== undefined;
      });

      if (!categoryKey) {
        throw new Error(`找不到 API 函式: ${api.name}`);
      }

      const apiFunction = apiModules[categoryKey][api.name];

      // Call the API function with parameters
      let result;
      if (Object.keys(params).length === 0) {
        result = await apiFunction();
      } else if (Object.keys(params).length === 1) {
        result = await apiFunction(params[Object.keys(params)[0]]);
      } else {
        result = await apiFunction(...Object.values(params));
      }

      // Handle standardized {data, error} response format
      if (result && typeof result === "object" && "error" in result) {
        if (result.error) {
          // API returned an error
          setError(result.error);
        } else {
          // API succeeded
          setResponse(result);
          setActiveTab("response");
        }
      } else {
        // Legacy format or direct data return
        setResponse(result);
        setActiveTab("response");
      }
    } catch (err) {
      // Handle unexpected errors
      const errorObj = {
        message: err.message || "發生錯誤",
        code: "UNEXPECTED_ERROR",
        status: 500,
      };
      setError(errorObj);
      console.error("API Test Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/15 hover:-translate-y-0.5 animate-fade-in">
      {/* Card Header */}
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {/* HTTP 方法標籤 */}
            {api.method && (
              <span
                className={`px-2 py-1 text-xs font-bold text-white rounded ${methodColors[api.method] || "bg-gray-500"}`}
              >
                {api.method}
              </span>
            )}
            <h3 className="text-xl font-semibold text-white">{api.name}</h3>
            {api.requiresAuth && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-yellow-500/20 text-yellow-500 border border-yellow-500">
                需要登入
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{api.description}</p>
        </div>
        <button className="text-gray-400 hover:text-white transition ml-4">
          <svg
            className={`w-6 h-6 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 space-y-6 border-t border-gray-700 pt-6">
          {/* Parameters */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              參數說明
            </h4>
            {api.parameters.length > 0 ? (
              <div className="space-y-2">
                {api.parameters.map((param, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <code className="text-blue-400 font-mono text-sm">
                            {param.name}
                          </code>
                          <span className="text-xs text-purple-400 font-mono">
                            {param.type}
                          </span>
                          {param.required && (
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-500/20 text-red-500 border border-red-500">
                              必填
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {param.description}
                        </p>
                        {param.example && (
                          <div className="mt-1">
                            <span className="text-xs text-gray-500">範例:</span>
                            <code className="text-xs text-green-400">
                              {JSON.stringify(param.example)}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">無參數</p>
            )}
          </div>

          {/* Test Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              測試 API
            </h4>

            {/* Input */}
            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-2">
                請求參數 (JSON)
              </label>
              <textarea
                value={testParams}
                onChange={(e) => setTestParams(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm transition-all duration-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400 font-mono"
                rows={6}
                placeholder='{"param": "value"}'
              />
            </div>

            {/* Test Button */}
            <button
              onClick={handleTest}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                  <span>測試中...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>執行測試</span>
                </span>
              )}
            </button>
          </div>

          {/* Tabs for Response / Errors / Code Examples */}
          {(response || error || api.errorResponses) && (
            <div>
              {/* Tab Headers */}
              <div className="flex space-x-2 border-b border-gray-700 mb-4">
                <button
                  onClick={() => setActiveTab("response")}
                  className={`px-4 py-2 text-sm font-semibold transition ${activeTab === "response"
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  {error ? "❌ 錯誤" : "✅ 回應"}
                </button>
                {/* {api.errorResponses && api.errorResponses.length > 0 && (
                  <button
                    onClick={() => setActiveTab("errors")}
                    className={`px-4 py-2 text-sm font-semibold transition ${
                      activeTab === "errors"
                        ? "text-white border-b-2 border-red-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    錯誤範例
                  </button>
                )} */}
              </div>

              {/* Tab Content */}
              <div>
                {/* Response Tab */}
                {activeTab === "response" && (
                  <div>
                    {response || error ? (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${error ? "bg-red-500" : "bg-green-500"}`}
                          ></span>
                          {error ? "測試結果（錯誤）" : "測試結果（成功）"}
                        </h4>
                        <div
                          className={`bg-gray-900 border rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed ${error ? "border-red-500/50 bg-red-900/20" : "border-green-500/50 bg-green-900/20"}`}
                        >
                          <pre
                            className={
                              error ? "text-red-300" : "text-green-300"
                            }
                          >
                            {error
                              ? JSON.stringify(error, null, 2)
                              : JSON.stringify(response, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          成功回應範例
                        </h4>
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                          <pre className="text-gray-300">
                            {JSON.stringify(api.exampleResponse, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Errors Tab */}
                {/* {activeTab === "errors" && api.errorResponses && (
                  <div className="space-y-4">
                    {api.errorResponses.map((errResp, idx) => (
                      <div
                        key={idx}
                        className="bg-red-900/20 border border-red-500/50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="inline-block px-2 py-1 text-xs font-bold bg-red-500 text-white rounded mr-2">
                              {errResp.status}
                            </span>
                            <span className="text-sm font-semibold text-red-300">
                              {errResp.code}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">
                          {errResp.message}
                        </p>
                        <div className="bg-gray-900 border border-red-500/30 rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                          <pre className="text-red-300 text-xs">
                            {JSON.stringify(errResp.example, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
