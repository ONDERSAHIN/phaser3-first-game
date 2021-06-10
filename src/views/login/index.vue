<template>
  <v-main>
    <v-container fluid style="padding: 0;">
      <v-layout row wrap justify-center>
        <v-overlay :value="authenticating" color="#e44032">
          <v-progress-circular
              indeterminate
              size="64"
          ></v-progress-circular>
        </v-overlay>
        <v-col sm="10" v-if="isNotAuthenticated">
          <v-alert
              height="200"
              border="left"
              colored-border
              type="error"
              elevation="2"
          >
            {{ isNotAuthenticatedText }}
          </v-alert>
        </v-col>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'Login',
  components: {},
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      authenticating: false,
      isNotAuthenticated: false,
      isNotAuthenticatedText: "Oturum açma işlemi başarısız oldu.",
    }
  },
  computed: {
  },
  methods: {
    authenticateUserByReferenceToken(referenceToken) {
      this.authenticating = true;
      sleep(3000).then(()=>{
        this.$store.dispatch('login', {referenceToken}).then(isLoggedIn => {
          if (isLoggedIn) {
            this.$router.replace({name: 'games'})
          }
          this.authenticating = false;
          this.isNotAuthenticated = true;
        }).catch(error => {
          this.isNotAuthenticated = true;
          this.authenticating = false;
        });
      })

    },
    startLogin() {
      console.log("start login")
      let referenceToken = this.$store.getters.referenceToken;
      if (referenceToken) {
        this.authenticateUserByReferenceToken(referenceToken);
      } else {
        this.isNotAuthenticated = true;
      }
    }
  },
  mounted() {
    this.startLogin();
  },
}
</script>
<style scoped>
.rightSide {
  background-color: #FF0000;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>