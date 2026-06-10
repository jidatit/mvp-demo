import { get, set, STORAGE_KEYS } from "../storage";
import { mockDelay } from "../utils";

type NotificationStore = Record<string, any[]>;

function getStore(): NotificationStore {
  return get(STORAGE_KEYS.NOTIFICATIONS, {});
}

function saveStore(store: NotificationStore) {
  set(STORAGE_KEYS.NOTIFICATIONS, store);
}

export async function mockGetNotifications(
  userId: string,
  params: {
    limit?: number;
    offset?: number;
    entityType?: string;
    isRead?: boolean;
  }
) {
  await mockDelay();
  const limit = params.limit ?? 10;
  const offset = params.offset ?? 0;
  let items = getStore()[userId] ?? [];
  if (params.entityType) {
    items = items.filter((n) => n.entityType === params.entityType);
  }
  if (params.isRead !== undefined) {
    items = items.filter((n) => n.isRead === params.isRead);
  }
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  return {
    data: items.slice(offset, offset + limit),
    totalItems,
    totalPages,
  };
}

export async function mockGetUnreadCount(userId: string) {
  await mockDelay();
  const items = getStore()[userId] ?? [];
  return { unreadCount: items.filter((n) => !n.isRead).length };
}

export async function mockMarkNotificationRead(
  userId: string,
  notificationId: string
) {
  await mockDelay();
  const store = getStore();
  store[userId] = (store[userId] ?? []).map((n) =>
    n.id === notificationId ? { ...n, isRead: true } : n
  );
  saveStore(store);
}

export async function mockMarkAllNotificationsRead(userId: string) {
  await mockDelay();
  const store = getStore();
  store[userId] = (store[userId] ?? []).map((n) => ({ ...n, isRead: true }));
  saveStore(store);
}

export async function mockDeleteNotification(
  userId: string,
  notificationId: string
) {
  await mockDelay();
  const store = getStore();
  store[userId] = (store[userId] ?? []).filter((n) => n.id !== notificationId);
  saveStore(store);
}
