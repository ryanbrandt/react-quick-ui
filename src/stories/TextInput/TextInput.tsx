import type { FunctionComponent, JSX } from "react";

import Input, {
  type IInputError,
  type InputSize,
} from "@utilities/Components/Input";
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

  /**
   * An optional id for the input element, which the label is linked to
   *
   * @default a unique id from React's useId
   */
  id?: string;
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
    id,
  } = props;

  const textInputClassNames = createCompositeClassName({
    textInput: true,
    [className]: true,
  });

  return (
    <Input
      id={id}
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
