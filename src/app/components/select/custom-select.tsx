import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import useOnClickOutside from "@core/hooks/use-on-click-outside.hook";
import { FormControlChildProps } from "../form-control";
import { NormalSelectOptions } from "./select.type";

export interface SelectProps extends FormControlChildProps {
  arrow?: ReactNode;

  value?: number | string;

  defaultValue?: string | number;

  options: NormalSelectOptions;

  width?: number | string;

  /**
   * Default: ''
   */
  className?: string;

  /**
   * Default: ''
   */
  optionClassName?: string;

  /**
   * Default: ''
   */
  labelSelectedClassName?: string;

  /**
   * Default: ''
   */
  optionContainerClassName?: string;

  errorClassName?: string;

  placeholder?: string;

  /**
   * Default: false
   * @description using if you want to change background color when hover over it
   */
  hasBgColorHover?: boolean;

  /**
   * Default: undefined
   */
  defaultStatus?: undefined | "valid" | "inValid" | "warn";

  onChange?: (e: number | string) => void;
}

export function CustomSelect({
  formik,
  status,
  defaultStatus = undefined,
  name,
  arrow,
  value,
  defaultValue,
  options = [],
  width,
  className = "",
  labelSelectedClassName = "",
  placeholder = "",
  optionClassName = "",
  optionContainerClassName = "",
  errorClassName = "",
  hasBgColorHover = false,
  disabled,
  onChange,
  fmOnChange,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(undefined);
  const [_status, changeStatus] = useState(status || defaultStatus);
  const [isOpen, setIsOpen] = useState(false);
  const selectBoxRef = useRef(null);

  useOnClickOutside(selectBoxRef, () => {
    setIsOpen(false);
    formik?.setFieldTouched(name as string, true);
  });

  const handleChange = useCallback(
    (val: number | string) => {
      onChange && onChange(val);

      fmOnChange && fmOnChange(val);

      setSelectedValue(val);
      formik?.setFieldValue(name as string, val);
      setIsOpen(false);
    },
    [fmOnChange, formik, name, onChange]
  );

  useEffect(() => {
    setSelectedValue(value || defaultValue);
  }, [defaultValue, value]);

  useEffect(() => {
    changeStatus(status || defaultStatus);
  }, [defaultStatus, status]);

  const isError = _status === "inValid" || _status === "warn";

  const getLabel = useCallback(
    (selectedValue: string | number) => {
      const currentOption = options.find(
        (item) => item.value === selectedValue
      );

      if (!currentOption) return "";

      return currentOption ? currentOption.label : "";
    },
    [options]
  );

  return (
    <div className="relative">
      <div
        className={clsx(
          `flex items-center mt-2 border border-solid border-black rounded h-9 cursor-pointer ${className}`,
          { "!border-[#50b83c]": isOpen, "!border-[#adadad]": disabled }
        )}
        style={{ width }}
        onClick={() => {
          if (disabled) {
            setIsOpen(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div
          className={clsx(
            `flex flex-1 items-center justify-start mx-2 leading-[1.5] ${labelSelectedClassName}`,
            {
              "text-[#6b6b6b]": disabled,
            }
          )}
        >
          {!selectedValue ? placeholder : getLabel(selectedValue)}
        </div>

        {arrow}
      </div>

      {isOpen && (
        <div
          className={`z-10 top-9 max-h-[320px] overflow-x-hidden overflow-y-auto absolute bg-white border border-solid border-[#e0e0e0]
          shadow-[0_4px_8px_0_rgb(0,0,0,10%),0_2px_4px_0_rgb(0,0,0,10%),0_0_0_1px_rgb(0,0,0,5%)] ${optionContainerClassName}`}
          ref={selectBoxRef}
        >
          {options.map(({ label, value }, index) => (
            <div
              className={clsx(
                `bg-white cursor-pointer flex items-center min-h-[44px] w-full flex-1 ${optionClassName}`,
                {
                  "!bg-[#50b83c] text-white": selectedValue === value,
                },
                {
                  "hover:bg-[#0081ca1a]":
                    selectedValue !== value && hasBgColorHover,
                }
              )}
              key={index}
              onClick={() => handleChange(value)}
            >
              {label}
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className={`flex text-[#FF0000] ${errorClassName}`}>
          {formik &&
            formik.getFieldMeta(name!).error &&
            formik.getFieldMeta(name!).error}
        </div>
      )}
    </div>
  );
}
