import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRestaurantOrders } from "../api/get-restaurant-orders";
import { updateOrderStatus } from "../api/update-order-status";
import { toast } from "sonner";

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
  customerName?: string | null;
  customerPhone?: string | null;
  customerEmail?: string | null;
  items: OrderItem[];
};

const restaurantId = import.meta.env.VITE_RESTAURANT_ID;

export default function RestaurantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOrderIds, setNewOrderIds] = useState<string[]>([]);
  const knownOrderIdsRef = useRef<Set<string>>(new Set());
  const hasInitialLoadRef = useRef(false);

  function getStatusMessage(status: string) {
    switch (status) {
      case "PREPARING":
        return "Order marked as preparing";
      case "READY":
        return "Order marked as ready";
      case "COMPLETED":
        return "Order marked as completed";
      default:
        return "Order status updated";
    }
  }

  async function handleStatusChange(orderId: string, status: string) {
    try {
      const result = await updateOrderStatus(orderId, status);

      if (result.success) {
        setOrders((prev) =>
          prev.map((order) => (order.id === orderId ? result.order : order)),
        );

        toast.success(getStatusMessage(status));
        return;
      }

      toast.error("Failed to update order status");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  }

  async function loadOrders() {
    try {
      const data = await getRestaurantOrders(restaurantId);
      const latestOrders: Order[] = data.orders;

      const latestOrderIds = latestOrders.map((order) => order.id);

      if (!hasInitialLoadRef.current) {
        knownOrderIdsRef.current = new Set(latestOrderIds);
        hasInitialLoadRef.current = true;
        setOrders(latestOrders);
        return;
      }

      const incomingOrders = latestOrders.filter(
        (order) => !knownOrderIdsRef.current.has(order.id),
      );

      if (incomingOrders.length > 0) {
        const incomingOrderIds = incomingOrders.map((order) => order.id);

        setNewOrderIds((prev) => [...prev, ...incomingOrderIds]);

        toast.success(
          incomingOrders.length === 1
            ? "New order received"
            : `${incomingOrders.length} new orders received`,
        );

        window.setTimeout(() => {
          setNewOrderIds((prev) =>
            prev.filter((id) => !incomingOrderIds.includes(id)),
          );
        }, 8000);
      }

      knownOrderIdsRef.current = new Set(latestOrderIds);
      setOrders(latestOrders);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();

    const interval = window.setInterval(() => {
      loadOrders();
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <p className="text-xs text-muted-foreground">
        Orders refresh automatically every 10 seconds.
      </p>

      {orders.length === 0 && (
        <p className="text-muted-foreground">No orders yet.</p>
      )}

      {orders.map((order) => (
        <Card
          key={order.id}
          className={
            newOrderIds.includes(order.id)
              ? "border-green-500 bg-green-50"
              : undefined
          }
        >
          <CardHeader>
            <CardTitle className="flex justify-between text-base">
              <span>Order #{order.id.slice(-6)}</span>
              <span>K{order.total}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {order.status} • {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="text-sm space-y-1 pt-2">
              {order.customerName && (
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.customerName}
                </p>
              )}

              {order.customerPhone && (
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {order.customerPhone}
                </p>
              )}

              {order.customerEmail && (
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {order.customerEmail}
                </p>
              )}
            </div>
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
