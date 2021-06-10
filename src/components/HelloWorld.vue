<template>
  <div class="hello">
    <div @click="initializeGame" class="flex">
      <a href="#1" class="btn">Initialize</a>
    </div>
    <ion-phaser
        v-bind:game.prop='game'
        v-bind:initialize.prop='initialize'
    />
  </div>
</template>

<script>
import Phaser from "phaser";

export default {
  data() {
    return {
      initialize: false,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: {
          init() {
            this.cameras.main.setBackgroundColor("#24252A");
          },
          create() {
            this.helloWorld = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                "Hello World",
                {font: "40px Arial", fill: "#ffffff"}
            );
            this.helloWorld.setOrigin(0.5);
          },
          update() {
            this.helloWorld.angle += 1;
          }
        }
      }
    };
  },
  methods: {
    initializeGame() {
      this.initialize = true;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
