<template>
<!--  <v-card :loading="gamesLoading" class="mx-auto mt-10" max-width="500" tile>-->
<!--    <v-list shaped>-->
<!--      <v-subheader>Oyunlar</v-subheader>-->
<!--      <v-list-item-group-->
<!--          v-model="selectedGame"-->
<!--          color="primary"-->
<!--      >-->
<!--        <v-list-item-->
<!--            @click="selectGame(game)"-->
<!--            v-for="(game, i) in games"-->
<!--            :key="i"-->
<!--        >-->
<!--          <v-list-item-icon>-->
<!--            <v-avatar color="primary" size="60">-->
<!--              <v-icon color="white" large>mdi-gamepad-variant</v-icon>-->
<!--            </v-avatar>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title v-text="game.name">-->
<!--            </v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list-item-group>-->
<!--    </v-list>-->
<!--  </v-card>-->
</template>

<script>
export default {
  name: "index",
  data: () => ({
    games: [],
    selectedGame: null,
    gamesLoading: false
  }),
  methods: {
    getGameList() {
      console.log("getting game")
      this.gamesLoading = true;
      this.$serviceContext.gameService.getGames().then(({data: {data, error}}) => {
        if (!error) {
          // this.games = data
          if(data.length){
            console.log(data[0])
            this.selectGame(data[0])
          }
        }
        this.gamesLoading = false;
      }).catch(error => {
        this.gamesLoading = false;
      });
    },
    selectGame(item) {
      this.$store.dispatch("setCurrentGame", item);
      this.$router.replace({name: 'candycrush_game'})
    },
  },
  created() {
    this.getGameList();
  }
}
</script>

<style scoped>

</style>