import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RestaurantMenu } from "../types/menu";
import { getMenu } from "../api/get-menu";
import MenuItemCard from "@/features/menu/components/menu-item-card";
import { useCart } from "@/features/cart/context/context-cart";
import { loadLencoScript } from "@/features/payments/lenco";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const { slug } = useParams();
  const [data, setData] = useState<RestaurantMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { items, total, clearCart, totalItems } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    await loadLencoScript();

    const reference = `order_${Date.now()}`;

    window.LencoPay.getPaid({
      key: import.meta.env.VITE_LENCO_PUBLIC_KEY,
      reference,
      email: "customer@demo.com",
      amount: total,
      currency: "ZMW",
      channels: ["card", "mobile-money"],

      customer: {
        firstName: "Guest",
        lastName: "User",
        phone: "0971111111",
      },

      onSuccess: async function (response: any) {
        const reference = response.reference;

        console.log("reference::", reference);

        const res = await fetch("http://localhost:3500/api/orders/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference,
            restaurantId: data?.id,
            items,
          }),
        });

        const result = await res.json();

        if (result.success) {
          clearCart();

          navigate("/order-success", {
            state: {
              order: result.order,
            },
          });
        } else {
          alert("Order could not be confirmed ❌");
          console.log(result);
        }
      },

      onClose: function () {
        console.log("Payment closed");
      },
    });
  };

  useEffect(() => {
    if (!slug) return;

    getMenu(slug)
      .then(setData)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="p-6">Loading menu...</div>;
  }

  if (!data) {
    return <div className="p-6">Menu not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">{data.name}</h1>

      {data.categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h2 className="text-lg font-semibold border-b pb-1">
            {category.name}
          </h2>

          <div className="space-y-3">
            {category.menuItems.map((item) => (
              <MenuItemCard
                id={item.id}
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-4 right-4 bg-black text-white p-3 rounded">
        Items: {totalItems} | Total: K{total}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black text-white p-3 rounded flex justify-between items-center">
          <div className="text-sm">
            {totalItems} items | K{total}
          </div>

          <button
            onClick={handleCheckout}
            className="bg-white text-black px-3 py-1 rounded text-sm"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
