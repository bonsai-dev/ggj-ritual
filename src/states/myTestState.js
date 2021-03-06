'use strict';

Spellz.TestState = function () {
    this.spell_0 = null;
    this.spell_1 = null;
    this.spell_2 = null;
    this.spell_3 = null;
    this.cast = null;
    this.playerItem = null;
    this.castShots = [];
    this.playerSpeed = 5;
    this.lastEnemySpawn = Date.now();

    this.enemy = null;

    this.spellStack = [];
};

Spellz.TestState.prototype = {


    preload: function() {

    },
    create: function() {
        game.world.setBounds(0,0, 800, 600);

        this.spell_0 = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
        this.spell_1 = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.spell_2 = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
        this.spell_3 = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.cast = this.game.input.keyboard.addKey(Phaser.Keyboard.O);

        this.spell_0.onDown.add(function() {this.addSpell(0)}, this);
        this.spell_1.onDown.add(function() {this.addSpell(1)}, this);
        this.spell_2.onDown.add(function() {this.addSpell(2)}, this);
        this.spell_3.onDown.add(function() {this.addSpell(3)}, this);
        this.cast.onDown.add(function() {this.doCast()}, this);
        this.playerItem = game.add.sprite(400, 500, "player");
        this.playerItem.anchor.setTo(0.5, 0.5);

        var textStyle = {font: '15px Arial', fill: '#ffffff', align: 'center'};
        this.text0 = this.game.add.text(680, 500, 'Cast with: O', textStyle);
        this.text1 = this.game.add.text(680, 520, 'Spell 1: J K L', textStyle);
        this.text2 = this.game.add.text(680, 540, 'Spell 2: L L I', textStyle);
        this.text3 = this.game.add.text(680, 560, 'Spell 3: J I J I', textStyle);
        this.text4 = this.game.add.text(680, 580, 'Spell 4: J K L I', textStyle);
        this.text0.anchor.setTo(0, 1);
        this.text1.anchor.setTo(0, 1);
        this.text2.anchor.setTo(0, 1);
        this.text3.anchor.setTo(0, 1);
        this.text4.anchor.setTo(0, 1);
    },
    update: function() {
        this.testEnemyHit();
        var date = Date.now();
        if(this.enemy == null && (date - this.lastEnemySpawn > 15000)) {
            this.spawnEnemy(Math.floor(Math.random() * (4 - 1)) + 1);
            console.log("spawning enemy");
        }
        var keyboard = game.input.keyboard;
        if (keyboard.isDown(Phaser.Keyboard.LEFT)||keyboard.isDown(Phaser.Keyboard.A))
        {
            this.playerItem.x -= this.playerSpeed;
            this.playerItem.angle = -15;
        }
        else if (keyboard.isDown(Phaser.Keyboard.RIGHT)||keyboard.isDown(Phaser.Keyboard.D))
        {
            this.playerItem.x += this.playerSpeed;
            this.playerItem.angle = 15;
        }
        else
        {
            this.playerItem.rotation = 0;
        }
        for (var i = 0; i < this.castShots.length; i++) {
            var shot = this.castShots[i];
            if(shot.sprite.y < 0) {
                shot.sprite.destroy(true);
                this.castShots.splice(i, 1);
            } else {
                shot.sprite.y -= 15;
            }
        }
    },

    addSpell: function(spell) {
        this.spellStack.push(spell);
        console.log("Added spell", spell);
    },

    doCast: function() {
        var spellSprite;
        if(this.checkIsTestSpell(this.spellStack)) {
            console.log("Successfully casted spell1");
            spellSprite = game.add.sprite(this.playerItem.x, this.playerItem.y, "spell1");
            spellSprite.anchor.setTo(0.5, 0.5);
            this.castShots.push({
                spell: 1,
                sprite: spellSprite
            });
        } else if(this.checkIsSpell2(this.spellStack)) {
            console.log("Successfully casted spell2");
            spellSprite = game.add.sprite(this.playerItem.x, this.playerItem.y, "spell2");
            spellSprite.anchor.setTo(0.5, 0.5);
            this.castShots.push({
                spell: 2,
                sprite: spellSprite
            });
        } else if(this.checkIsSpell3(this.spellStack)) {
            console.log("Successfully casted spell3");
            spellSprite = game.add.sprite(this.playerItem.x, this.playerItem.y, "spell3");
            spellSprite.anchor.setTo(0.5, 0.5);
            this.castShots.push({
                spell: 3,
                sprite: spellSprite
            });
        } else if(this.checkIsSpell4(this.spellStack)) {
            console.log("Successfully casted spell4");
            spellSprite = game.add.sprite(this.playerItem.x, this.playerItem.y, "spell4");
            spellSprite.anchor.setTo(0.5, 0.5);
            this.castShots.push({
                spell: 4,
                sprite: spellSprite
            });
        } else {
            console.log("Cast failed. Ritual stack cleared.");
        }
        this.spellStack = [];
    },

    checkIsTestSpell: function(items) {
        return items.length === 3 && items[0] === 0 && items[1] === 1 && items[2] === 2;
    },

    checkIsSpell2: function(items) {
        return items.length === 3 && items[0] === 2 && items[1] === 2 && items[2] === 3;
    },

    checkIsSpell3: function(items) {
        return items.length === 4 && items[0] === 0 && items[1] === 3 && items[2] === 0 && items[3] === 3;
    },

    checkIsSpell4: function(items) {
        return items.length === 4 && items[0] === 0 && items[1] === 1 && items[2] === 2 && items[3] === 3;
    },

    spawnEnemy: function(spellType) {
        var x = 100+Math.random()*600;
        var y = 100;
        this.enemy = {};
        this.enemy.sprite = game.add.sprite(x, y, 'enemy');
        this.enemy.spellType = spellType;
        var spellSprite = game.add.sprite(50, 0, 'spell'+spellType);
        this.enemy.sprite.addChild(spellSprite);
        this.enemy.sprite.anchor.setTo(0.5, 0.5);
        this.lastEnemySpawn = Date.now();
    },
    testEnemyHit: function() {
        if(this.enemy != null) {
            for (var i = 0; i < this.castShots.length; i++) {
                var shot = this.castShots[i];
                if(shot.spell !== this.enemy.spellType) {
                    continue;
                }
                var deltaX = shot.sprite.x - this.enemy.sprite.x;
                var deltaY = shot.sprite.y - this.enemy.sprite.y;
                if(deltaY > -20 && deltaY < 20 && deltaX > -20 && deltaX < 20) {
                    shot.sprite.destroy(true);
                    this.castShots.splice(i, 1);
                    this.enemy.sprite.destroy(true);
                    this.enemy = null;
                }
            }
        }

    }

};
