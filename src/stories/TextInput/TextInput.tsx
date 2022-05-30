import { FunctionComponent } from "react";

import Input, {
  IInputError,
  InputSize,
} from "@utilities/Components/Input/Input";
import createCompositeClassName from "@utilities/createCompositeClassName";

interface Props {
  /**
   * An optional value to display within the text input
   *
   */
  value?: string;

  /**
   * An optional label to apply to the text input
   */
  label?: string;

  /**
   * An optional placeholder for the text input
   */
  placeholder?: string;

  /**
   * An optional flag, which, when true, will style the text input as disabled
   */
  disabled?: boolean;

  /**
   * An optional text input size
   *
   * @see InputSize
   * @default lg
   */
  size?: InputSize;

  /**
   * An optional error to apply to the text input
   *
   * @see IInputError
   */
  error?: string | IInputError;

  /**
   * An optional change handler which will be invoked when the input is changed
   */
  onChange?: (text: string) => void;

  /**
   * An optional CSS classname to apply to the text input
   *
   * @default ""
   */
  className?: string;
}

const TextInput: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    value,
    placeholder,
    disabled,
    onChange,
    label,
    size = "lg",
    error,
    className = "",
  } = props;

  const textInputClassNames = createCompositeClassName({
    textInput: true,
    [className]: true,
  });

  return (
    <Input
      value={value}
      onChange={onChange}
      inputType="text"
      size={size}
      label={label}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      className={textInputClassNames}
    />
  );
};

export default TextInput;
