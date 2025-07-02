import { Button } from "./button";
import { Input } from "./input";

export const InputWithButton = () => {
  return (
    <div className="flex w-full max-w-2xl items-center p-2 gap-2">
      <Input type="text" placeholder="Search Books.." />
      <Button
        type="button"
        variant={"outline"}
        className="hover:cursor-pointer"
      >
        Search
      </Button>
    </div>
  );
};
