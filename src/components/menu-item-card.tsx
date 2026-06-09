import { Card, CardContent } from "@/components/ui/card";

type Props = {
  name: string;
  description?: string | null;
  price: number;
};

export default function MenuItemCard({ name, description, price }: Props) {
  return (
    <Card className="flex justify-between items-start">
      <CardContent className="p-4 flex justify-between w-full">
        <div className="space-y-1">
          <p className="font-medium">{name}</p>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="font-semibold">K{price}</div>
      </CardContent>
    </Card>
  );
}
