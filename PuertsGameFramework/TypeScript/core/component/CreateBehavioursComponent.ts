import UE = require("ue")
import { bind } from "../Decorators"
import { Behaviour } from "../Behaviour"
import { BehaviourManager } from "../BehaviourManager"

@bind(UE.PuertsGameFramework.Component.CreateBehaviorsComponent.CreateBehaviorsComponent_C)
export class CreateBehavioursComponent extends Behaviour<UE.PuertsGameFramework.Component.CreateBehaviorsComponent.CreateBehaviorsComponent_C> {
    protected onBind(): void {
        for (let i = 0; i < this.u_object.BehaviorNames.Num(); i++) {
            const behaviourName = this.u_object.BehaviorNames.Get(i)
            BehaviourManager.Instance.createBehaviourByName(this.u_object.GetOwner(), behaviourName)
        }
    }
}
