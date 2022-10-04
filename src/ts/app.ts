import { Cities } from "./Cities";
import { SelectHandler } from "./SelectHandler";
Cities.init()
    .then(() => {
        console.log("Cities successfuly initialized");

        // debugger;
        Cities.find("Londo");
    })
    .catch((error) => console.error("Cities initialization failed", error));

document.getElementById("");

SelectHandler.init();
