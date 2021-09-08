<template>
  <div>
    <div id="game-container" style="z-index: 2000"></div>
    <!--    <level-failure-game-state-view @close="onLevelFailureClose" @done:quiz="onLevelFailureDoneWithQuiz"-->
    <!--                                   v-if="levelFailurePage"></level-failure-game-state-view>-->
    <vs-dialog blur prevent-close not-close v-model="levelRetryDialog">
      <template #header>
        <h4 class="not-margin">
          Bölüm Tamamlanamadı
        </h4>
      </template>

      <vs-row justify="center">
        <lottie :options="failureAnimationOptions" :height="200" :width="200"
                v-on:animCreated="handleAnimation"></lottie>
      </vs-row>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="onRestart">
            Tekrar Oyna
          </vs-button>

        </div>
      </template>
    </vs-dialog>

    <vs-dialog blur prevent-close not-close v-model="levelSuccessDialog">
      <template #header>
        <h4 class="not-margin">
          Tebrikler
        </h4>
      </template>

      <vs-row justify="center">
        <lottie :options="successAnimationOptions" :height="200" :width="200"
                v-on:animCreated="handleAnimation"></lottie>
      </vs-row>

      <vs-row justify="center" class="mb-10">
        <div class="" style="font-weight: bold; font-size: 24px;">
          Topladığın puan
        </div>
      </vs-row>

      <vs-row justify="center">
        <div class="display-3 font-weight-bold text-center" style="font-weight: bold; font-size: 36px;">
          {{ level.levelPoint }}
        </div>
      </vs-row>

      <template #footer>
        <div class="footer-dialog">
          <vs-button size="xl" flat block @click="onRestart">
            Tekrar Oyna
          </vs-button>
          <vs-button size="xl" color="primary" block @click="onNextLevel" x-large text>
            <!--            <v-icon x-large left>mdi-skip-next</v-icon>-->
            Sonraki Bölüme Geç
          </vs-button>
        </div>
      </template>
    </vs-dialog>


    <vs-dialog overflow-hidden not-close prevent-close v-model="entryPageShow">
      <template #header>
        <h4 class="not-margin">
        </h4>
      </template>

      <vs-row justify="center">
        <img
            alt="pmaktif-logo"
            class="shrink mt-1"
            :src="require('@/assets/pm-aktif-logo.svg')"
            width="300"
        />

      </vs-row>
      <vs-row justify="center">
        <!--          <lottie :options="defaultOptions" :height="300" :width="300" v-on:animCreated="handleAnimation"></lottie>-->
        <vs-row justify="center">
          <vs-col w="10">
            <div ref="target" id="target" class="center">
              <vs-button block size="xl" color="warning" v-if="!isGameLoading"
                         style="margin-top: 40px; font-weight: bold;" @click="onStartGame">
                <!--                          <i class="mdi-play"></i>-->
                {{ startText }}
              </vs-button>
            </div>
          </vs-col>
        </vs-row>
        <vs-row v-if="isGameLoading" justify="center">
          <div style="margin-top: 40px; font-weight: bold;">Oyun yükleniyor</div>
        </vs-row>
        <!--        </div>-->
      </vs-row>
      <template #footer>
      </template>
    </vs-dialog>
    <vs-dialog :value="showAnimate" color="#e44032" not-close blur>
      <vs-row justify="center">
        <vs-col>
          <transition name="fade">
            <img
                alt="tutorial"
                class="shrink mt-1"
                :src="require('@/game/assets/explosion.gif')"
                width="400"
                id="animateImg"
            />
          </transition>
        </vs-col>
      </vs-row>
    </vs-dialog>
  </div>
</template>


<script>
import EventBus from "@/bus/event.bus";
import Lottie from 'vue-lottie';
import * as successAnimationData from '@/assets/11272-party-popper.json';
import * as failureAnimationData from '@/assets/32485-dead-emoji.json';
import LevelFailureGameStateView from "@/game/views/LevelFailureGameStateView";
import {MOVEMENT_TO_POINT_LEVEL, VARIANT_CANDY_CRUSH_IN_MOVEMENT} from "@/game/levels/gameLevelTypes";

