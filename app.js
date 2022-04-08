const readline = require('readline-sync');
const hmac = require('./hmac')
const crypto = require('crypto');
const table = require('./table');  

class Game {
    moves;
    compMove;
    key;
 
    showMoves() {
        console.log("Available moves:");
        this.moves.forEach((move, i) => {
           console.log(`${i + 1} - ${move}`);
        });
        console.log('? - help');
        console.log('0 - exit');
    }
    getcompMove() {
        let i = Math.floor(Math.random()*this.moves.length);
        this.compMove = this.moves[i]
    }

    getKey() {
        const curv = crypto.randomBytes(32);
        this.key = curv.toString('hex')
    }

}

const judge = new table()
const game = new Game();
const HMAC = new hmac();

const moves = process.argv.slice(2);
const l = moves.length;

if (l!= [...new Set(moves)].length || l % 2 == 0 || l < 3) {
    console.log('The moves must be >=3, odd and unique') 
} else { 
    game.moves = moves
    judge.Table(moves);
    game.getcompMove();
    game.getKey();
    HMAC.getHMAC(game.key, game.compMove);
    console.log('HMAC: ', HMAC.HMAC);
    game.showMoves();
    Interface();
} 

function Interface() {
    const a = readline.question("Enter your move: ");

    if((a >= 0 && a <= game.moves.length) || a =='?') {
        switch(a) {
            case '0':
                break;
            case '?':
                console.table(judge.table);
                Interface();
                break;
            default:
                judge.Result(game.moves[a - 1], game.compMove)
                console.log('Your move: ' + game.moves[a - 1], '\nComputer move: ' + game.compMove,
                '\nResult: ' + judge.result, '\nHMAC key: ' + game.key );             
        }
    } else {
        console.log('Incorrect command!\n');
        game.showMoves();
        Interface();
    }

}

