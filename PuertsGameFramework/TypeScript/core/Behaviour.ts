import UE = require("ue")

export abstract class Behaviour {
    public u_object: UE.Object | null = null

    public bind(u_object: UE.Object): void {
        this.u_object = u_object
        this.onBind?.()
    }

    public unbind(): void {
        this.onUnbind?.()
    }

    protected onBind?(): void
    protected onUnbind?(): void
}
