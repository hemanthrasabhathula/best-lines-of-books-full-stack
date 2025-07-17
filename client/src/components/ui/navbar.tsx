import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "@/assets/logo/Blob_logo.png";
import { HamburgerButton } from "./hamburgerButton";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <nav className="w-full bg-gray-800 text-white shadow-lg top-0 z-auto">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-2 px-4">
        {/* Left side links (desktop) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem asChild>
              <Link to="/" className="text-white">
                <div className="flex items-center gap-2">
                  <img
                    src={Logo}
                    alt="BLOB Logo"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">BLOB</div>
                    <div className="text-gray-400 text-sm">
                      Best Lines of Books
                    </div>
                  </div>
                </div>
              </Link>
            </NavigationMenuItem>
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
        <div className="md:hidden flex justify-between items-center w-full ">
          <Link to="/" className="text-white">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="BLOB Logo"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-lg font-semibold">BLOB</div>
                <div className="text-gray-400 text-sm">Best Lines of Books</div>
              </div>
            </div>
          </Link>
          {/* Hamburger button */}
          <div className="flex md:hidden p-2">
            <HamburgerButton open={open} onClick={toggleMenu} className="w-6" />
          </div>
          {/* <button onClick={toggleMenu} aria-label="Open menu">
            <Menu size={28} />
          </button> */}
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
            ? "max-h-60 pb-4 opacity-100"
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
