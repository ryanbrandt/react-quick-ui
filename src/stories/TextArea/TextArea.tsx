import {
  type FunctionComponent,
  type ChangeEvent,
  type JSX,
  useId,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

interface Props {
  /**
   * Optional text to display within the text area
   *
   * @default ""
   */
  value?: string;

  /**
   * An optional flag, which, when provided, will label the text area
   */
  placeholder?: string;

  /**
   * An optional label to apply to the text area
   */
  label?: string;

  /**
   * An optional string, which, when provided, will display a styled error
   */
  error?: string;

  /**
   * An optional flag, which, when true, will style the text area as disabled
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * An optional change handler which will be invoked when the input is changed
   *
   * @default (() => null)
   */
  onChange?: (text: string) => void;

  /**
   * An optional id for the textarea element, which {@link label} is linked to
   *
   * @default a unique id from React's useId
   */
  id?: string;
}

const TextArea: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    value = "",
    disabled = false,
    onChange = () => null,
    error,
    label,
    placeholder,
    id,
  } = props;

  const generatedId = useId();
  const textAreaId = id ?? generatedId;

  const textAreaClassNames = createCompositeClassName({
    textArea__content__input: true,
    "textArea__content__input--error": !!error,
  });

  return (
    <div className="textArea">
      {label && (
        <label htmlFor={textAreaId} className="textArea__content__label">
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        className={textAreaClassNames}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.currentTarget.value)
        }
        value={value}
        disabled={disabled}
      />
      {error && <div className="textArea__content__error">{error}</div>}
    </div>
  );
};

export default TextArea;
