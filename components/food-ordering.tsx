"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface FoodOrderingProps {
  language: string;
  guestData: any;
  onNavigate: (view: string) => void;
}

export function FoodOrdering({
  language,
  guestData,
  onNavigate,
}: FoodOrderingProps) {
  const { t } = useTranslation();

  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState([
    {
      id: 1,
      items: [t("food.continentalBreakfast"), t("food.coffee")],
      total: 12.5,
      status: "ready",
      time: "08:30",
      estimatedReady: "09:00",
    },
  ]);

  const menuCategories = {
    breakfast: [
      {
        id: 1,
        name: t("food.continentalBreakfast"),
        price: 8.5,
        description: t("food.continentalBreakfastDesc"),
        available: true,
      },
      {
        id: 2,
        name: t("food.fullEnglishBreakfast"),
        price: 12.0,
        description: t("food.fullEnglishBreakfastDesc"),
        available: true,
      },
      {
        id: 3,
        name: t("food.pancakes"),
        price: 9.0,
        description: t("food.pancakesDesc"),
        available: false,
      },
    ],
    snacks: [
      {
        id: 4,
        name: t("food.sandwich"),
        price: 6.5,
        description: t("food.sandwichDesc"),
        available: true,
      },
      {
        id: 5,
        name: t("food.instantNoodles"),
        price: 3.0,
        description: t("food.instantNoodlesDesc"),
        available: true,
      },
      {
        id: 6,
        name: t("food.freshFruit"),
        price: 2.5,
        description: t("food.freshFruitDesc"),
        available: true,
      },
    ],
    beverages: [
      {
        id: 7,
        name: t("food.coffee"),
        price: 2.5,
        description: t("food.coffeeDesc"),
        available: true,
      },
      {
        id: 8,
        name: t("food.tea"),
        price: 2.0,
        description: t("food.teaDesc"),
        available: true,
      },
      {
        id: 9,
        name: t("food.softDrinks"),
        price: 2.0,
        description: t("food.softDrinksDesc"),
        available: true,
      },
    ],
  };

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      items: cart.map((item) => `${item.name} (${item.quantity})`),
      total: getTotalPrice(),
      status: "preparing",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      estimatedReady: new Date(Date.now() + 20 * 60000).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };
    setOrders([...orders, newOrder]);
    setCart([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "preparing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "delayed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("foodOrdering.title")}</h2>
        <p className="text-muted-foreground">{t("foodOrdering.subtitle")}</p>
        <Button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-1"
        >
          {t("common.back")}
        </Button>
      </div>

      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="menu">{t("foodOrdering.menu")}</TabsTrigger>
          <TabsTrigger value="cart">
            {t("foodOrdering.cart", { count: cart.length })}
          </TabsTrigger>
          <TabsTrigger value="orders">{t("foodOrdering.orders")}</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakfast">
                {t("foodOrdering.breakfast")}
              </TabsTrigger>
              <TabsTrigger value="snacks">
                {t("foodOrdering.snacks")}
              </TabsTrigger>
              <TabsTrigger value="beverages">
                {t("foodOrdering.beverages")}
              </TabsTrigger>
            </TabsList>

            {Object.entries(menuCategories).map(([category, items]) => (
              <TabsContent
                key={category}
                value={category}
                className="space-y-3"
              >
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className={!item.available ? "opacity-50" : ""}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{item.name}</h4>
                            {!item.available && (
                              <Badge variant="secondary">
                                {t("foodOrdering.unavailable")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <p className="font-bold text-lg">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          onClick={() => addToCart(item)}
                          disabled={!item.available}
                          size="sm"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="cart" className="space-y-4">
          {cart.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {t("foodOrdering.cartEmpty")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{t("foodOrdering.total")}</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={placeOrder}
                    className="w-full mt-4"
                    size="lg"
                  >
                    {t("foodOrdering.placeOrder")}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {t("foodOrdering.noOrders")}
                </p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {t("foodOrdering.orderNum", { id: order.id })}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <Badge className={getStatusColor(order.status)}>
                        {t(`foodOrdering.status.${order.status}`)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <strong>{t("foodOrdering.items")}:</strong>{" "}
                      {order.items.join(", ")}
                    </div>
                    <div>
                      <strong>{t("foodOrdering.total")}:</strong> $
                      {order.total.toFixed(2)}
                    </div>
                    <div>
                      <strong>{t("foodOrdering.ordered")}:</strong> {order.time}
                    </div>
                    <div>
                      <strong>{t("foodOrdering.estimatedReady")}:</strong>{" "}
                      {order.estimatedReady}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
