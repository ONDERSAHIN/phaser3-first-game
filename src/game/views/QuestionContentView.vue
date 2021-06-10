<template>
  <v-dialog v-model="show" persistent min-width="600" max-width="800">
    <v-card flat max-width="800">
      <v-card-title>
        <v-avatar tile>
          <v-icon left color="primary" x-large>
            mdi-comment-question-outline
          </v-icon>
        </v-avatar>
          {{title}}
      </v-card-title>
      <v-card-text>
        <div class="headline py-5 px-5">{{gameQuestion.content}}</div>
        <v-chip-group column active-class="primary--text" v-model="selectedAnswer">
          <v-flex xs12 v-for="answerChoice in gameQuestion.gameQuestionAnswers" :key="answerChoice.id">
            <v-chip large class="font-weight-bold d-block">
                <div class="title">{{ answerChoice.content }}</div>
            </v-chip>
          </v-flex>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!(selectedAnswer > -1)" @click="onReplyQuestion">Cevapla</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: "QuestionContentView",
    props:{

    },
    data:()=>({
        title : "Soru",
        selectedAnswer:null,
        gameQuestion :{},
        gameQuizQuestion :{},
      show:false,
    }),
  watch:{

  },
    methods:{
        initialize(){
          /*
          {code: -1400, message: "BAD_REQUEST", description: "Request method 'POST' not supported"}
          */
            let payload = {'sessionId':this.$store.getters.getSessionId.id}
            this.$serviceContext.gameQuizQuestionService.getQuizQuestionContent(payload).then(({data:{data,error}}) => {
              if(!data){
                  this.$emit("no-content")
              }else{
                if(!error){
                  if(data){
                    this.gameQuizQuestion = data || {}
                    this.gameQuestion = data.gameQuestion ||  {}
                    this.show = true;
                  }
                }
              }
            });
              /**
               *
               * correctAnswerPointToBeWon: 30
               createdDateTime: "2020-12-30T02:32:47.311"
               deleted: false
               deletedDateTime: null
               description: null
               expirationDate: "2020-12-31"
               gameQuestion:
                     active: (...)
                     answeredAsCorrectCount: (...)
                     answeredAsWrongCount: (...)
                     content: (...)
                     createdDateTime: (...)
                     deleted: (...)
                     deletedDateTime: (...)
                     description: (...)
                     gameQuestionAnswers: Array(3)
                                       active: true
                                       content: "A"
                                       createdDateTime: "2020-12-30T02:32:47.305"
                                       deleted: false
                                       deletedDateTime: null
                                       description: null
                                       id: "54fa802b-c05e-437b-8813-9287d1163fd4"
                                       updatedDateTime: "2020-12-30T02:32:47.305"
                     id: "a32ee7b9-fd21-4ee7-bfe0-7c99b6ccdaa8"
                     level: "EASY"
                     name: "Test Quiz"
                     type: "TEXT"
                     updatedDateTime: (...)
               gameRightRules: (2) [{…}, {…}]
                                   createdDateTime: "2020-12-30T02:32:47.315"
                                   deleted: false
                                   deletedDateTime: null
                                   description: null
                                   gameRightQuantityToBeWon: 10
                                   gameRightUnit: "MOVEMENT"
                                   id: "5082d95b-39fe-4e65-9e57-4865dbdc1449"
                                   updatedDateTime: "2020-12-30T02:32:47.315"
               id: "41cbfd8a-354c-4116-8986-7388a25237a3"
               questionName: "Test Quiz"
               questionOrder: -1
               updatedDateTime: "2020-12-30T02:32:47.311"
               wrongAnswerPointPenalty: 50
               */

        },
      onReplyQuestion(){
          let answer = this.gameQuestion.gameQuestionAnswers[this.selectedAnswer] || {};
          if(answer.id){
            this.$serviceContext.gameService.getConfirmAnswer(this.gameQuestion.id,answer.id).then(({data:{data,error}}) => {
              if (!error) {
                if (data) {
                    this.$emit("quiz:success",this.gameQuizQuestion.correctAnswerPointToBeWon)
                }else{
                     this.$emit("quiz:fail",-this.gameQuizQuestion.wrongAnswerPointPenalty)
                }
              }

            }).catch(error => {
              console.err(error)
            });
          }
      }
    },
    created(){
    },
    beforeDestroy(){

    },
    mounted(){
        this.initialize();
    }
}
</script>

<style scoped>

</style>