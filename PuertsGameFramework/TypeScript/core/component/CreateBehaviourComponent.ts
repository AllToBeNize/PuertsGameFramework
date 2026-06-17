import UE = require("ue")
import { bind } from "../Decorators"
import { Behaviour } from "../Behaviour"
import { BehaviourManager } from "../BehaviourManager"

@bind(UE.PuertsGameFramework.Component.CreateBehaviourComponent.CreateBehaviourComponent_C)
export class CreateBehaviourComponent extends Behaviour<UE.PuertsGameFramework.Component.CreateBehaviourComponent.CreateBehaviourComponent_C> {
    protected onBind(): void {
        for (let i = 0; i < this.u_object.Behaviours.Num(); i++) {
            const behaviourName = this.u_object.Behaviours.Get(i)
            BehaviourManager.Instance.createBehaviourByName(this.u_object.GetOwner(), behaviourName)
        }
    }
}
