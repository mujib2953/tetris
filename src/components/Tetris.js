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
    
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log("re-rendered.");

    const moverPlayer = (dir) => {
        updatePlayerPos({ x: dir, y: 0 });
    }
    
    const startGame = () => {
        resetEveryThing();
    }

    const resetEveryThing = () => {
        setStage(createStage());
        resetPlayer();
    }
    
    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    }
    
    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {

            switch(keyCode) {
                case 37:
                    // --- Left-Arrow-Key
                    moverPlayer(-1);
                    break;
                case 39:
                    // --- Right-Arrow-Key
                    moverPlayer(1);
                    break;
                case 40:
                    // --- Down-Arrow-Key
                    dropPlayer();
                    break;
                default:
            }
        }

    }

    return (
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={(e) => move(e)}
        >
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
                    
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
}

export default Tetris;
