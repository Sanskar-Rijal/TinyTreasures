import { FiHelpCircle } from "react-icons/fi";

function ReturnItem({ returnProcess }) {
  return (
    <div>
      <div className="rounded-lg border border-gray-200 bg-white/80 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-600">
            <span className="font-semibold text-white">
              {returnProcess.step}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg sm:text-xl">{returnProcess.title}</h3>
            <p className="text-gray-600">{returnProcess.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnItem;
