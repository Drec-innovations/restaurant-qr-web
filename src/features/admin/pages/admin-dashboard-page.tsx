import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRestaurantOrders } from "@/features/orders/api/get-restaurant-orders";

type Order = {
  id: string;
  total: number;
  status: string;
};

export default function AdminDashboardPage() {
  const restaurantId = "cmq6utt0c00002sv5zrlkf5y9";

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurantOrders(restaurantId)
      .then((data) => setOrders(data.orders))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const activeOrders = orders.filter((order) =>
      ["PAID", "PREPARING", "READY"].includes(order.status),
    ).length;

    const completedOrders = orders.filter(
      (order) => order.status === "COMPLETED",
    ).length;

    const totalSales = orders
      .filter((order) =>
        ["PAID", "PREPARING", "READY", "COMPLETED"].includes(order.status),
      )
      .reduce((sum, order) => sum + order.total, 0);

    return {
      totalOrders,
      activeOrders,
      completedOrders,
      totalSales,
    };
  }, [orders]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Quick overview of your restaurant activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading ? "..." : stats.totalOrders}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading ? "..." : stats.activeOrders}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading ? "..." : stats.completedOrders}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {loading ? "..." : `K${stats.totalSales}`}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Manage Menu</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Add categories, add items, and mark items as sold out.
            </p>

            <Link to="/admin/menu" className="inline-block text-sm underline">
              Go to menu
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">View Orders</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              See paid orders and update their preparation status.
            </p>

            <Link to="/admin/orders" className="inline-block text-sm underline">
              Go to orders
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">QR Code</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Display or print the restaurant QR code for customers.
            </p>

            <Link to="/admin/qr" className="inline-block text-sm underline">
              View QR code
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
