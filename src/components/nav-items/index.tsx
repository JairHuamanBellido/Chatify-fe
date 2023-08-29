import { cn } from "@/lib/utils";
import { IMenuLink } from "@/src/interfaces/IMenuLink";
import { MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: IMenuLink[] = [
  {
    href: "/dashboard",
    label: "Chats",
    icon: <MessageSquare className="text-inherit h-4 w-4 mr-2" />,
  },
];
export default function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="mt-12 h-full ">
      <ul className="flex flex-col gap-y-3">
        {navItems.map((navItem) => (
          <li key={`menu-${navItem.label}`}>
            <Link
              aria-current={pathname === navItem.href ? "true" : "false"}
              className={cn(
                pathname === navItem.href
                  ? "bg-primary/5 text-primary"
                  : "hover:bg-transparent hover:underline text-primary/60",
                "inline-flex py-2 px-4 w-full rounded items-center",
                "text-sm font-medium"
              )}
              role="menuitem"
              href={navItem.href}
            >
              {navItem.icon}
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
