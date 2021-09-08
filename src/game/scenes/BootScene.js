import {Scene} from 'phaser'
import gameMusic from '@/game/assets/sounds/background/happy-background-music.mp3'
import chomp from '@/game/assets/sounds/tile/success.wav'
import badSwap from '@/game/assets/sounds/tile/bad_swap.mp3'
import movementLevels from '@/game/assets/config/levels-movement.json'
import variantLevels from '@/game/assets/config/levels-variant.json'
import specialityLevels from '@/game/assets/config/levels-special.json'

import wall from '@/game/assets/wall.png'
import swapIcon from '@/game/assets/swap_icon.png'
import done_1x from '@/game/assets/done_1x.png'
import done_2x from '@/game/assets/done_2x.png'
import explosion from '@/game/assets/explosionreal.png'
import bg from '@/game/assets/background.jpg';
import GameAssets from "@/game/core/util/gameAssets";


export default class BootScene extends Scene {
    asyncLoaderCount = 0;

    constructor() {
        super({key: 'BootScene'})
    }

    preload() {

        this.load.image('swap_icon', swapIcon)
        this.load.image('wall', wall)
        this.load.image('done_1x', done_1x)
        this.load.image('done_2x', done_2x)
        this.load.image('bg', bg)
        this.load.spritesheet('boom', explosion, {frameWidth: 64, frameHeight: 64, endFrame: 23});

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
        GameAssets.fetch().then(({data: {data, error}}) => {
            let loader = new Phaser.Loader.LoaderPlugin(this);
            for (let i = 0; i < data.length; i++) {
                if (!data[i].assetUrl) continue;
                this.asyncLoaderCount++;
                loader.image(data[i].assetReferenceCode, data[i].assetUrl);
                loader.on(Phaser.Loader.Events.COMPLETE, () => {
                    if (--this.asyncLoaderCount <= 0) {
                        this.scene.start('SessionLoadScene', {specialData: 11})
                    }
                }).start()
            }
        })
    }

    update(time, delta) {
    }

    lazyLoadScene() {
        // console.log(this.scene.get('SessionLoadScene'))
        // import("@/game/scenes/SessionLoadScene").then(sessionLoadScene =>{
        //     this.scene.add('SessionLoadScene', sessionLoadScene.default, false)
        //     this.scene.start('SessionLoadScene', {specialData: 11})
        // })
    }
}


// this.load.spritesheet('explosion', explosion,this.getDefaultFrameConfig())
// this.load.spritesheet('green', green, this.getDefaultFrameConfig());
// this.load.spritesheet('blue', blue, this.getDefaultFrameConfig());
// this.load.spritesheet('gray', gray, this.getDefaultFrameConfig());
// this.load.spritesheet('luna', luna, this.getDefaultFrameConfig());
// this.load.spritesheet('orange', orange, this.getDefaultFrameConfig());
// this.load.spritesheet('purple', purple, this.getDefaultFrameConfig());
// this.load.spritesheet('red', red, this.getDefaultFrameConfig());
// this.load.spritesheet('silver', silver, this.getDefaultFrameConfig());
// this.load.spritesheet('yellow', yellow, this.getDefaultFrameConfig());
