export function Singleton<T>() {
    class SingletonBase {
        private static instance: SingletonBase | null = null

        private initialized = false

        protected constructor() {}

        static get Instance(): T {
            if (!SingletonBase.instance) {
                SingletonBase.instance = new this()
            }

            return SingletonBase.instance as T
        }

        get isInitialized(): boolean {
            return this.initialized
        }

        init(): void {
            if (this.initialized) {
                return
            }

            this.initialized = true
            this.onInit()
        }

        uninit(): void {
            if (!this.initialized) {
                return
            }

            this.onUninit()
            this.initialized = false
        }

        cleanup(): void {
            this.onCleanup()
        }

        protected onInit(): void {}
        protected onUninit(): void {}
        protected onCleanup(): void {}
    }

    return SingletonBase
}
