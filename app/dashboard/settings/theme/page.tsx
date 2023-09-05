"use client";
import ThemeCard from "@/src/components/theme-card";
import { TypographyH4 } from "@/src/components/typography/h4";
import { TypographyParagraph } from "@/src/components/typography/paragraph";
import { RadioGroup } from "@/src/components/ui/radio-group";
import { useTheme } from "@/src/hooks/useTheme";
import { IThemes } from "@/src/interfaces/IThemes";
import { ApplicationTheme } from "@/src/themes";

const themes: IThemes[] = [
  { color: "default", label: "Default" },
  { color: "yellow", label: "Yellow" },
];
export default function ThemePage() {
  const [config, setConfig] = useTheme();
  return (
    <div className="relative w-full h-full mt-4">
      <div className="mb-4">
        <TypographyH4>Thene</TypographyH4>
        <TypographyParagraph className="text-foreground/50">
          Choose your favorite theme
        </TypographyParagraph>
      </div>
      <RadioGroup
        onValueChange={(value: ApplicationTheme) => {
          setConfig({ ...config, theme: value });
        }}
        defaultValue={config.theme}
        className="flex gap-x-4"
      >
        {themes.map((theme) => (
          <ThemeCard
            color={theme.color}
            label={theme.label}
            key={`card-theme-${theme.color}`}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
