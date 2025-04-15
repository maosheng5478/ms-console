export function defJson<T>(val: string, def: T): T {
    try {
        return JSON.parse(val) as T;
    } catch (error) {
        return def;
    }
}
