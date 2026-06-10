import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Order not found</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/menu/demo-restaurant" className="underline">
              Return to menu
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Order Confirmed ✔</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-medium">{order.id}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium">{order.status}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Paid</p>
            <p className="font-bold">K{order.total}</p>
          </div>

          <div className="pt-2">
            <p className="font-medium">Thank you for your order.</p>
            <p className="text-sm text-muted-foreground">
              Please wait while the restaurant prepares your food.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
