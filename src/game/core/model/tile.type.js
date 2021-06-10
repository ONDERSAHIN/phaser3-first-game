/**
 * Tile Type MEMORY
 * @type {number}
 */
import TileType from "@/game/core/model/tileType";
import SpecialityTileType from "@/game/core/model/specialityTileType";

export const EMPTY = new TileType(0x0000, "empty"); // reserved
export const FORBIDDEN = new TileType(0xFBDE, "forbidden"); // reserved 0xForBiDEn  = 64478
// ORDERED BLOCK MEMORY
export const BEFORE_FIRST_NORMAL_TILE = 0x0001; // reserved
export const RED = new TileType(0x0002, "red");
export const YELLOW = new TileType(0x0003, "yellow");
export const GREEN = new TileType(0x0004, "green");
export const ORANGE = new TileType(0x0005, "orange");
export const BLUE = new TileType(0x0006, "blue");
export const PURPLE = new TileType(0x0007, "purple");
export const DARK_RED = new TileType(0x0008, "darkred");
export const AFTER_LAST_NORMAL_TILE = 0x0009; // reserved
export const WALL = new TileType(0xFFFF, "wall"); // reserved

// MAP above addresses to ARRAY
export let ALL_TILES = [
    EMPTY,
    FORBIDDEN,
    RED,
    YELLOW,
    GREEN,
    ORANGE,
    BLUE,
    PURPLE,
    DARK_RED,
    WALL,
]


export const SPEC_1 = new SpecialityTileType(0x0010, "X0002", 2);
export const SPEC_2 = new SpecialityTileType(0x0011, "X0004", 4);
export const SPEC_3 = new SpecialityTileType(0x0012, "X0008", 8);
export const SPEC_4 = new SpecialityTileType(0x0013, "X0016", 16);
export const SPEC_5 = new SpecialityTileType(0x0014, "X0032", 32);
export const SPEC_6 = new SpecialityTileType(0x0015, "X0064", 64);
export const SPEC_7 = new SpecialityTileType(0x0016, "X0128", 128);
export const SPEC_8 = new SpecialityTileType(0x0017, "X0256", 256);
export const SPEC_9 = new SpecialityTileType(0x0018, "X0512", 512);
export const SPEC_10 = new SpecialityTileType(0x0019, "X1024", 1024);
export const SPEC_11 = new SpecialityTileType(0x0020, "X2048", 2048);
export const SPEC_12 = new SpecialityTileType(0x0021, "X4096", 4096);
export const SPEC_13 = new SpecialityTileType(0x0022, "X8192", 8192);

export const C_NAVY_BLUE = new TileType(0x0023, "cnb", (SPEC_2.value | SPEC_4.value | SPEC_12.value));
export const EDGE_EDGE = new TileType(0x0025, "eEdge", (SPEC_2.value | SPEC_3.value | SPEC_6.value | SPEC_10.value));
export const LARK_BLUE = new TileType(0x0027, "lBlue", (SPEC_2.value | SPEC_4.value | SPEC_9.value));
export const LM_BLUE = new TileType(0x0028, "lmBlue", (SPEC_2.value | SPEC_4.value | SPEC_8.value));
export const PN_BLUE = new TileType(0x0029, "pnBlue", (SPEC_2.value | SPEC_4.value | SPEC_13.value));
export const EDGE_BLUE = new TileType(0x0024, "eBlue", (SPEC_1.value | SPEC_3.value | SPEC_6.value | SPEC_10.value));
export const EDGE_SKY = new TileType(0x0026, "eSky", (SPEC_1.value | SPEC_3.value | SPEC_6.value | SPEC_10.value));
export const T_BLUE = new TileType(0x0030, "tBlue", (SPEC_5.value | SPEC_6.value | SPEC_7.value | SPEC_11.value));
export const T_GREY = new TileType(0x0031, "tGrey", (SPEC_5.value | SPEC_6.value | SPEC_7.value | SPEC_11.value));
export const T_WHITE = new TileType(0x0032, "tWhite", (SPEC_5.value | SPEC_6.value | SPEC_7.value | SPEC_11.value));

// export let SPECIALTY_TYPES = [
//     T_GREY,
//     // T_WHITE,
//     SPEC_5,
//     SPEC_6,
//     // EDGE_BLUE,
//     SPEC_7,
//     // SPEC_8,
//     // EDGE_EDGE,
//     // EDGE_SKY,
//     SPEC_11,
//     T_BLUE,
// ]

export let SPECIALTY_TYPES = [
    SPEC_1,
    C_NAVY_BLUE,
    SPEC_2,
    T_GREY,
    SPEC_3,
    T_WHITE,
    SPEC_4,
    SPEC_5,
    SPEC_6,
    EDGE_BLUE,
    SPEC_7,
    SPEC_8,
    EDGE_EDGE,
    SPEC_9,
    SPEC_10,
    EDGE_SKY,
    SPEC_11,
    LARK_BLUE,
    LM_BLUE,
    SPEC_12,
    T_BLUE,
    PN_BLUE,
    SPEC_13
]