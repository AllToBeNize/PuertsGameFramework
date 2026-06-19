import { Behaviour } from "./Behaviour"

export function BehaviourSingleton<T>() {
    class BehaviourSingletonBase extends Behaviour {
        private static instance: BehaviourSingletonBase | null = null

        private initialized = false

        public static get Instance(): T {
            if (!BehaviourSingletonBase.instance) {
                BehaviourSingletonBase.instance = new this()
            }

            return BehaviourSingletonBase.instance as T
        }

        public get isInitialized(): boolean {
            return this.initialized
        }

        public init(): void {
            if (this.initialized) {
                return
            }

            this.initialized = true
            this.onInit()
        }

        public uninit(): void {
            if (!this.initialized) {
                return
            }

            this.onUninit()
            this.initialized = false
        }

        public cleanup(): void {
            this.onCleanup()
        }

        protected onInit(): void {}
        protected onUninit(): void {}
        protected onCleanup(): void {}
    }

    return BehaviourSingletonBase
}
