import { FunctionComponent, HTMLInputTypeAttribute, useId } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

export type InputSize = "sm" | "md" | "lg" | "xlg" | "xlg2" | "xlg3";

export interface IInputError {
  error: boolean;
  text?: string;
}

interface Props {
  /**
   * String representing the input value.
   * Value, should be controlled (e.g. on parent component state).
   *
   * Note: Input type="date" inputs must be in the format format "YYYY-MM-DD".
   *
   * @default ""
   */
  value?: string;

  /**
   * Function to be executed on value change
   *
   * @default (() => null)
   */
  onChange?: (value: string) => void;

  /**
   * The optional input element
   *
   * @see HTMLInputTypeAttribute
   */
  inputType: HTMLInputTypeAttribute;

  /**
   * The optional input element size
   *
   * @default md
   */
  size?: InputSize;

  /**
   * An optional label to display above the input
   *
   */
  label?: string;

  /**
   * Optional error object containing a flag to trigger error styling
   * and an optional string to display as an error message
   *
   */
  error?: string | IInputError;

  /**
   * An optional flag controlling if the input is in a disabled state
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * An optional string for use as a placeholder when
   *  {@link inputType} is {text | search | url| tel | email | password}
   *
   */
  placeholder?: string;

  /**
   * An optional string to set the minimum value when {@link inputType}
   *  is a numerical input type including { number | range | date }
   *
   * Note: when {@link inputType}="date" the format "YYYY-MM-DD" is required for this property
   *
   */
  min?: string;

  /**
   * An optional string to set the maximum value when {@link inputType}
   * is a numerical input type including { number | range | date }
   *
   * Note: when {@link inputType}="date" the format "YYYY-MM-DD" is required for this property
   *
   */
  max?: string;

  /**
   * An optional string to set the wrapper class on Input
   */
  className?: string;
}

const Input: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    inputType,
    label,
    placeholder,
    min,
    max,
    value = "",
    onChange = () => null,
    disabled = false,
    size = "md",
    className = "",
  } = props;

  const inputId = useId();

  let { error } = props;
  if (typeof error === "string") {
    error = {
      error: true,
      text: error,
    };
  }

  const classNames = createCompositeClassName({
    input: true,
    [`input--${size}`]: true,
    [className]: true,
  });

  const inputClassNames = createCompositeClassName({
    input__input: true,
    "input__input--error": !!error?.error,
  });

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClassNames}
        type={inputType}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      {error?.text && (
        <span className="input__error-message">{error.text}</span>
      )}
    </div>
  );
};

export default Input;
