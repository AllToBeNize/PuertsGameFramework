import { argv } from "puerts"
import * as UE from "ue"

const gameInstance = argv.getByName("GameInstance") as UE.GameInstance;

export function GetWorldContext(){
    return gameInstance;
}
