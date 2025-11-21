import { api_url } from "./ApiClient";

// Cart Types
export interface CartItem {
  _id: string;
  product: {
    _id: string;
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    variants: Array<{
      color: string;
      sizes: Array<{
        name: string;
        quantity: number;
      }>;
    }>;
    totalStock: number;
    isActive: boolean;
  };
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  sessionId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isActive: boolean;
}

// 1. POST /cart - Create Cart (أول مرة)
export const createCart = async (): Promise<Cart> => {
  const response = await fetch(`${api_url}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result.data;
};

// 2. POST /cart/{sessionId}/items - Add Item to Cart
export const addToCart = async (
  sessionId: string,
  item: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }
): Promise<Cart> => {
  const response = await fetch(`${api_url}/cart/${sessionId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const result = await response.json();
  return result.data;
};

// 3. GET /cart/{sessionId} - Get Cart Details
export const getCart = async (sessionId: string): Promise<Cart> => {
  const response = await fetch(`${api_url}/cart/${sessionId}`);
  const result = await response.json();
  return result.data;
};

// 4. PUT /cart/{sessionId}/items/{itemId} - Edit Cart Item
export const updateCartItem = async (
  sessionId: string,
  itemId: string,
  updates: {
    quantity?: number;
    size?: string;
    color?: string;
  }
): Promise<Cart> => {
  const response = await fetch(`${api_url}/cart/${sessionId}/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  const result = await response.json();
  return result.data;
};

// 5. DELETE /cart/{sessionId}/items/{itemId} - Delete Cart Item
export const deleteCartItem = async (
  sessionId: string,
  itemId: string
): Promise<Cart> => {
  const response = await fetch(`${api_url}/cart/${sessionId}/items/${itemId}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result.data;
};

// Helper: Get or Create Session ID
export const getSessionId = async (): Promise<string> => {
  let sessionId = localStorage.getItem("cartSessionId");

  if (!sessionId) {
    const cart = await createCart();
    sessionId = cart.sessionId;
    localStorage.setItem("cartSessionId", sessionId);
  }

  return sessionId;
};
