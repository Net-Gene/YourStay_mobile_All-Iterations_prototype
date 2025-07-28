"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UtensilsCrossed,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
} from "lucide-react";

interface AdminPanelProps {
  phase: string;
  language: string;
}

export function AdminPanel({ phase, language }: Readonly<AdminPanelProps>) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);
  const [selectedRole, setSelectedRole] = useState<
    "cleaning" | "restaurant" | "admin"
  >("admin");

  const dashboardStats = {
    totalGuests: 47,
    checkedIn: 42,
    pendingCheckouts: 5,
    activeOrders: 12,
    completedOrders: 28,
    openTickets: 3,
    avgRating: 4.6,
    occupancyRate: 89,
  };

  const recentOrders = [
    {
      id: 1,
      guest: "John D.",
      room: "101",
      items: ["Continental Breakfast"],
      status: "preparing",
      time: "08:30",
    },
    {
      id: 2,
      guest: "Sarah M.",
      room: "205",
      items: ["Coffee", "Sandwich"],
      status: "ready",
      time: "09:15",
    },
    {
      id: 3,
      guest: "Mike R.",
      room: "103",
      items: ["Full English"],
      status: "delayed",
      time: "08:45",
    },
  ];

  const cleaningTasks = [
    {
      room: "102",
      status: "dirty",
      guest: "Checked out",
      priority: "high",
      assignedTo: "Maria",
    },
    {
      room: "204",
      status: "cleaning",
      guest: "Early checkout",
      priority: "medium",
      assignedTo: "Carlos",
    },
    {
      room: "301",
      status: "clean",
      guest: "Ready for guest",
      priority: "low",
      assignedTo: "Ana",
    },
  ];

  const supportTickets = [
    {
      id: 1,
      guest: "Emma W.",
      room: "107",
      issue: "WiFi not working",
      status: "open",
      priority: "medium",
    },
    {
      id: 2,
      guest: "David L.",
      room: "203",
      issue: "Room key not working",
      status: "inProgress",
      priority: "high",
    },
    {
      id: 3,
      guest: "Lisa K.",
      room: "105",
      issue: "Noise complaint",
      status: "resolved",
      priority: "low",
    },
  ];

  const wristbandManagement = [
    {
      id: "RF001",
      guest: "John D.",
      room: "101",
      status: "active",
      battery: "85%",
    },
    {
      id: "RF002",
      guest: "Sarah M.",
      room: "205",
      status: "active",
      battery: "92%",
    },
    {
      id: "RF003",
      guest: "Mike R.",
      room: "103",
      status: "lost",
      battery: "N/A",
    },
    {
      id: "RF004",
      guest: "Emma W.",
      room: "107",
      status: "low-battery",
      battery: "15%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
      case "clean":
      case "active":
      case "resolved":
        return "bg-green-100 text-green-800";
      case "preparing":
      case "cleaning":
      case "inProgress":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
      case "dirty":
      case "open":
      case "lost":
        return "bg-red-100 text-red-800";
      case "low-battery":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
      case "clean":
      case "active":
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "preparing":
      case "cleaning":
      case "inProgress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "delayed":
      case "dirty":
      case "open":
      case "lost":
      case "low-battery":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    // In real app, this would update the database
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  const markRoomCleaned = (room: string) => {
    // In real app, this would update the database
    console.log(`Room ${room} marked as cleaned`);
  };

  const invalidateWristband = (wristbandId: string) => {
    // In real app, this would update the database
    console.log(`Wristband ${wristbandId} invalidated`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("admin-panel.title")}</h2>
        <p className="text-muted-foreground">{t("admin-panel.subtitle")}</p>
        <Badge variant="outline" className="mt-2">
          {phase === "mobile-only"
            ? t("admin-panel.tabs.basicManagement")
            : phase === "app-kiosk"
            ? t("admin-panel.tabs.enhancedFeatures")
            : t("admin-panel.tabs.fullAnalytics")}
        </Badge>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          variant={selectedRole === "admin" ? "default" : "outline"}
          onClick={() => setSelectedRole("admin")}
          size="sm"
        >
          {t("admin-panel.tabs.adminView")}
        </Button>
        <Button
          variant={selectedRole === "cleaning" ? "default" : "outline"}
          onClick={() => setSelectedRole("cleaning")}
          size="sm"
        >
          {t("admin-panel.tabs.cleaningStaff")}
        </Button>
        <Button
          variant={selectedRole === "restaurant" ? "default" : "outline"}
          onClick={() => setSelectedRole("restaurant")}
          size="sm"
        >
          {t("admin-panel.tabs.restaurantStaff")}
        </Button>
      </div>

      {selectedRole === "admin" && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {t("admin-panel.tabs.overview")}
            </TabsTrigger>
            <TabsTrigger value="guests">
              {t("admin-panel.tabs.guests")}
            </TabsTrigger>
            <TabsTrigger value="support">
              {t("admin-panel.tabs.support")}
            </TabsTrigger>
            <TabsTrigger value="wristbands">
              {t("admin-panel.tabs.wristbands")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">
                    {dashboardStats.totalGuests}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("admin-panel.totalGuests")}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">
                    {dashboardStats.checkedIn}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("admin-panel.checkedIn")}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <UtensilsCrossed className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">
                    {dashboardStats.activeOrders}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("admin-panel.activeOrders")}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">
                    {dashboardStats.occupancyRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("admin-panel.occupancy")}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("admin-panel.systemPerformance.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>{t("admin-panel.systemPerformance.averageRating")}</span>
                    <Badge variant="secondary">
                      {dashboardStats.avgRating}/5.0
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("admin-panel.systemPerformance.completedOrdersToday")}</span>
                    <Badge variant="secondary">
                      {dashboardStats.completedOrders}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("admin-panel.systemPerformance.openSupportTickets")}</span>
                    <Badge
                      variant={
                        dashboardStats.openTickets > 5
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {dashboardStats.openTickets}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin-panel.guestManagement")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-semibold">John D. - Room 101</div>
                      <div className="text-sm text-muted-foreground">
                        {t("admin-panel.statuses.checkedInToday", { time: "14:30" })}
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {t("admin-panel.statuses.active")}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-semibold">Sarah M. - Room 205</div>
                      <div className="text-sm text-muted-foreground">
                        Checked in: Yesterday 16:45
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {t("admin-panel.statuses.active")}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-semibold">Mike R. - Room 103</div>
                      <div className="text-sm text-muted-foreground">
                        {t("admin-panel.checkingOutTomorrow", { time: "11:00" })}
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {t("admin-panel.statuses.checkoutSoon")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(ticket.status)}
                        <span className="font-semibold">
                          #{ticket.id} - {ticket.guest}
                        </span>
                        <Badge variant="outline">
                          {t("admin-panel.room", { room: ticket.room })}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ticket.issue}
                      </p>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(ticket.status)}>
                          {t(`admin-panel.statuses.${ticket.status}`)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {t("admin-panel.statuses.priority", {
                            priority: ticket.priority,
                          })}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      {t("admin-panel.statuses.update")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="wristbands" className="space-y-4">
            {phase === "mobile-only" ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {t("admin-panel.rfidNotAvailable")}
                  </p>
                </CardContent>
              </Card>
            ) : (
              wristbandManagement.map((wristband) => (
                <Card key={wristband.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{wristband.id}</span>
                          <Badge variant="outline">{wristband.guest}</Badge>
                          <Badge variant="outline">
                            {t("admin-panel.room", { room: wristband.room })}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(wristband.status)}>
                            {t(`admin-panel.statuses.${wristband.status}`)}
                          </Badge>
                          {wristband.battery !== "N/A" && (
                            <span className="text-sm text-muted-foreground">
                              {t("admin-panel.battery", {
                                battery: wristband.battery,
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {wristband.status === "lost" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => invalidateWristband(wristband.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            {t("admin-panel.invalidate")}
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          {t("admin-panel.replace")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      )}

      {selectedRole === "cleaning" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin-panel.cleaningTasks")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cleaningTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Room {task.room}</span>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.priority} priority
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {task.guest} • Assigned to: {task.assignedTo}
                    </div>
                  </div>
                  {task.status === "dirty" && (
                    <Button
                      size="sm"
                      onClick={() => markRoomCleaned(task.room)}
                    >
                      {t("admin-panel.markClean")}
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {selectedRole === "restaurant" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin-panel.foodOrders")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(order.status)}
                      <span className="font-semibold">
                        #{order.id} - {order.guest}
                      </span>
                      <Badge variant="outline">Room {order.room}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {order.items.join(", ")} • Ordered: {order.time}
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    {order.status === "preparing" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "ready")}
                      >
                        {t("admin-panel.markReady")}
                      </Button>
                    )}
                    {order.status === "ready" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        {t("admin-panel.statuses.delivered")}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
