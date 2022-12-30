import clsx from "clsx";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { FormControlChildProps } from "../form-control";
import { NormalSelectOptions } from "./select.type";

export interface SelectProps extends FormControlChildProps {
  value?: number | string;

  defaultValue?: string | number;

  options: NormalSelectOptions;

  width?: number | string;

  className?: string;

  classNameSelect?: string;

  classNameOption?: string;

  errorClassName?: string;

  placeholder?: string;

  /**
   * Default: undefined
   */
  defaultStatus?: undefined | "valid" | "inValid" | "warn";

  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;

  onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  id,
  formik,
  status,
  defaultStatus = undefined,
  name,
  value,
  defaultValue,
  options = [],
  width,
  className,
  classNameSelect = "",
  classNameOption = "",
  errorClassName = "",
  placeholder = "",
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const [_status, changeStatus] = useState(status || defaultStatus);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setSelectedValue(e.currentTarget.value);
    },
    [fmOnChange, onChange]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [fmOnBlur, onBlur]
  );

  useEffect(() => {
    setSelectedValue(value || defaultValue);
  }, [defaultValue, value]);

  useEffect(() => {
    changeStatus(status || defaultStatus);
  }, [defaultStatus, status]);

  const isError = _status === "inValid" || _status === "warn";

  return (
    <>
      <div
        className={clsx(
          `flex mt-2 border border-solid border-[#dadada] h-9 ${className}`
        )}
        style={{ width }}
      >
        <select
          id={id}
          value={selectedValue}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={classNameSelect}
          style={{ width }}
        >
          <option
            value=""
            label={placeholder}
            style={{ display: "none" }}
          ></option>

          {options.map(({ label, value }, index) => (
            <option key={index} value={value} className={classNameOption}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {isError && (
        <div className={`flex text-[#FF0000] ${errorClassName}`}>
          {formik &&
            formik.getFieldMeta(name!).error &&
            formik.getFieldMeta(name!).error}
        </div>
      )}
    </>
  );
}
