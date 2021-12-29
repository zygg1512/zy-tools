type DebounceFunction = (func: (...args: any) => any, delay?: number) => (...args: any[]) => void
type DebounceFunctionIIFE = (
    func: (...args: any) => any,
    delay?: number,
    immediate?: boolean
) => (...args: any[]) => void

const debounce: DebounceFunction = (func, delay = 16) => {
    let timer: any = null
    return function (this: any, ...args: any[]) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

const debounceIIFE: DebounceFunctionIIFE = (func, delay = 16, immediate) => {
    let timer: any = null
    return function (this: any, ...args: any[]) {
        if (timer) clearTimeout(timer)
        if (immediate) {
            const doNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay)
            if (doNow) {
                func.apply(this, args)
            }
        } else {
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}

export { debounce, debounceIIFE }
