import UE = require("ue")
import { Behaviour } from "./Behaviour"
import { BehaviourConstructor, BehaviourNameToConstructor, UObjectToBehaviour } from "./Data"
import { warning } from "./Log"
import { Singleton } from "./Singleton"
import { setMap } from "./Utility"

export class BehaviourManager extends Singleton<BehaviourManager>() {
    public createBehaviour(object: UE.Object, behaviourClass: BehaviourConstructor): Behaviour {
        const behaviour = new behaviourClass()
        behaviour.bind(object)
        setMap(UObjectToBehaviour, object, behaviour)
        return behaviour
    }

    public createBehaviourByName(object: UE.Object, behaviourName: string): Behaviour | undefined {
        const behaviourClass = BehaviourNameToConstructor.get(behaviourName)
        if (!behaviourClass) {
            warning(`[BehaviourManager] Behaviour is not registered: ${behaviourName}`)
            return undefined
        }

        return this.createBehaviour(object, behaviourClass)
    }
}
