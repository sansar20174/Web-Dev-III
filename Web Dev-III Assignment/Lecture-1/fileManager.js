const fs = require("fs");

// Create a file
fs.writeFile("sample.txt", "Hello World", (err) => {

    if (err) {
        console.log("Error while creating file");
    } else {
        console.log("File created");

        // Read the file
        fs.readFile("sample.txt", "utf8", (err, data) => {

            if (err) {
                console.log("Error while reading file");
            } else {
                console.log("File content:", data);

                // Update the file
                fs.appendFile("sample.txt", "\nThis is new content", (err) => {

                    if (err) {
                        console.log("Error while updating file");
                    } else {
                        console.log("File updated");

                        // Delete the file
                        fs.unlink("sample.txt", (err) => {

                            if (err) {
                                console.log("Error while deleting file");
                            } else {
                                console.log("File deleted");
                            }

                        });
                    }

                });
            }

        });
    }

});