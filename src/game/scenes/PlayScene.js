import {Scene, Geom, Scale, GameObjects} from 'phaser'
import {EMPTY, FORBIDDEN, WALL} from "@/game/core/model/tile.type";
import BoardTemplateInflater from "@/game/core/util/boardTemplateInflater";
import Tile from "@/game/core/model/tile";
import Swap from "@/game/core/model/swap";
import {HORIZONTAL, VERTICAL} from "@/game/core/model/chain.type";
import Chain from "@/game/core/model/chain";
import movementDirections from '@/game/core/model/direction.types'
import EventBus from "@/bus/event.bus";
import {VARIANT_CANDY_CRUSH_IN_MOVEMENT} from "@/game/levels/gameLevelTypes";

let handleMatchCount = 0;
let count = 0;
let container = null;
export default class PlayScene extends Scene {

    GAME_WIDTH = 576; // 9 * 64 // 576 Mobile With
    GAME_HEIGHT = 1040; // best height // 960
    tileWidth = 82.0;
    tileHeight = 72.0;
    marginYDelta = 200;
    levelConfig = null;
    parent;
    sizer;
    gameBoard = null;
    _swaps = null;
    _selectedFromTile = null;
    _userSessionData = {}
    _level = {}
    _scoreText = null;
    _levelText = null;
    text = "";
    _canPlay = true;

    constructor() {
        super({key: 'PlayScene'})
        // this.gameContainer = document.getElementById('game-container');
        // this.eventEmitter = new Phaser.Events.EventEmitter();
        // store.dispatch('setEventEmitter',new Phaser.Events.EventEmitter());
    }

    init(data) {
        this._userSessionData = data.sessionData;
        this._level = data.levelData;
        this._canPlay = true;
        this._swaps = new Map();
    }

    preload() {
        this.sound.stopAll();
        this.tweens.killAll();
        EventBus.$emit("show:tutorial", this._level)
    }


    create() {
        EventBus.$emit('ready');
        this.sound.play('gameMusic', {loop: true, volume: 0.70});
        const width = this.GAME_WIDTH
        const height = this.GAME_HEIGHT

        this.createScoreText(this._userSessionData.sessionScore);
        this.createLevelText(this._userSessionData.currentLevel);
        this.createLevelMovementText(this._level.movementCount);
        this.createLogOutText();
        if (this._level.levelType === VARIANT_CANDY_CRUSH_IN_MOVEMENT) this.createVariantGameLevelTargets(this._level.getAims())
        this.createLevelDescriptionText(this._level.getLevelAimDescription());
        this.gameBoard = this._buildGameBoard()
        this._renderGameBoard(this.gameBoard);

        // this.resizeGameContainer()
        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);
        this.resize(this.scale.gameSize)
        this.updateCamera2();

        //
        // window.addEventListener('resize', (event) => {
        //
        //     this.game.scale.resize(window.innerWidth, window.innerHeight);
        //
        // }, false);


        // window.addEventListener('resize', (event) => {
        //   // console.log("zoom")
        //   // this.gameInstance.scale.setMaxZoom();
        //   // this.scale.resize(window.innerWidth, window.innerHeight);
        //   //   this.resizeInternal(window.innerWidth, window.innerHeight)
        //     this.game.scale.gameSize.width = window.innerWidth;
        //     this.game.scale.gameSize.height = window.innerHeight;
        //     this.resize(this.scale.gameSize)
        // }, false);

        this.scale.on('resize', this.resize, this);

        this.input.off('gameobjectdown');
        this.input.off('gameobjectup');

