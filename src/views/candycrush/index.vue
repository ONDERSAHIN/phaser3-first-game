<template>
<!--  <candy-crush-game :board-size="8" :gameData="$store.getters.getCurrentGame || {}"></candy-crush-game>-->
  <div>
    <Game :gameData="$store.getters.getCurrentGame || {}"/>
  </div>
</template>

<script>
import Game from '@/components/Game'
import {MOVEMENT_TO_POINT_LEVEL, VARIANT_CANDY_CRUSH_IN_MOVEMENT} from "@/game/levels/gameLevelTypes";
import GameContext from "@/game/core/old/game.context";
import GameLevels from "@/game/levels/gameLevels";

export default {
  name: "index",
  components: {Game},

}
</script>

<style scoped>

</style>