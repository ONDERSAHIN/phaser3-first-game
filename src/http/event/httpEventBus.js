import Vue from 'vue'

export const httpEventBus = new Vue({
  methods: {
    httpGetRequest(payload) {
      this.$emit('http-get-request', payload);
    },
    httpPostRequest(payload) {
      this.$emit('http-post-request', payload);
    },
    httpDeleteRequest(payload){
      this.$emit('http-delete-request',payload);
    },
    httpPutRequest(payload){
      this.$emit('http-put-request',payload);
    },
    httpGetAPIRequest(payload) {
      this.$emit('http-get-api-request', payload);
    },
    httpPostAPIRequest(payload) {
      this.$emit('http-post-api-request', payload);
    },
    httpDeleteAPIRequest(payload){
      this.$emit('http-delete-api-request',payload);
    },
    httpPutAPIRequest(payload){
      this.$emit('http-put-api-request',payload);
    },
    httpResponse(payload){
        this.$emit('http-response',payload);
    }
  },
})

