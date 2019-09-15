import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";

const ExpressionInput = ({ expression, setExpression }) => {
  const handleChange = e => {
    setExpression(e.target.value);
  };
  return (
    <FormGroup
      helperText="Введите выражение..."
      label="y="
      labelFor="text-input"
      inline
    >
      <InputGroup
        id="text-input"
        placeholder="2+x"
        value={expression}
        onChange={handleChange}
      />
    </FormGroup>
  );
};

export default ExpressionInput;
