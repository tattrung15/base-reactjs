import clsx from "clsx";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FormControlChildProps } from "../form-control";

interface InputProps extends FormControlChildProps {
  /**
   * Default: ''
   */
  value?: string;

  /**
   * Default: 'text'
   */
  type?: "text" | "password" | "number";

  /**
   * Default: ''
   */
  defaultValue?: string;

  /**
   * Default: ''
   */
  placeholder?: string;

  /**
   * Default: ''
   */
  className?: string;

  /**
   * Default: ''
   */
  inputClassName?: string;

  errorClassName?: string;

  width?: number | string;

  /**
   * Default: true
   */
  disableAutoComplete?: boolean;

  /**
   * Default: undefined
   */
  defaultStatus?: undefined | "valid" | "inValid" | "warn";

  /**
   * Default: false
   */
  readOnly?: boolean;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;

  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  id,
  formik,
  type = "text",
  value = "",
  defaultValue = "",
  className = "",
  inputClassName = "",
  name,
  disabled = false,
  placeholder = "",
  width,
  disableAutoComplete = true,
  status,
  defaultStatus = undefined,
  readOnly = false,
  errorClassName = "",
  onChange = () => {},
  onBlur,
  fmOnChange,
  fmOnBlur,
  onFocus,
}: InputProps) {
  const [txValue, setTxValue] = useState(value || defaultValue);
  const [_status, changeStatus] = useState(status || defaultStatus);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setTxValue(e.currentTarget.value);

      setTimeout(() => {
        if (formik) formik.setFieldTouched(name!, true);
      });
    },
    [fmOnChange, formik, name, onChange]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [fmOnBlur, onBlur]
  );

  useEffect(() => {
    setTxValue(value || defaultValue);
  }, [defaultValue, value]);

  useEffect(() => {
    changeStatus(status || defaultStatus);
  }, [defaultStatus, status]);

  const isError = _status === "inValid" || _status === "warn";

  return (
    <>
      <div
        className={`box-border max-w-xs mt-2 w-full ${className}`}
        style={{ width }}
      >
        <div
          className={clsx("w-full flex", {
            relative: type === "password",
          })}
        >
          <input
            id={id}
            className={clsx(
              `w-full outline-none px-4 py-1 h-[36px] leading-[36px] align-baseline border border-solid border-[#bdbdbd] rounded ${inputClassName}`,
              {
                "bg-[#dadada]": disabled,
                "border border-solid border-[#FF0000] !bg-[#fce4ec]": isError,
                "pr-8": type === "password",
              }
            )}
            type={isShowPassword ? "text" : type}
            value={txValue || ""}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={disableAutoComplete ? "off" : "on"}
            onFocus={onFocus}
            readOnly={readOnly}
          />
          {type === "password" && (
            <div
              className="absolute right-0 pr-2 h-full flex items-center cursor-pointer"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <i className="fa fa-eye-slash"></i>
              ) : (
                <i className="fa fa-eye"></i>
              )}
            </div>
          )}
        </div>
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

export default Input;
