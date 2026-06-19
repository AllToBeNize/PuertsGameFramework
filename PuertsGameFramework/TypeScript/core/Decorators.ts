import UE = require("ue")
import { blueprint } from "puerts"
import { BehaviourNameToConstructor, UClassToBehaviour, BehaviourConstructor } from "./Data"
import { setMap } from "./Utility"

type RuntimeBlueprintClass = typeof UE.Object & {
    __path?: string
    __parent?: Record<string, typeof UE.Object>
}

const LoadedClassCache = new WeakMap<typeof UE.Object, typeof UE.Object>()

export function bind(ueClassType: typeof UE.Object): (behaviourClass: BehaviourConstructor) => void
export function bind(ueClassType: typeof UE.Object) {
    return function (behaviourClass: BehaviourConstructor): void {
        if (BehaviourNameToConstructor.has(behaviourClass.name)) {
            throw new Error(`[bind] Duplicate behaviour name: ${behaviourClass.name}`)
        }

        BehaviourNameToConstructor.set(behaviourClass.name, behaviourClass)

        const loadedClass = resolveLoadedClass(ueClassType)
        setMap(UClassToBehaviour, loadedClass.StaticClass(), behaviourClass)
    }
}

function resolveLoadedClass(ueClassType: typeof UE.Object): typeof UE.Object {
    const cachedClass = LoadedClassCache.get(ueClassType)
    if (cachedClass) {
        return cachedClass
    }

    const runtimeClass = ueClassType as RuntimeBlueprintClass
    if (!runtimeClass.__path || !runtimeClass.__parent) {
        LoadedClassCache.set(ueClassType, ueClassType)
        return ueClassType
    }

    blueprint.load(ueClassType)

    const loadedClass = runtimeClass.__parent[runtimeClass.__path]
    if (!loadedClass) {
        throw new Error(`[bind] blueprint.load succeeded but failed to resolve loaded class: ${runtimeClass.__path}`)
    }

    LoadedClassCache.set(ueClassType, loadedClass)
    LoadedClassCache.set(loadedClass, loadedClass)
    return loadedClass
}
