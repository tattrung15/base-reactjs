import clsx from "clsx";
import { ChangeEvent, forwardRef, useCallback, useState } from "react";
import { ControlStaticType, FormControlChildProps } from "../form-control";

export interface CheckboxProps extends FormControlChildProps {
  label?: string;

  value?: string;

  /**
   * This property allow client to set initial checked state.
   *
   * Default: false
   */
  defaultChecked?: boolean;

  className?: string;

  labelClassName?: string;

  checkboxClassName?: string;

  isMultiLanguage?: boolean;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxComponent = (props: CheckboxProps, ref: any) => {
  const {
    id,
    formik,
    label,
    name,
    value,
    checked,
    defaultChecked = false,
    disabled = false,
    className = "",
    labelClassName = "",
    checkboxClassName = "",
    status,
    onChange,
    onBlur,
    fmOnChange,
    fmOnBlur,
  } = props;
  const [innerChecked, setCheckedState] = useState(defaultChecked);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setCheckedState(e.target.checked);
    },
    [onChange, fmOnChange]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [onBlur, fmOnBlur]
  );

  const isChecked = checked !== undefined ? checked : innerChecked;

  return (
    <div className="flex-col justify-center">
      <label className={clsx(`flex items-center ${className}`)}>
        <input
          ref={ref}
          id={id}
          value={value}
          name={name}
          className={clsx(`mr-2 ${checkboxClassName}`)}
          type="checkbox"
          disabled={disabled}
          checked={isChecked}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className={clsx(`mt-[2px] ${labelClassName}`)}>{label}</div>
      </label>

      {!!status && (
        <div className="flex items-center mt-1">
          <div className="text-[#c2185b] font-medium">
            {formik &&
              formik.getFieldMeta(name!).error &&
              formik.getFieldMeta(name!).error}
          </div>
        </div>
      )}
    </div>
  );
};

CheckboxComponent.staticType = ControlStaticType.CHECKBOX;

export default forwardRef(CheckboxComponent);
