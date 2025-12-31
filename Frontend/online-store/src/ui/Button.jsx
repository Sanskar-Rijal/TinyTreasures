import { Link } from "react-router-dom";

function Button({
  children,
  to,
  onClick,
  variant = "default",
  size = "default",
  type = "button",
  className = "",
}) {
  // const base =
  //   "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    ghost: "text-gray-900 hover:bg-purple-200 hover:text-purple-700",
    like: "text-gray-900  hover:bg-white bg-white/80  ",
    link: "text-purple-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3",
    lg: "h-10 px-6",
    icon: "size-9",
  };

  const classes = `  ${variants[variant]} ${sizes[size]} ${className} `;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default Button;
