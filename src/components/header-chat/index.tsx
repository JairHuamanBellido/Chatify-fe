import { TypographyH2 } from "../typography/h2";

interface Props {
  title: string;
}
export default function HeaderChat({ title }: Props) {
  return (
    <nav className="w-full h-[64px] p-4">
      <TypographyH2> Welcome to {title}</TypographyH2>
    </nav>
  );
}
