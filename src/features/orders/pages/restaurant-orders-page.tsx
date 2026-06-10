import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRestaurantOrders } from "../api/get-restaurant-orders";
import { updateOrderStatus } from "../api/update-order-status";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function RestaurantOrdersPage() {
  const restaurantId = "cmq6utt0c00002sv5zrlkf5y9";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleStatusChange(orderId: string, status: string) {
    const result = await updateOrderStatus(orderId, status);

    if (result.success) {
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? result.order : order)),
      );
    }
  }

  useEffect(() => {
    getRestaurantOrders(restaurantId)
      .then((data) => setOrders(data.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      {orders.length === 0 && (
        <p className="text-muted-foreground">No orders yet.</p>
      )}

      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="flex justify-between text-base">
              <span>Order #{order.id.slice(-6)}</span>
              <span>K{order.total}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {order.status} • {new Date(order.createdAt).toLocaleString()}
            </p>
          </CardHeader>

          <CardContent className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm border-b pb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>K{item.price * item.quantity}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 pt-3">
              <button
                onClick={() => handleStatusChange(order.id, "PREPARING")}
                className="text-xs border rounded px-2 py-1"
              >
                Preparing
              </button>

              <button
                onClick={() => handleStatusChange(order.id, "READY")}
                className="text-xs border rounded px-2 py-1"
              >
                Ready
              </button>

              <button
                onClick={() => handleStatusChange(order.id, "COMPLETED")}
                className="text-xs border rounded px-2 py-1"
              >
                Completed
              </button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
