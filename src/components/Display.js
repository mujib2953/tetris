import React from "react";

import { StyledDisplay } from "./styles/StyledDisplay";

const Disaplay = ({ gameOver, text }) => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Disaplay;
