export function setMap<K, V>(map: Map<K, Array<V>>, key: K, value: V) {
    const arr = map.get(key);
    if (arr) {
        arr.push(value);
    } else {
        map.set(key, [value]);
    }
}