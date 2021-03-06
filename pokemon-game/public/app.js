// STATE
var gameState = {
    userPokemon: '',
    rivalPokemon: '',
    pokemonDB: [{
        name: 'charmander',
        type: 'fire',
        hp: 39,
        attack: 52,
        defense: 43,
        level: 1,
        img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    }, {
        name: 'bulbasaur',
        type: 'fire',
        hp: 45,
        attack: 49,
        defense: 49,
        level: 1,
        img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
    }, {
        name: 'squirtle',
        type: 'water',
        hp: 44,
        attack: 48,
        defense: 65,
        level: 1,
        img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
    }, ],
    elements: {
        pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
        battleScreenEl: document.getElementById('battle-screen'),
        attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
    },
    init: function() {
        console.log(gameState.elements.attackBtnsEl)

        // THIS IS THE INITIAL LOOP
        var i = 0;
        while (i < gameState.elements.pokemonsEl.length) {
            //ADD FUNCTION TO ALL CHARACTERS ON SCREEN SELECT
            gameState.elements.pokemonsEl[i].onclick = function() {
                // current selector pokemons name
                var pokemonName = this.dataset.pokemon
                    // elements for images on battle screen
                var player1Img = document.querySelector('.player1').getElementsByTagName('img')
                var player2Img = document.querySelector('.player2').getElementsByTagName('img')

                // we save the current pokemon
                gameState.userPokemon = pokemonName

                // cpu picks a pokemon
                gameState.cpuPick()
                    // change screen to battle scene
                gameState.elements.battleScreenEl.classList.toggle('active')

                // select data from current user pokemon
                gameState.currentPokemon = pokemonDB.filter(function(pokemon) {
                    return pokemon.name == gameState.userPokemon
                })
                player1Img[0].src = gameState.currentPokemon[0].img

                // select data from current cpu pokemon
                gameState.currentRivalPokemon = pokemonDB.filter(function(pokemon) {
                    return pokemon.name == gameState.rivalPokemon
                })
                player2Img[0].src = gameState.currentRivalPokemon[0].img

                //current user and cpu pokemon inicial health
                gameState.currentPokemon[0].health = calculateInicialHealth(gameState.currentPokemon)
                console.log(gameState)
                gameState.currentRivalPokemon[0].health = calculateInicialHealth(gameState.currentRivalPokemon)

            }
            i++
        }

        var a = 0
        while (a < gameState.elements.attackBtnsEl.length) {
            gameState.elements.attackBtnsEl[a].onclick = function() {
                var attackName = this.dataset.attack
                gameState.currentUserAttack = attackName

                gameState.play(attackName, gameState.cpuAttack())
            }
            a++
        }
    },
    cpuAttack: function() {
        var attacks = ['rock', 'paper', 'scissors']
        return attacks[gameState.randomNumber(0, 3)]
    },
    calculateInicialHealth: function(user) {
        return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
    },
    attackMove: function(attack, level, stack, critical, enemy, attacker) {
        console.log(enemy.name + ' before: ' + enemy.health)
        var attackAmount = ((attack * level) * (stack + critical))
        enemy.health = enemy.health - attackAmount
        gameState.checkWinner(enemy, attacker)
        console.log(enemy.name + ' after: ' + enemy.health)
    },
    checkWinner: function(enemy, attacker) {
        if (enemy.health <= 0) {
            console.log('HEEEEEEY WINNEEEEEER' + attacker.name)
        }
    },
    randomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    cpuPick: function() {
        gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon
    },
    play: function(userAttack, cpuAttack) {
        var currentPokemon = currentPokemon
        var currentRivalPokemon = currentRivalPokemon
        switch (userAttack) {
            case 'rock':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
                        }
                    }
                }

                break;
            case 'paper':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                console.log(userAttack)
                break;
            case 'scissors':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .1, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        // user
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            // cpu
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                console.log(userAttack)
                break;
        }
    }
};
gameState.init()