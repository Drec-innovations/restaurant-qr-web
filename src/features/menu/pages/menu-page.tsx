import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RestaurantMenu } from "../types/menu";
import { getMenu } from "../api/get-menu";
import MenuItemCard from "@/features/menu/components/menu-item-card";
import { useCart } from "@/features/cart/context/context-cart";

export default function MenuPage() {
  const { total, totalItems } = useCart();
  const { slug } = useParams();
  const [data, setData] = useState<RestaurantMenu | null>(null);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
}
