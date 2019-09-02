export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, "clear"])
    );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {

    for( let y = 0; y < player.tetrominos.length; y++) {
        for( let x = 0; x < player.tetrominos[y].length; x++ ) {

            if (player.tetrominos[y][x] !== 0) {
                if (
                    // --- checking height of the stage
                    !stage[y + player.pos.y + moveY] ||

                    // --- checking width of stage
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

                    // --- checking if we are colliding with other tetrominals
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
                ) {
                    return true;
                }
            }
        }
    }
}
