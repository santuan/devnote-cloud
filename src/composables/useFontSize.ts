import { useStorage } from "@vueuse/core"

export function useFontSize() {
  const appFontSize = useStorage("appFontSize", "app-font-size-md")

  const fontSizes = [
    "app-font-size-xs",
    "app-font-size-sm",
    "app-font-size-md",
    "app-font-size-lg",
    "app-font-size-xl",
  ]

  function toggleFontSize(direction: "increase" | "decrease") {
    const currentIndex = fontSizes.indexOf(appFontSize.value)
    let newIndex

    if (direction === "increase") {
      newIndex = currentIndex + 1
      if (newIndex >= fontSizes.length) {
        newIndex = fontSizes.length - 1
      }
    } else {
      newIndex = currentIndex - 1
      if (newIndex < 0) {
        newIndex = 0
      }
    }

    if (typeof window !== 'undefined') {
      document.body.classList.remove(appFontSize.value)
      document.body.classList.add(fontSizes[newIndex])
      appFontSize.value = fontSizes[newIndex]
    }
  }

  return {
    appFontSize,
    fontSizes,
    toggleFontSize
  }
}