import { argv } from "puerts"
import UE = require("ue")

let gameInstance = argv.getByName("GameInstance") as UE.GameInstance;

export function GetWorldContext(){
    return gameInstance;
}
