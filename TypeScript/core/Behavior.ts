import UE = require("ue")

export abstract class Behavior<TOwner extends UE.Object = UE.Object> {
    readonly owner!: TOwner

    bind(owner: TOwner): void {
        Object.defineProperty(this, "owner", {
            value: owner,
            writable: false,
            configurable: true,
        })

        this.onBind?.()
    }

    unbind(): void {
        this.onUnbind?.()
    }

    onBind?(): void
    onUnbind?(): void
}
