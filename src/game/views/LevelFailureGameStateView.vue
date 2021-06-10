<template>
<!--  <v-dialog v-model="levelFailurePage" persistent min-width="600" max-width="800">-->
  <div>
<!--    <v-card-text>-->
      <visual-content-view v-if="contentType===VISUAL_CONTENT" @no-content="onNoContent" @close:visual-content="onCloseVisualContent"></visual-content-view>
      <question-content-view v-if="contentType===QUESTION_CONTENT" @quiz:success="onQuizSuccess" @quiz:fail="onQuizFail" @no-content="onNoContent"></question-content-view>
<!--    </v-card-text>-->
  </div>
<!--  </v-dialog>-->
</template>

<script>
import contentTypes from "@/game/data/contentTypes";
import {VISUAL_CONTENT, QUESTION_CONTENT} from "@/game/data/contentTypes";
import VisualContentView from "@/game/views/VisualContentView";
import QuestionContentView from "@/game/views/QuestionContentView";

export default {
  name: "LevelFailureGameStateView",
  props: {},
  components: {
    VisualContentView,
    QuestionContentView
  },
  data: () => ({
    contentTypes,
    contentType: null,
    VISUAL_CONTENT,
    QUESTION_CONTENT,
    contentTypeIndex: -1,
    contentSwitchCount: 1
  }),
  methods: {
    initialize() {
      this.contentTypeIndex = this.getRandomIndex(2)
      this.contentType = this.contentTypes[this.contentTypeIndex];
    },
    getRandomIndex(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    onQuizSuccess(pointToBeWon){
      if(pointToBeWon > 0){
        // todo
      }
      this.$emit("done:quiz",pointToBeWon)
    },
    onQuizFail(pointToBePenalty){

      if(pointToBePenalty > 0){
        // todo
      }
      this.$emit("done:quiz",pointToBePenalty)
    },
    onNoContent() {
      if (this.contentSwitchCount < 2) {
        this.contentType = this.contentTypes[1 - this.contentTypeIndex];
        this.contentSwitchCount++;
      } else {
        this.$emit("close");
      }
    },
    onCloseVisualContent(){
        this.$emit("close");
    }
  },
  created() {
  },
  beforeDestroy() {

  },
  mounted() {
    this.initialize();
  }
}
</script>

<style scoped>

</style>