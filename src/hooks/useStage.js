import { useState, useEffect } from "react";

import { createStage } from "../utils/gameHelpers";

export const useStage = (player, resetPlayer) => {

    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = (prevStage) => {
            // --- flush the stage
            const newStage = prevStage.map(row =>
                row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
            );

            // --- Drawing tetrominos
            player.tetrominos.forEach((rows, y) => {
                rows.forEach((value, x) => {
                    if (value !== 0) {
                        console.clear();
                        console.log(`X: ${x} + ${player.pos.x}`);
                        console.log(`Y: ${y} + ${player.pos.y}`);
                        console.log(newStage);
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`
                        ]
                    }
                });
            });

            return newStage;
        }

        setStage(prev => updateStage(prev));

    } , [player]);

    return [stage, setStage];
}

