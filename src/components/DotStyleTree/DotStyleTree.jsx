import DotStyleTreeNode from "@/components/DotStyleTree/DotStyleTreeNode";

const DotStyleTree = ({ data, branchesStyle = "", groupStyle = "" }) => {
  return (
    <div className="space-y-4">
      {data.map((group) => (
        <div key={group.id} className={branchesStyle.trim()}>
          <h3 className={`text-h6 flex ${groupStyle}`.trim()}>
            {group.groupIcon && (
              <img src={group.groupIcon} alt={group.group} className="mr-2" />
            )}
            {group.group}：
          </h3>
          <DotStyleTreeNode
            items={group.tree}
            parentNode="content"
            childNode="details"
          />
        </div>
      ))}
    </div>
  );
};

export default DotStyleTree;
