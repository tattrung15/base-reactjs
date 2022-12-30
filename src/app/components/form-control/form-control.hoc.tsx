import React, { ReactElement } from "react";
import {
  useField,
  useFormikContext,
  FieldHookConfig,
  FormikContextType,
} from "formik";
import { ControlStaticType } from "./form-control.type";

export interface FormControlProps {
  id?: string;
  name: string;
  children?: React.ReactNode;
  fromDataTable?: boolean;
  onBlur?: (e?: any) => void;
  onChange?: (e?: any) => void;
}

export interface FormControlChildProps {
  id?: string;

  name?: string;

  value?: any;

  /**
   * Formik on change
   */
  fmOnChange?: (e?: any) => void;

  /**
   * Formik on blur
   */
  fmOnBlur?: (e?: any) => void;

  /**
   * World has many colors, so do `e` variable :V
   */
  onChange?: (e?: any) => void;

  onBlur?: (e?: any) => void;

  /**
   * Default: undefined.
   */
  status?: undefined | "inValid" | "valid" | "warn";

  /**
   * Default: undefined.
   */
  checked?: boolean;

  /**
   * Default: false.
   */
  disabled?: boolean;

  formik?: FormikContextType<any>;

  shouldValidate?: boolean;
}

export function FormControl(props: FormControlProps) {
  const formik = useFormikContext();

  const child = React.Children.toArray(props.children)[0] as ReactElement;

  const fieldType =
    (child.type as any).staticType ?? (child.type as any)?.render?.staticType;

  const fieldOptions = {
    name: props.name,
    type:
      (child.type as any).staticType ?? (child.type as any)?.render?.staticType,
  } as FieldHookConfig<any>;

  const meta = useField(fieldOptions)[1];

  const hasError = meta.error ? "inValid" : "valid";

  const status = formik.getFieldMeta(props.name).error
    ? props.fromDataTable
      ? formik.dirty
        ? hasError
        : undefined
      : meta.touched
      ? hasError
      : undefined
    : undefined;

  const handleOnChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const fieldProps = formik.getFieldProps(props.name);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      let checked = false;
      let fmOnChange = formik.handleChange;

      if (fieldType === ControlStaticType.CHECKBOX) {
        checked =
          fieldProps.value &&
          fieldProps.value.push &&
          fieldProps.value.indexOf(child.props.value) !== -1;

        fmOnChange = (e: any) => {
          const fieldProps = formik.getFieldProps(props.name);

          if (typeof fieldProps.value === "boolean") {
            formik.setFieldValue(props.name, !fieldProps.value);
          } else {
            const newValues = [...fieldProps.value] as any[];

            if (e.target.checked) {
              newValues.push(e.target.value);
            } else {
              const deleteIndex = newValues.indexOf(e.target.value);

              newValues.splice(deleteIndex, 1);
            }

            formik.setFieldValue(props.name, newValues);
          }
        };
      } else if (fieldType === ControlStaticType.RADIO) {
        // see: https://github.com/formium/formik/issues/1191
        checked = `${child.props.value}` === `${fieldProps.value}`;
      }

      const childProps: FormControlChildProps = {
        id: props.id,
        name: props.name,
        status,
        checked,
        formik,
        value: meta.value,
        shouldValidate: !!meta.error,
        fmOnChange,
        fmOnBlur: formik.handleBlur,
        onChange: handleOnChange,
        onBlur: props.onBlur,
        ...child.props,
      };

      return React.cloneElement(child, childProps);
    }

    return child;
  });

  return <>{childrenWithProps}</>;
}
