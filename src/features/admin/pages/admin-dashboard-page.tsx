import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Quick access to your restaurant tools.
        </p>
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
