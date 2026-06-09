import * as UE from "ue"
import { TsBehavior } from "./TsBehavior"

export type UeClassType<TOwner extends UE.Object = UE.Object> = {
    StaticClass(): UE.Class
}

export type UeClassBindingTarget<TOwner extends UE.Object = UE.Object> = UeClassType<TOwner>

export type TsBehaviorConstructor<TOwner extends UE.Object = UE.Object> = new () => TsBehavior<TOwner>

export const UClassToTsBehavior = new Map<UE.Class, TsBehaviorConstructor[]>()
export const UObjectToTsBehavior = new Map<UE.Object, TsBehavior[]>()
