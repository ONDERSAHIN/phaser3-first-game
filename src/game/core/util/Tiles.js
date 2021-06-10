import {
    AFTER_LAST_NORMAL_TILE,
    ALL_TILES,
    BEFORE_FIRST_NORMAL_TILE, SPECIALTY_TYPES
} from "@/game/core/model/tile.type";
import Tile from "@/game/core/model/tile";

class Tiles {

    /**
     * Generate tile type randomly
     * @return {TileType}
     */
    static generateTileType() {

        let min = BEFORE_FIRST_NORMAL_TILE + 1;
        let max = AFTER_LAST_NORMAL_TILE;
        return ALL_TILES[Math.floor((Math.random() * (max - min)) + min)];
    }

    static createRandomTile(){
        return new Tile(Tiles.generateTileType());
    }

    static generateSpecialTileType(){
        let min = 0;
        let max = SPECIALTY_TYPES.length;
        return SPECIALTY_TYPES[Math.floor((Math.random() * (max - min)) + min)]
    }

    static createRandomSpecialityTile(){
        return new Tile(Tiles.generateSpecialTileType())
    }


}

export default Tiles;