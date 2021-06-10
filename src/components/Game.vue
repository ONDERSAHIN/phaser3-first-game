<template>
  <div>
    <div :id="containerId"/>
    <level-failure-game-state-view @close="onLevelFailureClose" @done:quiz="onLevelFailureDoneWithQuiz"
                                   v-if="levelFailurePage"></level-failure-game-state-view>


    <v-dialog v-model="levelRetryDialog" persistent max-width="600"
              overlay-color="primary" overlay-opacity="0.7">
      <v-card class="mx-auto">
        <v-card-title class="mb-5">
          <v-flex class="text-center">
            <div>Bölüm Tamamlanamadı</div>
          </v-flex>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <lottie :options="failureAnimationOptions" :height="200" :width="200"
                    v-on:animCreated="handleAnimation"></lottie>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-footer :fixed="$vuetify.breakpoint.smAndDown">
            <v-flex>
              <v-btn x-large block text @click="onRestart">
                <v-icon x-large left>mdi-restart</v-icon>
                Tekrar Oyna
              </v-btn>
            </v-flex>

          </v-footer>

        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="levelSuccessDialog" persistent max-width="800" :fullscreen="$vuetify.breakpoint.smAndDown"
              overlay-color="primary" overlay-opacity="0.7">
      <v-card class="mx-auto">
        <v-card-title>
          <v-flex class="text-center">
            <div>Tebrikler</div>
          </v-flex>
        </v-card-title>
        <v-card-text class="mb-5">

          <lottie :options="successAnimationOptions" :height="200" :width="200"
                  v-on:animCreated="handleAnimation"></lottie>

        </v-card-text>
        <v-card-text>
          <v-row justify="center" class="mb-10">
            <div class="headline font-weight-bold text-center">
              Topladığın puan
            </div>
          </v-row>
          <v-row justify="center">
            <div class="display-3 font-weight-bold text-center">
              {{ level.levelPoint || 160 }}
            </div>
          </v-row>
        </v-card-text>

        <v-card-text>

          <v-footer :fixed="$vuetify.breakpoint.smAndDown">
            <v-flex xs12 md5>
              <v-btn text block x-large @click="onRestart">
                <v-icon x-large left>mdi-restart</v-icon>
                Bölümü Tekrar Oyna
              </v-btn>
            </v-flex>
            <v-spacer></v-spacer>

            <v-flex xs12 md5>
              <v-btn color="primary" block @click="onNextLevel" x-large text>
                <v-icon x-large left>mdi-skip-next</v-icon>
                Sonraki Bölüme Geç
              </v-btn>
            </v-flex>
          </v-footer>

        </v-card-text>
      </v-card>

    </v-dialog>

    <v-overlay :value="showLevelTutorial" color="#e44032" opacity="1" z-index="30">
      <v-layout row>
        <v-col>
          <v-img
              alt="tutorial"
              class="shrink mt-1"
              contain
              min-width="300"
              :src="tutorial"
              width="100"
          />

          <v-col md="12">
            <v-btn x-large block color="accent" @click="showLevelTutorial = false">
              <v-icon left>mdi-thumb-up</v-icon>
              TAMAM
            </v-btn>
          </v-col>
        </v-col>
      </v-layout>
    </v-overlay>


    <v-overlay :value="showAnimate" color="#e44032" opacity="0.2" z-index="30">
      <v-layout row>
        <v-col>
          <transition name="fade">
            <v-img
                alt="tutorial"
                class="shrink mt-1"
                contain
                min-width="300"
                :src="require('@/game/assets/explosion.gif')"
                width="400"
                id="animateImg"
            />
          </transition>
        </v-col>
      </v-layout>
    </v-overlay>


    <v-overlay :value="showLogo" color="#e44032" opacity="0.2" z-index="30">
      <v-layout row>
        <v-col>
          <transition name="fade">
            <v-img
                alt="tutorial"
                class="shrink mt-1"
                contain
                min-width="300"
                :src="require('@/game/assets/explosion2.gif')"
                width="400"
                id="animateLogoBack"
            />
          </transition>

          <transition name="fade">
            <v-img
                alt="tutorial"
                class="shrink mt-1"
                contain
                min-width="200"
                :src="logo"
                width="300"
                id="animateLogo"
            />
          </transition>
        </v-col>
      </v-layout>
    </v-overlay>


    <v-overlay :value="entryPageShow" color="#e44032" opacity="1" z-index="30">
      <v-layout row>
        <v-col>
          <v-img
              alt="pmaktif-logo"
              class="shrink mt-1"
              contain
              min-width="300"
              :src="require('@/assets/pm-aktif-logo.svg')"
              width="100"

          />
          <v-col
              class="subtitle-1 text-center font-weight-bold"
              cols="12"
          >
          </v-col>
          <div v-if="isGameLoading">
            <lottie :options="defaultOptions" :height="300" :width="300" v-on:animCreated="handleAnimation"></lottie>

            <v-progress-linear
                color="white lighten-2"
                buffer-value="0"
                stream
            >
            </v-progress-linear>

            <v-col class="subtitle-1 text-center font-weight-bold" cols="12">
              Oyun yükleniyor
            </v-col>
          </div>

          <v-col md="12" v-else>
            <v-btn x-large block color="accent" v-if="!isGameLoading" @click="onStartGame">
              <v-icon left large>mdi-play</v-icon>
              {{ startText }}
            </v-btn>
          </v-col>
        </v-col>
      </v-layout>
    </v-overlay>


  </div>
