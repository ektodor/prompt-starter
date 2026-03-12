import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { useProjectCreateStepNavigation } from "@/hooks/useProjectCreateStepNavigation";

const topics = [
  { id: "1", desc: "寫作工具" },
  { id: "2", desc: "設計創作" },
  { id: "3", desc: "商業應用" },
  { id: "4", desc: "程式開發" },
  { id: "5", desc: "教育學習" },
  { id: "6", desc: "生活應用" },
  { id: "7", desc: "娛樂遊戲" },
  { id: "8", desc: "其他" },
];

const tagOptions = [
  { id: "1", desc: "議題" },
  { id: "2", desc: "遊戲" },
  { id: "3", desc: "公益" },
  { id: "4", desc: "環境保育" },
  { id: "5", desc: "音樂" },
  { id: "6", desc: "動物" },
  { id: "7", desc: "出版" },
];

function BasicInfoFields({ openDropdown, setOpenDropdown, dropdownRef }) {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const description = watch("basicInfo.description", "");
  const selectedTopics = watch("basicInfo.topics", []);
  const selectedTags = watch("basicInfo.tags", []);

  const toggleTopic = (id) => {
    const updated = selectedTopics.includes(id)
      ? selectedTopics.filter((t) => t !== id)
      : [...selectedTopics, id];

    setValue("basicInfo.topics", updated, { shouldValidate: true });

    if (updated.length) {
      clearErrors("basicInfo.topics");
    }
  };

  const toggleTag = (id) => {
    let updated;

    if (selectedTags.includes(id)) {
      updated = selectedTags.filter((t) => t !== id);
    } else {
      if (selectedTags.length >= 3) return;
      updated = [...selectedTags, id];
    }

    setValue("basicInfo.tags", updated, { shouldValidate: true });
  };

  return (
    <>
      <div className="mb-6 lg:mb-7">
        <label htmlFor="title" className="text-neutral-900 text-h6">
          專案標題 <span className="text-primary-400">*</span>
        </label>
        <input
          id="title"
          {...register("basicInfo.title", {
            required: "請輸入專案標題",
            minLength: {
              value: 10,
              message: "建議至少 10 個字元",
            },
            maxLength: {
              value: 30,
              message: "建議不要超過 30 個字元",
            },
          })}
          placeholder="為你的 AI Prompt 專案想個吸引人的名稱"
          className="mt-2 w-full border border-neutral-300 rounded-sm px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
        <p className="text-text4 text-neutral-500 mt-1">建議10-30個字元</p>
        {errors.basicInfo?.title && (
          <p className="text-text4 text-primary-400 mt-1">
            {errors.basicInfo.title.message}
          </p>
        )}
      </div>

      <div className="mb-6 lg:mb-7">
        <p className="text-neutral-700 text-h6">
          專案主題 <span className="text-primary-400">*</span>
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 lg:grid-cols-4">
          {topics.map((topic) => {
            const selected = selectedTopics.includes(topic.id);

            return (
              <label
                key={topic.id}
                className={`flex items-center justify-center rounded-xl py-[14.5px] border cursor-pointer transition text-h6 ${
                  selected
                    ? "border-primary-400 text-primary-400"
                    : "border-neutral-300 text-neutral-700"
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selected}
                  onChange={() => toggleTopic(topic.id)}
                />
                {selected && <span className="mr-2">✓</span>}
                {topic.desc}
              </label>
            );
          })}
        </div>

        {errors.basicInfo?.topics && (
          <p className="text-text4 text-primary-400 mt-1">
            {errors.basicInfo.topics.message}
          </p>
        )}
      </div>

      <div className="mb-6 lg:mb-7">
        <label htmlFor="description" className="text-neutral-700 text-h6">
          簡短描述 <span className="text-primary-400">*</span>
        </label>
        <textarea
          id="description"
          {...register("basicInfo.description", {
            required: "請輸入簡短描述",
            maxLength: {
              value: 100,
              message: "最多 100 字",
            },
          })}
          placeholder="用一段簡潔的描述敘述你的 AI Prompt，能夠提供解決的問題"
          className="mt-2 w-full border border-neutral-300 rounded-sm px-3 py-2 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />
        <div className="text-right text-sm text-gray-400">
          {description.length} / 100
        </div>
        {errors.basicInfo?.description && (
          <p className="text-text4 text-primary-400 mt-1">
            {errors.basicInfo.description.message}
          </p>
        )}
      </div>

      <div className="mb-6 lg:mb-7">
        <p className="text-neutral-900 text-h6">
          標籤分類（請選擇 1-3 個最符合的分類）
        </p>

        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setOpenDropdown(!openDropdown)}
            className="mt-2 border border-neutral-300 rounded-sm p-2 flex flex-wrap gap-1 cursor-pointer bg-neutral-0 min-h-11"
          >
            {selectedTags.length === 0 && (
              <span className="text-neutral-400">請選擇標籤</span>
            )}

            {selectedTags.map((id) => {
              const tag = tagOptions.find((t) => t.id === id);
              return (
                <span
                  key={id}
                  className="bg-secondary-100 text-text3 text-neutral-700 px-3 py-1 rounded-xl"
                >
                  {tag?.desc}
                </span>
              );
            })}
          </div>

          {openDropdown && (
            <div className="absolute mt-2 w-full bg-neutral-0 border border-neutral-300 rounded-sm shadow max-h-48 overflow-y-auto z-10">
              {tagOptions.map((tag) => {
                const selected = selectedTags.includes(tag.id);
                const disabled = !selected && selectedTags.length >= 3;

                return (
                  <label
                    key={tag.id}
                    className={`
                      flex items-center gap-3 px-3 py-2
                      transition-colors duration-150 border border-neutral-100
                      ${selected ? "bg-secondary-100" : ""}
                      ${!disabled ? "hover:bg-yellow-50 cursor-pointer" : ""}
                      ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={disabled}
                      onChange={() => !disabled && toggleTag(tag.id)}
                      className="hidden"
                    />

                    <div className="w-5 h-5 flex items-center justify-center border border-neutral-700 rounded transition-all duration-150">
                      {selected && (
                        <svg
                          className="w-3 h-3 text-neutral-700"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>

                    <span className="text-text3 text-neutral-700">
                      {tag.desc}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function BasicInfoEditor() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { handleSubmit, setError, watch, trigger } = useFormContext();
  const { goNext } = useProjectCreateStepNavigation();

  const onSubmit = async () => {
    const isValid = await trigger(["basicInfo.title", "basicInfo.description"]);

    const topics = watch("basicInfo.topics", []);

    if (!topics.length) {
      setError("basicInfo.topics", {
        type: "required",
        message: "請至少選擇一個專案主題",
      });
      return;
    }

    if (!isValid) return;

    goNext();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BasicInfoFields
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        dropdownRef={dropdownRef}
      />

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
