import UE = require("ue")
import { Behaviour } from "./Behaviour"

export type UeClassType<_TOwner extends UE.Object = UE.Object> = {
    StaticClass(): UE.Class
}

export type BehaviourConstructor<TOwner extends UE.Object = UE.Object> = new () => Behaviour<TOwner>

export const BehaviourNameToConstructor = new Map<string, BehaviourConstructor>()
export const UClassToBehaviour = new Map<UE.Class, BehaviourConstructor[]>()
export const UObjectToBehaviour = new Map<UE.Object, Behaviour[]>()
