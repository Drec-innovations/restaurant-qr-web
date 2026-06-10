import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const restaurantSlug = import.meta.env.VITE_RESTAURANT_SLUG;

export default function RestaurantQrPage() {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const menuUrl = `${window.location.origin}/menu/${restaurantSlug}`;

  function handleDownloadQr() {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) {
      toast.error("QR code was not found");
      return;
    }

    const imageUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${restaurantSlug}-qr-code.png`;
    link.click();

    toast.success("QR code downloaded");
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Restaurant QR Code</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 flex flex-col items-center">
          <div ref={qrRef} className="bg-white p-4 rounded">
            <QRCodeCanvas value={menuUrl} size={220} />
          </div>

          <p className="text-sm text-muted-foreground text-center break-all">
            {menuUrl}
          </p>

          <button
            onClick={handleDownloadQr}
            className="w-full bg-black text-white rounded px-4 py-2 text-sm"
          >
            Download QR Code
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
