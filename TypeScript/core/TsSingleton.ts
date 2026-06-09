export function TsSingleton<T>() {
    class TsSingletonBase {
        private static instance: TsSingletonBase | null = null

        private initialized = false

        protected constructor() {}

        static get Instance(): T {
            if (!TsSingletonBase.instance) {
                TsSingletonBase.instance = new this()
            }

            return TsSingletonBase.instance as T
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

    return TsSingletonBase
}
