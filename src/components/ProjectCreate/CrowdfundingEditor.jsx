import { useFormContext } from "react-hook-form";
import { CircleAlert } from "lucide-react";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { useProjectCreateStepNavigation } from "@/hooks/useProjectCreateStepNavigation";

const durationOptions = [
  { value: "45", label: "45 天" },
  { value: "60", label: "60 天" },
  { value: "90", label: "90 天" },
  { value: "120", label: "120 天" },
  { value: "150", label: "150 天" },
];

function CrowdfundingFields() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const schedule = watch("crowdfunding.schedule", "");

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-7">
        <div>
          <label htmlFor="fundingGoal" className="text-neutral-900 text-h6">
            募資目標 (NT$) <span className="text-primary-400">*</span>
          </label>

          <input
            id="fundingGoal"
            type="number"
            placeholder="請輸入募資目標"
            {...register("crowdfunding.fundingGoal", {
              required: "請輸入募資目標",
              min: {
                value: 1,
                message: "募資目標需大於 0",
              },
            })}
            className="mt-2 w-full border border-neutral-300 rounded-sm px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
          />

          <p className="text-text4 text-neutral-500 mt-1">
            請根據你計畫的需求，估算你所需要募集的金額。
          </p>

          {errors.crowdfunding?.fundingGoal && (
            <p className="text-text4 text-primary-400 mt-1">
              {errors.crowdfunding.fundingGoal.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="fundingDuration" className="text-neutral-900 text-h6">
            募資期間 (天) <span className="text-primary-400">*</span>
          </label>

          <select
            id="fundingDuration"
            {...register("crowdfunding.fundingDuration", {
              required: "請選擇募資期間",
            })}
            className="mt-2 w-full border border-neutral-300 rounded-sm px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400 bg-neutral-0"
          >
            <option value="">請選擇</option>
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <p className="text-text4 text-neutral-500 mt-1">
            計畫時間建議為期在 150 天內。
          </p>

          {errors.crowdfunding?.fundingDuration && (
            <p className="text-text4 text-primary-400 mt-1">
              {errors.crowdfunding.fundingDuration.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6 lg:mb-7 border border-neutral-300 rounded-xl px-4 py-4 lg:px-5 lg:py-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <div className="w-7 h-7 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-500">
              <CircleAlert size={16} />
            </div>
          </div>

          <div>
            <h3 className="text-neutral-900 text-h6 mb-2">募資小提醒</h3>

            <ul className="text-neutral-700 text-text3 space-y-1 list-disc pl-5">
              <li>募資採用「全有全無」模式，未達目標將全額退款。</li>
              <li>平台會收取 5% 的手續費（成功募資後）。</li>
              <li>建議目標金額包含製作成本、回饋成本和平台費用。</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-6 lg:mb-7">
        <label htmlFor="schedule" className="text-neutral-900 text-h6">
          時程規劃
        </label>

        <textarea
          id="schedule"
          rows={6}
          placeholder="說明專案交付時程與計畫"
          {...register("crowdfunding.schedule", {
            maxLength: {
              value: 500,
              message: "最多 500 字",
            },
          })}
          className="mt-2 w-full border border-neutral-300 rounded-xl px-3 py-3 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400 resize-none"
        />

        <div className="text-right text-sm text-gray-400 mt-1">
          {schedule.length} / 500
        </div>

        {errors.crowdfunding?.schedule && (
          <p className="text-text4 text-primary-400 mt-1">
            {errors.crowdfunding.schedule.message}
          </p>
        )}
      </div>
    </>
  );
}

export function CrowdfundingEditor() {
  const { handleSubmit, trigger } = useFormContext();
  const { goNext } = useProjectCreateStepNavigation();

  const onSubmit = async () => {
    const isValid = await trigger([
      "crowdfunding.fundingGoal",
      "crowdfunding.fundingDuration",
      "crowdfunding.schedule",
    ]);

    if (!isValid) return;

    goNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CrowdfundingFields />

      <div className="flex justify-end">
        <ButtonComponent
          htmlType="submit"
          size="lg"
          style="flex-1 lg:flex-initial"
        >
          下一步
        </ButtonComponent>
      </div>
    </form>
  );
}
