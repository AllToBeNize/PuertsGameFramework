import UE = require("ue")
import { Behaviour } from "./Behaviour"

export type BehaviourConstructor = new () => Behaviour

export const BehaviourNameToConstructor = new Map<string, BehaviourConstructor>()
export const UClassToBehaviour = new Map<UE.Class, BehaviourConstructor[]>()
export const UObjectToBehaviour = new Map<UE.Object, Behaviour[]>()
