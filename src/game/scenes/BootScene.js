import {Scene} from 'phaser'
import gameMusic from '@/game/assets/sounds/background/happy-background-music.mp3'
import chomp from '@/game/assets/sounds/tile/success.wav'
import badSwap from '@/game/assets/sounds/tile/bad_swap.mp3'
import movementLevels from '@/game/assets/config/levels-movement.json'
import variantLevels from '@/game/assets/config/levels-variant.json'
import specialityLevels from '@/game/assets/config/levels-special.json'
import store from "@/store";

import wall from '@/game/assets/wall.png'
import swapIcon from '@/game/assets/swap_icon.png'
import done_1x from '@/game/assets/done_1x.png'
import done_2x from '@/game/assets/done_2x.png'
import explosion from '@/game/assets/explosion.gif'
import GameAssets from "@/game/core/util/gameAssets";


export default class BootScene extends Scene {
    asyncLoaderCount = 0;

    constructor() {
        super({key: 'BootScene'})
    }

    preload() {

        this.load.image('swap_icon', swapIcon)
        this.load.image('wall', wall)
        this.load.image('done_1x',done_1x)
        this.load.image('done_2x',done_2x)

        this.load.spritesheet('explosion', explosion,this.getDefaultFrameConfig())
        // this.load.spritesheet('green', green, this.getDefaultFrameConfig());
        // this.load.spritesheet('blue', blue, this.getDefaultFrameConfig());
        // this.load.spritesheet('gray', gray, this.getDefaultFrameConfig());
        // this.load.spritesheet('luna', luna, this.getDefaultFrameConfig());
        // this.load.spritesheet('orange', orange, this.getDefaultFrameConfig());
        // this.load.spritesheet('purple', purple, this.getDefaultFrameConfig());
        // this.load.spritesheet('red', red, this.getDefaultFrameConfig());
        // this.load.spritesheet('silver', silver, this.getDefaultFrameConfig());
        // this.load.spritesheet('yellow', yellow, this.getDefaultFrameConfig());

        this.load.audio('gameMusic', [gameMusic])
        this.load.audio('crush', [chomp])
        this.load.audio('badSwap', [badSwap])
        this.load.json('movementLevels', movementLevels);
        this.load.json('variantLevels', variantLevels);
        this.load.json('specialityLevels', specialityLevels);

    }


    getDefaultFrameConfig() {
        return {frameWidth: 50, frameHeight: 50};
    }


    create() {
        // store.dispatch('setEventEmitter',new Phaser.Events.EventEmitter());

         GameAssets.fetch().then(({data: {data, error}}) => {

            for (let i = 0; i < data.length; i++) {
                let key = data[i].assetReferenceCode;
                let url = data[i].assetUrl;
                if(!url) continue;
                this.asyncLoaderCount++;
                let loader = new Phaser.Loader.LoaderPlugin(this);
                loader.image(key, url);
                loader.on(Phaser.Loader.Events.COMPLETE, () =>{
                    this.asyncLoaderCount--;
                    if(this.asyncLoaderCount <= 0){
                        this.scene.start('SessionLoadScene', {specialData: 11})
                    }
                })
                loader.start();
            }
        })

    }

    update(time, delta) {
        // Constant running loop
        // console.log("BootScene update");
    }
}
