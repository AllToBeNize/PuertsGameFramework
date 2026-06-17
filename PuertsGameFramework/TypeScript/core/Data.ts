import UE = require("ue")
import { Behavior } from "./Behavior"

export type UeClassType<TOwner extends UE.Object = UE.Object> = {
    StaticClass(): UE.Class
}

export type BehaviorConstructor<TOwner extends UE.Object = UE.Object> = new () => Behavior<TOwner>

export const BehaviorNameToConstructor = new Map<string, BehaviorConstructor>()
export const UClassToBehavior = new Map<UE.Class, BehaviorConstructor[]>()
export const UObjectToBehavior = new Map<UE.Object, Behavior[]>()
