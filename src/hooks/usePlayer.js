import { useState, useCallback } from "react";

import { TETROMINOS, randomTetrominos } from "../utils/tetrominos";
import { STAGE_WIDTH, checkCollision } from "../utils/gameHelpers";

export const usePlayer = () => {

    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetrominos: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (matrix, direction) => {
        const rotatedTetro = matrix.map((_, index) => 
            matrix.map(col => col[index]),
        );

        if (direction > 0) {
            return rotatedTetro.map(row => row.reverse());
        }

        return rotatedTetro.reverse();
    }

    const playerRotate = (stage, direction) => {
        const clonedPlayer = {...player};

        clonedPlayer.tetrominos = rotate(clonedPlayer.tetrominos, direction);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;

            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > clonedPlayer.tetrominos[0].length) {
                rotate(clonedPlayer.tetrominos, direction);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: {
                x: (prev.pos.x += x),
                y: (prev.pos.y += y),
            },
            collided,
        }));
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {
                x: STAGE_WIDTH / 2 - 2,
                y: 0
            },
            tetrominos: randomTetrominos().shape,
            collided: false
        })
    }, []);
    
    return [player, updatePlayerPos, resetPlayer, playerRotate];

}
