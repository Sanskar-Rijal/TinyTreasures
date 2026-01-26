import { Link } from "react-router-dom";

function Badge({ children, variant = "default", className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap w-fit transition-colors";

  const variants = {
    default: "bg-purple-600 text-white border-transparent hover:bg-purple-700",
    secondary: "bg-purple-100 text-purple-700 border-transparent ", //hover:bg-purple-200
    destructive: "bg-red-600 text-white border-transparent hover:bg-red-700",
    outline: "border-gray-300 text-gray-900 hover:bg-gray-100",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
}

export default Badge;
