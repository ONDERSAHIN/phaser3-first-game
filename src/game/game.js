import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import SessionLoadScene from "@/game/scenes/SessionLoadScene";
import GameLevelResolveScene from "@/game/scenes/GameLevelResolveScene";
import GameOverScene from "@/game/scenes/GameOverScene";
import GameLevelSuccessScene from "@/game/scenes/GameLevelSuccessScene";

function launch(containerId) {
  return new Phaser.Game({
    parent:containerId,
    width: "100%",
    height: "100%",
    type: Phaser.WEBGL,
    autoFocus: true,
    version:"1.0.0-beta",
    banner: {
      hidePhaser: true
    },
    // scale: {
    //   mode: Phaser.Scale.ScaleModes.NONE,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // },
    scale: {
      mode: Phaser.Scale.RESIZE,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
      // parent: containerId,
    },
    // fps: {
    //   target: 2,
    //   min: 2,
    //   forceSetTimeOut: true
    // },
    transparent:true,
    scene: [BootScene,SessionLoadScene, GameLevelResolveScene,PlayScene,GameOverScene,GameLevelSuccessScene]
  })

}

export default launch
export { launch }

// const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
// const DEFAULT_HEIGHT = 720 // any height you want
// const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT
//
// var w = window.innerWidth * window.devicePixelRatio,
//     h = window.innerHeight * window.devicePixelRatio;
// if(h > 800) {
//   var div = h / 900; //800 is target
//   w = w / div;
//   h = 740;
// }
