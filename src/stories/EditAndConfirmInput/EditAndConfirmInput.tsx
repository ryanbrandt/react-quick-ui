import {
  type FunctionComponent,
  type HTMLInputTypeAttribute,
  useState,
  type JSX,
} from "react";

import createCompositeClassname from "@utilities/createCompositeClassName";
import Input, {
  type IInputError,
  type InputSize,
} from "@utilities/Components/Input";
import PencilSvg from "@svgs/PencilSvg/PencilSvg";
import CheckSvg from "@svgs/CheckSvg/CheckSvg";

export interface Props {
  /**
   * Value to display within the input
   */
  value?: string;

  /**
   * Function to be executed on value change
   */
  onChange?: (date: string) => void;

  /**
   * An optional handler to invoke when the editing has been initiated
   */
  onEditClick?: () => void;

  /**
   * An optional handler to invoke when the editing has been confirmed
   */
  onConfirmClick?: () => void;

  /**
   * Flag denoting if editing should be disabled
   *
   * @default false
   */
  editDisabled?: boolean;

  /**
   * Flag denoting if confirming the applied edits should be disabled
   *
   * @default false
   */
  confirmDisabled?: boolean;

  /**
   * An optional label to display
   */
  label?: string;

  /**
   * An optional error to apply
   */
  error?: string | IInputError;

  /**
   * An optional CSS classname to apply
   *
   *  @default ""
   */
  className?: string;

  /**
   * The semantic type of the input
   *
   */
  inputType: HTMLInputTypeAttribute;

  /**
   * The optional input element size
   *
   * @default lg
   */
  size?: InputSize;
}

const BaseEditAndConfirmInput: FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const {
    value,
    onChange,
    onConfirmClick,
    onEditClick,
    label,
    inputType,
    error,
    size = "lg",
    className = "",
    editDisabled = false,
    confirmDisabled = false,
  } = props;

  const confirmIconClassNames = createCompositeClassname({
    "edit-and-confirm-input__confirm-icon": true,
    "edit-and-confirm-input__confirm-icon__disabled": confirmDisabled,
  });

  const editIconClassNames = createCompositeClassname({
    "edit-and-confirm-input__edit-icon": true,
    "edit-and-confirm-input__edit-icon__disabled": editDisabled,
  });

  const [editingActive, setEditingActive] = useState(false);

  const handleConfirmClick = (): void => {
    if (onConfirmClick) {
      onConfirmClick();
    }

    setEditingActive(false);
  };

  const handleEditClick = (): void => {
    if (onEditClick) {
      onEditClick();
    }

    setEditingActive(true);
  };

  return (
    <Input
      className={className}
      value={value}
      onChange={onChange}
      inputType={inputType}
      size={size}
      label={label}
      error={error}
      disabled={!editingActive}
      icon={{
        position: "right",
        icon: editingActive ? (
          <CheckSvg
            className={confirmIconClassNames}
            onClick={handleConfirmClick}
          />
        ) : (
          <PencilSvg className={editIconClassNames} onClick={handleEditClick} />
        ),
      }}
    />
  );
};

export default BaseEditAndConfirmInput;
