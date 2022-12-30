import clsx from "clsx";

interface ButtonProps {
  id?: string;

  label: string;

  /**
   * Default: 'button'
   */
  type?: "button" | "submit" | "reset";

  /**
   * Default: 's'
   */
  size?: "xs" | "s" | "m" | "l";

  /**
   * Default: 'primary'
   */
  theme?: "primary" | "secondary" | "tertiary" | "danger" | "none";

  /**
   * Default: false
   */
  disabled?: boolean;

  onClick?: () => void;

  /**
   * Default: ""
   */
  className?: string;

  /**
   * Default: ''
   */
  containerClassName?: string;

  width?: number | string;
}

function Button({
  id,
  label,
  type = "button",
  className = "",
  containerClassName = "",
  theme = "primary",
  size = "s",
  disabled = false,
  onClick = () => {},
  width = 80,
}: ButtonProps) {
  return (
    <div style={{ width }} className={`${containerClassName}`}>
      <button
        className={clsx(`w-full rounded ${className}`, {
          "leading-[26px]": size === "xs",
          "h-[26px]": size === "xs",
          "leading-[36px]": size === "s",
          "h-[36px]": size === "s",
          "leading-[48px]": size === "m",
          "h-[48px]": size === "m",
          "leading-[60px]": size === "l",
          "h-[60px]": size === "l",
          "hover:bg-[#50b83c] hover:text-white": theme === "primary",
          "border border-solid border-[#50b83c]": theme === "primary",
          "hover:bg-[#e60000] hover:text-white": theme === "danger",
          "border border-solid border-[#e60000]": theme === "danger",
          "bg-[#29b6f6] hover:bg-[#81d4fa]": theme === "tertiary",
          "bg-white": theme === "secondary",
          "border border-solid border-[#29a2ea]": theme === "secondary",
          "!bg-[#dadada] text-white": disabled,
        })}
        id={id}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
