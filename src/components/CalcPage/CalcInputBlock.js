import React, { useState } from "react";
import { Card, Button } from "@blueprintjs/core";

import { ExpressionInput, RangeInput } from "../UI/molecules";

import ShuntingYard from "../../utils/ShuntingYard";

const CalcInputBlock = () => {
  const [expression, setExpression] = useState("2+x");

  const [range, setRange] = useState([-10, 10]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const shuntingYard = new ShuntingYard();

  return (
    <Card>
      <h2>Калькулятор</h2>
      <form onSubmit={handleSubmit}>
        <ExpressionInput
          expression={expression}
          setExpression={setExpression}
        />
        <RangeInput range={range} setRange={setRange} />

        <Button type="submit">Построить график</Button>
        <p>{shuntingYard.parse(expression)}</p>
      </form>
    </Card>
  );
};

export default CalcInputBlock;
