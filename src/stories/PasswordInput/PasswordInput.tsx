import { FunctionComponent } from "react";

import Input, {
  IInputError,
  InputSize,
} from "@utilities/Components/Input/Input";

interface Props {
  /**
   * String value prop - Value should be controlled on parent component state
   */
  value?: string;

  /**
   * Function to be executed on value change
   */
  onChange?: (value: string) => void;

  /**
   * The optional input size
   * @see InputSize
   */
  size?: InputSize;

  /**
   * An optional label to display above the input
   */
  label?: string;

  /**
   * Optional error object containing a flag and an optional message
   * @see IInputError
   */
  error?: string | IInputError;

  /**
   * An optional flag controlling if the input is in a disabled state

   */
  disabled?: boolean;

  /**
   * An optional placeholder string to be displayed in the input
   * before a password is entered
   */
  placeholder?: string;

  /**
   * An optional CSS classname to apply to the input for custom styling
   */
  className?: string;
}

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
  } = props;

  return (
    <Input
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
