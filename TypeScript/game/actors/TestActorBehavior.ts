import UE = require("ue")
import { bind } from "../../core/Decorators"
import { Behavior } from "../../core/Behavior"

@bind(UE.Game.TsTest.BP_TestBinding.BP_TestBinding_C)
export class TestActorBehavior extends Behavior<UE.Game.TsTest.BP_TestBinding.BP_TestBinding_C> {
    onBind(): void {
        console.log(`[TestActorBehavior] bind ${this.owner.GetName()} ${this.owner.Hello}`)
    }

    onUnbind(): void {
        console.log(`[TestActorBehavior] unbind ${this.owner.GetName()}`)
    }
}
