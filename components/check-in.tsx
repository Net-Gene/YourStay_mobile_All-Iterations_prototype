"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { QrCode, Key, Smartphone, CreditCard, Scan } from "lucide-react"

interface CheckInProps {
  readonly phase: string
  readonly onCheckInComplete: (data: any) => void
}

export function CheckIn({ phase, onCheckInComplete }: CheckInProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    confirmationNumber: "",
    email: "",
    source: "booking.com",
  })
  const [travelCard, setTravelCard] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    purpose: "",
    arrivalDate: "",
    departureDate: "",
    specialRequests: "",
  })
  const [accessMethod, setAccessMethod] = useState<"pin" | "qr">("pin")
  const [generatedPin, setGeneratedPin] = useState("")
  const [generatedQR, setGeneratedQR] = useState("")

  const generateAccessCredentials = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString()
    const qr = `HOSTEL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setGeneratedPin(pin)
    setGeneratedQR(qr)
  }

  const handleBookingSubmit = () => {
    if (bookingData.confirmationNumber && bookingData.email) {
      setStep(2)
    }
  }

  const handleTravelCardSubmit = () => {
    generateAccessCredentials()
    setStep(3)
  }

  const handleComplete = () => {
    const guestData = {
      ...bookingData,
      ...travelCard,
      pin: generatedPin,
      qr: generatedQR,
      accessMethod,
      checkInTime: new Date().toISOString(),
      roomNumber: Math.floor(100 + Math.random() * 200).toString(),
    }
    onCheckInComplete(guestData)
  }

  const getPhaseFeatures = () => {
    switch (phase) {
      case "mobile-only":
        return [t("check-in.features.qrPinAccess"), t("check-in.checkin.mobileOnlyAccess"), t("check-in.checkin.noPhysicalWristband")]
      case "app-kiosk":
        return [t("check-in.checkin.kioskIntegration"), t("check-in.features.rfidWristband"), t("check-in.checkin.parallelSystems")]
      case "full-integration":
        return [t("check-in.features.realtimeSync"), t("check-in.checkin.multiDeviceAccess"), t("check-in.checkin.advancedFeatures")]
      default:
        return []
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("check-in.checkin.title")}</h2>
        <p className="text-muted-foreground">{t("check-in.checkin.stepOf", { current: step, total: 3 })}</p>
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {getPhaseFeatures().map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              {t("check-in.checkin.bookingConfirmation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirmation">{t("check-in.checkin.confirmationNumber")}</Label>
              <Input
                id="confirmation"
                placeholder={t("check-in.checkin.confirmationPlaceholder")}
                value={bookingData.confirmationNumber}
                onChange={(e) => setBookingData({ ...bookingData, confirmationNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("check-in.checkin.emailAddress")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("check-in.checkin.emailPlaceholder")}
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">{t("check-in.checkin.bookingSource")}</Label>
              <Select
                value={bookingData.source}
                onValueChange={(value) => setBookingData({ ...bookingData, source: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking.com">{t("check-in.bookingSources.booking")}</SelectItem>
                  <SelectItem value="hostelworld">{t("check-in.bookingSources.hostelworld")}</SelectItem>
                  <SelectItem value="expedia">{t("check-in.bookingSources.expedia")}</SelectItem>
                  <SelectItem value="direct">{t("check-in.bookingSources.direct")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleBookingSubmit}
              className="w-full"
              disabled={!bookingData.confirmationNumber || !bookingData.email}
            >
              {t("check-in.checkin.verifyBooking")}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {t("check-in.checkin.digitalTravelCard")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("check-in.checkin.firstName")}</Label>
                <Input
                  id="firstName"
                  value={travelCard.firstName}
                  onChange={(e) => setTravelCard({ ...travelCard, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("check-in.checkin.lastName")}</Label>
                <Input
                  id="lastName"
                  value={travelCard.lastName}
                  onChange={(e) => setTravelCard({ ...travelCard, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">{t("check-in.checkin.nationality")}</Label>
              <Select
                value={travelCard.nationality}
                onValueChange={(value) => setTravelCard({ ...travelCard, nationality: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("check-in.checkin.selectNationality")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">{t("check-in.countries.us")}</SelectItem>
                  <SelectItem value="uk">{t("check-in.countries.uk")}</SelectItem>
                  <SelectItem value="de">{t("check-in.countries.de")}</SelectItem>
                  <SelectItem value="fr">{t("check-in.countries.fr")}</SelectItem>
                  <SelectItem value="es">{t("check-in.countries.es")}</SelectItem>
                  <SelectItem value="ru">{t("check-in.countries.ru")}</SelectItem>
                  <SelectItem value="cn">{t("check-in.countries.cn")}</SelectItem>
                  <SelectItem value="jp">{t("check-in.countries.jp")}</SelectItem>
                  <SelectItem value="nl">{t("check-in.countries.nl")}</SelectItem>
                  <SelectItem value="ee">{t("check-in.countries.ee")}</SelectItem>
                  <SelectItem value="no">{t("check-in.countries.no")}</SelectItem>
                  <SelectItem value="ch">{t("check-in.countries.ch")}</SelectItem>
                  <SelectItem value="it">{t("check-in.countries.it")}</SelectItem>
                  <SelectItem value="pl">{t("check-in.countries.pl")}</SelectItem>
                  <SelectItem value="dk">{t("check-in.countries.dk")}</SelectItem>
                  <SelectItem value="au">{t("check-in.countries.au")}</SelectItem>
                  <SelectItem value="in">{t("check-in.countries.in")}</SelectItem>
                  <SelectItem value="at">{t("check-in.countries.at")}</SelectItem>
                  <SelectItem value="be">{t("check-in.countries.be")}</SelectItem>
                  <SelectItem value="se">{t("check-in.countries.se")}</SelectItem>
                  <SelectItem value="other">{t("check-in.countries.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">{t("check-in.checkin.purposeOfVisit")}</Label>
              <Select
                value={travelCard.purpose}
                onValueChange={(value) => setTravelCard({ ...travelCard, purpose: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("check-in.checkin.selectPurpose")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourism">{t("check-in.purposes.tourism")}</SelectItem>
                  <SelectItem value="business">{t("check-in.purposes.business")}</SelectItem>
                  <SelectItem value="education">{t("check-in.purposes.education")}</SelectItem>
                  <SelectItem value="other">{t("check-in.purposes.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="arrival">{t("check-in.checkin.arrivalDate")}</Label>
                <Input
                  id="arrival"
                  type="date"
                  value={travelCard.arrivalDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setTravelCard({
                      ...travelCard,
                      arrivalDate: e.target.value,
                      departureDate:
                        travelCard.departureDate && e.target.value >= travelCard.departureDate
                          ? ""
                          : travelCard.departureDate,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departure">{t("check-in.checkin.departureDate")}</Label>
                <Input
                  id="departure"
                  type="date"
                  value={travelCard.departureDate}
                  min={
                    travelCard.arrivalDate
                      ? new Date(new Date(travelCard.arrivalDate).getTime() + 86400000).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) => setTravelCard({ ...travelCard, departureDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requests">{t("check-in.checkin.specialRequests")}</Label>
              <Textarea
                id="requests"
                placeholder={t("check-in.checkin.specialRequestsPlaceholder")}
                value={travelCard.specialRequests}
                onChange={(e) => setTravelCard({ ...travelCard, specialRequests: e.target.value })}
              />
            </div>

            <Button onClick={handleTravelCardSubmit} className="w-full">
              {t("check-in.checkin.completeTravelCard")}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              {t("check-in.checkin.digitalRoomKey")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                {t("room", { number: Math.floor(100 + Math.random() * 200) })}
              </Badge>
              <p className="text-sm text-muted-foreground">{t("check-in.checkin.roomAssignment")}</p>
            </div>

            <div className="space-y-4">
              {phase === "mobile-only" && (
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={accessMethod === "pin" ? "default" : "outline"}
                    onClick={() => setAccessMethod("pin")}
                    className="flex-1"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    {t("check-in.checkin.pinAccess")}
                  </Button>
                  <Button
                    variant={accessMethod === "qr" ? "default" : "outline"}
                    onClick={() => setAccessMethod("qr")}
                    className="flex-1"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {t("check-in.checkin.qrAccess")}
                  </Button>
                </div>
              )}

              {phase === "mobile-only" && (
                <>
                  {accessMethod === "pin" && (
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-mono font-bold tracking-wider bg-muted p-4 rounded-lg">
                        {generatedPin}
                      </div>
                      <p className="text-sm text-muted-foreground">{t("check-in.checkin.roomPin")}</p>
                    </div>
                  )}

                  {accessMethod === "qr" && (
                    <div className="text-center space-y-2">
                      <div className="bg-muted p-8 rounded-lg">
                        <QrCode className="h-24 w-24 mx-auto" />
                      </div>
                      <p className="text-sm text-muted-foreground">{t("check-in.checkin.qrCodeScan")}</p>
                      <p className="text-xs font-mono text-muted-foreground">{generatedQR}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {phase !== "mobile-only" && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900">{t("check-in.checkin.rfidAvailable")}</h4>
                <p className="text-sm text-blue-700">
                  {phase === "app-kiosk" ? t("check-in.checkin.collectWristband") : t("check-in.checkin.wristbandAccess")}
                </p>
              </div>
            )}

            <Button onClick={handleComplete} className="w-full" size="lg">
              {t("check-in.checkin.completeCheckin")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
