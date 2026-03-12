import { NavLink, useLocation } from "react-router";

const steps = [
  { title: "基本資訊", desc: "專案標題和分類", path: "" },
  { title: "專案內容", desc: "詳細規劃和簡報", path: "content" },
  { title: "募資設定", desc: "目標金額和時程", path: "crowdfunding" },
  { title: "贊助方案", desc: "贊助方案包設計", path: "fundraising-tier" },
  { title: "風險挑戰", desc: "最終確認", path: "risk-challenge" },
];

export function Sidebar() {
  const location = useLocation();

  const currentIndex = steps.findIndex((step) => {
    const stepPath = step.path
      ? `/project-create/${step.path}`
      : "/project-create";
    return location.pathname === stepPath;
  });

  return (
    <div className="bg-neutral-0 flex gap-2 lg:py-6 lg:flex-col">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <NavLink
            key={step.path}
            to={step.path}
            className={`
              flex flex-col items-center gap-2 py-1 px-2 mb-3
              transition-all duration-200
              ${isActive ? "border-b-2 border-primary-400 lg:bg-primary-100" : "lg:hover:bg-neutral-200"} lg:flex-row lg:gap-3 lg:py-3 lg:px-4 lg:rounded-xl lg:border-none
            `}
          >
            <div
              className={`
                w-8 h-8 flex items-center justify-center
                rounded-full text-text3
                ${
                  isCompleted
                    ? "bg-primary-100 text-neutral-0"
                    : isActive
                      ? "bg-primary-400 text-neutral-0"
                      : "bg-neutral-300 text-neutral-900"
                }
              `}
            >
              {isCompleted ? "✓" : index + 1}
            </div>

            <div>
              <div className="text-text5 text-neutral-900 text-center lg:text-h6 lg:text-start">
                {step.title}
              </div>
              <div className="hidden text-text4 text-neutral-700 lg:block">
                {step.desc}
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
