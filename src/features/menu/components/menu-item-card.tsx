import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/features/cart/context/context-cart";

type Props = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
};

export default function MenuItemCard({ id, name, description, price }: Props) {
  const { addItem } = useCart();

  return (
    <Card className="flex justify-between items-start">
      <CardContent className="p-4 flex justify-between w-full">
        <div className="space-y-1">
          <p className="font-medium">{name}</p>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="font-semibold">K{price}</p>

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
      </CardContent>
    </Card>
  );
}
