import React, { useCallback, useState, ComponentType } from "react";
import clsx from "clsx";
import DefaultSwitchTabHeader from "./default-switch-tab-header";
import useIsomorphicLayoutEffect from "@core/hooks/use-isomorphic-layout-effect";

export interface TabConfig {
  id: string;
  label: string;
  content?: string | React.ReactNode;
  disabled?: boolean;
  tabIndex?: number;
}

export interface SwitchTabHeaderProps {
  activeTabId: string;
  handleChangeTab: (tabKey: string) => any;
  tabs: TabConfig[];
}

interface SwitchTabProps {
  activeTabId?: string;
  onTabChange?: (tabKey: string) => void;
  tabs: TabConfig[];
  isRedirectWhenChangeTab?: boolean;
  tabHeader?: ComponentType<SwitchTabHeaderProps>;
}

export default function SwitchTab(props: SwitchTabProps) {
  const defaultActiveTabId =
    props.tabs.find((tab) => !tab.disabled)!.id || props.tabs[0].id;
  const [activeTabId, setActiveTabId] = useState(defaultActiveTabId);

  const { onTabChange } = props;

  useIsomorphicLayoutEffect(() => {
    props.activeTabId && setActiveTabId(props.activeTabId);
  }, [props.activeTabId]);

  const handleChangeTab = useCallback(
    (tabKey: string) => () => {
      onTabChange && onTabChange(tabKey);

      if (props.isRedirectWhenChangeTab) return;

      setActiveTabId(tabKey);
    },
    [onTabChange, props.isRedirectWhenChangeTab]
  );

  return (
    <>
      {props.tabHeader ? (
        <props.tabHeader
          activeTabId={activeTabId}
          handleChangeTab={handleChangeTab}
          tabs={props.tabs}
        />
      ) : (
        <DefaultSwitchTabHeader
          activeTabId={activeTabId}
          handleChangeTab={handleChangeTab}
          tabs={props.tabs}
        />
      )}
      {props.tabs.map((tab, index) => (
        <div
          className={clsx({
            hidden: activeTabId !== tab.id,
          })}
          key={index}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
}
