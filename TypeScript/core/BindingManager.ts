import * as UE from "ue"
import { TsBehavior } from "./TsBehavior"
import { UClassToTsBehavior, UObjectToTsBehavior } from "./Data"
import { GetWorldContext } from "./GlobalUEObject"
import { TsSingleton } from "./TsSingleton"

let gameInstance = GetWorldContext()
console.log(`xyyy gameInstace: ${gameInstance.GetClass().GetName()}`)

let bindingSubsystem = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(GetWorldContext(),UE.TsObjectBindingSubsystem.StaticClass()) as UE.TsObjectBindingSubsystem
console.log(`hello!! binding: ${bindingSubsystem}`)

export class BindingManager extends TsSingleton<BindingManager>() {
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

        const existingBehaviors = UObjectToTsBehavior.get(object) ?? []
        UObjectToTsBehavior.set(object, existingBehaviors.concat(behaviors))
    }

    public unbindObject(object?: UE.Object | null): void {
        if (!object) {
            return
        }

        const behaviors = UObjectToTsBehavior.get(object)
        if (!behaviors) {
            return
        }

        for (let i = behaviors.length - 1; i >= 0; --i) {
            behaviors[i].unbind()
        }

        UObjectToTsBehavior.delete(object)
    }

    private createBehaviors(object: UE.Object): TsBehavior[] {
        const behaviors: TsBehavior[] = []

        for (const [ueClass, behaviorClasses] of UClassToTsBehavior) {
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
