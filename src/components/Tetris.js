import React, { useState } from "react";

// --- components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// --- utils
import { createStage } from "../utils/gameHelpers";

// --- styled
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// --- hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
    
    // --- setting local state
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log("re-rendered.");


    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {
                        gameOver ? (
                            <Display gameOver={gameOver} text="Game Over !!!" />
                        ) : (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
                            </div>
                        )
                    }
                    
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
}

export default Tetris;