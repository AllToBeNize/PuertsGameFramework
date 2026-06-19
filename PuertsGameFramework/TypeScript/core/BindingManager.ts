import UE = require("ue")
// import * as UE from "ue"
import { BehaviourManager } from "./BehaviourManager"
import { BehaviourSingleton } from "./BehaviourSingleton"
import { UClassToBehaviour, UObjectToBehaviour } from "./Data"
import { GetWorldContext } from "./GlobalUEObject"
import { trace } from "./Log"

const bindingSubsystem = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(
    GetWorldContext(),
    UE.TsObjectBindingSubsystem.StaticClass(),
) as UE.TsObjectBindingSubsystem

export class BindingManager extends BehaviourSingleton<BindingManager>() {
    protected onInit(): void {
        if (!bindingSubsystem) {
            trace("TsObjectBindingSubsystem is not available.")
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

        const behaviourClassList = UClassToBehaviour.get(object.GetClass())
        if (!behaviourClassList) {
            return
        }

        behaviourClassList.forEach((behaviourClass) => {
            BehaviourManager.Instance.createBehaviour(object, behaviourClass)
        })
    }

    public unbindObject(object?: UE.Object | null): void {
        if (!object) {
            return
        }

        const behaviours = UObjectToBehaviour.get(object)
        if (!behaviours) {
            return
        }

        behaviours.forEach((behaviour) => {
            behaviour.unbind()
        })

        UObjectToBehaviour.delete(object)
    }
}
