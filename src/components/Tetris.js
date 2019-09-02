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
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
    
    // --- setting local state
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowCleared);

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
        setDropTime(1000);
        setScore(0);
        setLevel(0);
        setRows(0);
    }
    
    const drop = () => {

        // --- Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);

            // --- also increase
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            
            if (player.pos.y < 1) {
                // --- Game-over
                setDropTime(null);
                setGameOver(true);
            } 
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 40:
                    // --- Down-Arrow-Key
                    setDropTime(1000 / (level + 1) + 200);
                    break;
            
                default:
                    break;
            }
        }
    }
    
    const dropPlayer = () => {
        setDropTime(null);
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
                    playerRotate(stage, 1);
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

    useInterval(() => {
        drop();
    }, dropTime);


    return (
        <StyledTetrisWrapper
            role="button"
            tabIndex="0"
            onKeyDown={(e) => move(e)}
            onKeyUp={(e) => keyUp(e)}
        >
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {
                        gameOver ? (
                            <Display gameOver={gameOver} text="Game Over !!!" />
                        ) : (
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`} />
                                <Display text={`Levels: ${level}`} />
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