        //TODO:boolean flag for controlling game
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            // gameObject.disableInteractive();
            if (!this._canPlay) return;
            this.touchStartHandler(gameObject)
            // gameObject.emit('touchstart', gameObject);
        }, this);

        this.input.on('gameobjectup', (pointer, gameObject) => {
            // gameObject.disableInteractive();
            if (!this._canPlay) return;
            this.touchEndHandler(gameObject)
            // gameObject.emit('touchend', gameObject);
        }, this);
    }

    update(time, delta) {
    }

    resizeGameContainer() {
        let winW = window.innerWidth / window.devicePixelRatio;
        let winH = window.innerHeight / window.devicePixelRatio;
        let breakpoints = [{scrW: 0, gamW: 400},
            {scrW: 600, gamW: 450},
            {scrW: 900, gamW: 550},
            {scrW: 1200, gamW: 750},
            {scrW: 1500, gamW: 1000},
            {scrW: 1800, gamW: 1300}];
        let currentBreakpoint = null;
        let newViewPortW = 0;
        let newViewPortH = 0;

        for (let i = 0; i < breakpoints.length; i++) {
            currentBreakpoint = breakpoints[i];

            if (winW < currentBreakpoint.scrW) {
                break;
            }
        }

        newViewPortW = currentBreakpoint.gamW;
        newViewPortH = currentBreakpoint.gamW * (winH / winW);

        this.game.scale.resize(newViewPortW, newViewPortH);

        console.log(this.game)
        this.gameContainer.style.width = `${window.innerWidth}px`;
        this.gameContainer.style.height = `${window.innerHeight}px`;
        // this.game.canvas.style.width = `${window.innerWidth}px`;
        // this.game.canvas.style.height = `${window.innerHeight}px`;

        this.game.scale.gameSize.width = window.innerWidth;
        this.game.scale.gameSize.height = window.innerHeight;

        this.eventEmitter.emit('screenResized');
    }

    resize2() {
        var canvas = this.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }

    checkOriention(orientation) {
        if (orientation === Phaser.Scale.PORTRAIT) {
            this.text.setVisible(false);
        } else if (orientation === Phaser.Scale.LANDSCAPE) {
            this.text.setVisible(true);
        }
    }

    resizeInternal(width, height) {
        // console.log("RESİZE ",windowsSize)
        // const width = windowsSize.x;
        // const height = windowsSize.y;
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        // this.updateCamera();
    }

    resizeApp() {
        // Width-height-ratio of game resolution
        let game_ratio = (9 * 32) / (15 * 32);

        // Make div full height of browser and keep the ratio of game resolution
        let div = document.getElementById('game-container');
        div.style.width = (window.innerHeight * game_ratio) + 'px';
        div.style.height = window.innerHeight + 'px';

        // Check if device DPI messes up the width-height-ratio
        let canvas = document.getElementsByTagName('canvas')[0];

        let dpi_w = (parseInt(div.style.width) / canvas.width);
        let dpi_h = (parseInt(div.style.height) / canvas.height);

        let height = window.innerHeight * (dpi_w / dpi_h);
        let width = height * 0.6;

        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }


    updateCamera2() {
        const camera = this.cameras.main;
        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = 0;
        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;
        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
    }

    updateCamera() {
        const camera = this.cameras.main;
        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = 0;

        const scaleX = this.sizer.width / window.innerWidth;
        const scaleY = this.sizer.height / window.innerHeight;
        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(window.innerWidth / 2, window.innerHeight / 2);
    }

    resize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
        this.updateCamera2();
    }

    createLevelMovementText(movementCount) {
        // let movementIcon = this.add.image(200, 30, "swap_icon");
        // movementIcon.setScale(1.8, 1.2);

        // let c = this.add.circle(220, 50, 60, 0xFFFFFF, 0.8);
        // c.setStrokeStyle(4,"#03a9f0")

        let movementLabel = this.add.text(180, 10, "Kalan", {
            // font: '26px Roboto',
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 30
        });

        this._movementCountText = this.add.text(180, 50, String(movementCount), {
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 40
        });
    }

    createLevelDescriptionText(descriptionText) {

        if (this._level.levelType === VARIANT_CANDY_CRUSH_IN_MOVEMENT) {
            let graphics = this.add.graphics();
            graphics.fillStyle(0xFFFFFF, 0.9);
            graphics.fillRoundedRect(0, 100, 576, 100, 10);
            //     let descText = this.add.text(20, 172, "Hedefler", {
            //         // font: '26px Roboto',
            //         fontFamily: 'Times New Roman',
            //         fill: "#e44032",
            //         align: "center",
            //         fontStyle: "bold",
            //         fontSize: 18
            //     });
        }
    }

    createVariantGameLevelTargets(aims) {
        for (let i = 0; i < aims.length; i++) {
            let aimImage = this.add.image((20 * (i + 1) * 2) + (i * 60), 130, aims[i].tileType.getName());
            aimImage.depth = 2;
            aimImage.setScale(1.2);

            let aimText = this.add.text((20 * (i + 1) * 2) + (i * 60) - 10, 160, String(aims[i].targetValue), {
                fontFamily: 'Roboto',
                fill: "#03a9f4",
                align: "center",
                fontStyle: "bold",
                fontSize: 30
            });
            aimText.depth = 2
            aims[i].setValueTextReference(aimText)
        }
    }

    createLevelText(levelNumber) {

        let levelLabel = this.add.text(300, 10, "Seviye", {
            // font: '26px Roboto',
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 30
        });
        // levelLabel.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);

        this._levelText = this.add.text(300, 50, "" + levelNumber, {
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 40
        });

        // this._levelText.setShadow(-1, 1, 'rgba(0,0,0,0.5)', 0);
    }

    createLogOutText() {

        let levelLabel = this.add.text(450, 10, "Oyundan\nÇık", {
            // font: '26px Roboto',
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 30
        });

        levelLabel.setInteractive();

        levelLabel.on('pointerdown', function () {
            EventBus.$emit("log:out")
        })

    }


    createScoreText(score) {

        // let a = this.add.rectangle(80, 60, 150, 100)
        // a.setStrokeStyle(3, 0xFFFFFF);

        let scoreLabel = this.add.text(10, 10, "Puan", {
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 30
        });
        // scoreLabel.setShadow(-1, 1, 'rgba(0,0,0,0.8)', 0);

        this._scoreText = this.add.text(10, 50, "" + score, {
            fontFamily: 'Roboto',
            fill: "white",
            align: "center",
            fontStyle: "bold",
            fontSize: 40
        });

        this._scoreText.setInteractive();

        this._scoreText.on('pointerdown', function () {
            EventBus.$emit("get:statistics")
        })

        // this._scoreText.setShadow(-1, 1, 'rgba(0,0,0,0.8)', 0);
    }


    _buildGameBoard() {
        // this.GAME_WIDTH = this._level.boardConfig.columns * 64;
        do {
            this.gameBoard = new BoardTemplateInflater(this._level.boardConfig.template).inflate()
            this.identifySwaps()
        } while (this._swaps.length === 0);
        return this.gameBoard;
    }

    /**
     *
     * @param column
     * @param row
     * @return {Phaser.Geom.Point}
     */

    pointForGridLocation(column, row) {
        let x = column * this.tileWidth + this.tileWidth / 2;
        let y = (row * this.tileHeight + this.tileHeight / 2) + 230;
        return new Geom.Point(x, y);
    }

    pointForBoardCell(column, row) {
        let x = column * this.tileWidth;
        let y = (row * this.tileHeight) + 230;
        return new Geom.Point(x, y);
    }

    // TODO : 
    _renderGameBoard(board) {
        this.boardCellLayer = this.add.group({});
        this.boardCellLayer.z = 1;
        this.tilesLayer = this.add.group();
        this.tilesLayer.z = 2;

        let boardSize = board.getSize();
        let graphics = this.add.graphics();
        let defaultRadius = 20;

        for (let row = 0; row < boardSize.rowSize; row++) {
            for (let column = 0; column < boardSize.colSize; column++) {
                let tile = board.getTileAt(row, column);
                if (tile.type === FORBIDDEN || tile.type === EMPTY) continue;
                let point = this.pointForGridLocation(column, row);
                let boardCellPoint = this.pointForBoardCell(column, row);

                graphics.fillStyle(0xFFFFFF, 1);
                // graphics.fillRoundedRect(boardCellPoint.x, boardCellPoint.y, 64, 72, { tl: 32, tr: 0, bl: 12, br: 0 });
                if (row === 0 && column === 0) {
                    graphics.fillRoundedRect(boardCellPoint.x, boardCellPoint.y, 83, 73, {
                        tl: defaultRadius,
                        tr: 0,
                        bl: 0,
                        br: 0
                    });
                } else if (row === boardSize.rowSize - 1 && column === 0) {
                    graphics.fillRoundedRect(boardCellPoint.x, boardCellPoint.y, 83, 73, {
                        tl: 0,
                        tr: 0,
                        bl: defaultRadius,
                        br: 0
                    });
                } else if (row === 0 && column === boardSize.colSize - 1) {
                    graphics.fillRoundedRect(boardCellPoint.x, boardCellPoint.y, 83, 73, {
                        tl: 0,
                        tr: defaultRadius,
                        bl: 0,
                        br: 0
                    });
                } else if (row === boardSize.rowSize - 1 && column === boardSize.colSize - 1) {
                    graphics.fillRoundedRect(boardCellPoint.x, boardCellPoint.y, 83, 73, {
                        tl: 0,
                        tr: 0,
                        bl: 0,
                        br: defaultRadius
                    });
                } else {
                    this.add.rectangle(point.x, point.y, 83, 73, 0xFFFFFF, 1);
                }


                // let rectangle = this.add.rectangle(point.x, point.y, 64, 72, 0xFFFFFF, 0.7);
                // rectangle.setStrokeStyle(1, 0xFF0000, 0.3)
                // this.boardCellLayer.add(rectangle);
                if (tile.type === WALL) {
                    this.tilesLayer.create(point.x, point.y, 'wall').setScale(.5)
                } else {
                    tile.setGameObjectReference(this._drawTileAtPosition(point.x, point.y, tile));
                }
            }
        }
    }


    identifySwaps() {
        this._swaps.clear()

        let index;
        let gameBoardSize = this.gameBoard?.getSize();
        let fromTile;
        let toTile;

        for (let row = 0; row < gameBoardSize.rowSize; row++) {
            for (let col = 0; col < gameBoardSize.colSize; col++) {
                index = -1;
                fromTile = this.gameBoard.getTileAt(row, col);
                if (!Tile.isNormal(fromTile)) continue;

                do {
                    index++;
                    toTile = this.gameBoard?.getTileInDirection(fromTile, movementDirections[index])
                    if (!toTile) continue;
                    if (fromTile.hasSameTypeWith(toTile)) continue;
                    if (!Tile.isNormal(toTile)) continue;

                    this.gameBoard.flipTiles(fromTile, toTile);

                    //
                    // check if this change creates a chain
                    //
                    let chainH = this.checkHorizontalChain(toTile.getGridLocation().row, toTile.getGridLocation().column);
                    if (chainH != null) {
                        this._addSwaps(fromTile, toTile);
                    }

                    let chainV = this.checkVerticalChain(toTile.getGridLocation().row, toTile.getGridLocation().column);
                    if (chainV != null) {
                        this._addSwaps(fromTile, toTile);
                    }

                    chainH = this.checkHorizontalChain(row, col);
                    if (chainH != null) {
                        this._addSwaps(toTile, fromTile);
                    }

                    chainV = this.checkVerticalChain(row, col);
                    if (chainV != null) {
                        this._addSwaps(toTile, fromTile);
                    }
                    // Revert back
                    this.gameBoard.flipTiles(fromTile, toTile);
                } while (index < 3);
            }
        }
        // console.log("POSSIBLE SWAPS ", this._swaps)
    }


    _addSwaps(fromTile, toTile) {
        let newSwap = new Swap(fromTile, toTile);
        this._swaps.set(newSwap.hashCode(), newSwap);

        newSwap = new Swap(toTile, fromTile);
        this._swaps.set(newSwap.hashCode(), newSwap);
    }


    checkVerticalChain(row, col) {
        let chain = new Chain(VERTICAL);
        let boardSize = this.gameBoard.getSize();
        let minRow = Math.max(0, row - 5);
        let maxRow = Math.min(row + 5, boardSize.rowSize - 1);
        let index = row;

        let tile = this.gameBoard.getTileAt(row, col);

        // By default the tested tile is part of the chain
        chain.addTile(tile);

        // Search Down
        index = row - 1;
        while (index >= minRow && tile.hasSameTypeWith(this.gameBoard.getTileAt(index, col)) && Tile.isNormal(this.gameBoard.getTileAt(index, col))) {
            chain.addTile(this.gameBoard.getTileAt(index, col));
            index--;
        }

        // Search Up
        index = row + 1;
        while (index <= maxRow && tile.hasSameTypeWith(this.gameBoard.getTileAt(index, col)) && Tile.isNormal(this.gameBoard.getTileAt(index, col))) {
            chain.addTile(this.gameBoard.getTileAt(index, col));
            index++;
        }

        // If the chain counts at least 3 tiles => return it
        return chain.length > 2 ? chain : null;
    }


    checkHorizontalChain(row, col) {

        let chain = new Chain(HORIZONTAL);
        let boardSize = this.gameBoard.getSize();
        let minCol = Math.max(0, col - 5);
        let maxCol = Math.min(col + 5, boardSize.colSize - 1);
        let index = col;
        let tile = this.gameBoard.getTileAt(row, col);

        // By default the tested tile is part of the chain
        chain.addTile(tile);

        // Search Left
        index = col - 1;
        while (index >= minCol && tile.hasSameTypeWith(this.gameBoard.getTileAt(row, index)) && Tile.isNormal(this.gameBoard.getTileAt(row, index))) {
            chain.addTile(this.gameBoard.getTileAt(row, index));
            index--;
        }

        // Search Right
        index = col + 1;
        while (index <= maxCol && tile.hasSameTypeWith(this.gameBoard.getTileAt(row, index)) && Tile.isNormal(this.gameBoard.getTileAt(row, index))) {
            chain.addTile(this.gameBoard.getTileAt(row, index));
            index++;
        }

        // If the chain counts at least 3 tiles => return it
        return chain.length > 2 ? chain : null;
    }

    touchStartHandler(gameObject) {
        // console.log("touchStartHandler", gameObject.getData('tile'))
        this._selectedFromTile = gameObject.getData('tile') || null;
    }

    touchEndHandler(gameObject) {
        this.processSwap(new Swap(this._selectedFromTile, gameObject.getData('tile') || null))
        this._selectedFromTile = null;
    }

    processSwap(swap) {
        if (!this._isValidSwap(swap)) return;
        this.doSwap(swap).then(() => {
            let resolvedChains = this.resolveChainsFromSwap(swap)
            if (resolvedChains.length) {
                this.disallowUserInteraction();
                this.handleMatches(resolvedChains).then(() => {
                    this._updateMovementCount();
                    if (this._level.movementCount > 0) {
                        this.allowUserInteraction();
                    } else {
                        this.resolveLevelCompletion();
                    }
                })
            } else {
                this.undoSwap(swap);
            }
        })
    }

    resolveLevelCompletion() {
        if (this._level.checkLevelCompletion()) {
            //this.scene.restart();
            // this.input.off('gameobjectdown')
            // this.input.off('gameobjectup')
            // this.tweens.killAll();
            // this.scene.stop("PlayScene");
            // this.scene.stop("PlayScene")
            // EventBus.$emit("show:success-dialog",this._level)
            // this.scene.start('SessionLoadScene')
            this.scene.start('GameLevelSuccessScene', {levelData: this._level})
        } else {
            // this.scene.restart();
            //this.input.off('gameobjectdown')
            //this.input.off('gameobjectup')
            // this.tweens.killAll();
            // this.scene.stop("PlayScene");
            // this.scene.stop("PlayScene")
            // EventBus.$emit("show:failure-contents")
            // this.scene.start('SessionLoadScene')

            this.scene.start('GameOverScene', {levelData: this._level})
        }
    }


    doSwap(swap) {
        this.gameBoard?.doSwap(swap);
        return this.animateSwap(swap);
    }

    undoSwap(swap) {
        this.doSwap(swap).then(r => {
            this.sound.play('badSwap', {volume: 0.30});
        });
    }

    allowUserInteraction() {
        this._canPlay = true;
    }

    disallowUserInteraction() {
        this._canPlay = false;
    }

    async handleMatches(chains) {
        this.animateMatchedTiles(chains); // TODO:change this method name !!
        let movedList = [...this.moveTilesDown()];
        let spawnTiles = [...this.gameBoard?.flushSpawnTiles()];
        this.animateMovedDownTiles(movedList)
        this._drawNewTilesAtSpawn(spawnTiles);
        await this.animateNewTilesDown(spawnTiles); // TODO : change this method name
        let resolvedChains = this.resolveChainsOnLastMovedTiles(movedList.concat(spawnTiles));
        if (!resolvedChains.length) return;
        await this.handleMatches(resolvedChains)
    }

    _isValidSwap(swap) {
        if (!(swap instanceof Swap)) return false;
        if (!Tile.isNormal(swap.from) || !Tile.isNormal(swap.to)) return false
        if (swap.from.getGridLocation().isSameAs(swap.to.getGridLocation())) return false
        // direction check
        for (let i = 0; i < movementDirections.length; i++) {
            let tileInDirection = this.gameBoard.getTileInDirection(swap.from, movementDirections[i])
            if (Tile.isNormal(tileInDirection) && tileInDirection.getGridLocation().isSameAs(swap.to.getGridLocation())) return true
        }
        return false;
    }


    resolveChainsFromSwap(swap) {
        let resolvedChains = [];

        let chainH = this.checkHorizontalChain(swap.to.getGridLocation().row, swap.to.getGridLocation().column);
        if (chainH != null) {
            resolvedChains.push(chainH)
        }

        let chainV = this.checkVerticalChain(swap.to.getGridLocation().row, swap.to.getGridLocation().column);
        if (chainV != null) {
            resolvedChains.push(chainV)
        }

        if (chainH != null && chainV != null) {
            // TODO : combo
            console.log("(!)SWAP:ToTile::POSSIBLE COMBO SIGNAL")
        }

        chainH = this.checkHorizontalChain(swap.from.getGridLocation().row, swap.from.getGridLocation().column);
        if (chainH != null) {
            resolvedChains.push(chainH)
        }

        chainV = this.checkVerticalChain(swap.from.getGridLocation().row, swap.from.getGridLocation().column);
        if (chainV != null) {
            resolvedChains.push(chainV)
        }

        if (chainH != null && chainV != null) {
            // TODO : combo
            console.log("(!)SWAP:FromTile::POSSIBLE COMBO SIGNAL")
        }

        return resolvedChains;

    }

    resolveChainsOnLastMovedTiles(tileList) {
        let chains = [];

        function isAlreadyInAnyChain(tile) {
            for (let i = 0; i < chains.length; i++) {
                if (chains[i].containsTile(tile)) return true
            }
            return false;
        }

        tileList.forEach((tile) => {
            if (isAlreadyInAnyChain(tile)) return;
            let chainH = this.checkHorizontalChain(tile.getGridLocation().row, tile.getGridLocation().column);
            let chainV = this.checkVerticalChain(tile.getGridLocation().row, tile.getGridLocation().column);
            if (chainH != null) chains.push(chainH)
            if (chainV != null) chains.push(chainV)
            if (chainH != null && chainV != null) {
                // TODO : combo
                console.log("(!)POSSIBLE COMBO SIGNAL")
            }
        });

        // console.log("NEW CHAINS ", chains)
        return chains;
    }


    // removeMatches() {
    //     var horizontalChains = this.detectHorizontalMatches();
    //     var verticalChains = this.detectVerticalMatches();
    //
    //     this.removeCookies(horizontalChains);
    //     this.removeCookies(verticalChains);
    //
    //     this.calculateScores(horizontalChains);
    //     this.calculateScores(verticalChains);
    //
    //     return horizontalChains.concat(verticalChains);
    // }


    _drawNewTilesAtSpawn(newTilesList) {
        newTilesList.forEach((newTile) => {
            let point = this.pointForGridLocation(newTile.getGridLocation().column, -1 / 3);
            newTile.setGameObjectReference(this._drawTileAtPosition(point.x, point.y, newTile));
        });
    }

    _drawTileAtPosition(x, y, tile) {
        // console.log(this.tilesLayer);
        let tileGameObject = this.tilesLayer.create(x, y, tile.type.getName());
        tileGameObject.depth = 500;
        tileGameObject.setScale(1.3);
        tileGameObject.setData('tile', tile)
        tileGameObject.setInteractive();

        // tileGameObject.on('touchstart', this.touchStartHandler, this);
        // tileGameObject.on('touchend', this.touchEndHandler, this);
        return tileGameObject;
    }

    // TODO : move the board
    moveTilesDown() {
        let movedDownTiles = []
        // Collapse each column
        for (let col = 0; col < this.gameBoard.getSize().colSize; col++) {
            let emptyRow = null;
            // In each column, scan for the bottom most empty row
            for (emptyRow = this.gameBoard.getSize().rowSize - 1; emptyRow >= 0; emptyRow--) {
                if (this.gameBoard.getTileAt(emptyRow, col).type === EMPTY) {
                    break;
                }
            }
            // Then shift any nonempty rows up
            for (let row = emptyRow - 1; row >= 0; row--) {
                let tile = this.gameBoard.getTileAt(row, col);
                if (Tile.isNormal(tile)) {
                    this.gameBoard?.moveTo(tile, emptyRow, col);
                    movedDownTiles.push(tile)
                    emptyRow--;
                }
            }

            for (let spawnRow = -1; emptyRow >= 0; emptyRow--, spawnRow--) {
                // We report spawnRow as the (negative) position where
                // the candy "would have" started to fall into place.
                this.gameBoard?.spawnTileForLocation(emptyRow, col, spawnRow, col);
            }
        }

        return movedDownTiles;
    }

    onCompleteHandler(tween, targets, swap) {
        // console.log('onCompleteHandler');
        // console.log(targets[0])
        targets[0].scene.sound.play('crush');
        targets[0].depth = 1

        // targets[0].scene.animateSwapAsReverse(swap)

    }


    onPointerOver(pointer) {
        console.log("pointer over")
    }


    // ANIMATIONS

    async animateSwap(swap) {

        let sourceTile = swap.from.getGameObjectReference();
        let targetTile = swap.to.getGameObjectReference();
        if (sourceTile === null || targetTile === null) throw new Error("animateSwap : source or target is null");

        return new Promise(resolve => {
            this.tweens.add({
                targets: sourceTile,
                x: targetTile.x,
                y: targetTile.y,
                ease: 'linear',
                duration: 80,
                onStart: (tween, targets, params) => {
                    this.tweens.add({
                        targets: targetTile,
                        x: sourceTile.x,
                        y: sourceTile.y,
                        ease: 'linear',
                        duration: 80,
                        onComplete: (tween, targets) => {
                            targets[0].depth = 1
                            resolve(true)
                        },
                    })
                },
                onComplete: (tween, targets) => {
                    // targets[0].depth = 1
                },
            });
        });
    }

    async animateSwapAsReverse(swap) {

        let sourceTile = swap.to.getGameObjectReference();
        let targetTile = swap.from.getGameObjectReference();

        if (sourceTile === null || targetTile === null) {
            console.error("animateSwapAsReverse : source or target is null ", sourceTile, targetTile)
            return;
        }

        let tween = this.tweens.add({
            targets: sourceTile,
            x: targetTile.x,
            y: targetTile.y,
            ease: 'linear',
            duration: 50,
        });

        let tween2 = this.tweens.add({
            targets: targetTile,
            x: sourceTile.x,
            y: sourceTile.y,
            ease: 'linear',
            duration: 50,
        });
    }

    /**
     *
     * @param newTilesList
     * @return {Promise<unknown>}
     */

    animateNewTilesDown(newTilesList) {


        return new Promise(resolve => {
            let counter = 0;
            newTilesList.forEach((newTile) => {
                counter++;
                let sourceTile = newTile.getGameObjectReference();
                if (sourceTile === null) throw new Error("animateNewTilesDown : source is null")
                let tileCurrentLocation = newTile.getGridLocation();
                let point = this.pointForGridLocation(tileCurrentLocation.column, tileCurrentLocation.row)
                let tween = this.tweens.add({
                    targets: sourceTile,
                    x: point.x,
                    y: point.y,
                    ease: 'linear',
                    duration: 300,
                    onComplete: (tween, targets) => {
                        if (--counter <= 0) {
                            resolve(true)
                        }
                    },
                });
            });
        });
    }


    animateMatchedTiles(chains) {
        chains.forEach((chain) => {
            this.sound.play('crush', {volume: 0.70});
            this.animateScoreForChain(chain)
            this._updateScoreTextForChain(chain);

            chain.tiles.forEach((tile) => {
                // TODO : do not remove here wait for combo resolving
                this.gameBoard?.remove(tile)

                let gameObjectReference = tile.getGameObjectReference();
                if (gameObjectReference != null) {
                    gameObjectReference.setData("tile", null)
                    gameObjectReference.destroy();
                    tile.setGameObjectReference(null);
                }
            });

        });
    }

    _updateMovementCount() {
        this._movementCountText.setText(String(this._level.decreaseMovementCount()));
    }

    _updateScoreTextForChain(chain) {
        let score = chain.length;
        if (chain.length === 4) {
            score = 6;
            EventBus.$emit("show:effect", {effectType: "effect-4", tileType: chain.tiles[0].type})
        } else if (chain.length >= 5) {
            score = 10;
            EventBus.$emit("show:effect", {effectType: "effect-5", tileType: chain.tiles[0].type})
        }
        // console.log(this._level.currentPoint)
        if (this._level.levelType === VARIANT_CANDY_CRUSH_IN_MOVEMENT) this._updateAims(chain);
        this._level.addPoint(score);
        this._scoreText.setText(String(this._level.currentPoint));
    }

    _updateAims(chain) {
        let aims = this._level.getAims();
        let chainTileType = chain.tiles[0].type;
        for (let a = 0; a < aims.length; a++) {
            if (chainTileType === aims[a].tileType) {
                if (!aims[a].isCompleted()) {
                    aims[a].decreaseTargetValue(chain.length)
                    if (aims[a].isCompleted()) this._putCompletedIconForAim(aims[a])
                    else {
                        aims[a].getValueTextReference().setText(String(aims[a].targetValue))
                    }

                }
                break;
            }
        }

    }

    _putCompletedIconForAim(aim) {
        let aimTextCenter = aim.getValueTextReference().getCenter();
        aim.getValueTextReference().destroy();
        let completedIcon = this.add.image(aimTextCenter.x, aimTextCenter.y, "done_2x")
        completedIcon.depth = 4;
    }

    animateMovedDownTiles(movedDownTiles) {
        let count = 0;
        let counter = 0;
        let longestDuration = 0;
        movedDownTiles.forEach((tile) => {
            counter++;
            let targetGameObject = tile.getGameObjectReference()
            if (targetGameObject === null) {
                console.error("animateMovedDownTiles : target is null")
                return;
            }
            let newPoint = this.pointForGridLocation(tile.getGridLocation().column, tile.getGridLocation().row);
            // TODO : calculate specific duration for tile
            // count++;
            // let delay = 0.05 + 0.15 * count*500;
            // let duration = ((targetGameObject.y - newPoint.y) / this.tileHeight) * 100;
            // longestDuration = Math.max(longestDuration, duration + delay);

            let tween = this.tweens.add({
                targets: targetGameObject,
                x: newPoint.x,
                y: newPoint.y,
                ease: 'linear',
                duration: 240,
                onComplete: (tween, targets) => {
                    if (--counter <= 0) {
                        // resolve(true)
                    }
                },
            });
        });
        // return new Promise(resolve => {
        //
        // });
    }


    animateScoreForChain(chain) {

        try {
            let firstCookie = chain.tiles[0];
            let lastCookie = chain.tiles[chain.tiles.length - 1];

            // TODO : check existence ??
            let x = (firstCookie.getGameObjectReference().x + lastCookie.getGameObjectReference().x) / 2 - (this.tileWidth / 2);
            let y = (firstCookie.getGameObjectReference().y + lastCookie.getGameObjectReference().y) / 2 - (this.tileHeight / 2);

            let point = chain.length;
            if (chain.length === 4) {
                point = chain.length * 1.5;
            }

            if (chain.length === 5) {
                point = chain.length * 2;
            }

            let scoreLabel = this.add.text(x, y, "+" + point, {
                fill: "#03a9f4",
                align: "center",
                fontStyle: "bold",
                fontSize: 50,
            });
            scoreLabel.depth = 1000;

            let tween2 = this.tweens.add({
                targets: scoreLabel,
                x: x,
                y: y,
                ease: 'linear',
                alpha: 0,
                duration: 1600,
                onComplete: (tween, targets) => {
                    scoreLabel.destroy();
                },
            });
        } catch (e) {
            console.log(e)
        }


    }

}
