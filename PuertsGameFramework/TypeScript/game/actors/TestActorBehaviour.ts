import * as UE from "ue"
import { bind } from "../../core/Decorators"
import { Behaviour } from "../../core/Behaviour"
import { log } from "../../core/Log"

@bind(UE.Game.TsTest.BP_TestBinding.BP_TestBinding_C)
export class TestActorBehaviour extends Behaviour {
    declare u_object: UE.Game.TsTest.BP_TestBinding.BP_TestBinding_C

    protected onBind(): void {
        log(`[TestActorBehaviour] bind ${this.u_object.GetName()} ${this.u_object.Hello}`)
    }

    protected onUnbind(): void {
        log(`[TestActorBehaviour] unbind ${this.u_object.GetName()}`)
    }
}
