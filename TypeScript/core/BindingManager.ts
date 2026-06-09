import UE = require("ue")
import { Behavior } from "./Behavior"
import { BehaviorManager } from "./BehaviorManager"
import { UClassToBehavior, UObjectToBehavior } from "./Data"
import { GetWorldContext } from "./GlobalUEObject"
import { error } from "./Log"
import { Singleton } from "./Singleton"

let bindingSubsystem = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(
    GetWorldContext(),
    UE.TsObjectBindingSubsystem.StaticClass(),
) as UE.TsObjectBindingSubsystem

export class BindingManager extends Singleton<BindingManager>() {
    protected onInit(): void {
        if (!bindingSubsystem) {
            error("TsObjectBindingSubsystem is not available.")
            return
        }

        bindingSubsystem.OnObjectBindRequested.Add((object: UE.Object | null) => {
            this.bindObject(object)
        })

        bindingSubsystem.OnObjectUnbindRequested.Add((object: UE.Object | null) => {
            this.unbindObject(object)
        })
    }

    public bindObject(object?: UE.Object | null): void {
        if (!object) {
            return
        }

        const behaviorClassList = UClassToBehavior.get(object.GetClass())
        if (!behaviorClassList) {
            return
        }

        behaviorClassList.forEach((behaviorClass) => {
            BehaviorManager.Instance.createBehavior(object, behaviorClass)
        })
    }

    public unbindObject(object?: UE.Object | null): void {
        if (!object) {
            return
        }

        const behaviors = UObjectToBehavior.get(object)
        if (!behaviors) {
            return
        }

        behaviors.forEach((behavior) => {
            behavior.unbind()
        })

        UObjectToBehavior.delete(object)
    }
}
