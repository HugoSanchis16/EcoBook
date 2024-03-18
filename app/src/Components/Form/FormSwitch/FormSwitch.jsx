import classNames from "classnames";
import { useState } from "react";
import {
  FormCheck as BFormCheck,
  Col,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

const FormSwitch = ({
  vertical = true,
  title,
  controlId,
  maxLength = 50,
  showMaxLength = true,
  onChange,
  value = "",
  required,
  inputClassname,
  formGroupProps = { className: "mb-2 w-100" },
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value || "");

  const lengthClassName = classNames(
    "d-flex text-muted justify-content-end align-items-center me-2 fw-bold",
    {
      "text-danger": currentValue.length === maxLength,
      "text-warning": currentValue.length > maxLength - 5,
    }
  );

  const handleValue = (e) => {
    const { value } = e.target;
    if (maxLength !== undefined && value.length <= maxLength) {
      setCurrentValue(value);
      onChange(e);
    }
  };

  const renderInput = () => {
    const inputClassName = classNames(
      "w-100 border rounded-3 d-flex ",
      {
        "align-items-center": props.as !== "textarea",
        "align-items-end": props.as === "textarea",
      },
      inputClassname
    );

    const inputEditorClassName = classNames("border-0", props.className);

    return (
      <div className={inputClassName}>
        <BFormCheck
          {...props}
          className={inputEditorClassName}
          style={{
            ...props.style,
            resize: props.as === "textarea" ? "none" : "vertical",
          }}
          checked={value || currentValue}
          onChange={handleValue}
        />
        {showMaxLength && (
          <small className={lengthClassName}>
            {currentValue.length}/{maxLength}
          </small>
        )}
      </div>
    );
  };

  const renderHorizontalLayout = () => (
    <FormGroup
      controlId={controlId}
      className={formGroupProps?.className || "mb-2 w-100"}
    >
      <Row>
        <Col
          sm={12}
          lg={4}
          className="d-flex justify-content-start align-items-start pt-2"
        >
          {title && (
            <FormLabel className="mb-0">
              {title} {required && <span className="text-danger">*</span>}
            </FormLabel>
          )}
        </Col>
        <Col
          sm={12}
          lg={8}
          className="d-flex justify-content-start align-items-center"
        >
          {renderInput()}
        </Col>
      </Row>
    </FormGroup>
  );
  const renderVerticalLayout = () => (
    <FormGroup
      controlId={controlId}
      className={formGroupProps?.className || "mb-2 w-100"}
    >
      {title && (
        <FormLabel className="mb-0">
          {title} {required && <span className="text-danger">*</span>}
        </FormLabel>
      )}
      {renderInput()}
    </FormGroup>
  );

  return vertical ? renderVerticalLayout() : renderHorizontalLayout();
};

export default FormSwitch;
