import { argv } from "puerts"
import UE = require("ue")

const gameInstance = argv.getByName("GameInstance") as UE.GameInstance;

export function GetWorldContext(){
    return gameInstance;
}
