import UE = require("ue")
import { bind } from "../../core/Decorators"
import { Behavior } from "../../core/Behavior"
import { log } from "../../core/Log"

@bind(UE.Game.TsTest.BP_TestBinding.BP_TestBinding_C)
export class TestActorBehavior extends Behavior<UE.Game.TsTest.BP_TestBinding.BP_TestBinding_C> {
    onBind(): void {
        log(`[TestActorBehavior] bind ${this.u_object.GetName()} ${this.u_object.Hello}`)
    }

    onUnbind(): void {
        log(`[TestActorBehavior] unbind ${this.u_object.GetName()}`)
    }
}
