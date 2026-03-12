import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";
import { TreeNode } from "./TreeNode";

export function FundraisingTierEditor({ tierIndex }) {
  const { control, register } = useFormContext();

  const safeTierIndex = Number.isInteger(tierIndex) ? tierIndex : 0;

  const tier = useWatch({
    control,
    name: `fundraisingTier.pricingCard.${safeTierIndex}`,
  });

  const base = `fundraisingTier.pricingCard.${safeTierIndex}`;

  return (
    <div className="space-y-6">
      <div className="text-text4 text-neutral-500">
        Editing: {tier?.title?.trim() || `未命名方案 ${safeTierIndex + 1}`}
      </div>

      <div className="border rounded-xl p-4 space-y-4">
        <div className="space-y-1">
          <div className="font-semibold">基本資訊</div>
          <div className="text-text4 text-neutral-500">
            設定方案圖片、名稱與副標
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-8 space-y-2">
            <label className="block text-text4 font-medium text-neutral-700">
              方案圖片
            </label>
            <input
              {...register(`${base}.cardImg`)}
              placeholder="./images/productDetail/package-1.webp"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
            />
          </div>

          <div className="col-span-12 md:col-span-4 space-y-2">
            <label className="block text-text4 font-medium text-neutral-700">
              圖片替代文字
            </label>
            <input
              {...register(`${base}.imgAlt`)}
              placeholder="例如：入門探索方案圖"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-6 space-y-2">
            <label className="block text-text4 font-medium text-neutral-700">
              方案名稱
            </label>
            <input
              {...register(`${base}.title`)}
              placeholder="例如：入門探索方案"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
            />
          </div>

          <div className="col-span-12 md:col-span-6 space-y-2">
            <label className="block text-text4 font-medium text-neutral-700">
              副標
            </label>
            <input
              {...register(`${base}.subtitle`)}
              placeholder="例如：限量試玩價"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
            />
          </div>
        </div>
      </div>

      <PricingSection base={base} />
      <PackageContentsEditor nestIndex={`${base}.packageContents`} />

      <div className="border rounded-xl p-4 space-y-3">
        <div className="space-y-1">
          <div className="font-semibold">推薦對象</div>
          <div className="text-text4 text-neutral-500">
            說明這個方案適合哪些人
          </div>
        </div>

        <textarea
          {...register(`${base}.recommendedTo`)}
          placeholder="例如：想搶先體驗提示詞工具的新手創作者、小型品牌"
          className="w-full border rounded px-3 py-2 min-h-[90px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
      </div>

      <EmphasizeContentEditor nestIndex={`${base}.emphasizeContent`} />

      <div className="border rounded-xl p-4 space-y-3">
        <div className="space-y-1">
          <div className="font-semibold">預計交付資訊</div>
          <div className="text-text4 text-neutral-500">
            顯示此方案的預計交付時間
          </div>
        </div>

        <input
          {...register(`${base}.estimatedDelivery`)}
          placeholder="例如：2026 年 3 月初"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
      </div>
    </div>
  );
}

