import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import SessionLoadScene from "@/game/scenes/SessionLoadScene";
import GameLevelResolveScene from "@/game/scenes/GameLevelResolveScene";
import GameOverScene from "@/game/scenes/GameOverScene";
import GameLevelSuccessScene from "@/game/scenes/GameLevelSuccessScene";

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
if(h > 800) {
  var div = h / 900; //800 is target
  w = w / div;
  h = 740;
}

function launch(containerId) {
  return new Phaser.Game({
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    version:"1.0.0-beta",
    banner:false,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    transparent:true,


    // scale: {
    //   mode: Phaser.Scale.NONE,
    //   autoCenter: Phaser.Scale.CENTER_BOTH,
    //   parent: containerId,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   // width: 640, // 640
    //   // height: 960,//960,
    // },
    // scale: {
    //   parent: containerId,
    //   mode: Phaser.Scale.RESIZE,
    //   autoCenter: Phaser.Scale.CENTER_BOTH,
    //    width: 640, // 640
    //    height: window.innerHeight,//960,
    //    zoom: Phaser.Scale.MAX_ZOOM,
    //   // width: 640, // 640
    //   // height: 960,//960,
    //   min: {
    //     width: 300,
    //     height: 400 // 480
    //   },
    //   max: {
    //     width: 1400,
    //    height: 960 //1200
    //   }
    // },
    // dom:{
    //   createContainer:true
    // },
    // physics: {
    //   default: 'arcade',
    //   arcade: {
    //     gravity: { y: 300 },
    //     debug: false
    //   }
    // },
    scene: [BootScene,SessionLoadScene, GameLevelResolveScene,PlayScene,GameOverScene,GameLevelSuccessScene]
  })

}

export default launch
export { launch }
