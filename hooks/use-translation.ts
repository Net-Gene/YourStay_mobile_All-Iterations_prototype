import { useTranslation as useI18nTranslation } from "react-i18next"
import type { SupportedLanguage } from "@/lib/i18n"

export function useTranslation() {
  const { t, i18n, ready } = useI18nTranslation()

  const changeLanguage = (language: SupportedLanguage) => {
    return i18n.changeLanguage(language)
  }

  const currentLanguage = i18n.language as SupportedLanguage

  return {
    t,
    i18n,
    ready,
    currentLanguage,
    changeLanguage,
    isLoading: !ready,
  }
}
