import type { FunctionComponent, JSX } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Input, {
  type InputProps,
  type InputSize,
} from "@utilities/Components/Input";
import SearchSvg from "@svgs/SearchSvg/SearchSvg";

interface Props extends Pick<
  InputProps,
  "id" | "value" | "onChange" | "placeholder" | "disabled"
> {
  /**
   * Optional size for the search input
   *
   * @see InputSize
   * @default xlg
   */
  size?: InputSize;

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
    id,
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
        id={id}
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
