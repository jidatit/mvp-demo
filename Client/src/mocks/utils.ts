import Cookies from "js-cookie";

export const mockDelay = () =>
  new Promise<void>((resolve) =>
    setTimeout(resolve, Math.random() * 200 + 200)
  );

export const DEMO_PDF_URL = "/assets/demo-document.pdf";

export function getCurrentUserId(): string | null {
  const token = Cookies.get("authToken");
  if (!token?.startsWith("mock.")) return null;
  const parts = token.split(".");
  return parts[1] ?? null;
}

export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): { data: T[]; totalItems: number; totalPages: number } {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    totalItems,
    totalPages,
  };
}
