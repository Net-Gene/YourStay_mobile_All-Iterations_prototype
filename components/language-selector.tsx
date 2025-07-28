"use client";

import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import type { SupportedLanguage } from "@/lib/i18n";

interface LanguageSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  /*
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "et", name: "Eesti", flag: "🇪🇪" },
  { code: "no", name: "Norsk", flag: "🇳🇴" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  */
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const { i18n } = useTranslation();

  // Use i18n's current language if no external value is provided
  const currentLanguage = value || i18n.language;

  const handleLanguageChange = (newLanguage: string) => {
    // Change i18n language
    i18n.changeLanguage(newLanguage as SupportedLanguage);

    // Call external onChange if provided (for backward compatibility)
    if (onChange) {
      onChange(newLanguage);
    }
  };

  const currentLanguageData = languages.find(
    (lang) => lang.code === currentLanguage
  );

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto min-w-[120px]">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
