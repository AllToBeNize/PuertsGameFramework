import UE = require("ue")
import { bind } from "../../core/Decorators"
import { Behavior } from "../../core/Behavior"
import { log } from "../../core/Log"

@bind(UE.Game.TsTest.BP_TestBinding_Child.BP_TestBinding_Child_C)
export class TestActorBehavior_Child extends Behavior<UE.Game.TsTest.BP_TestBinding_Child.BP_TestBinding_Child_C> {
    protected onBind(): void {
        log(`[TestActorBehavior_child] bind ${this.u_object.GetName()} ${this.u_object.Hello}`)
    }

    protected onUnbind(): void {
        log(`[TestActorBehavior_child] unbind ${this.u_object.GetName()}`)
    }
}