export default {
  name: 'Game',
  props: {
    boardSize: {
      type: Number,
    },
    scoreIncrementStrategyFn: {
      type: Function
    },
    gameData: {
      type: Object
    }
  },
  components: {
    Lottie,
    LevelFailureGameStateView
  },
  data: () => ({
    gameInstance: null,
    containerId: 'game-container',
    levelFailurePage: false,
    levelRetryDialog: false,
    levelSuccessDialog: false,
    showLevelTutorial: false,
    tutorial: null,
    showEffect: false,
    showLogo: false,
    showAnimate: false,
    logo: null,
    // defaultOptions: {animationData: animationData.default},
    successAnimationOptions: {
      animationData: successAnimationData.default,
      animationSpeed: 3,
      loop: true,
      renderer: 'svg'
    },
    failureAnimationOptions: {animationData: failureAnimationData.default, loop: false},
    isGameLoading: false,
    level: {},
    startText: "Oyunu Başlat",
    game: null,
    entryPageShow: true,

  }),
  methods: {
    openLoading() {
      const loading = this.$vs.loading({
        percent: this.percent,
        color: 'warning'
      })
      const interval = setInterval(() => {
        if (this.percent <= 100) {
          loading.changePercent(`${this.percent++}%`)
        }
      }, 40)
      setTimeout(() => {
        loading.close()
        clearInterval(interval)
        this.percent = 0
      }, 2400)
    },
    onStartGame() {
      this.startText = "Başlıyor..."
      this.isGameLoading = true;
      this.openLoading();
      this.startGameScreen();

    },
    handleAnimation(anim) {
      anim.setSpeed(0.5)
    },
    async startGameScreen() {
      const game = await import(/* webpackChunkName: "game" */ '@/game/game.js')
      this.$nextTick(() => {
        this.gameInstance = game.launch(this.containerId)
      })

    },
    onLevelFailureClose() {
      this.levelFailurePage = false;
      EventBus.$emit("done:failure-contents");
      this.showRestartDialog();
    },
    onLevelFailureDoneWithQuiz(point) {
      this.levelFailurePage = false;
      EventBus.$emit("done:failure-contents");
    },
    showFailureContents() {
      this.levelFailurePage = true;
    },
    showRestartDialog(levelData) {
      this.level = levelData;
      this.levelRetryDialog = true;
    },
    showLevelSuccessDialog(levelData) {
      this.level = levelData;
      this.levelSuccessDialog = true;
    },
    onRestart() {
      this.levelRetryDialog = false;
      this.levelSuccessDialog = false;
      EventBus.$emit("retry")
    },

    onNextLevel() {
      this.levelSuccessDialog = false;
      EventBus.$emit("next-level");
      // let point = this._level.levelPoint;
      // let payload = {
      //   "gameSession": this.store.getters.getSessionId.id,
      //   "actualPlayedTime": 0,
      //   "score": point,
      //   "extraGainedPoint": 0,
      //   "currentLevel": this._level.currentLevel,
      //   "gameSessionCheckPointType": "GAME_NEXT_LEVEL"
      // }
      // this.$serviceContext.gameService.putGameSession(payload).then(({status, data: {data, error}}) => {
      //   if (status === 201) {
      //     // this.currentLevel = data.level;
      //     // this.sessionScore = data.sessionScore
      //     // this.monthlyScore = data.monthlyScore;
      //     // this.gameLevel = GameLevels.getGameLevelByLevelNumber(this.currentLevel);
      //     // GameContext.currentGameLevel = this.gameLevel;
      //     this.store.dispatch("setSessionScore",data.sessionScore)
      //     this.store.dispatch("setMonthlyScore",data.monthlyScore)
      //     // this.scene.stop("SessionLoadScene");
      //     this.$nextTick(()=> {
      //       this.gameInstance.scene.start("SessionLoadScene");
      //     })
      //   } else {
      //   }
      // });
    },

    onQuizSuccess(pointToBeWon) {
      if (pointToBeWon > 0) {
        // todo
      }
      this.$emit("done:quiz", pointToBeWon)
    },
    onQuizFail(pointToBePenalty) {

      if (pointToBePenalty > 0) {
        // todo
      }
      this.$emit("done:quiz", pointToBePenalty)
    },

    onGameSceneReady() {
      this.isGameLoading = false;
      this.entryPageShow = false;
    },

    onShowLogo(logo) {
      this.logo = require("@/game/assets/tiles_big/" + logo + ".png");
      this.showLogo = true;
      setTimeout(() => {
        this.showLogo = false;
      }, 2000)
    },
    onShowAnimate() {
      this.showAnimate = true;
      setTimeout(() => {
        this.showAnimate = false;
      }, 800)
    },

    onShowLevelTutorial(level) {
      if (level.levelType === MOVEMENT_TO_POINT_LEVEL) {
        this.tutorial = require('@/assets/tutorials/tutorial-1.gif');
      } else if (level.levelType === VARIANT_CANDY_CRUSH_IN_MOVEMENT) {
        this.tutorial = require('@/assets/tutorials/tutorial-2.gif');
      }
      this.showLevelTutorial = true;
    },

    onShowEffect({effectType, tileType}) {
      this.showEffect = true;
      if (effectType === "effect-4") {
        this.onShowLogo(tileType.getName());
      } else if (effectType === "effect-5") {
        this.onShowAnimate();
      }

    },


  },
  mounted() {
    // clearTimeout(this.timeOut)
    // this.$store.getters.getEventEmitter.on("show:success-dialog",this.showLevelSuccessDialog,this)
    EventBus.$on('ready', this.onGameSceneReady);
    EventBus.$on("show:failure-contents", this.showFailureContents)
    EventBus.$on("show:level-retry-dialog", this.showRestartDialog)
    EventBus.$on("show:success-dialog", this.showLevelSuccessDialog)
    EventBus.$on('show:tutorial', this.onShowLevelTutorial);
    EventBus.$on('show:effect', this.onShowEffect);
    // this.onStartGame();
  },

  created() {
  },
  destroyed() {
    EventBus.$off('ready', this.onGameSceneReady);
    EventBus.$off("show:failure-contents", this.showFailureContents)
    EventBus.$off("show:level-retry-dialog", this.showRestartDialog)
    // EventBus.$off("show:success-dialog", this.showLevelSuccessDialog)
    EventBus.$off('show:tutorial', this.onShowLevelTutorial);
    EventBus.$off('show:tutorial', this.onShowEffect);
    this.gameInstance.destroy(false)
  }
}
</script>


