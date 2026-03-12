import { useState, useMemo } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";

const STORAGE_KEY = "project-create-draft";

function JsonDebugPanel({ data, copied, onCopy }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-3 left-20 z-50 w-[520px] max-w-[90vw]">
      <div className="rounded-xl overflow-hidden shadow-lg border">
        <div className="flex items-center justify-between bg-neutral-900 text-neutral-0 px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-xs px-2 py-1 rounded bg-neutral-0/10 hover:bg-neutral-0/20"
            >
              {open ? "收合" : "展開"}
            </button>

            <div className="text-text4 font-semibold">JSON Debug</div>
          </div>

          <button
            type="button"
            onClick={() => onCopy(data)}
            className="text-text4 text-neutral-600 px-3 py-1 rounded bg-secondary-200 hover:bg-secondary-100"
          >
            {copied ? "已複製 ✓" : "複製 JSON"}
          </button>
        </div>

        {open && (
          <div className="bg-neutral-800 text-secondary-400 text-xs p-3 overflow-auto max-h-[45vh]">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const newElaborateItem = () => ({
  id: uuidv4(),
  title: "",
  rac: "",
  countermeasures: "",
});

function ElaborateEditor({ nestIndex }) {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  return (
    <div className="border rounded p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Risks & Challenges Items</div>
        <button
          type="button"
          onClick={() => append(newElaborateItem())}
          className="text-text4 text-primary-400"
        >
          + 新增風險項目
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, idx) => {
          const path = `${nestIndex}.${idx}`;

          return (
            <div key={field.fieldId} className="rounded border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Item {idx + 1}</div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <input type="hidden" {...register(`${path}.id`)} />

              <div>
                <div className="mb-1 text-sm font-medium text-neutral-600">
                  標題
                </div>
                <input
                  {...register(`${path}.title`)}
                  placeholder="title"
                  className="w-full border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <div className="mb-1 text-sm font-medium text-neutral-600">
                    風險說明（rac）
                  </div>
                  <textarea
                    {...register(`${path}.rac`)}
                    placeholder="請輸入風險內容"
                    className="w-full border rounded px-2 py-1 min-h-[100px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                  />
                </div>

                <div>
                  <div className="mb-1 text-sm font-medium text-neutral-600">
                    對應措施（countermeasures）
                  </div>
                  <textarea
                    {...register(`${path}.countermeasures`)}
                    placeholder="請輸入因應措施"
                    className="w-full border rounded px-2 py-1 min-h-[100px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-text3 text-neutral-500">
            尚未新增任何風險項目
          </div>
        )}
      </div>
    </div>
  );
}

function RisksAndChallengesForm() {
  const { control, register } = useFormContext();

  const elaborate = useWatch({
    control,
    name: "risksAndChallenges.elaborate",
  });

  return (
    <div className="space-y-6">
      <div className="text-text4 text-neutral-500">
        Editing: Risks & Challenges
      </div>

      <div className="border rounded p-3 space-y-2">
        <div className="font-semibold">Preface</div>
        <textarea
          {...register("risksAndChallenges.preface")}
          placeholder="請輸入前言"
          className="w-full border rounded px-2 py-1 min-h-[120px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
      </div>

      <ElaborateEditor nestIndex="risksAndChallenges.elaborate" />

      <div className="border rounded p-3 space-y-2">
        <div className="font-semibold">Disclosure</div>
        <textarea
          {...register("risksAndChallenges.disclosure")}
          placeholder="請輸入揭露聲明"
          className="w-full border rounded px-2 py-1 min-h-[120px] focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
      </div>

      <div className="border rounded p-3 bg-neutral-50">
        <div className="font-semibold mb-2">內容摘要</div>
        <div className="text-sm text-neutral-600 space-y-1">
          <div>風險項目數量：{elaborate?.length || 0}</div>
        </div>
      </div>
    </div>
  );
}

export function RisksAndChallengesEditor() {
  const [copied, setCopied] = useState(false);

  const { control, handleSubmit, getValues } = useFormContext();

  const risksAndChallenges = useWatch({
    control,
    name: "risksAndChallenges",
  });

  const allFormData = useWatch({ control });

  const data = useMemo(
    () => ({
      risksAndChallenges: risksAndChallenges ?? {
        preface: "",
        elaborate: [],
        disclosure: "",
      },
    }),
    [risksAndChallenges],
  );

  const handleCopyJson = async (payload = data) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const onSubmit = async () => {
    const values = getValues();

    console.log("全部表單資料:", values);

    // 這裡改成你的 API
    // await createProject(values);

    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="bg-neutral-0 border rounded-xl p-6">
            <RisksAndChallengesForm />
          </div>
        </div>

        <div className="mt-6 lg:mt-7">
          <div className="flex justify-end">
            <ButtonComponent
              htmlType="submit"
              size="lg"
              style="flex-1 lg:flex-initial"
            >
              提交審核
            </ButtonComponent>
          </div>
        </div>
      </form>

      <div className="hidden lg:block">
        <JsonDebugPanel
          data={allFormData}
          copied={copied}
          onCopy={handleCopyJson}
        />
      </div>
    </>
  );
}
