import type { FunctionComponent, JSX } from "react";

import Input, {
  type InputProps,
  type InputSize,
} from "@utilities/Components/Input";
import createCompositeClassName from "@utilities/createCompositeClassName";

interface Props extends Pick<
  InputProps,
  "id" | "value" | "onChange" | "label" | "placeholder" | "disabled" | "error"
> {
  /**
   * An optional text input size
   *
   * @see InputSize
   * @default lg
   */
  size?: InputSize;

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
