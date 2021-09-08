<template>
<!--  <candy-crush-game :board-size="8" :gameData="$store.getters.getCurrentGame || {}"></candy-crush-game>-->
    <Game :gameData="$store.getters.getCurrentGame || {}"/>
</template>

<script>
import Game from '@/components/Game'

export default {
  name: "index",
  components: {Game},

  mounted() {
    // console.log("candy-crush")
  }
}
</script>

<style scoped>

</style>