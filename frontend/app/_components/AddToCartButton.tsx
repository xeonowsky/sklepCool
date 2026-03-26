"use client"

type Product={
    id:number;
    name:string;
    price:number;
};

export default function AddToCartButton({ product }: { product: Product }) {

  const addToCart = async () => {
    await fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", 
      body: JSON.stringify(product)
    });
  };

  return (
    <button onClick={addToCart}>
      Dodaj do koszyka
    </button>
  );
}