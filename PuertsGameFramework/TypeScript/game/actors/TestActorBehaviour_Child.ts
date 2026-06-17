import UE = require("ue")
import { bind } from "../../core/Decorators"
import { Behaviour } from "../../core/Behaviour"
import { log } from "../../core/Log"

@bind(UE.Game.TsTest.BP_TestBinding_Child.BP_TestBinding_Child_C)
export class TestActorBehaviour_Child extends Behaviour {
    declare readonly u_object: UE.Game.TsTest.BP_TestBinding_Child.BP_TestBinding_Child_C

    protected onBind(): void {
        log(`[TestActorBehaviour_child] bind ${this.u_object.GetName()} ${this.u_object.Hello}`)
    }

    protected onUnbind(): void {
        log(`[TestActorBehaviour_child] unbind ${this.u_object.GetName()}`)
    }
}
