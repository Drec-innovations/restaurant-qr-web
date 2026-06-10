import { useEffect, useState } from "react";
import { getMenu } from "@/features/menu/api/get-menu";
import type { RestaurantMenu } from "@/features/menu/types/menu";
import { createCategory } from "../api/create-category";
import { createMenuItem } from "../api/create-menu-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateMenuItemAvailability } from "../api/update-menu-item-availability";
import { toast } from "sonner";

const restaurantSlug = import.meta.env.VITE_RESTAURANT_SLUG;

export default function AdminMenuPage() {
  const [menu, setMenu] = useState<RestaurantMenu | null>(null);
  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  async function loadMenu() {
    setLoading(true);

    try {
      const data = await getMenu(restaurantSlug);
      setMenu(data);

      if (!selectedCategoryId && data.categories.length > 0) {
        setSelectedCategoryId(data.categories[0].id);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();

    if (!menu?.id) {
      toast.error("Restaurant menu was not found");
      return;
    }

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await createCategory(menu.id, categoryName.trim());

      toast.success("Category added successfully");

      setCategoryName("");
      await loadMenu();
    } catch (error) {
      toast.error("Failed to add category");
    }
  }

  async function handleCreateMenuItem(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCategoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!itemName.trim()) {
      toast.error("Item name is required");
      return;
    }

    if (!itemPrice.trim() || Number(itemPrice) <= 0) {
      toast.error("Enter a valid item price");
      return;
    }

    try {
      await createMenuItem(selectedCategoryId, {
        name: itemName.trim(),
        description: itemDescription.trim() || undefined,
        price: Number(itemPrice),
      });

      toast.success("Menu item added successfully");

      setItemName("");
      setItemDescription("");
      setItemPrice("");

      await loadMenu();
    } catch (error) {
      toast.error("Failed to add menu item");
    }
  }

  async function handleAvailabilityToggle(
    itemId: string,
    currentValue: boolean,
  ) {
    try {
      await updateMenuItemAvailability(itemId, !currentValue);

      toast.success(
        currentValue ? "Item marked as sold out" : "Item marked as available",
      );

      await loadMenu();
    } catch (error) {
      toast.error("Failed to update item availability");
    }
  }

  useEffect(() => {
    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !menu) {
    return <div className="p-6">Loading menu...</div>;
  }

  if (!menu) {
    return <div className="p-6">Menu not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Menu</h1>
        <p className="text-sm text-muted-foreground">
          {menu.name} • /menu/{menu.slug}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Category</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Example: Drinks"
                className="w-full border rounded px-3 py-2 text-sm"
              />

              <button
                type="submit"
                className="w-full bg-black text-white rounded py-2 text-sm"
              >
                Add Category
              </button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Menu Item</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleCreateMenuItem} className="space-y-3">
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm bg-background"
              >
                <option value="">Select category</option>

                {menu.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Item name"
                className="w-full border rounded px-3 py-2 text-sm"
              />

              <input
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded px-3 py-2 text-sm"
              />

              <input
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="Price"
                type="number"
                min="0"
                step="0.01"
                className="w-full border rounded px-3 py-2 text-sm"
              />

              <button
                type="submit"
                className="w-full bg-black text-white rounded py-2 text-sm"
              >
                Add Item
              </button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {menu.categories.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No categories yet. Add your first category above.
          </p>
        )}

        {menu.categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {category.menuItems.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No items in this category yet.
                </p>
              )}

              {category.menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b pb-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>

                    {item.description && (
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    )}

                    <button
                      onClick={() =>
                        handleAvailabilityToggle(item.id, item.isAvailable)
                      }
                      className="text-xs underline text-muted-foreground"
                    >
                      {item.isAvailable ? "Mark sold out" : "Mark available"}
                    </button>
                  </div>

                  <p className="font-semibold">K{item.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
