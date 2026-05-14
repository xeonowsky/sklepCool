"use client";

import { addToCartWithFeedback } from "../lib/guestCart";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  return (
    <button type="button" onClick={() => addToCartWithFeedback(product)}>
      Dodaj do koszyka
    </button>
  );
}