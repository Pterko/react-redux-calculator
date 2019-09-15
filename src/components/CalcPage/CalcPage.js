import React from "react";
import styled from "styled-components";

import { CalcInputBlock, CalcResultBlock } from ".";

const CalcPage = ({ className }) => {
  return (
    <div className={className}>
      <CalcInputBlock />
      <CalcResultBlock />
    </div>
  );
};

export default styled(CalcPage)`
  max-width: 700px;
  margin: 20px auto;
`;
