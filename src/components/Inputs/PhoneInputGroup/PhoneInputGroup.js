import PhoneInput from "react-phone-number-input";

/**
 * @link https://gitlab.com/catamphetamine/react-phone-number-input/-/tree/master?ref_type=heads
 *
 */
export const PhoneInputGroup = ({ value, onChange }) => {
  return (
    <PhoneInput
      className="rounded border-body border p-3 "
      defaultCountry="US"
      countries={["US"]}
      addInternationalOption={false}
      international={false}
      limitMaxLength={true}
      numberInputProps={{
        placeholder: "Enter phone number",
        style: {
          outline: "none"
        }
      }}
      value={value}
      onChange={onChange}
    />
  );
};
