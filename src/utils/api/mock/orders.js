import {
  mockProfiles,
  mockProjects,
  mockRewardTiers,
  mockOrders,
  mockSupabaseResponse,
  mockDelay,
  findById,
} from "./mockData.js";
export const createOrder = async (orderData, userId) => {
  await mockDelay();

  const newOrder = {
    id: "mock-" + Date.now(),
    ...orderData,
    user_id: userId,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return mockSupabaseResponse(newOrder);
};

export const getOrdersByUser = async (userId, filters = {}) => {
  await mockDelay();

  let orders = mockOrders.filter((o) => o.user_id === userId);

  if (filters.status) {
    orders = orders.filter((o) => o.status === filters.status);
  }

  orders = orders.map((o) => ({
    ...o,
    project: findById(mockProjects, o.project_id),
    reward_tier: findById(mockRewardTiers, o.reward_tier_id),
  }));

  return mockSupabaseResponse(orders);
};

export const getOrdersByProject = async (projectId, filters = {}) => {
  await mockDelay();

  let orders = mockOrders.filter((o) => o.project_id === projectId);

  if (filters.status) {
    orders = orders.filter((o) => o.status === filters.status);
  }

  orders = orders.map((o) => ({
    ...o,
    user: findById(mockProfiles, o.user_id),
    reward_tier: findById(mockRewardTiers, o.reward_tier_id),
  }));

  return mockSupabaseResponse(orders);
};

export const getOrderById = async (id) => {
  await mockDelay();

  const order = findById(mockOrders, id);
  if (!order) {
    return mockSupabaseResponse(null, { message: "Order not found" });
  }

  return mockSupabaseResponse({
    ...order,
    project: findById(mockProjects, order.project_id),
    reward_tier: findById(mockRewardTiers, order.reward_tier_id),
    user: findById(mockProfiles, order.user_id),
  });
};

export const updateOrderStatus = async (id, status) => {
  await mockDelay();

  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Order not found" });
  }

  const updates = { status, updated_at: new Date().toISOString() };
  if (status === "paid") {
    updates.paid_at = new Date().toISOString();
  }

  mockOrders[index] = { ...mockOrders[index], ...updates };
  return mockSupabaseResponse(mockOrders[index]);
};

export const updateOrderShipping = async (id, shippingInfo) => {
  await mockDelay();

  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Order not found" });
  }

  mockOrders[index] = {
    ...mockOrders[index],
    shipping_name: shippingInfo.name,
    shipping_email: shippingInfo.email,
    shipping_phone: shippingInfo.phone,
    shipping_address: shippingInfo.address,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockOrders[index]);
};

export const updateOrderNote = async (id, note) => {
  await mockDelay();

  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Order not found" });
  }

  mockOrders[index] = {
    ...mockOrders[index],
    note,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockOrders[index]);
};

export const updateInvoiceCarrier = async (id, invoiceCarrier) => {
  await mockDelay();

  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Order not found" });
  }

  mockOrders[index] = {
    ...mockOrders[index],
    invoice_carrier: invoiceCarrier,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockOrders[index]);
};

export const updateOrderDetails = async (id, updates) => {
  await mockDelay();

  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) {
    return mockSupabaseResponse(null, { message: "Order not found" });
  }

  mockOrders[index] = {
    ...mockOrders[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  return mockSupabaseResponse(mockOrders[index]);
};

export const cancelOrder = async (id) => {
  return updateOrderStatus(id, "cancelled");
};

export const getOrderStats = async (projectId) => {
  await mockDelay();

  const orders = mockOrders.filter((o) => o.project_id === projectId);

  const stats = {
    totalOrders: orders.length,
    paidOrders: orders.filter((o) => o.status === "paid").length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalRevenue: orders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + parseFloat(o.amount), 0),
  };

  return mockSupabaseResponse(stats);
};
