import { Images } from "@assets/images";
import clsx from "clsx";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
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

  inputIcon?: string;

  inputElement?: ReactElement;

  /**
   * Default: ''
   */
  inputIconClassName?: string;

  /**
   * Default: ''
   */
  inputElementClassName?: string;

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
  inputIcon,
  inputIconClassName = "",
  inputElement,
  inputElementClassName = "",
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
        className={`box-border max-w-xs w-full ${className}`}
        style={{ width }}
      >
        <div className="w-full flex relative">
          <input
            id={id}
            className={clsx(
              `w-full outline-none px-4 py-1 h-[36px] leading-[36px] align-baseline border border-solid border-[#3A466480] border-opacity-[0.5] rounded-lg ${inputClassName}`,
              {
                "bg-[#A1A2A880]": disabled,
                "border border-solid border-[#D6000080]": isError,
                "pr-8": type === "password",
                "pl-[37px]": !!inputIcon || !!inputElement,
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
          {inputIcon && (
            <img
              className={`absolute w-4 h-4 left-[11px] top-[15px] ${inputIconClassName}`}
              src={inputIcon}
              alt=""
            />
          )}
          {inputElement && (
            <div
              className={`absolute w-4 h-4 left-3 top-2 ${inputElementClassName}`}
            >
              {inputElement}
            </div>
          )}
          {type === "password" && (
            <div
              className="absolute right-0 pr-[10px] h-full flex items-center cursor-pointer"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <img src={Images.EyeSlashIcon.default} alt="" />
              ) : (
                <img src={Images.EyeIcon.default} alt="" />
              )}
            </div>
          )}
        </div>
        {isError && (
          <div className={`flex text-[#D60000B2] ${errorClassName}`}>
            {formik &&
              formik.getFieldMeta(name!).error &&
              formik.getFieldMeta(name!).error}
          </div>
        )}
      </div>
    </>
  );
}

export default Input;
