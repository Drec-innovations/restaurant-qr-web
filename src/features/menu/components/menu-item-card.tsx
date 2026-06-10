import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/features/cart/context/context-cart";

type Props = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
};

export default function MenuItemCard({
  id,
  name,
  description,
  price,
  imageUrl,
}: Props) {
  const { addItem } = useCart();

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="h-40 w-full rounded-lg object-cover"
          />
        )}

        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <p className="font-medium">{name}</p>

            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold whitespace-nowrap">K{price}</p>

            <button
              onClick={() =>
                addItem({
                  id,
                  name,
                  price,
                })
              }
              className="text-xs px-2 py-1 border rounded"
            >
              Add
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
