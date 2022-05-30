import { FunctionComponent } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Input, { InputSize } from "@utilities/Components/Input/Input";
import SearchSvg from "@svgs/SearchSvg/SearchSvg";

interface Props {
  /**
   * Value to display within the Search input
   */
  value?: string;

  /**
   * An change handler which will be invoked when the input is changed
   */
  onChange?: (text: string) => void;

  /**
   * Placeholder text to display within the Search input
   */
  placeholder?: string;

  /**
   * Optional size for the search input
   *
   * @see InputSize
   * @default xlg
   */
  size?: InputSize;

  /**
   * An optional flag, which, when true, will style the search input as disabled
   */
  disabled?: boolean;

  /**
   * An optional CSS classname to apply to the search input
   */
  className?: string;
}

const SearchInput: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    value,
    placeholder,
    onChange,
    disabled,
    size = "xlg",
    className = "",
  } = props;

  const classNames = createCompositeClassName({
    "search-input": true,
    [className]: true,
  });

  return (
    <div className={classNames}>
      <span className="search-input__content__icon">
        <SearchSvg />
      </span>
      <Input
        value={value}
        onChange={onChange}
        inputType="search"
        disabled={disabled}
        placeholder={placeholder}
        size={size}
        className="search-input__baseInput"
      />
    </div>
  );
};

export default SearchInput;
