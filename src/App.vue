<template>
  <v-app>
    <!--    <v-app-bar-->
    <!--        app-->
    <!--        color="primary"-->
    <!--        class="lighten-4"-->
    <!--        bottom-->
    <!--        dense-->
    <!--        fixed-->

    <!--    >-->
    <!--      <div class="d-flex align-baseline">-->
    <!--        <v-img-->
    <!--            alt="pmaktif-logo"-->
    <!--            class="shrink mt-1"-->
    <!--            contain-->
    <!--            min-width="100"-->
    <!--            :src="require('@/assets/pm-aktif-logo.svg')"-->
    <!--            width="100"-->
    <!--        />-->
    <!--      </div>-->
    <!--      <v-spacer></v-spacer>-->
    <!--      <v-btn @click.stop="onGameStatisticsButtonClick">-->
    <!--        <v-icon>-->
    <!--          mdi-chart-bar-->
    <!--        </v-icon>-->
    <!--      </v-btn>-->
    <!--    </v-app-bar>-->

    <v-dialog
        v-model="drawer"
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Puan ve Sıralama
        </v-card-title>

        <v-card-text>
          <v-list>
            <v-list-item
            >
              <!--                  <v-list-item-icon>-->
              <!--                    &lt;!&ndash;            <v-icon>{{ // item.icon }}</v-icon>&ndash;&gt;-->
              <!--                  </v-list-item-icon>-->

              <v-list-item-content>
                <v-list-item-subtitle>BU HAFTA</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold title">{{weeklyLeaderboard.score > 0 ?  `${weeklyLeaderboard.score} PUAN` : '---'  }}</v-list-item-title>
                <v-list-item-title>{{ weeklyLeaderboard.rank > 0 ?  `${weeklyLeaderboard.rank}. Sıradasınız` : 'Sıranız Belirlenemedi'  }}</v-list-item-title>
              </v-list-item-content>

            </v-list-item>

            <v-list-item
            >
              <!--                  <v-list-item-icon>-->
              <!--                    &lt;!&ndash;            <v-icon>{{ item.icon }}</v-icon>&ndash;&gt;-->
              <!--                  </v-list-item-icon>-->
              <v-list-item-content>
                <v-list-item-subtitle>BU AY</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold title">{{ monthlyLeaderboard.score > 0 ? `${monthlyLeaderboard.score} PUAN` : '---' }} </v-list-item-title>
                <v-list-item-title>{{ monthlyLeaderboard.rank > 0 ?  `${monthlyLeaderboard.rank}. Sıradasınız` : 'Sıranız Belirlenemedi' }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="logOutDialog"
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Oyundan Çık
        </v-card-title>

        <v-card-text>
          Oyundan çıkmak istediğinize emin misiniz ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="grey darken-1"
              text
              @click="logOutDialog = false"
          >
            Vazgeç
          </v-btn>

          <v-btn
              color="green darken-1"
              text
              href="https://dev.pmaktif.com/secure/play-and-win"
          >
            Evet
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-main class="page-background">
      <router-view></router-view>
    </v-main>


  </v-app>
  <!--  <Game />-->
</template>


<script>
import Game from '@/components/Game'
import EventBus from "@/bus/event.bus";

export default {
  name: 'App',
  components: {Game},
  data: () => ({
    drawer: null,
    weeklyLeaderboard: {},
    monthlyLeaderboard: {},
    logOutDialog : false,
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
    logOut(){

    },
    onLogOut(){
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

body{
  overflow: hidden;
}

.page-background {
  background: url("../public/graphics/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
