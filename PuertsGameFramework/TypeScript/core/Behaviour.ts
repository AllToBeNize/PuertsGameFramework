import UE = require("ue")

export abstract class Behaviour {
    readonly u_object!: UE.Object

    public bind(u_object: UE.Object): void {
        Object.defineProperty(this, "u_object", {
            value: u_object,
            writable: false,
            configurable: true,
        })

        this.onBind?.()
    }

    public unbind(): void {
        this.onUnbind?.()
    }

    protected onBind?(): void
    protected onUnbind?(): void
}
