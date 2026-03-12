import { FundraisingTiersEditor } from "@/components/ProjectCreate/FundraisingTiersEditor";

export function FundraisingTierSetting() {
  return (
    <div className="border border-neutral-300 rounded-xl">
      <div
        className="rounded-t-xl py-5 px-6"
        style={{ background: "var(--section-header-bg)" }}
      >
        <h2 className="text-neutral-700 text-h3 mb-1">贊助方案</h2>
        <p className="text-neutral-700 text-text3">贊助方案包設計</p>
      </div>
      <div className="py-7 px-3 lg:py-10 lg:px-6">
        <FundraisingTiersEditor />
      </div>
    </div>
  );
}
