//=============================
//         TEMPLATE          //
//=============================


var config = {
    // noopHeader: { label: "Script menu", type: "noop" },
    baseBet: { value: 1000, label: "Base bet", type: "balance" },
    basePayout: { value: 1.5, label: "Base payout", type: "multiplier" },
    // runtime: { value: 100, label: "Games to run", type: "number" },
    // martingale: { value: false, label: "Martingale strategy on loss", type: "checkbox" },
    // stop: { value: 5000, label: "Bet stop", type: "balance" },
    // betLossMultiplier: { value: 2, label: "loss multiplier", type: "multiplier" },
};

var runtimeCount = 0;
    // skipCount = 0,
    // greens = 0,
    // reds = 0,
    // gameArray = [],
    // currentBet = config.baseBet.value,
    // currentPayout = config.basePayout.value,
    // randomNum = Math.floor(Math.random() * 16);
    
var about = [ "---", "A reference/template for creating bustabit v2 scripts", "reference.js (bab-v2) by a3connor" ];

displayAbout(about);

engine.on('GAME_STARTING', () => {
    
    // stop script after running a specified number of games
    runtimeCount++;
    
    if (runtimeCount >= config.runtime.value){
        stop(`Script runtime count has been reached.`);
    } else {
        log(`Placing bet: ${currentBet/100} bits.`);
        engine.bet(currentBet, config.basePayout.value);
    }
    
    // log(`Placing bet: ${currentBet/100} bits.`);
    // engine.bet(currentBet, config.basePayout.value);
});

engine.on('GAME_ENDED', () => {
    // var lastGame = engine.history.first();
    // if (lastGame.wager) { lastGame.cashedAt ? onWin() : onLoss(); }
});

function onWin() {
    // martingale strat (reset on win)
    if (config.martingale.value){
        currentBet = config.baseBet.value;
        log(`We won. Resetting our bet.`);
    }
}

function onLoss() {
    // martingale strat (double bet on loss)
    if (config.martingale.value){
        if (currentBet > config.stop.value){
            stop(`Safety Stop: The next bet of ${currentBet/100} bits, exceeds the set limit.`);
        } else {
            currentBet *= config.betLossMultiplier.value;
            log(`We lost. Adjusting to: ${currentBet/100} bits.`);
        }
    }
}


//=============================
//           LOGS            //
//=============================


log(`Current bet is ${currentBet/100}`);

console.log(`Sample log`);

stop(`Reached max bet`);

notify(message) // browser notification


//=============================
//          EXTRAS           //
//=============================


// if we wagered, it means we played
if (!lastGame.wager) {
    return;
}

// profit
if (lastGame.cashedAt) {
    var profit = (config.wager.value * lastGame.cashedAt - config.wager.value) / 100;
    log(`+ ${profit.toFixed(2)} bits`);
} else {
    log(`- ${Math.round(config.wager.value / 100)} bits`);
}

// rounding
function roundBit(bet) {
    return Math.round(bet / 100) * 100;
}

// cashout
if (engine.currentlyPlaying()) {
    engine.cashOut();
}

// infinite payout
engine.bet(config.baseBet, Number.MAX_VALUE);

// credits
function displayCredits(credits) {
    credits.forEach(credit => {
        log(credit);
    });
}

// format
function formatNumber(number) {
    var formatted = number.toFixed(3);
    return formatted.replace(/\.?0*$/, '');
}

// about
function displayAbout(credits) {
    credits.forEach(credit => {
        log(credit);
    });
}

// hash
const hash = "(game hash)";
gameResultFromHash(hash).then(log);

// sha256
log(SHA256("phrase"));


//=============================
//          ENGINE           //
//=============================


engine.bet(satoshis, payout):
// Places a bet with the specified satoshis and payout 
// ex. engine.bet(1000, 2.0);

engine.getState():
// Gets the current state of the engine.
// ex. var currentState = engine.getState();

engine.getCurrentBet():
// Retrieves the current bet information.
// ex. var myCurrentBet = engine.getCurrentBet();

engine.isBetQueued():
// Checks if a bet is queued for the next game.
// ex. if (engine.isBetQueued()) log("A bet is queued!");

engine.cancelQueuedBet():
// Cancels the bet queued for the next game.
// ex. engine.cancelQueuedBet();

engine.cashOut():
// Attempts to cash out during the current game.
// ex. if (someCondition) engine.cashOut();

engine.history.first():
// Retrieves the latest game from history.
// ex. var lastGame = engine.history.first();

engine.history.last():
// Retrieves the oldest game in the buffer (from the latest 50 games).
// ex. var oldestGame = engine.history.last();

engine.history.toArray():
// Converts the game history into an array.
// ex. var gameArray = engine.history.toArray();

engine.playing:
// A Map of usernames & current bet amount (not cashed out yet).
// ex. var currentPlayers = engine.playing;

engine.cashOuts:
// An array of cashed out players and their details.
// ex. var recentCashOuts = engine.cashOuts;


//=============================
//         USERINFO          //
//=============================


userInfo.balance:
// Current user balance in satoshis.
// ex. log("Current Balance:", userInfo.balance);

userInfo.bets:
// Total count of user's bets.
// ex. log("Total Bets Made:", userInfo.bets);

userInfo.wagered:
// Total satoshis the user has wagered.
// ex. log("Total Wagered:", userInfo.wagered);

userInfo.profit:
// User's profit or loss in satoshis.
// ex. log("Overall Profit:", userInfo.profit);

userInfo.on('BALANCE_CHANGED', callback):
// Event that triggers when user balance changes.
// ex. userInfo.on('BALANCE_CHANGED', () => log("Balance updated!"));


//=============================
//           GAME            //
//=============================


game.id:
// Unique identifier for the game.
// ex. log("Game ID:", game.id);

game.hash:
// Represents the game's hash value.
// ex. log("Game Hash:", game.hash);

game.bust:
// The multiplier at which the game crashed. If not set, the game is in progress.
// ex. if (!game.bust) log("Game is currently in progress.");

game.cashedAt:
// The multiplier at which we cashed out. If not set, we either didn't play or the game busted before cashing out.
// ex. if (game.cashedAt) log("We cashed out at:", game.cashedAt);

game.wager:
// Amount of satoshis wagered in the game.
// ex. log("Wagered amount in satoshis:", game.wager);


//=============================
//          EVENTS           //
//=============================


engine.on('GAME_STARTED', () => {
});

engine.on('CASHED_OUT', (data) => {
});

engine.on("BET_PLACED", (bet) => {
});


/*
 :: [File] reference.js
 :: [Description] a reference/template for creating bustabit v2 scripts.
 :: [Author] a3connor
 :: [Date] 2023-10-02
 :: [GitHub] https://github.com/a3connor 
 :: [Gist] https://gist.github.com/a3connor 
 */
