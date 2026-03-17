const DotStyleTreeNode = ({
  items = [],
  parentNode = "content",
  childNode = "details",
}) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <ul className="space-y-1 pl-1">
      {items.map((item) => (
        <li
          key={item.id}
          className="relative pl-4 leading-[1.5] before:content-['・'] before:absolute before:left-0"
        >
          {item[parentNode]}
          {Array.isArray(item[childNode]) && item[childNode].length > 0 && (
            <DotStyleTreeNode
              items={item[childNode]}
              parentNode={parentNode}
              childNode={childNode}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default DotStyleTreeNode;
