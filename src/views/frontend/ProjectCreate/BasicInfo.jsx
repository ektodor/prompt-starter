import { BasicInfoEditor } from "@/components/ProjectCreate/BasicInfoEditor";

export function BasicInfo() {
  return (
    <div className="border border-neutral-300 rounded-xl">
      <div
        className="rounded-t-xl py-5 px-6"
        style={{ background: "var(--section-header-bg)" }}
      >
        <h2 className="text-neutral-700 text-h3 mb-1">基本資訊</h2>
        <p className="text-neutral-700 text-text3">專案標題和分類</p>
      </div>

      <div className="py-7 px-3 lg:py-10 lg:px-6">
        <BasicInfoEditor />
      </div>
    </div>
  );
}
