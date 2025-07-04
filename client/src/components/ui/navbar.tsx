import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-800 text-white shadow-lg top-0 z-auto">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        {/* Left side links (desktop) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/addbook">Add Book</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* Hamburger menu (mobile) */}
        <div className="md:hidden flex justify-end items-end w-full ">
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
        {/* Right side link (desktop) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Mobile menu with transition using Tailwind only */}
      <div
        className={`flex flex-col gap-4 bg-gray-800 px-4 items-end overflow-hidden transition-all duration-300 md:hidden ${
          open
            ? "max-h-60 py-4 opacity-100"
            : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col gap-2 items-end">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/addbook" onClick={() => setOpen(false)}>
                  Add Book
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/about" onClick={() => setOpen(false)}>
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};
