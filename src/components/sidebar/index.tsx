import NavItems from "../nav-items";
import { TypographyH4 } from "../typography/h4";
import UserAvatar from "../user-avatar";

export default function Sidebar() {
  return (
    <aside role="menubar" className="w-[240px] flex flex-col justify-between h-full border-r px-4 py-6">
      <TypographyH4>Chatify</TypographyH4>
      <NavItems />
      <UserAvatar />
    </aside>
  );
}
