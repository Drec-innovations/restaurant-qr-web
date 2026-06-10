import { QRCodeCanvas } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const restaurantSlug = import.meta.env.VITE_RESTAURANT_SLUG;

export default function RestaurantQrPage() {
  const menuUrl = `${window.location.origin}/menu/${restaurantSlug}`;

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Restaurant QR Code</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 flex flex-col items-center">
          <QRCodeCanvas value={menuUrl} size={220} />

          <p className="text-sm text-muted-foreground text-center break-all">
            {menuUrl}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
