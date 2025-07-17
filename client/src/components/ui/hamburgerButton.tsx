import { Button } from "./button";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ open, onClick }: HamburgerButtonProps) => {
  return (
    <>
      <Button
        variant={"link"}
        className="flex items-center justify-center w-8 h-8 relative"
        onClick={onClick}
        aria-label="Toggle menu"
      >
        <span
          className={`absolute w-6 h-0.5 bg-white rounded transition-all duration-300 ${
            open ? "rotate-45" : "-translate-y-1.5"
          }`}
        ></span>
        <span
          className={`absolute w-6 h-0.5 bg-white rounded transition-all duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`absolute w-6 h-0.5 bg-white rounded transition-all duration-300 ${
            open ? "-rotate-45" : "translate-y-1.5"
          }`}
        ></span>
      </Button>
    </>
  );
};
