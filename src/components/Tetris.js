import React from "react";

// --- components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// --- utils
import { createStage } from "../utils/gameHelpers";

const Tetris = () => {
    console.log(createStage());
    return (
        <div>
            <Stage stage={createStage()} />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>
                <StartButton />
            </aside>
        </div>
    );
}

export default Tetris;
