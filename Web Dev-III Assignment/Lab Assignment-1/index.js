const isEven = require("./modules/isEven");
const logger = require("./logger");

logger("Checking numbers");

console.log("\x1b[32mIs 10 even?\x1b[0m", isEven(10));
console.log("\x1b[31mIs 7 even?\x1b[0m", isEven(7));

logger("Program finished");