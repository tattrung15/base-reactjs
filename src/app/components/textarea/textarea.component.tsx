import { ChangeEvent, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { FormControlChildProps } from "../form-control";

export interface TextAreaProps extends FormControlChildProps {
  value?: number | string;

  defaultValue?: string | number;

  /**
   * Default: undefined
   */
  defaultStatus?: undefined | "valid" | "inValid" | "warn";

  /**
   * Default: 200px
   */
  width?: number | string;

  /**
   * Default: 100px
   */
  height?: number | string;

  className?: string;

  errorClassName?: string;

  textAreaClassName?: string;

  placeholder?: string;

  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({
  formik,
  id = undefined,
  value = "",
  name = "",
  placeholder,
  disabled = false,
  width = 200,
  height = 100,
  className = "",
  textAreaClassName = "",
  status,
  defaultStatus = undefined,
  errorClassName = "",
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
}: TextAreaProps) {
  const [txaValue, setTxaValue] = useState(value || "");
  const [_status, changeStatus] = useState(status || defaultStatus);

  useEffect(() => {
    changeStatus(status || defaultStatus);
  }, [defaultStatus, status]);

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [fmOnBlur, onBlur]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setTxaValue(e.currentTarget.value);
    },
    [fmOnChange, onChange]
  );

  useEffect(() => {
    setTxaValue(value || "");
  }, [value]);

  const isError = _status === "inValid" || _status === "warn";

  return (
    <div className={`${className}`} style={{ width, height }}>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className={clsx(
          `w-full min-h-[80px] h-full box-border mt-2 border border-solid border-[#bdbdbd] pl-2 py-2 rounded outline-none
            ${textAreaClassName}`,
          {
            "border border-solid border-[#FF0000] !bg-[#fce4ec]": isError,
          }
        )}
        value={txaValue}
        disabled={disabled}
        onBlur={handleBlur}
        onChange={handleChange}
      />
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

export default TextArea;
