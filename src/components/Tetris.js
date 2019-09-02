import React, { useState } from "react";

// --- components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// --- utils
import { createStage, checkCollision } from "../utils/gameHelpers";

// --- styled
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// --- hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
    
    // --- setting local state
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log("re-rendered.");

    const moverPlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }
    
    const startGame = () => {
        resetEveryThing();
    }

    const resetEveryThing = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    }
    
    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            
            if (player.pos.y < 1) {
                // --- Game-over
                console.log("GAME-OVER");
                setDropTime(null);
                setGameOver(true);
            } 
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
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
                case 38:
                    // --- Up-Arrow-Key
                    rotatePlayer();
                    break;
                case 39:
                    // --- Right-Arrow-Key
                    moverPlayer(1);
                    break;
                case 40:
                    // --- Down-Arrow-Key
                    dropPlayer(stage, 1);
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
