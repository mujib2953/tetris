import { useState, useEffect } from "react";

import { createStage } from "../utils/gameHelpers";

export const useStage = (player, resetPlayer) => {

    const [stage, setStage] = useState(createStage());
    const [rowCleared, setRowCleared] = useState(0);

    useEffect(() => {

        setRowCleared(0);

        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowCleared(prev => prev + 1);
                    ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
                    return ack;
                }

                ack.push(row);

                return ack;
            }, []);

        const updateStage = (prevStage) => {
            // --- flush the stage
            const newStage = prevStage.map(row =>
                row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
            );

            // --- Drawing tetrominos
            player.tetrominos.forEach((rows, y) => {
                rows.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`
                        ]
                    }
                });
            });

            // --- checking collision
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        }

        setStage(prev => updateStage(prev));

    } , [player, resetPlayer]);

    return [stage, setStage, rowCleared];
}

