"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import CashOnDelivery from "../icons/cash-on-delivery";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [showThankYou, setShowThankYou] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  // Replace your Order Summary section with this:
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-money",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const subtotal = getTotalPrice();
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  const handleContinue = () => {
    clearCart();
    setShowThankYou(false);
    // Redirect to home or products page
    window.location.href = "/";
  };

  const cleanImagePath = (path: string) => path.replace("./", "/");

  if (items.length === 0 && !showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Your cart is empty
          </h2>
          <Link href="/products">
            <Button size={"lg"}>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="text-black/50 hover:text-primary transition-colors duration-200 font-medium"
          >
            Go Back
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 lg:p-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-black mb-8 uppercase tracking-wide">
                  Checkout
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Billing Details */}
                  <div>
                    <h2 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
                      Billing Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Name
                        </label>
                        <div className="h-14">
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full h-full text-black/40"
                            placeholder="Alexei Ward"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Email Address
                        </label>
                        <div className="h-14">
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full h-full"
                            placeholder="alexei@mail.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Phone Number
                        </label>
                        <div className="h-14">
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full h-full"
                            placeholder="+1 202-555-0136"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h2 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
                      Shipping Info
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Your Address
                        </label>
                        <div className="h-14">
                          <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full h-full"
                            placeholder="1137 Williams Avenue"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">
                            ZIP Code
                          </label>
                          <div className="h-14">
                            <Input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className="w-full h-full"
                              placeholder="10001"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">
                            City
                          </label>
                          <div className="h-14">
                            <Input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full h-full"
                              placeholder="New York"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Country
                        </label>
                        <div className="h-14">
                          <Input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full h-full"
                            placeholder="United States"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h2 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
                      Payment Details
                    </h2>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row">
                        <label className="flex-1 block text-sm font-medium text-black mb-3">
                          Payment Method
                        </label>
                        <div className="space-y-3 flex-1 w-full">
                          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="e-money"
                              checked={formData.paymentMethod === "e-money"}
                              onChange={handleInputChange}
                              className="text-primary focus:ring-primary w-fit"
                            />
                            <span className="ml-3 text-sm font-medium text-black">
                              e-Money
                            </span>
                          </label>
                          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cash"
                              checked={formData.paymentMethod === "cash"}
                              onChange={handleInputChange}
                              className="text-primary focus:ring-primary w-fit"
                            />
                            <span className="ml-3 text-sm font-medium text-black">
                              Cash on Delivery
                            </span>
                          </label>
                        </div>
                      </div>

                      {formData.paymentMethod === "e-money" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">
                              e-Money Number
                            </label>
                            <div className="h-14">
                              <Input
                                type="text"
                                name="eMoneyNumber"
                                value={formData.eMoneyNumber}
                                onChange={handleInputChange}
                                className="w-full h-full"
                                placeholder="238521993"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">
                              e-Money PIN
                            </label>
                            <div className="h-14">
                              <Input
                                type="text"
                                name="eMoneyPin"
                                value={formData.eMoneyPin}
                                onChange={handleInputChange}
                                className="w-full h-full"
                                placeholder="6891"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-8 pt-8">
                      <CashOnDelivery />
                      <p className="text-black/50 text-lg">
                        The &apos;Cash on Delivery&apos; option enables you to
                        pay in cash when our delivery courier arrives at your
                        residence. Just make sure your address is correct so
                        that your order will not be cancelled.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 lg:p-8">
                <h2 className="text-lg font-bold text-black mb-8 uppercase tracking-wide">
                  Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={cleanImagePath(item.image)}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm text-black truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-black/50">
                          $ {item.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-sm text-black/50 font-bold">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between">
                    <span className="text-sm text-black/50 uppercase">
                      Total
                    </span>
                    <span className="font-bold text-black">
                      $ {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-black/50 uppercase">
                      Shipping
                    </span>
                    <span className="font-bold text-black">$ {shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-black/50 uppercase">
                      VAT (Included)
                    </span>
                    <span className="font-bold text-black">
                      $ {vat.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm text-black/50 uppercase">
                      Grand Total
                    </span>
                    <span className="font-bold text-lg text-primary">
                      $ {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link href="/products" onClick={handleSubmit}>
                  <Button size={"lg"} className="w-full">Continue & Pay</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={() => {}}>
        <DialogContent
          className="w-full max-w-[540px] sm:max-w-[540px] md:max-w-[540px] p-8 bg-white"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          showCloseButton={false}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <Image
                alt="Thank you svg"
                src="/assets/checkout/icon-order-confirmation.svg"
                width={64}
                height={64}
              />
              <h2 className="text-2xl font-bold text-black uppercase tracking-wide text-left">
                Thank You
                <br />
                For Your Order
              </h2>
            </div>

            <p className="text-sm text-black/50">
              You will receive an email confirmation shortly.
            </p>

            {/* Order Summary */}
            <div className="bg-gray-background rounded-lg flex flex-col md:flex-row md:items-center justify-between">
              <div className="md:w-3/5 mb-3">
                {/* First Item */}
                <div className="flex gap-4 p-4">
                  <div className="relative w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={cleanImagePath(items[0]?.image || "")}
                      alt={items[0]?.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-sm text-black">
                      {items[0]?.name}
                    </h3>
                    <p className="text-sm text-black/50">
                      $ {items[0]?.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-black/50">
                    x{items[0]?.quantity}
                  </div>
                </div>

                {/* Additional Items (when expanded) */}
                {isExpanded && items.length > 1 && (
                  <div className="mx-4 border-t pt-2">
                    {items.slice(1).map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0"
                      >
                        <div className="relative w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={cleanImagePath(item.image)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-sm text-black">
                            {item.name}
                          </h3>
                          <p className="text-sm text-black/50">
                            $ {item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-sm text-black/50">
                          x{item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Expand/Collapse Button */}
                {items.length > 1 && (
                  <div className="text-center mt-2 pt-2 mx-4 border-t">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center justify-center gap-2 text-sm text-black/50 hover:text-black/70 transition-colors duration-200 mx-auto"
                    >
                      <span>
                        {isExpanded
                          ? "Show less"
                          : `and ${items.length - 1} other item${
                              items.length > 2 ? "s" : ""
                            }`}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="relative bg-black h-full md:w-2/5 text-white p-4 rounded-b-lg md:rounded-r-lg md:rounded-l-none">
                <div className="flex flex-col justify-between gap-2 lg:absolute lg:bottom-5">
                  <div className="text-[15px] text-white/50 uppercase">
                    Grand Total
                  </div>
                  <div className="font-bold text-lg">
                    $ {total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                handleContinue();
                setShowThankYou(false);
              }}
              size={"lg"}
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutPage;