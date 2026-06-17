export function log(message?: unknown, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams)
}

export function warning(message?: unknown, ...optionalParams: unknown[]): void {
    console.warn(message, ...optionalParams)
}

export function error(message?: unknown, ...optionalParams: unknown[]): void {
    console.error(message, ...optionalParams)
}

export function trace(message?: unknown, ...optionalParams: unknown[]): void {
    console.trace(message, ...optionalParams)
}
