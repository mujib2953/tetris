import { useState } from "react";

import { randomTetrominos } from "../utils/tetrominos";

export const usePlayer = () => {

    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetrominos: randomTetrominos().shape,
        collided: false,
    });
    
    return [player];

}
