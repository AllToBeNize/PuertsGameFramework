import { argv } from "puerts"
import * as UE from "ue"

let gameInstance = argv.getByName("GameInstance") as UE.GameInstance;

export function GetWorldContext(){
    return gameInstance;
}