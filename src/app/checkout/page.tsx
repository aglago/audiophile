"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutInput } from "@/lib/validation";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartSummary } from "@/components/cart/CartSummary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { Radio } from "@/components/ui/radio";
import { createOrder } from "@/lib/actions/order-actions";

// Define the order details type
interface OrderDetails {
  success: boolean;
  orderId: string;
  orderNumber: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  const watchPaymentMethod = watch("paymentMethod");
  const watchSameAsShipping = watch("sameAsShipping");

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  // ✅ Fixed onSubmit with proper typing
  const onSubmit: SubmitHandler<CheckoutInput> = async (data) => {
    setIsSubmitting(true);
    try {
      // If using same address for shipping and billing
      if (data.sameAsShipping) {
        data.billingAddress = {
          ...data.shippingAddress,
          type: "billing" as const,
          isDefault: false,
        };
      }

      const result = await createOrder(data);

      if (result.success) {
        setOrderDetails(result);
        setShowOrderConfirmation(true);
        clearCart();
        toast.success("Order placed successfully!");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to place order"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOrderConfirmation && orderDetails) {
    return <OrderConfirmationModal orderDetails={orderDetails} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingFirstName">First Name</Label>
                      <Input
                        id="shippingFirstName"
                        {...register("shippingAddress.firstName")}
                        className={
                          errors.shippingAddress?.firstName
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors.shippingAddress?.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingAddress.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="shippingLastName">Last Name</Label>
                      <Input
                        id="shippingLastName"
                        {...register("shippingAddress.lastName")}
                        className={
                          errors.shippingAddress?.lastName
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors.shippingAddress?.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingAddress.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shippingCompany">Company (optional)</Label>
                    <Input
                      id="shippingCompany"
                      {...register("shippingAddress.company")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingAddress1">Address</Label>
                    <Input
                      id="shippingAddress1"
                      {...register("shippingAddress.address1")}
                      className={
                        errors.shippingAddress?.address1 ? "border-red-500" : ""
                      }
                    />
                    {errors.shippingAddress?.address1 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shippingAddress.address1.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="shippingAddress2">
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input
                      id="shippingAddress2"
                      {...register("shippingAddress.address2")}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City</Label>
                      <Input
                        id="shippingCity"
                        {...register("shippingAddress.city")}
                        className={
                          errors.shippingAddress?.city ? "border-red-500" : ""
                        }
                      />
                      {errors.shippingAddress?.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingAddress.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="shippingState">State</Label>
                      <Input
                        id="shippingState"
                        {...register("shippingAddress.state")}
                        className={
                          errors.shippingAddress?.state ? "border-red-500" : ""
                        }
                      />
                      {errors.shippingAddress?.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingAddress.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="shippingZipCode">ZIP Code</Label>
                      <Input
                        id="shippingZipCode"
                        {...register("shippingAddress.zipCode")}
                        className={
                          errors.shippingAddress?.zipCode
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors.shippingAddress?.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shippingAddress.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shippingPhone">Phone (optional)</Label>
                    <Input
                      id="shippingPhone"
                      type="tel"
                      {...register("shippingAddress.phone")}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsShipping"
                      checked={watchSameAsShipping}
                      onCheckedChange={(checked) =>
                        setValue("sameAsShipping", Boolean(checked))
                      }
                    />
                    <Label htmlFor="sameAsShipping">
                      Same as shipping address
                    </Label>
                  </div>

                  {!watchSameAsShipping && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingFirstName">First Name</Label>
                          <Input
                            id="billingFirstName"
                            {...register("billingAddress.firstName")}
                            className={
                              errors.billingAddress?.firstName
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {errors.billingAddress?.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingAddress.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="billingLastName">Last Name</Label>
                          <Input
                            id="billingLastName"
                            {...register("billingAddress.lastName")}
                            className={
                              errors.billingAddress?.lastName
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {errors.billingAddress?.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingAddress.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingCompany">
                          Company (optional)
                        </Label>
                        <Input
                          id="billingCompany"
                          {...register("billingAddress.company")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="billingAddress1">Address</Label>
                        <Input
                          id="billingAddress1"
                          {...register("billingAddress.address1")}
                          className={
                            errors.billingAddress?.address1
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {errors.billingAddress?.address1 && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingAddress.address1.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="billingAddress2">
                          Apartment, suite, etc. (optional)
                        </Label>
                        <Input
                          id="billingAddress2"
                          {...register("billingAddress.address2")}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="billingCity">City</Label>
                          <Input
                            id="billingCity"
                            {...register("billingAddress.city")}
                            className={
                              errors.billingAddress?.city
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {errors.billingAddress?.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingAddress.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="billingState">State</Label>
                          <Input
                            id="billingState"
                            {...register("billingAddress.state")}
                            className={
                              errors.billingAddress?.state
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {errors.billingAddress?.state && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingAddress.state.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="billingZipCode">ZIP Code</Label>
                          <Input
                            id="billingZipCode"
                            {...register("billingAddress.zipCode")}
                            className={
                              errors.billingAddress?.zipCode
                                ? "border-red-500"
                                : ""
                            }
                          />
                          {errors.billingAddress?.zipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.billingAddress.zipCode.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingPhone">Phone (optional)</Label>
                        <Input
                          id="billingPhone"
                          type="tel"
                          {...register("billingAddress.phone")}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Radio
                      name="paymentMethod"
                      value="credit-card"
                      checked={watchPaymentMethod === "credit-card"}
                      onChange={() => setValue("paymentMethod", "credit-card")}
                      label="Credit Card"
                      description="Pay with your credit or debit card"
                    />
                    <Radio
                      name="paymentMethod"
                      value="paypal"
                      checked={watchPaymentMethod === "paypal"}
                      onChange={() => setValue("paymentMethod", "paypal")}
                      label="PayPal"
                      description="Pay with your PayPal account"
                    />
                    <Radio
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={watchPaymentMethod === "bank-transfer"}
                      onChange={() =>
                        setValue("paymentMethod", "bank-transfer")
                      }
                      label="Bank Transfer"
                      description="Direct bank transfer"
                    />
                  </div>

                  {watchPaymentMethod === "credit-card" && (
                    <div className="space-y-4 border-t pt-6">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          {...register("cardNumber")}
                          className={errors.cardNumber ? "border-red-500" : ""}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            {...register("expiryDate")}
                            className={
                              errors.expiryDate ? "border-red-500" : ""
                            }
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.expiryDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            {...register("cvv")}
                            className={errors.cvv ? "border-red-500" : ""}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          {...register("cardholderName")}
                          className={
                            errors.cardholderName ? "border-red-500" : ""
                          }
                        />
                        {errors.cardholderName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardholderName.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={4}
                    placeholder="Any special instructions for your order..."
                    {...register("notes")}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <CartSummary showCheckoutButton={false} />

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By completing your order, you agree to our Terms of Service
                  and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ✅ Fixed Order Confirmation Modal with proper typing
interface OrderConfirmationModalProps {
  orderDetails: OrderDetails;
}

function OrderConfirmationModal({ orderDetails }: OrderConfirmationModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped soon.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
          <p className="text-sm text-gray-600">
            Order Number:{" "}
            <span className="font-medium">{orderDetails.orderNumber}</span>
          </p>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={() => router.push(`/orders/${orderDetails.orderId}`)}
          >
            View Order
          </Button>
        </div>
      </div>
    </div>
  );
}
