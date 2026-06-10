import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { RestaurantMenu } from "../types/menu";
import { getMenu } from "../api/get-menu";
import MenuItemCard from "@/features/menu/components/menu-item-card";
import { useCart } from "@/features/cart/context/context-cart";
import { loadLencoScript } from "@/features/payments/lenco";

const API_URL = import.meta.env.VITE_API_URL;

type CustomerDetails = {
  fullName: string;
  phone: string;
  email: string;
};

export default function MenuPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<RestaurantMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    email: "",
  });

  const { items, total, clearCart, totalItems } = useCart();

  useEffect(() => {
    if (!slug) return;

    getMenu(slug)
      .then(setData)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getFirstAndLastName = (fullName: string) => {
    const parts = fullName.trim().split(" ");

    return {
      firstName: parts[0] || "Guest",
      lastName: parts.slice(1).join(" ") || "Customer",
    };
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!data?.id) {
      alert("Restaurant not found");
      return;
    }

    if (
      !customerDetails.fullName.trim() ||
      !customerDetails.phone.trim() ||
      !customerDetails.email.trim()
    ) {
      alert("Please enter your name, phone number, and email address.");
      return;
    }

    await loadLencoScript();

    const reference = `order_${Date.now()}`;
    const { firstName, lastName } = getFirstAndLastName(
      customerDetails.fullName,
    );

    window.LencoPay.getPaid({
      key: import.meta.env.VITE_LENCO_PUBLIC_KEY,
      reference,
      email: customerDetails.email,
      amount: total,
      currency: "ZMW",
      channels: ["card", "mobile-money"],

      customer: {
        firstName,
        lastName,
        phone: customerDetails.phone,
      },

      onSuccess: async function (response: any) {
        const reference = response.reference;

        console.log("reference::", reference);

        const res = await fetch(`${API_URL}/api/orders/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference,
            restaurantId: data.id,
            items,
            customer: {
              name: customerDetails.fullName,
              phone: customerDetails.phone,
              email: customerDetails.email,
            },
          }),
        });

        const result = await res.json();

        if (result.success) {
          clearCart();

          navigate("/order-success", {
            state: {
              order: result.order,
            },
          });
        } else {
          alert("Order could not be confirmed ❌");
          console.log(result);
        }
      },

      onClose: function () {
        console.log("Payment closed");
      },

      onConfirmationPending: function () {
        alert(
          "Payment confirmation is pending. Please complete authorization.",
        );
      },
    });
  };

  if (loading) {
    return <div className="p-6">Loading menu...</div>;
  }

  if (!data) {
    return <div className="p-6">Menu not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8 pb-40">
      <h1 className="text-2xl font-bold">{data.name}</h1>

      {data.categories
        .map((category) => ({
          ...category,
          menuItems: category.menuItems.filter((item) => item.isAvailable),
        }))
        .filter((category) => category.menuItems.length > 0)
        .map((category) => (
          <div key={category.id} className="space-y-3">
            <h2 className="text-lg font-semibold border-b pb-1">
              {category.name}
            </h2>

            <div className="space-y-3">
              {category.menuItems.map((item) => (
                <MenuItemCard
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        ))}

      {totalItems > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black text-white p-4 rounded-xl space-y-3 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              {totalItems} items | K{total}
            </div>

            {!showCheckoutForm && (
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="bg-white text-black px-3 py-1 rounded text-sm"
              >
                Checkout
              </button>
            )}
          </div>

          {showCheckoutForm && (
            <div className="space-y-3 pt-2">
              <label htmlFor="full-name">Full Name:</label>
              <input
                id="full-name"
                value={customerDetails.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Full name"
                className="w-full rounded px-3 py-2 text-sm text-white"
              />

              <label htmlFor="phone-number">Phone Number:</label>
              <input
                id="phone-number"
                value={customerDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Phone number"
                className="w-full rounded px-3 py-2 text-sm text-white"
              />

              <label htmlFor="email-address">Email Address:</label>
              <input
                id="email-address"
                value={customerDetails.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email address"
                type="email"
                className="w-full rounded px-3 py-2 text-sm text-white"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCheckoutForm(false)}
                  className="w-full border border-white/30 py-2 rounded text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-2 rounded text-sm font-medium"
                >
                  Pay K{total}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
