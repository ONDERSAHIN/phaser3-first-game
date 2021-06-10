import Movement from "@/game/core/model/movement";

export const LEFT = new Movement(0, -1);
export const RIGHT = new Movement(0, 1);
export const UP = new Movement(-1, 0);
export const DOWN = new Movement(1, 0);

export default [
    LEFT,
    RIGHT,
    UP,
    DOWN
]