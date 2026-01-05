import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Button from "./Button";

function QuantitySelector() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-1 py-1">
      <Button
        size="lg"
        variant="back"
        className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        <IoMdRemove className="h-5 w-5" />
      </Button>
      <span>2</span>
      <Button
        size="lg"
        variant="back"
        className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        <IoMdAdd className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default QuantitySelector;
