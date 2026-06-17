import UE = require("ue")
import { Behavior } from "./Behavior"
import { BehaviorConstructor, BehaviorNameToConstructor, UClassToBehavior, UObjectToBehavior } from "./Data"
import { warning } from "./Log"
import { Singleton } from "./Singleton"
import { setMap } from "./Utility"

export class BehaviorManager extends Singleton<BehaviorManager>() {
    public createBehavior(object: UE.Object, behaviorClass: BehaviorConstructor): Behavior {
        const behavior = new behaviorClass()
        behavior.bind(object)
        setMap(UObjectToBehavior, object, behavior)
        return behavior
    }

    public createBehaviorByName(object: UE.Object, behaviorName: string): Behavior | undefined {
        const behaviorClass = BehaviorNameToConstructor.get(behaviorName)
        if (!behaviorClass) {
            warning(`[BehaviorManager] Behavior is not registered: ${behaviorName}`)
            return undefined
        }

        return this.createBehavior(object, behaviorClass)
    }
}
