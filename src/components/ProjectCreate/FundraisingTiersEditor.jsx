import { useMemo, useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Trash2 } from "lucide-react";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { FundraisingTierEditor } from "./FundraisingTierEditor";
import { useProjectCreateStepNavigation } from "@/hooks/useProjectCreateStepNavigation";

function JsonDebugPanel({ data, activeIndex, copied, onCopy }) {
  const [open, setOpen] = useState(true);

  const preview = data?.fundraisingTier?.pricingCard
    ? { pricingCard: data.fundraisingTier.pricingCard?.[activeIndex] ?? null }
    : { pricingCard: null };

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

            <div className="text-text4 font-semibold">
              JSON Debug
              <span className="ml-2 text-xs text-neutral-0/60">
                (Package {(activeIndex ?? 0) + 1})
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onCopy(preview)}
            className="text-text4 text-neutral-600 px-3 py-1 rounded bg-secondary-200 hover:bg-secondary-100"
          >
            {copied ? "已複製 ✓" : "複製 JSON"}
          </button>
        </div>

        {open && (
          <div className="bg-neutral-800 text-secondary-400 text-xs p-3 overflow-auto max-h-[45vh]">
            <pre>{JSON.stringify(preview, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const newPricingCard = () => ({
  id: uuidv4(),
  cardImg: "",
  imgAlt: "",
  title: "",
  subtitle: "",
  sellingPrice: 0,
  listPrice: 0,
  sponsorshipsAvailable: 0,
  packageContents: [],
  recommendedTo: "",
  emphasizeContent: [],
  estimatedDelivery: "",
});

function LeftTierList({
  fields,
  activeIndex,
  setActiveIndex,
  onAppend,
  onRemove,
  pricingCard = [],
}) {
  return (
    <div className="bg-neutral-0 border rounded-xl p-4 space-y-3 lg:col-span-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Packages</h3>
        <button
          type="button"
          onClick={onAppend}
          className="text-text4 px-3 py-1 rounded bg-primary-600 text-neutral-0"
        >
          + 新增
        </button>
      </div>

      <div className="space-y-2">
        {fields.length === 0 && (
          <div className="rounded-lg border border-dashed p-4 text-text4 text-neutral-500">
            目前沒有方案，請先新增一筆。
          </div>
        )}

        {fields.map((item, idx) => {
          const tier = pricingCard?.[idx];

          return (
            <div
              key={item.fieldId}
              className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer ${
                idx === activeIndex
                  ? "border-secondary-500 bg-secondary-200"
                  : ""
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="min-w-0">
                <div className="font-semibold truncate">
                  {tier?.title?.trim() || `未命名方案 ${idx + 1}`}
                </div>

                <div className="text-xs text-neutral-500 space-y-0.5">
                  <div>
                    募資價：NT$
                    {Number(tier?.sellingPrice || 0).toLocaleString()}
                  </div>
                  <div>
                    名額上限：
                    {Number(
                      tier?.sponsorshipsAvailable || 0,
                    ).toLocaleString()}{" "}
                    人
                  </div>
                  <div>內容群組：{tier?.packageContents?.length || 0} 組</div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(idx);
                }}
                className="p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FundraisingTiersEditor() {
  const [copied, setCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { goNext } = useProjectCreateStepNavigation();

  const { control, handleSubmit } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fundraisingTier.pricingCard",
    keyName: "fieldId",
  });

  const pricingCard = useWatch({
    control,
    name: "fundraisingTier.pricingCard",
  });

  const safeActiveIndex = useMemo(() => {
    if (!fields.length) return null;
    if (activeIndex < 0) return 0;
    if (activeIndex > fields.length - 1) return fields.length - 1;
    return activeIndex;
  }, [activeIndex, fields.length]);

  const data = useMemo(
    () => ({
      fundraisingTier: {
        pricingCard: pricingCard ?? [],
      },
    }),
    [pricingCard],
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

  const handleAppend = () => {
    append(newPricingCard());
    setActiveIndex(fields.length);
  };

  const handleRemove = (idx) => {
    const currentLength = fields.length;
    remove(idx);

    if (currentLength <= 1) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((prev) => {
      const nextLength = currentLength - 1;
      if (prev > idx) return prev - 1;
      if (prev === idx) return Math.min(idx, nextLength - 1);
      return prev;
    });
  };

  const onSubmit = async () => {
    goNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
          <LeftTierList
            fields={fields}
            activeIndex={safeActiveIndex ?? 0}
            setActiveIndex={setActiveIndex}
            onAppend={handleAppend}
            onRemove={handleRemove}
            pricingCard={pricingCard}
          />

          <div className="bg-neutral-0 border rounded-xl p-6 lg:col-span-8">
            {safeActiveIndex !== null && fields[safeActiveIndex] ? (
              <FundraisingTierEditor
                key={fields[safeActiveIndex].fieldId}
                tierIndex={safeActiveIndex}
              />
            ) : (
              <div className="text-neutral-500">
                目前沒有方案，請先新增一筆。
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 lg:mt-7">
          <div className="flex justify-end">
            <ButtonComponent
              htmlType="submit"
              size="lg"
              style="flex-1 lg:flex-initial"
            >
              下一步
            </ButtonComponent>
          </div>
        </div>
      </form>

      <div className="hidden lg:block">
        <JsonDebugPanel
          data={data}
          activeIndex={safeActiveIndex ?? 0}
          copied={copied}
          onCopy={handleCopyJson}
        />
      </div>
    </>
  );
}
