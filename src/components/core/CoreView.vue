<template>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
        </v-content>
</template>
<script>
    export default {
        name: "CoreView",
        data() {
            return {
                error: false,
            }
        },
        methods:{
        },
        mounted() {
            this.$eventBus.$on('noonie-internal-error', () => {
                this.error = true
            })
        },
    }
</script>


<style scoped>

</style>