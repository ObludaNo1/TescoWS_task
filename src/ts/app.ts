import { Cities } from "./Cities";
import { SelectHandler } from "./SelectHandler";

Cities.init()
    .then(() => {
        console.log("Cities successfuly initialized");

        // debugger;
        Cities.findFollowing("Londo");
    })
    .catch((error) => console.error("Cities initialization failed", error));

document.getElementById("form")!.addEventListener("submit", (ev) => {
    Cities.findFollowing;
});

SelectHandler.init();
