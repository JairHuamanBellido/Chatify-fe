import { useTheme } from "@/src/hooks/useTheme";
import { useEffect } from "react";

export default function ThemeSwitcher() {
  const [config] = useTheme();

  useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    return document.body.classList.add(`theme-${config.theme}`);
  }, [config]);

  return null;
}
