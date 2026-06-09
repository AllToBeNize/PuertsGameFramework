import * as UE from "ue"
import { Behavior } from "./Behavior"
import { UClassToBehavior, UObjectToBehavior } from "./Data"
import { GetWorldContext } from "./GlobalUEObject"
import { Singleton } from "./Singleton"

let gameInstance = GetWorldContext()
console.log(`xyyy gameInstace: ${gameInstance.GetClass().GetName()}`)

let bindingSubsystem = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(GetWorldContext(),UE.TsObjectBindingSubsystem.StaticClass()) as UE.TsObjectBindingSubsystem
console.log(`hello!! binding: ${bindingSubsystem}`)

export class BindingManager extends Singleton<BindingManager>() {
    protected onInit(): void {
        if (!bindingSubsystem) {
            console.warn("TsObjectBindingSubsystem is not available.")
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

        const behaviors = this.createBehaviors(object)
        if (behaviors.length <= 0) {
            return
        }

        const existingBehaviors = UObjectToBehavior.get(object) ?? []
        UObjectToBehavior.set(object, existingBehaviors.concat(behaviors))
    }

    public unbindObject(object?: UE.Object | null): void {
        if (!object) {
            return
        }

        const behaviors = UObjectToBehavior.get(object)
        if (!behaviors) {
            return
        }

        for (let i = behaviors.length - 1; i >= 0; --i) {
            behaviors[i].unbind()
        }

        UObjectToBehavior.delete(object)
    }

    private createBehaviors(object: UE.Object): Behavior[] {
        const behaviors: Behavior[] = []

        for (const [ueClass, behaviorClasses] of UClassToBehavior) {
            if (!object.IsA(ueClass)) {
                continue
            }

            for (const behaviorClass of behaviorClasses) {
                const behavior = new behaviorClass()
                behavior.bind(object)
                behaviors.push(behavior)
            }
        }

        return behaviors
    }
}
