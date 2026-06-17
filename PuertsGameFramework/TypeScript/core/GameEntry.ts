import { BindingManager } from "./BindingManager"

export class GameEntry {
    start(): void {
        BindingManager.Instance.init()
    }

    stop(): void {
        BindingManager.Instance.uninit()
    }

    cleanup(): void {
        BindingManager.Instance.cleanup()
    }
}
