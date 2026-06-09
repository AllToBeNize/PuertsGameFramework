import UE = require("ue")
import { bind } from "../Decorators"
import { Behavior } from "../Behavior"
import { BehaviorManager } from "../BehaviorManager"

@bind(UE.PuertsGameFramework.Component.CreateBehaviorsComponent.CreateBehaviorsComponent_C)
export class CreateBehaviorComponent extends Behavior<UE.PuertsGameFramework.Component.CreateBehaviorsComponent.CreateBehaviorsComponent_C> {
    protected onBind(): void {
        for (let i = 0; i < this.u_object.BehaviorNames.Num(); i++) {
            let behaviorName = this.u_object.BehaviorNames.Get(i)
            BehaviorManager.Instance.createBehaviorByName(this.u_object.GetOwner(), behaviorName)
        }
    }
}
