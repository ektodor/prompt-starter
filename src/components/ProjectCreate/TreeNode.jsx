import { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Plus, ChevronRight, ChevronDown } from "lucide-react";

function createEmptyNode() {
  return {
    id: uuidv4(),
    content: "",
    details: [],
  };
}

export function TreeNode({
  nestIndex,
  level = 0,
  siblingLabel = "新增同層項目",
}) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  const hasNodes = fields.length > 0;

  return (
    <div className="space-y-3">
      {hasNodes
        ? fields.map((field, index) => (
            <CollapsibleTreeNodeItem
              key={field.fieldId}
              nestIndex={nestIndex}
              index={index}
              level={level}
              onRemove={() => remove(index)}
            />
          ))
        : level === 0 && (
            <div className="rounded-md border border-dashed border-neutral-300 px-3 py-4 text-text4 text-neutral-500">
              目前尚無項目
            </div>
          )}

      <button
        type="button"
        onClick={() => append(createEmptyNode())}
        className="inline-flex items-center gap-1 text-text4 text-primary-400 hover:text-primary-500 transition"
      >
        <Plus size={14} />
        {siblingLabel}
      </button>
    </div>
  );
}

function CollapsibleTreeNodeItem({ nestIndex, index, level, onRemove }) {
  const { control, register } = useFormContext();

  const currentPath = `${nestIndex}.${index}`;
  const childPath = `${currentPath}.details`;

  const children =
    useWatch({
      control,
      name: childPath,
    }) || [];

  const childCount = children.length;
  const hasChildren = childCount > 0;

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={[
        "space-y-3 rounded-md border p-3",
        level === 0
          ? "bg-white border-neutral-200"
          : "bg-neutral-50 border-neutral-200",
      ].join(" ")}
    >
      <div className="flex gap-2 items-start">
        <button
          type="button"
          onClick={() => hasChildren && setIsOpen((prev) => !prev)}
          disabled={!hasChildren}
          className={`mt-1 p-0.5 rounded transition ${
            hasChildren
              ? "text-neutral-500 hover:text-neutral-700"
              : "text-neutral-300 cursor-default"
          }`}
          aria-label={hasChildren ? (isOpen ? "收合" : "展開") : "無子項目"}
        >
          {isOpen && hasChildren ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <input type="hidden" {...register(`${currentPath}.id`)} />

        <input
          {...register(`${currentPath}.content`)}
          placeholder={level === 0 ? "請輸入項目內容" : "請輸入子項目內容"}
          className="w-full border rounded px-2 py-1 focus:outline-none focus:border-primary-400 focus:ring focus:ring-primary-400"
        />

        <button
          type="button"
          onClick={onRemove}
          className="mt-0.5 p-1.5 rounded-md text-neutral-400 hover:text-primary-500 hover:bg-primary-100/30 transition"
          aria-label="刪除"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <ChildBranch
        nestIndex={childPath}
        level={level}
        childCount={childCount}
        hasChildren={hasChildren}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
        onForceOpen={() => setIsOpen(true)}
      />
    </div>
  );
}

function ChildBranch({
  nestIndex,
  level,
  childCount,
  hasChildren,
  isOpen,
  onToggle,
  onForceOpen,
}) {
  const { control } = useFormContext();

  const { append } = useFieldArray({
    control,
    name: nestIndex,
    keyName: "fieldId",
  });

  const handleAddChild = () => {
    append(createEmptyNode());
    onForceOpen();
  };

  return (
    <>
      <div className="flex items-center justify-between pl-7">
        <div className="text-text4 text-neutral-500">
          {level === 0 ? "子項目" : `第 ${level + 1} 層子項目`}
          {hasChildren ? `（${childCount}）` : ""}
        </div>

        <div className="flex items-center gap-3">
          {hasChildren && (
            <button
              type="button"
              onClick={onToggle}
              className="text-text4 text-neutral-500 hover:text-neutral-700 transition"
            >
              {isOpen ? "收合" : "展開"}
            </button>
          )}

          <button
            type="button"
            onClick={handleAddChild}
            className="inline-flex items-center gap-1 text-text4 text-primary-400 hover:text-primary-500 transition"
          >
            <Plus size={14} />
            新增子項目
          </button>
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-7 border-l-2 border-neutral-200 pl-4">
          <TreeNode
            nestIndex={nestIndex}
            level={level + 1}
            siblingLabel="新增同層項目"
          />
        </div>
      )}
    </>
  );
}
