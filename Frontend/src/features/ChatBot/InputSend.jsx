import { LuSend } from "react-icons/lu";
import Button from "../../ui/Button";

function InputSend({
  inputValue,
  handleKeyPress,
  onChange,
  isLoading,
  onSend,
  inputRef,
}) {
  return (
    <>
      <div className="flex gap-2 border-t border-gray-200 bg-white p-4">
        <input
          ref={inputRef}
          disabled={isLoading}
          value={inputValue}
          onKeyPress={handleKeyPress}
          onChange={onChange}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-2 py-2 text-gray-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          type="text"
          placeholder="Type your message here ...."
        />
        <Button
          onClick={onSend}
          disabled={!inputValue.trim()}
          size="lg"
          className="inline-flex cursor-pointer items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuSend className="h-4 w-4" />
        </Button>
      </div>
      <p className="mb-2 text-center text-xs text-gray-500">
        Powered by APRIL • APRIL can make mistakes.
      </p>
    </>
  );
}

export default InputSend;
