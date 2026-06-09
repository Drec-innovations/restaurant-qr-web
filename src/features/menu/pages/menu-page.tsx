import { useEffect, useState } from "react";
import type { RestaurantMenu } from "../types/menu";
import { useParams } from "react-router-dom";
import { getMenu } from "../api/get-menu";

export default function MenuPage() {
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
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{data.name}</h1>

      {data.categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <h2 className="text-xl font-semibold">{category.name}</h2>

          <div className="space-y-2">
            {category.menuItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-gray-500">{item.description}</p>
                  )}
                </div>

                <div className="font-semibold">K{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
