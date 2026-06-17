import UE = require("ue")

export abstract class Behaviour<TOwner extends UE.Object = UE.Object> {
    readonly u_object!: TOwner

    public bind(u_object: TOwner): void {
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
