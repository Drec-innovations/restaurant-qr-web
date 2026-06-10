export type MenuItem = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  isAvailable: boolean;
};

export type Category = {
  id: string;
  name: string;
  menuItems: MenuItem[];
};

export type RestaurantMenu = {
  id: string;
  name: string;
  slug: string;
  categories: Category[];
};
