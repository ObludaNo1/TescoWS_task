import { HTTP } from "./http/HTTP";

const http = new HTTP();

http.get("https://node.windy.com/tc/storms")
    .then((res) => console.log("Result", res))
    .catch((err) => {
        console.error("error", err);
    });

console.log("log");
