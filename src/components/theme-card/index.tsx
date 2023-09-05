import { ApplicationTheme } from "@/src/themes";
import { TypographyParagraph } from "../typography/paragraph";
import { RadioGroupItem } from "../ui/radio-group";

interface Props {
  color: ApplicationTheme;
  label: string;
}
export default function ThemeCard({ color, label }: Props) {
  return (
    <div className="flex gap-x-2 ">
      <RadioGroupItem value={color} id={label} />
      <div className="flex-col gap-y-2">
        <div
          className={`theme-${color} border-primary border-[1px] w-[120px] relative p-2 flex items-center justify-center rounded`}
        >
          <div className="w-full h-8 rounded bg-primary"></div>
        </div>
        <TypographyParagraph>{label}</TypographyParagraph>
      </div>
    </div>
  );
}
