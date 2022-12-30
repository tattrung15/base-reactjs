import clsx from "clsx";

interface SidebarItemProps {
  name: string;

  isChecked: boolean;

  labelClassName?: string;

  onClick?: () => void;
}

function SidebarItem({
  name,
  isChecked,
  onClick,
  labelClassName = "",
}: SidebarItemProps) {
  return (
    <div
      className={clsx(
        { "bg-[#39ac66]": isChecked },
        { "text-white": isChecked },
        { "text-[#666]": !isChecked },
        "flex justify-center items-center border-b border-solid border-[#dadada] cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex w-full font-normal py-3.5 pl-4 pr-2 justify-between">
        <span className={`text-[15px] ${labelClassName}`}>{name}</span>
      </div>
    </div>
  );
}

export default SidebarItem;
