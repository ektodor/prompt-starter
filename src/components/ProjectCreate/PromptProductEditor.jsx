import { useFormContext, useWatch, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { TreeNode } from "./TreeNode";
import { Trash2 } from "lucide-react";

export function PromptProductEditor({ productIndex }) {
  const { control, register } = useFormContext();

  const safeProductIndex = Number.isInteger(productIndex) ? productIndex : 0;

  const product = useWatch({
    control,
    name: `contentInfo.products.${safeProductIndex}`,
  });

  const base = `contentInfo.products.${safeProductIndex}`;

  return (
    <div className="space-y-6">
      <div className="text-text4 text-neutral-500">
        Editing:{" "}
        {product?.title?.trim() || `未命名 Section ${safeProductIndex + 1}`}
      </div>

      <div className="border rounded p-3 space-y-2">
        <div className="font-semibold">Title</div>

        <input
          {...register(`${base}.title`)}
          placeholder="請輸入標題"
          className="w-full border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
      </div>

      <DetailsImgEditor nestIndex={`${base}.detailsImg`} />

      <ProductIntroductionEditor nestIndex={`${base}.productIntroduction`} />

      <ProductContentsEditor nestIndex={`${base}.productContents`} />

      <EmphasizeContentEditor nestIndex={`${base}.emphasizeContent`} />
    </div>
  );
}

/** detailsImg: [{id,img,alt}]，最多 4 */
function DetailsImgEditor({ nestIndex }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  const canAdd = fields.length < 4;

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Details Images (max 4)</div>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => append({ id: uuidv4(), img: "", alt: "" })}
          className={`text-text4 ${
            canAdd ? "text-primary-400" : "text-neutral-400 cursor-not-allowed"
          }`}
        >
          + 新增圖片
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, idx) => {
          const path = `${nestIndex}.${idx}`;

          return (
            <div
              key={field.fieldId}
              className="grid grid-cols-12 gap-2 items-center"
            >
              <input type="hidden" {...register(`${path}.id`)} />

              <input
                {...register(`${path}.img`)}
                placeholder="img path (e.g. ./images/xxx.webp)"
                className="col-span-7 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
              />
              <input
                {...register(`${path}.alt`)}
                placeholder="alt"
                className="col-span-4 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
                aria-label="刪除"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-neutral-500">尚未新增圖片</div>
        )}
      </div>
    </div>
  );
}

/** productIntroduction: [{id,introduction}] */
function ProductIntroductionEditor({ nestIndex }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Product Introduction</div>
        <button
          type="button"
          onClick={() => append({ id: uuidv4(), introduction: "" })}
          className="text-text4 text-primary-400"
        >
          + 新增段落
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, idx) => {
          const path = `${nestIndex}.${idx}`;

          return (
            <div key={field.fieldId} className="flex gap-2 items-start">
              <input type="hidden" {...register(`${path}.id`)} />

              <textarea
                {...register(`${path}.introduction`)}
                placeholder="introduction"
                className="w-full border rounded px-2 py-1 min-h-[80px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
              />

              <button
                type="button"
                onClick={() => remove(idx)}
                className="p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
                aria-label="刪除"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-neutral-500">尚未新增介紹段落</div>
        )}
      </div>
    </div>
  );
}

/** productContents: [{id,group,groupIcon,tree:TreeNode[]}] */
function ProductContentsEditor({ nestIndex }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Product Contents</div>
        <button
          type="button"
          onClick={() =>
            append({
              id: uuidv4(),
              group: "",
              groupIcon: "",
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

              <div className="grid grid-cols-12 gap-2">
                <input
                  {...register(`${groupPath}.group`)}
                  placeholder="group name (e.g. 模組亮點)"
                  className="col-span-6 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
                <input
                  {...register(`${groupPath}.groupIcon`)}
                  placeholder="groupIcon (e.g. ./icons/xxx.svg)"
                  className="col-span-6 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
              </div>

              <div className="border rounded p-3">
                <div className="font-semibold mb-2">Tree</div>
                <TreeNode nestIndex={treePath} />
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-gray-500">尚未新增任何群組</div>
        )}
      </div>
    </div>
  );
}

/** emphasizeContent: [{id,icon,iconAlt,emoji,content}] */
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
              icon: "",
              iconAlt: "",
              emoji: "👉",
              content: "",
            })
          }
          className="text-text4 text-primary-400"
        >
          + 新增重點
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, idx) => {
          const path = `${nestIndex}.${idx}`;

          return (
            <div key={field.fieldId} className="rounded border p-3 space-y-2">
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
                  placeholder="emoji (e.g. 👉)"
                  className="col-span-2 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
                <input
                  {...register(`${path}.icon`)}
                  placeholder="icon (optional)"
                  className="col-span-5 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
                <input
                  {...register(`${path}.iconAlt`)}
                  placeholder="iconAlt (optional)"
                  className="col-span-5 border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
              </div>

              <textarea
                {...register(`${path}.content`)}
                placeholder="content"
                className="w-full border rounded px-2 py-1 min-h-[70px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
              />
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-gray-500">尚未新增重點內容</div>
        )}
      </div>
    </div>
  );
}
