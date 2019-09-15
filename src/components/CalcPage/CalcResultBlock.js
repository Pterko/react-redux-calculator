import React from "react";
import { Card } from "@blueprintjs/core";

import { GraphRenderer } from "../UI/organisms";

const CalcResultBlock = () => {
  return (
    <Card>
      <GraphRenderer rangeXFrom={-2} rangeXTo={2} />
    </Card>
  );
};

export default CalcResultBlock;
