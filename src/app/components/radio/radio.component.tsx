import { ChangeEvent, useCallback, useRef, useState } from "react";
import { ControlStaticType, FormControlChildProps } from "../form-control";

export interface RadioProps extends FormControlChildProps {
  label?: string;

  value?: string | number;

  defaultChecked?: boolean;

  className?: string;

  labelClassName?: string;

  isMultiLanguage?: boolean;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio({
  id,
  className,
  labelClassName = "",
  label,
  name,
  value,
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  onBlur,
  fmOnChange,
  fmOnBlur,
}: RadioProps) {
  const radioRef = useRef<HTMLInputElement>(null);
  const [innerChecked, setCheckedState] = useState(defaultChecked);
  let isChecked = checked !== undefined ? checked : innerChecked;

  if (radioRef.current && checked === undefined) {
    isChecked = radioRef.current.checked;
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setCheckedState(e.target.checked);
    },
    [fmOnChange, onChange]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [fmOnBlur, onBlur]
  );

  return (
    <label className={`flex items-center ${className}`}>
      <input
        id={id}
        ref={radioRef}
        type="radio"
        value={value}
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <p className={`text-[#666] pl-[10px] text-[15px] ${labelClassName}`}>
        {label}
      </p>
    </label>
  );
}

Radio.staticType = ControlStaticType.RADIO;
