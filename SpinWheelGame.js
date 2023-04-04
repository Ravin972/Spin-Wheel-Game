/* 
                                    |    Project - Spin Wheel      |           
                                    |    Made By - Ravin Pandey    |    
                                    |    Date - 04 April 2023      |
*/
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "#" : 2,
    "$" : 4,
    "@" : 6,
    "%" : 8
}

const SYMBOLS_VALUES = {
    "#" : 5,
    "$" : 4,
    "@" : 3,
    "%" : 2
}

// 1. Deposit some money
const deposit = () => {
    while (true) {    
    const depositAmount = prompt("Enter a deposit amount: ")
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount,\n Please try again.");
    }else{
        return numberDepositAmount;
    }
  }
};

// 2. Determine no of lines to bet on .
const getNumberOfLines = () => {
    while (true) {    
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines);
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines,\n Please try again.");
        }else{
            return numberOfLines;
        }
      }
};

// 3. Collect a bet amount.
const getBet = (balance,lines) => {
    while (true) {    
        const bet = prompt("Enter the bet per line: ")
        const numberBet = parseFloat(bet);
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)) {
            console.log("Invalid Bet,\n Please try again.");
        }else{
            return numberBet;
        }
      }
}

// 4. Spin the machine
const spin = () => {
   const symbols = [];
   for (const [symbol, count] of Object .entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
        symbols.push(symbol);
    }
   }
   const reals = [[], [], []];
   for (let i = 0; i < COLS; i++) {
    reals.push([]);
      const realSymbols = [...symbols];
       for (let j = 0; j < ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * realSymbols.length);
        const selectedSymbol = realSymbols[randomIndex];
        reals[i].push(selectedSymbol);
        realSymbols.splice(randomIndex, 1);
       }
   }
   return reals;
};

// 5. Check if the user won 
const transpose = (reals) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reals[j][i]);   
        }
    }
    return rows;
};

// print row in a manner.
const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "";
        for(const [i, symbol] of row.entries()) {
            rowString +=symbol;
            if (i != row.length-1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

// 6. give the user their winnings
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
     
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
};

const spinGame = () => {
    let balance = deposit();
    while (true) {
        console.log("Balance: $" + balance); 

           const numberOfLines = getNumberOfLines();
           const bet = getBet(balance, numberOfLines);
           balance -= bet * numberOfLines;
           const reals = spin();
           const rows = transpose(reals);
           printRows(rows);
           const winnings =getWinnings(rows, bet, numberOfLines);
           balance += winnings;
           console.log("You won, $" + winnings.toString());

           if (balance <=0) {
            console.log("You ran out of money!");
            break;
           }
           // 7. play again
           const playAgain = prompt("Do you want to play again (y/n)? ");

           if (playAgain != "y") break; 
    }
}

spinGame();