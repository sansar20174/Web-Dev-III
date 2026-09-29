function logger(message) {
    let time = new Date().toLocaleString();

    console.log("[" + time + "] " + message);
}

module.exports = logger;