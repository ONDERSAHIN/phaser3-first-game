<template>
  <v-dialog v-model="show" persistent min-width="600" max-width="800">
    <v-card flat>
      <v-card-title></v-card-title>
        <v-card-text v-if="visualContent.visualContentType===IMAGE">
            <v-img
                contain
                :lazy-src="visualContent.contentUrl"
                :src="visualContent.contentUrl"
            ></v-img>
        </v-card-text>
        <v-card-text v-if="visualContent.visualContentType===VIDEO">
            <iframe :src="visualContent.contentUrl" width="600" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        </v-card-text>
        <v-card-actions>
            <v-btn color="accent" @click="closeVisualContent">Kapat</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

const VIDEO = "VIDEO";
const IMAGE = "IMAGE";

export default {
    name: "VisualContentView",
    props:{

    },
    data:()=>({
        visualContent : {},
        VIDEO,
        IMAGE,
        show:false,
    }),
    methods:{
        initialize(){
            let payload = {'sessionId':this.$store.getters.getSessionId.id}
            this.$serviceContext.visualContentService.getVisualContent(payload).then(({data:{data,error}}) => {
                if(!error){
                    if(!data){
                        this.$emit("no-content");
                        return 
                    }
                    this.visualContent = data || {};
                    this.show = true;
                }             
            });
        },
        closeVisualContent(){
            this.$emit("close:visual-content");
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