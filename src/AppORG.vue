<template>
  <div class="page-background">
      <router-view></router-view>
  </div>
</template>

<script>
import EventBus from "@/bus/event.bus";

export default {
  name: 'App',
  data: () => ({
    active:0,
    drawer: null,
    weeklyLeaderboard: {},
    monthlyLeaderboard: {},
    logOutDialog: false,
    items: [
      {title: 'Home', icon: 'mdi-view-dashboard'},
      {title: 'About', icon: 'mdi-forum'},
    ],
  }),
  methods: {

    onGameStatisticsButtonClick() {
      let gameId = this.$store.getters.getCurrentGame.id;
      this.$serviceContext.gameService.getPlayerLeaderBoardForGame(gameId).then(({data: {data}, status}) => {

        if (status === 200) {

          // monthly: {playerId: "9deae7c6-4df8-4a9e-8ba6-29124aa68f0a", referenceCode: null, score: 27, actualPlayedTime: 0,…}
          // actualPlayedTime: 0
          // playerId: "9deae7c6-4df8-4a9e-8ba6-29124aa68f0a"
          // rank: 1
          // referenceCode: null
          // score: 27
          // weekly: {playerId: "9deae7c6-4df8-4a9e-8ba6-29124aa68f0a", referenceCode: null, score: 27, actualPlayedTime: 0,…}
          // actualPlayedTime: 0
          // playerId: "9deae7c6-4df8-4a9e-8ba6-29124aa68f0a"
          // rank: 1
          // referenceCode: null
          // score: 27

          this.monthlyLeaderboard = data.monthly;
          this.weeklyLeaderboard = data.weekly;
        }


      })

      this.drawer = true;
    },
    logOut() {

    },
    onLogOut() {
      this.logOutDialog = true;
    }
  },
  mounted() {
    EventBus.$on('get:statistics', this.onGameStatisticsButtonClick);
    EventBus.$on('log:out', this.onLogOut);

  },
  destroyed() {
    EventBus.$off("get:statistics")
    EventBus.$off('log:out', this.onLogOut);
    EventBus.$off("next-level")
    EventBus.$off("retry")
  }
}
</script>

<style>
html {
  overflow-y: hidden;
}

body {
  overflow: hidden;
  margin: 0 !important;
}

.page-background {
  background: url("../public/graphics/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>

<!--<style>-->


<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav {-->
<!--  padding: 30px;-->
<!--}-->

<!--#nav a {-->
<!--  font-weight: bold;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav a.router-link-exact-active {-->
<!--  color: #42b983;-->
<!--}-->
<!--</style>-->
