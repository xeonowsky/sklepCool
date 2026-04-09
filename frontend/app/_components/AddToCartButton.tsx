"use client";

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function AddToCartButton({ product }: { product: Product }) {

  const addToCart = async () => {
    await fetch(`http://localhost:8080/api/v1/cart/${product.id}`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <button onClick={addToCart}>
      Dodaj do koszyka
    </button>
  );
}