</template>


<script>
import EventBus from "@/bus/event.bus";
import Lottie from 'vue-lottie';
import * as animationData from '@/assets/13689-gameboy-color.json';
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
    downloaded: false,
    gameInstance: null,
    containerId: 'game-container',
    showVisualContent: false,
    showQuestionContent: false,
    levelFailurePage: false,
    levelRetryDialog: false,
    levelSuccessDialog: false,
    showLevelTutorial: false,
    tutorial: null,
    showEffect: false,
    showLogo: false,
    showAnimate: false,
    logo: null,


    defaultOptions: {animationData: animationData.default},
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
    onStartGame() {
      //TODO
      //async method
      this.startText = "Başlıyor..."
      this.isGameLoading = true;
      this.startGameScreen();

    },
    handleAnimation(anim) {
      anim.setSpeed(0.5)
    },
    onResize() {
      this.windowSize = {x: window.innerWidth, y: window.innerHeight}
      // console.log(this.windowSize)
      // EventBus.$emit('resize',this.windowSize)
    },
    async startGameScreen() {
      const game = await import(/* webpackChunkName: "game" */ '@/game/game')
      this.$nextTick(() => {
        this.gameInstance = game.launch(this.containerId)

        // console.log(this.gameInstance.scene.scenes[3])
        //
        // for (let i = 0; i < this.gameInstance.scene.scenes.length; i++) {
        //   this.gameInstance.scene.scenes[i].resizeGameContainer();
        // }
        //
        // window.addEventListener('load', () => {
        //   console.log("load")
        //   window.addEventListener('resize', event => {
        //     for (let i = 0; i < this.gameInstance.scene.scenes.length; i++) {
        //       this.gameInstance.scene.scenes[i].resizeGameContainer();
        //     }
        //   });
        // });
        // window.addEventListener('resize', (event) => {
        //   console.log("zoom")
        //   // this.gameInstance.scale.setMaxZoom();
        //   this.gameInstance.scale.resize(window.innerWidth, window.innerHeight - 100);
        // }, false);

        // window.addEventListener('resize', (event) => {
        //   this.gameInstance.scale.resize(window.innerWidth, window.innerHeight);
        // }, false);
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
      this.$store.getters.getEventEmitter.emit("retry")
      EventBus.$emit("retry")
      // this.$nextTick(()=>{
      //   this.gameInstance.scene.start("GameLevelResolveScene")
      // })

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
    console.log(this.$store.getters)
    // this.$store.getters.getEventEmitter.on("show:success-dialog",this.showLevelSuccessDialog,this)
    EventBus.$on('ready', this.onGameSceneReady);
    EventBus.$on("show:failure-contents", this.showFailureContents)
    EventBus.$on("show:level-retry-dialog", this.showRestartDialog)
    EventBus.$on("show:success-dialog", this.showLevelSuccessDialog)
    EventBus.$on('show:tutorial', this.onShowLevelTutorial);
    EventBus.$on('show:effect', this.onShowEffect);
  },

  // window.addEventListener('resize', (event) => {
  //   this.gameInstance.scale.resize(window.innerWidth, window.innerHeight);
  // }, false);

  created() {

    // EventBus.$on("next-level",()=>{
    //
    //
    // })
    // EventBus.$on("retry",() =>{
    //   // this.scene.start("GameLevelResolveScene",store.getters.getSessionId)
    //   this.gameInstance.scene.get("GameLevelResolveScene").scene.restart()
    // })

    // EventBus.$on("done:failure-contents",() =>{
    //   EventBus.$emit("show:level-retry-dialog",this._level)
    // })

    // EventBus.$on("retry",() =>{
    //   // this.scene.start("GameLevelResolveScene",store.getters.getSessionId)
    //   this.gameInstance.scene.get("GameLevelResolveScene").scene.start()
    // })
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


<style lang="scss" scoped>



.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}

#animateLogo {
  z-index: 1000;
  //width: 250px;
  //height: 250px;
  //right: 27%;
  top: 12%;
}

#animateLogoBack {
  position: absolute;
  z-index: 999;
  width: 400px;
  height: 400px;
  //right: 21%;
  top: 4%;
}

//#game-container{
//  height: 100% !important;
//}

//#game-container {
//  background-image: url("../../public/background.jpg");
//  -webkit-background-size: cover;
//  -moz-background-size: cover;
//  -o-background-size: cover;
//  background-size: cover;
//  //padding-left: 16px;
//  //padding-right: 0px;
//}
</style>
