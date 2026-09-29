const crypto = require("crypto");
const fs = require("fs");

let startNumber = 1;

if (fs.existsSync("diceHistory.txt")) {
    let oldData = fs.readFileSync("diceHistory.txt", "utf8");

    let lines = oldData.trim().split("\n");

    if (lines[0] !== "") {
        startNumber = lines.length + 1;
    }
}

for (let i = 0; i < 5; i++) {

    let randomNumber = crypto.randomInt(1, 7);
    let rollNumber = startNumber + i;

    console.log("Dice Roll", rollNumber + ":", randomNumber);

    fs.appendFile(
        "diceHistory.txt",
        "Dice Roll " + rollNumber + ": " + randomNumber + "\n",
        (err) => {
            if (err) {
                console.log("Error saving dice history");
            }
        }
    );
}