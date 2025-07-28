"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import {
  Wifi,
  Coffee,
  Car,
  Utensils,
  ShowerHeadIcon as Shower,
  WashingMachineIcon as Washing,
  Clock,
  CreditCard,
  Key,
  Shield,
  Dumbbell,
} from "lucide-react";
import { useEffect } from "react";

interface FacilityGuideProps {
  language: string;
  phase: string;
  onNavigate: (view: string) => void;
}

export function FacilityGuide({
  language,
  phase,
  onNavigate,
}: Readonly<FacilityGuideProps>) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
      if (language && i18n.language !== language) {
        i18n.changeLanguage(language);
      }
    }, [language, i18n]);
  const facilities = [
    {
      icon: Shower,
      name: t("facility-guide.facility.sharedBathrooms"),
      location: t("facility-guide.facility.locationDownstairs"),
      hours: t("facility-guide.facility.hours247"),
      description: t("facility-guide.facility.sharedBathroomsDescriptions"),
      access:
        phase === "mobile-only"
          ? t("facility-guide.facility.roomPin")
          : t("facility-guide.facility.rfidWristband"),
      tips: [
        t("facility-guide.facility.tipBringToiletries"),
        t("facility-guide.facility.tipMax15min"),
        t("facility-guide.facility.tipKeepSecure"),
      ],
    },
    {
      icon: Dumbbell,
      name: t("facility-guide.facility.gym"),
      location: t("facility-guide.facility.locationDownstairs"),
      hours: t("facility-guide.facility.hours247"),
      description: t("facility-guide.facility.gymDescriptions"),
      access: t("facility-guide.facility.publicAccess"),
      tips: [
        t("facility-guide.facility.tipKeepClean"),
        t("facility-guide.facility.tipRespectWorkouts"),
        t("facility-guide.facility.tipRespectQuietHours"),
      ],
    },
    {
      icon: Wifi,
      name: t("facility-guide.facility.wifi"),
      location: t("facility-guide.facility.locationThroughout"),
      hours: t("facility-guide.facility.hours247"),
      description: t("facility-guide.facility.wifiDescriptions"),
      access: t("facility-guide.facility.safetyCourseAccess"),
      tips: [
        t("facility-guide.facility.tipFast"),
        t("facility-guide.facility.tipUseWifi"),
      ],
    },
    {
      icon: Car,
      name: t("facility-guide.facility.parking"),
      location: t("facility-guide.facility.locationBehind"),
      hours: t("facility-guide.facility.hours247"),
      description: t("facility-guide.facility.parkingDescriptions"),
      access: t("facility-guide.facility.firstCome"),
      tips: [
        t("facility-guide.facility.tipRegisterEasypark"),
        t("facility-guide.facility.tipNotGuaranteed"),
      ],
    },
    {
      icon: Utensils,
      name: t("facility-guide.facility.kitchen"),
      location: t("facility-guide.facility.locationDownstairs"),
      hours: t("facility-guide.facility.hours247"),
      description: t("facility-guide.facility.kitchenDescriptions"),
      access: t("facility-guide.facility.publicAccess"),
      tips: [
        t("facility-guide.facility.tipCleanUp"),
        t("facility-guide.facility.tipLabelFood"),
        t("facility-guide.facility.tipRespectQuietHours"),
        t("facility-guide.facility.tipPrepMeals"),
      ],
    },
  ];

  // Translation-based access instructions
  const accessInstructions = {
    "mobile-only": [
      {
        title: t("facility-guide.accessInstructions.mobileOnly.roomAccess.title"),
        steps: [
          t("facility-guide.accessInstructions.mobileOnly.roomAccess.step1"),
          t("facility-guide.accessInstructions.mobileOnly.roomAccess.step2"),
          t("facility-guide.accessInstructions.mobileOnly.roomAccess.step3"),
          t("facility-guide.accessInstructions.mobileOnly.roomAccess.step4"),
        ],
      },
      {
        title: t("facility-guide.accessInstructions.mobileOnly.facilityAccess.title"),
        steps: [
          t("facility-guide.accessInstructions.mobileOnly.facilityAccess.step1"),
          t("facility-guide.accessInstructions.mobileOnly.facilityAccess.step2"),
        ],
      },
      {
        title: t("facility-guide.accessInstructions.mobileOnly.appFeatures.title"),
        steps: [
          t("facility-guide.accessInstructions.mobileOnly.appFeatures.step1"),
          t("facility-guide.accessInstructions.mobileOnly.appFeatures.step2"),
          t("facility-guide.accessInstructions.mobileOnly.appFeatures.step3"),
          t("facility-guide.accessInstructions.mobileOnly.appFeatures.step4"),
          t("facility-guide.accessInstructions.mobileOnly.appFeatures.step5"),
          t("facility-guide.accessInstructions.mobileOnly.appFeatures.step6"),
        ],
      },
    ],
    "app-kiosk": [
      {
        title: t("accessInstructions.app+Kiosk.rfidWristbandSetup.title"),
        steps: [
          t("accessInstructions.app+Kiosk.rfidWristbandSetup.step1"),
          t("accessInstructions.app+Kiosk.rfidWristbandSetup.step2"),
          t("accessInstructions.app+Kiosk.rfidWristbandSetup.step3"),
          t("accessInstructions.app+Kiosk.rfidWristbandSetup.step4"),
        ],
      },
      {
        title: t("accessInstructions.app+Kiosk.backupAccess.title"),
        steps: [
          t("accessInstructions.app+Kiosk.backupAccess.step1"),
          t("accessInstructions.app+Kiosk.backupAccess.step2"),
          t("accessInstructions.app+Kiosk.backupAccess.step3"),
        ],
      },
      {
        title: t("accessInstructions.app+Kiosk.kioskFeatures.title"),
        steps: [
          t("accessInstructions.app+Kiosk.kioskFeatures.step1"),
        ],
      },
      {
        title: t("accessInstructions.app+Kiosk.appFeatures.title"),
        steps: [
          t("accessInstructions.app+Kiosk.appFeatures.step1"),
          t("accessInstructions.app+Kiosk.appFeatures.step2"),
          t("accessInstructions.app+Kiosk.appFeatures.step3"),
          t("accessInstructions.app+Kiosk.appFeatures.step4"),
          t("accessInstructions.app+Kiosk.appFeatures.step5"),
        ],
      },
    ],
    "full-integration": [
      {
        title: t("accessInstructions.fullIntegration.seamlessAccess.title"),
        steps: [
          t("accessInstructions.fullIntegration.seamlessAccess.step1"),
          t("accessInstructions.fullIntegration.seamlessAccess.step2"),
          t("accessInstructions.fullIntegration.seamlessAccess.step3"),
        ],
      },
      {
        title: t("accessInstructions.fullIntegration.rfidWristbandSetup.title"),
        steps: [
          t("accessInstructions.fullIntegration.rfidWristbandSetup.step1"),
          t("accessInstructions.fullIntegration.rfidWristbandSetup.step2"),
          t("accessInstructions.fullIntegration.rfidWristbandSetup.step3"),
          t("accessInstructions.fullIntegration.rfidWristbandSetup.step4"),
        ],
      },
      {
        title: t("accessInstructions.fullIntegration.backupAccess.title"),
        steps: [
          t("accessInstructions.fullIntegration.backupAccess.step1"),
          t("accessInstructions.fullIntegration.backupAccess.step2"),
          t("accessInstructions.fullIntegration.backupAccess.step3"),
        ],
      },
      {
        title: t("accessInstructions.fullIntegration.kioskFeatures.title"),
        steps: [
          t("accessInstructions.fullIntegration.kioskFeatures.step1"),
          t("accessInstructions.fullIntegration.kioskFeatures.step2"),
          t("accessInstructions.fullIntegration.kioskFeatures.step3"),
          t("accessInstructions.fullIntegration.kioskFeatures.step4"),
        ],
      },
      {
        title: t("accessInstructions.fullIntegration.appFeatures.title"),
        steps: [
          t("accessInstructions.fullIntegration.appFeatures.step1"),
          t("accessInstructions.fullIntegration.appFeatures.step2"),
          t("accessInstructions.fullIntegration.appFeatures.step3"),
          t("accessInstructions.fullIntegration.appFeatures.step4"),
          t("accessInstructions.fullIntegration.appFeatures.step5"),
        ],
      },
    ],
  };

  const safetyGuidelines = [
    {
      icon: Shield,
      title: t("facility-guide.safety.security"),
      points: [
        t("facility-guide.safety.neverShare"),
        t("facility-guide.safety.reportLost"),
        t("facility-guide.safety.lockRoom"),
        t("facility-guide.safety.keepValuables"),
      ],
    },
    {
      icon: Clock,
      title: t("facility-guide.safety.quietHours"),
      points: [
        t("facility-guide.safety.quietHoursTime"),
        t("facility-guide.safety.keepNoiseMin"),
        t("facility-guide.safety.useHeadphones"),
        t("facility-guide.safety.respectSleep"),
      ],
    },
    {
      icon: CreditCard,
      title: t("facility-guide.safety.payments"),
      points: [
        t("facility-guide.safety.contactless"),
        t("facility-guide.safety.checkPaymentApp"),
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("facility-guide.facilityGuide.title")}</h2>
        <p className="text-muted-foreground">
          {t("facility-guide.facilityGuide.subtitle")}
        </p>
        <Badge variant="outline" className="mt-2">
          {phase === "mobile-only"
            ? t("facility-guide.facilityGuide.mobileAccess")
            : phase === "app-kiosk"
            ? t("facility-guide.facilityGuide.rfidMobile")
            : t("facility-guide.facilityGuide.fullIntegration")}
        </Badge>
        <Button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-1"
        >
          {t("facility-guide.common.back")}
        </Button>
      </div>

      <Tabs defaultValue="facilities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="facilities">{t("facility-guide.tabs.facilities")}</TabsTrigger>
          <TabsTrigger value="access">{t("facility-guide.tabs.accessGuide")}</TabsTrigger>
          <TabsTrigger value="safety">{t("facility-guide.tabs.safety")}</TabsTrigger>
        </TabsList>

        <TabsContent value="facilities" className="space-y-4">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {facility.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">{t("facility-guide.facility.location")}:</span>{" "}
                      {facility.location}
                    </div>
                    <div>
                      <span className="font-semibold">{t("facility-guide.facility.hours")}:</span>{" "}
                      {facility.hours}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {facility.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span className="text-sm font-semibold">{t("facility-guide.facility.access")}:</span>
                      <Badge variant="secondary" className="text-xs">
                        {facility.access}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <span className="text-sm font-semibold">{t("facility-guide.facility.tips")}:</span>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {facility.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          {accessInstructions[phase].map((instruction, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{instruction.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {instruction.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className="min-w-[24px] h-6 flex items-center justify-center text-xs"
                      >
                        {stepIndex + 1}
                      </Badge>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          {safetyGuidelines.map((guideline, index) => {
            const Icon = guideline.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {guideline.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guideline.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-primary">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
