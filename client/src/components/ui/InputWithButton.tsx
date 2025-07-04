import { useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface InputWithButtonProps {
  setSearch: (value: string) => void;
}

export const InputWithButton = ({ setSearch }: InputWithButtonProps) => {
  console.log("InputWithButton rendered");

  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    console.log("Input value:", input);
    setSearch(input);
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      console.log("Button click input value:", inputValue);
      setSearch(inputValue);
    }
  };

  return (
    <div className="flex w-full max-w-2xl items-center p-2 gap-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search Books.."
        onInput={handleInput}
      />
      <Button
        type="button"
        variant={"outline"}
        className="hover:cursor-pointer"
        onClick={handleButtonClick}
      >
        Search
      </Button>
    </div>
  );
};
