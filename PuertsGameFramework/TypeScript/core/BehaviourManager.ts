import UE = require("ue")
import { Behaviour } from "./Behaviour"
import { BehaviourSingleton } from "./BehaviourSingleton"
import { BehaviourConstructor, BehaviourNameToConstructor, UObjectToBehaviour } from "./Data"
import { trace } from "./Log"
import { setMap } from "./Utility"

export class BehaviourManager extends BehaviourSingleton<BehaviourManager>() {
    public createBehaviour(object: UE.Object, behaviourClass: BehaviourConstructor): Behaviour {
        const behaviour = new behaviourClass()
        behaviour.bind(object)
        setMap(UObjectToBehaviour, object, behaviour)
        return behaviour
    }

    public createBehaviourByName(object: UE.Object, behaviourName: string): Behaviour | undefined {
        const behaviourClass = BehaviourNameToConstructor.get(behaviourName)
        if (!behaviourClass) {
            trace(`[BehaviourManager] Behaviour is not registered: ${behaviourName} objName: ${object.GetName()}`)
            return undefined
        }

        return this.createBehaviour(object, behaviourClass)
    }
}
