import type { Product } from './product';

export const GUEST_CART_STORAGE_KEY = 'sklepcool_guest_cart_v1';
export const GUEST_CART_CHANGED_EVENT = 'sklepcool-guest-cart-changed';

export type GuestCartStoredLine = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  imageUrl?: string;
};

function isGuestLine(x: unknown): x is GuestCartStoredLine {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.productId === 'string' &&
    typeof o.quantity === 'number' &&
    Number.isFinite(o.quantity) &&
    o.quantity >= 1 &&
    typeof o.name === 'string' &&
    typeof o.price === 'number' &&
    Number.isFinite(o.price)
  );
}

function notifyGuestCartChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(GUEST_CART_CHANGED_EVENT));
  }
}

export function getGuestCartLines(): GuestCartStoredLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(GUEST_CART_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(isGuestLine);
  } catch {
    return [];
  }
}

function persist(lines: GuestCartStoredLine[]) {
  if (typeof window === 'undefined') return;
  if (lines.length === 0) {
    localStorage.removeItem(GUEST_CART_STORAGE_KEY);
  } else {
    localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(lines));
  }
  notifyGuestCartChanged();
}

export function setGuestCartLines(lines: GuestCartStoredLine[]) {
  persist(lines.filter((l) => l.quantity > 0));
}

export function clearGuestCart() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GUEST_CART_STORAGE_KEY);
  notifyGuestCartChanged();
}

export function guestCartItemCount(): number {
  return getGuestCartLines().reduce((sum, l) => sum + l.quantity, 0);
}

export function guestLinesToProducts(): Product[] {
  return getGuestCartLines().map((l) => ({
    id: l.productId,
    name: l.name,
    price: l.price,
    quantity: l.quantity,
    imageUrl: l.imageUrl,
  }));
}

export function addProductToGuestCart(product: {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}) {
  const lines = getGuestCartLines();
  const existing = lines.find((l) => l.productId === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    lines.push({
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }
  persist(lines);
}

export function removeProductFromGuestCart(productId: string) {
  setGuestCartLines(getGuestCartLines().filter((l) => l.productId !== productId));
}

export function updateGuestCartQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    removeProductFromGuestCart(productId);
    return;
  }
  const lines = getGuestCartLines();
  const line = lines.find((l) => l.productId === productId);
  if (!line) return;
  line.quantity = quantity;
  persist(lines);
}

/** Payload zgodny z `GuestCartDto` / `GuestCartItemDto` (camelCase). */
export function getGuestItemsForMerge(): { productId: string; quantity: number }[] {
  return getGuestCartLines().map((l) => ({
    productId: l.productId,
    quantity: l.quantity,
  }));
}

const API_BASE = 'http://localhost:8080/api/v1';

/** Minimalne dane produktu do POST na koszyk i zapisu linii gościa. */
export type CartProductPayload = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export type AddToCartOutcome =
  | { kind: 'server' }
  | { kind: 'guest' }
  | { kind: 'failed'; status: number }
  | { kind: 'network' };

/**
 * Dla zalogowanego: dodaje przez API.
 * Dla 401: dopisuje do koszyka gościa (localStorage) i zwraca `guest`.
 */
export async function addToCartLoggedOrGuest(product: CartProductPayload): Promise<AddToCartOutcome> {
  try {
    const res = await fetch(`${API_BASE}/cart/${product.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.ok) return { kind: 'server' };
    if (res.status === 401) {
      addProductToGuestCart(product);
      return { kind: 'guest' };
    }
    return { kind: 'failed', status: res.status };
  } catch (error) {
    console.error('Błąd dodawania do koszyka:', error);
    return { kind: 'network' };
  }
}

const ADD_TO_CART_ALERT = {
  logged: 'Dodano do koszyka!',
  guest: 'Dodano do koszyka (jako gość). Zaloguj się, aby zapisać koszyk na koncie.',
  failed: 'Nie udało się dodać produktu do koszyka.',
} as const;

export function showAddToCartFeedback(outcome: AddToCartOutcome): void {
  if (typeof window === 'undefined') return;
  switch (outcome.kind) {
    case 'server':
      alert(ADD_TO_CART_ALERT.logged);
      break;
    case 'guest':
      alert(ADD_TO_CART_ALERT.guest);
      break;
    default:
      alert(ADD_TO_CART_ALERT.failed);
  }
}

export async function addToCartWithFeedback(product: CartProductPayload): Promise<AddToCartOutcome> {
  const outcome = await addToCartLoggedOrGuest(product);
  showAddToCartFeedback(outcome);
  return outcome;
}

/** Zwraca `true`, jeśli nie było czego scalać albo merge się powiódł. */
export async function mergeGuestCartWithServer(): Promise<boolean> {
  const items = getGuestItemsForMerge();
  if (items.length === 0) return true;
  const res = await fetch(`${API_BASE}/cart/merge`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) return false;
  clearGuestCart();
  return true;
}
