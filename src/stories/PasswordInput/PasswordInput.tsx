import type { FunctionComponent, JSX } from "react";

import Input, { type InputProps } from "@utilities/Components/Input";

type Props = Pick<
  InputProps,
  | "id"
  | "value"
  | "onChange"
  | "size"
  | "label"
  | "error"
  | "disabled"
  | "placeholder"
  | "className"
>;

const PasswordInput: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    value,
    onChange,
    size,
    label,
    error,
    disabled,
    placeholder,
    className,
    id,
  } = props;

  return (
    <Input
      id={id}
      value={value}
      onChange={onChange}
      inputType="password"
      size={size}
      label={label}
      disabled={disabled}
      placeholder={placeholder}
      error={error}
      className={className}
    />
  );
};

export default PasswordInput;
