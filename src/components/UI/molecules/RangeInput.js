import React from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";

const RangeInput = ({ className, range, setRange }) => {
  const handleChange = e => {
    if (e.target.name === "from") {
      setRange([e.target.value, range[1]]);
    } else {
      setRange([range[0], e.target.value]);
    }
  };

  return (
    <div className={className}>
      <p>Диапазон значений: </p>
      <p> </p>
      <p className="math-symbols">[</p>
      <FormGroup inline>
        <InputGroup
          id="text-input"
          placeholder="Placeholder text"
          value={range[0]}
          name="from"
          onChange={handleChange}
        />
      </FormGroup>
      <p className="math-symbols">;</p>
      <FormGroup inline>
        <InputGroup
          id="text-input"
          placeholder="Placeholder text"
          value={range[1]}
          name="to"
          onChange={handleChange}
        />
      </FormGroup>
      <p className="math-symbols">]</p>
    </div>
  );
};

export default styled(RangeInput)`
  display: flex;
  flex-direction: row;
  align-items: center;

  .math-symbols {
    font-size: 1.5em;
  }
`;