function PricingSection({ base }) {
  const { control, register } = useFormContext();

  const sellingPrice = useWatch({
    control,
    name: `${base}.sellingPrice`,
  });

  const listPrice = useWatch({
    control,
    name: `${base}.listPrice`,
  });

  const sponsorshipsAvailable = useWatch({
    control,
    name: `${base}.sponsorshipsAvailable`,
  });

  const hasValidPrices =
    Number(listPrice) > 0 &&
    Number(sellingPrice) > 0 &&
    Number(sellingPrice) <= Number(listPrice);

  const discountPercent = hasValidPrices
    ? Math.round((1 - Number(sellingPrice) / Number(listPrice)) * 100)
    : 0;

  return (
    <div className="border rounded-xl p-4 space-y-5">
      <div className="space-y-1">
        <div className="font-semibold">價格與名額設定</div>
        <div className="text-text4 text-neutral-500">
          設定此募資方案的售價、原價與可購買名額上限
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-text4 font-medium text-neutral-700">價格設定</div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-lg border p-3 space-y-2 bg-neutral-0">
            <label className="block text-text4 font-medium text-neutral-700">
              募資價格
            </label>
            <input
              type="number"
              min={0}
              {...register(`${base}.sellingPrice`, { valueAsNumber: true })}
              placeholder="例如 880"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
            />
            <div className="text-xs text-neutral-500">
              使用者實際購買此方案時支付的價格
            </div>
          </div>

          <div className="rounded-lg border p-3 space-y-2 bg-neutral-0">
            <label className="block text-text4 font-medium text-neutral-700">
              原價
            </label>
            <input
              type="number"
              min={0}
              {...register(`${base}.listPrice`, { valueAsNumber: true })}
              placeholder="例如 1480"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
            />
            <div className="text-xs text-neutral-500">
              用來對照募資優惠的原始價格
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-neutral-50 border px-3 py-3">
          <div className="grid grid-cols-1 gap-2 text-text4 md:grid-cols-3">
            <div>
              <div className="text-neutral-500">募資價格</div>
              <div className="font-semibold">
                NT$ {Number(sellingPrice || 0).toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-neutral-500">原價</div>
              <div className="font-semibold">
                NT$ {Number(listPrice || 0).toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-neutral-500">折扣</div>
              <div
                className={`font-semibold ${
                  hasValidPrices ? "text-primary-500" : "text-neutral-400"
                }`}
              >
                {hasValidPrices ? `${discountPercent}% OFF` : "請確認價格設定"}
              </div>
            </div>
          </div>

          {!hasValidPrices &&
            Number(listPrice) > 0 &&
            Number(sellingPrice) > Number(listPrice) && (
              <div className="mt-2 text-xs text-red-500">
                募資價格不應高於原價，請重新確認。
              </div>
            )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-text4 font-medium text-neutral-700">名額限制</div>

        <div className="rounded-lg border p-3 space-y-2 bg-neutral-0">
          <label className="block text-text4 font-medium text-neutral-700">
            可購買名額上限
          </label>
          <input
            type="number"
            min={0}
            {...register(`${base}.sponsorshipsAvailable`, {
              valueAsNumber: true,
            })}
            placeholder="例如 60"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
          />
          <div className="text-xs text-neutral-500">
            限制此募資方案最多可被購買的人數
          </div>
        </div>

        <div className="rounded-lg bg-neutral-50 border px-3 py-3 text-text4">
          <div className="text-neutral-500">目前名額上限</div>
          <div className="font-semibold">
            {Number(sponsorshipsAvailable || 0).toLocaleString()} 人
          </div>
        </div>
      </div>
    </div>
  );
}

/** packageContents: [{id,group,tree:TreeNode[]}] */
function PackageContentsEditor({ nestIndex }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Package Contents</div>
        <button
          type="button"
          onClick={() =>
            append({
              id: uuidv4(),
              group: "",
              tree: [],
            })
          }
          className="text-text4 text-primary-400"
        >
          + 新增群組
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((group, groupIndex) => {
          const groupPath = `${nestIndex}.${groupIndex}`;
          const treePath = `${groupPath}.tree`;

          return (
            <div key={group.fieldId} className="rounded border p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Group {groupIndex + 1}</div>
                <button
                  type="button"
                  onClick={() => remove(groupIndex)}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
                  aria-label="刪除"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <input type="hidden" {...register(`${groupPath}.id`)} />

              <input
                {...register(`${groupPath}.group`)}
                placeholder="group name"
                className="w-full border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
              />

              <div className="border rounded p-3">
                <div className="font-semibold mb-2">Tree</div>
                <TreeNode nestIndex={treePath} />
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-neutral-500">尚未新增任何群組</div>
        )}
      </div>
    </div>
  );
}

/** emphasizeContent: [{id,emoji,content}] */
function EmphasizeContentEditor({ nestIndex }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Emphasize Content</div>
        <button
          type="button"
          onClick={() =>
            append({
              id: uuidv4(),
              emoji: "✅",
              content: "",
            })
          }
          className="text-text4 text-primary-400"
        >
          + 新增重點
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((item, idx) => {
          const path = `${nestIndex}.${idx}`;
          return (
            <div key={item.fieldId} className="rounded border p-3 space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-text4">Item {idx + 1}</div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
                  aria-label="刪除"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <input type="hidden" {...register(`${path}.id`)} />

              <div className="grid grid-cols-12 gap-2">
                <input
                  {...register(`${path}.emoji`)}
                  placeholder="emoji"
                  className="col-span-2 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
                <textarea
                  {...register(`${path}.content`)}
                  placeholder="content"
                  className="col-span-10 border rounded px-2 py-1 min-h-[70px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-neutral-500">尚未新增重點內容</div>
        )}
      </div>
    </div>
  );
}
