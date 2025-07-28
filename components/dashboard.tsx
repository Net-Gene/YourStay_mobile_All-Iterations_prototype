"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, UtensilsCrossed, MapPin, Key, Clock, Wifi, Coffee, Car, BotMessageSquare , User} from "lucide-react"
import { useTranslation } from "react-i18next"
interface DashboardProps {
  readonly language: string;
  readonly guestData: any;
  readonly phase: string;
  readonly onNavigate: (view: string) => void;
}
export function Dashboard({ phase, language, guestData, onNavigate }: DashboardProps) {
  const { t, i18n } = useTranslation()
  if (language && i18n.language !== language) {
    i18n.changeLanguage(language)
  }

  const quickActions = [
    {
      icon: MessageCircle,
      title: t("dashboard.quickActions.chatSupport"),
      description: t("dashboard.quickActions.chatSupportDesc"),
      action: () => onNavigate("chat"),
      color: "bg-blue-500",
    },
    {
      icon: UtensilsCrossed,
      title: t("dashboard.quickActions.foodOrdering"),
      description: t("dashboard.quickActions.foodOrderingDesc"),
      action: () => onNavigate("food"),
      color: "bg-green-500",
    },
    {
      icon: MapPin,
      title: t("dashboard.quickActions.facilityGuide"),
      description: t("dashboard.quickActions.facilityGuideDesc"),
      action: () => onNavigate("guide"),
      color: "bg-purple-500",
    },
  ]

  const roomInfo = {
    number: guestData?.roomNumber || "101",
    pin: guestData?.pin || "",
    checkIn: new Date(guestData?.checkInTime || Date.now()).toLocaleDateString(),
    checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }

  const facilities = [
    { icon: Wifi, name: t("dashboard.facilities.freeWifi"), status: t("dashboard.facilities.available") },
    { icon: Coffee, name: t("dashboard.facilities.foodOrdering"), status: t("dashboard.facilities.available247") },
    { icon: Car, name: t("dashboard.facilities.parking"), status: t("dashboard.facilities.notFull") },
    { icon: BotMessageSquare , name: t("dashboard.facilities.aiChat"), status: t("dashboard.facilities.available247") },
    { icon: User, name: t("dashboard.facilities.humanChat"), status: t("dashboard.facilities.openUntil", { time: "22:00" }) },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("dashboard.welcome", { name: guestData?.firstName })}</h2>
        <p className="text-muted-foreground">{t("dashboard.title")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {t("dashboard.roomInformation")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{roomInfo.number}</div>
              <div className="text-sm text-muted-foreground">{t("dashboard.roomNumber")}</div>
            </div>
            {phase === "mobile-only" && (
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">{roomInfo.pin}</div>
              <div className="text-sm text-muted-foreground">{t("dashboard.accessPin")}</div>
            </div>
            )}
            <div className="text-center">
              <div className="font-semibold">{roomInfo.checkIn}</div>
              <div className="text-sm text-muted-foreground">{t("dashboard.checkIn")}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{roomInfo.checkOut}</div>
              <div className="text-sm text-muted-foreground">{t("dashboard.checkOut")}</div>
            </div>
          </div>

          {phase !== "mobile-only" && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{t("dashboard.rfidActive")}</Badge>
                <span className="text-sm">
                  {t("dashboard.wristbandId")}: #RF{Math.random().toString(36).substr(2, 6).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">{t("dashboard.quickActions.title")}</h3>
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-full ${action.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.facilityStatus")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {facilities.map((facility, index) => {
              const Icon = facility.icon
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{facility.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {facility.status}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

