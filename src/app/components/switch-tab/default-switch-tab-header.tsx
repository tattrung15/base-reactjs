import clsx from "clsx";
import { SwitchTabHeaderProps, TabConfig } from "./switch-tab";

export default function DefaultSwitchTabHeader(props: SwitchTabHeaderProps) {
  const { activeTabId, tabs, handleChangeTab } = props;

  return (
    <div className="overflow-x-auto">
      <ul className="flex border-b pt-2 border-solid border-[#dadada]">
        <div className="flex-none w-2"></div>

        {tabs.map((tab: TabConfig, index: number) => (
          <li
            id={tab.id}
            tabIndex={tab?.tabIndex}
            className={clsx(
              "h-9 min-w-fit flex justify-center px-2 border border-solid border-[#dadada] border-b-0 items-center text-black rounded-t-md cursor-pointer",
              {
                "bg-[#83cc74]": activeTabId === tab.id,
                "bg-white": activeTabId !== tab.id,
                "pointer-events-none": tab.disabled,
                "opacity-60": tab.disabled,
              }
            )}
            key={index}
            onClick={handleChangeTab(tab.id)}
          >
            <span>{tab.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
