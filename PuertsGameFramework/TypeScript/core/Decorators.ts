import UE = require("ue")
import { blueprint } from "puerts"
import { BehaviourNameToConstructor, UClassToBehaviour, BehaviourConstructor } from "./Data"

const LoadedBlueprintClassByPath = new Map<string, UE.Class>()

export function bind(ueClassType: typeof UE.Object): (behaviourClass: BehaviourConstructor) => void
export function bind(ueClassType: typeof UE.Object) {
    return function (behaviourClass: BehaviourConstructor): void {
        if (BehaviourNameToConstructor.has(behaviourClass.name)) {
            throw new Error(`[bind] Duplicate behaviour name: ${behaviourClass.name}`)
        }

        BehaviourNameToConstructor.set(behaviourClass.name, behaviourClass)

        const ueClass = resolveUeClass(ueClassType)
        const behaviourClasses = UClassToBehaviour.get(ueClass) ?? []
        behaviourClasses.push(behaviourClass)
        UClassToBehaviour.set(ueClass, behaviourClasses)
    }
}

function resolveUeClass(ueClassType: typeof UE.Object): UE.Class {
    const blueprintPath = getBlueprintPath(ueClassType)
    if (blueprintPath) {
        const cachedClass = LoadedBlueprintClassByPath.get(blueprintPath)
        if (cachedClass) {
            return cachedClass
        }

        const loadedBlueprintClass = loadBlueprintClass(ueClassType)
        if (loadedBlueprintClass) {
            const ueClass = loadedBlueprintClass.StaticClass()
            LoadedBlueprintClassByPath.set(blueprintPath, ueClass)
            return ueClass
        }
        throw new Error(`Can not load blueprint class: ${blueprintPath}`)
    }

    return ueClassType.StaticClass()
}

type RuntimeBlueprintClass = {
    StaticClass?: () => UE.Class
    __path?: string
    __parent?: RuntimeBlueprintClass
}

type LoadedBlueprintClass = Omit<RuntimeBlueprintClass, "StaticClass"> & {
    StaticClass: () => UE.Class
}

function getBlueprintPath(ueClassType: unknown): string | undefined {
    const parts: string[] = []
    let node = ueClassType as RuntimeBlueprintClass | undefined

    while (node) {
        const path = Object.getOwnPropertyDescriptor(node, "__path")?.value as string | undefined
        if (!path) {
            break
        }

        parts.unshift(path)
        node = Object.getOwnPropertyDescriptor(node, "__parent")?.value as RuntimeBlueprintClass | undefined
    }

    if (parts.length < 2) {
        return undefined
    }

    const className = parts[parts.length - 1]
    const packagePath = parts.slice(0, -1).join("/")
    return `/${packagePath}.${className}`
}

function loadBlueprintClass(ueClassType: typeof UE.Object): LoadedBlueprintClass | undefined {
    const unloadedClass = ueClassType as RuntimeBlueprintClass
    const path = Object.getOwnPropertyDescriptor(unloadedClass, "__path")?.value as string | undefined
    const parent = Object.getOwnPropertyDescriptor(unloadedClass, "__parent")?.value as Record<string, RuntimeBlueprintClass> | undefined
    if (!path || !parent) {
        return undefined
    }

    blueprint.load(unloadedClass)

    const loadedClass = parent[path]
    return typeof loadedClass?.StaticClass === "function" ? loadedClass as LoadedBlueprintClass : undefined
}
