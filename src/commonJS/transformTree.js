import { sortListByOrder } from "./sort";

export const transformTree = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) return [];

  const sortedItems = sortListByOrder(items);

  const nodeMap = new Map();

  sortedItems.forEach((item) => {
    nodeMap.set(item.id, {
      id: item.id,
      content: item.content,
      details: [],
      parent_id: item.parent_id,
      display_order: item.display_order || 0,
    });
  });

  const roots = [];

  sortedItems.forEach((item) => {
    const node = nodeMap.get(item.id);

    if (item.parent_id && nodeMap.has(item.parent_id)) {
      nodeMap.get(item.parent_id).details.push(node);
    } else {
      roots.push(node);
    }
  });

  const normalizeTree = (nodes) =>
    nodes
      .sort((a, b) => a.display_order - b.display_order)
      .map((node) => ({
        id: node.id,
        content: node.content,
        details: normalizeTree(node.details),
      }));

  return normalizeTree(roots);
};
