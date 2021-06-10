<template>
  <v-snackbar
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    :vertical="snackbar.mode === 'vertical'"
    v-model="snackbar.status"
  >
    <span>{{ snackbar.text }}</span>
    <v-btn dark text @click.native="snackbar.status = false">{{$t('message.close')}}</v-btn>
  </v-snackbar>
</template>

<script>
  import EventBus from '../bus/event.bus'

  export default {
    name: 'iSnackbar',
    data () {
      return {
        snackbar: {
          status: false,
          color: '',
          mode: 'multi-line',
          x: null,
          y: null,
          timeout: 2000,
          text: '',
        },
      }
    },
    methods: {
      showSnackbar (text, color) {
        this.snackbar.text = text
        this.snackbar.color = color
        this.snackbar.status = true
      },
    },
    created () {
      EventBus.$on('snack-bar-notification', (notification_credentials) => {
        let text = `message.${notification_credentials.text}`
        this.showSnackbar(this.$t(text), notification_credentials.color)
      })
    },
  }
</script>

<style scoped>

</style>
