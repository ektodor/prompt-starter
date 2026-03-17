const getOrder = (item) => item?.display_order ?? Number.MAX_SAFE_INTEGER;

const sortByOrder = (a, b) => getOrder(a) - getOrder(b);

export const sortListByOrder = (list = []) => list.slice().sort(sortByOrder);
