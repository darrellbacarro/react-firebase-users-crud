import PropTypes from "prop-types";
import { forwardRef } from "react";

const FormInput = forwardRef((props, ref) => {
  return (
    <div className="input-group-grid">
      <label htmlFor={props.id}>{props.label}</label>
      {props.customInput ?? (
        <input
          name={props.id}
          id={props.id}
          ref={ref}
          autoFocus={props.autoFocus !== undefined}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          type={props.type ?? "text"}
        />
      )}
      {props.extraSpan !== undefined && <span></span>}
    </div>
  );
});

FormInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  extraSpan: PropTypes.bool,
  customInput: PropTypes.node,
  ref: PropTypes.any,
};

export default FormInput;
