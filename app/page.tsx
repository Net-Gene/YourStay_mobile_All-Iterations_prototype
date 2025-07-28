"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckIn } from "@/components/check-in"
import { Dashboard } from "@/components/dashboard"
import { FoodOrdering } from "@/components/food-ordering"
import { ChatSupport } from "@/components/chat-support"
import { FacilityGuide } from "@/components/facility-guide"
import { AdminPanel } from "@/components/admin-panel"
import { LanguageSelector } from "@/components/language-selector"
import { Smartphone, Monitor, Tablet, Users, Settings, LogOut } from "lucide-react"

type Phase = "mobile-only" | "app-kiosk" | "full-integration"
type View = "home" | "checkin" | "dashboard" | "food" | "chat" | "guide" | "admin"

export default function HostelApp() {
  const { t, i18n } = useTranslation()
  const [currentPhase, setCurrentPhase] = useState<Phase>("mobile-only")
  const [currentView, setCurrentView] = useState<View>("home")
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [guestData, setGuestData] = useState<any>(null)

  const phases = {
    "mobile-only": {
      title: t("home.phases.mobileOnly"),
      description: t("home.phases.mobileOnlyDesc"),
      icon: Smartphone,
      features: [
        t("home.features.qrPinAccess"),
        t("home.features.digitalTravelCard"),
        t("home.features.multilingualChat"),
        t("home.features.foodOrdering"),
      ],
    },
    "app-kiosk": {
      title: t("home.phases.appKiosk"),
      description: t("home.phases.appKioskDesc"),
      icon: Monitor,
      features: [
        t("home.features.kioskCheckin"),
        t("home.features.rfidWristband"),
        t("home.features.appGuidance"),
        t("home.features.synchronizedData"),
      ],
    },
    "full-integration": {
      title: t("home.phases.fullIntegration"),
      description: t("home.phases.fullIntegrationDesc"),
      icon: Tablet,
      features: [
        t("home.features.realtimeSync"),
        t("home.features.staffInterfaces"),
        t("home.features.advancedAnalytics"),
        t("home.features.offlineFallback"),
      ],
    },
  }

  const handleLogout = () => {
    setIsCheckedIn(false)
    setGuestData(null)
    setCurrentView("home")
  }

  const renderView = () => {
    switch (currentView) {
      case "checkin":
        return (
          <CheckIn
            phase={currentPhase}
            onCheckInComplete={(data) => {
              setGuestData(data)
              setIsCheckedIn(true)
              setCurrentView("dashboard")
            }}
          />
        )
      case "dashboard":
        return <Dashboard phase={currentPhase} guestData={guestData} onNavigate={setCurrentView} />
      case "food":
        return <FoodOrdering guestData={guestData} onNavigate={setCurrentView} />
      case "chat":
        return <ChatSupport guestData={guestData} onNavigate={setCurrentView} />
      case "guide":
        return <FacilityGuide phase={currentPhase} onNavigate={setCurrentView} />
      case "admin":
        return <AdminPanel phase={currentPhase} />
      default:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">{t("home.appTitle")}</h1>
              <p className="text-muted-foreground">{t("home.appSubtitle")}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("home.developmentPhases")}</h2>
              <div className="grid gap-4">
                {Object.entries(phases).map(([key, phase]) => {
                  const Icon = phase.icon
                  return (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all ${currentPhase === key ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setCurrentPhase(key as Phase)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6" />
                          <div>
                            <CardTitle className="text-lg">{phase.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{phase.description}</p>
                          </div>
                          {currentPhase === key && <Badge>{t("home.phases.active")}</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {phase.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={() => setCurrentView("checkin")} className="w-full" size="lg">
                {t("home.startCheckinProcess")}
              </Button>

              <div  className="flex flex-col">
                <Button variant="outline" onClick={() => setCurrentView("admin")} className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {t("home.staffPanel")}
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentView("home")}>
                🏨 Hostel App
              </Button>
              <Badge variant="outline">{phases[currentPhase].title}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSelector />
              {isCheckedIn && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-transparent"
                >
                  <LogOut className="h-3 w-3" />
                  {t("home.logout")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">{renderView()}</main>
    </div>
  )
}
