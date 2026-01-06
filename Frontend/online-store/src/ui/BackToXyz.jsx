import { IoIosArrowBack } from "react-icons/io";
import useMoveBack from "../hooks/useMoveBack";
import Button from "./Button";

function BackToXyz({ label, to }) {
  //go back to previous screeen
  const moveBack = useMoveBack();

  if (to) {
    return (
      <Button
        to={to}
        onClick={moveBack}
        variant="back"
        className="mb-6 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:text-lg"
      >
        <IoIosArrowBack className="h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button
      onClick={moveBack}
      variant="back"
      className="mb-6 inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all hover:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:text-lg"
    >
      <IoIosArrowBack className="h-4 w-4" />
      {label}
    </Button>
  );
}

export default BackToXyz;