<style scoped>


/*//.placeholder {*/
/*//  font-size: 2rem;*/
/*//  font-family: 'Courier New', Courier, monospace;*/
/*//}*/
/*//*/
/*#overlaydiv {*/
/*  position: fixed;*/
/*  display: none;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  top: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*  bottom: 0;*/
/*  background-color: rgba(0,0,0,0.5);*/
/*  z-index: 200;*/
/*  cursor: pointer;*/
/*}*/

#overlay4 {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,0.5);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
}

/* just some content with arbitrary styles for explanation purposes */
.modal {
  /*width: 300px;*/
  /*height: 200px;*/
  /*line-height: 200px;*/
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -150px;
  background-color: #f1c40f;
  border-radius: 5px;
  text-align: center;
  z-index: 11; /* 1px higher than the overlay layer */
}

/*#overlay4{*/
/*  position: relative;*/
/*}*/
/*#overlay4 div{*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  z-index: 10;*/
/*  background-color: rgba(0,0,0,0.5); !*dim the background*!*/
/*}*/


#text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

/*#action {*/
/*  position:absolute;*/
/*  left:0;*/
/*  right:0;*/
/*  margin-left:auto;*/
/*  width:300px;*/
/*  margin-right:auto;*/
/*  background-color: #000;*/
/*  color: #FFF;*/
/*  z-index:5;*/
/*}*/

#action {
  position:relative;
  top:0;
  left:0;
  width: 100%;
  z-index:5;
}

#action div {
  position: absolute;
  left: 50%;
  margin-left:-150px;
  color: #FFF;
  width:300px;
  z-index:6;
}

#animateLogo {
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 200px;
  /*right: 50%;*/
  /*top: 12%;*/
}

#animateLogoBack {
  position: fixed;
  z-index: 100;
  /*width: 200px;*/
  /*height: 200px;*/
  /*right: 50%;*/
  /*top: 4%;*/
}


/*//#game-container{*/
/*//  height: 100% !important;*/
/*//}*/

/*//#game-container {*/
/*//  background-image: url("../../public/background.jpg");*/
/*//  -webkit-background-size: cover;*/
/*//  -moz-background-size: cover;*/
/*//  -o-background-size: cover;*/
/*//  background-size: cover;*/
/*//  //padding-left: 16px;*/
/*//  //padding-right: 0px;*/
/*//}*/
</style>
