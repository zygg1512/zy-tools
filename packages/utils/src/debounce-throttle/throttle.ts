type ThrottleFunction = (func: (...args: any) => any, delay?: number) => (...args: any[]) => void

// 时间戳实现
// 在第一次触发事件时 __立即执行__，以后每过 `delay` 秒之后才执行一次
const throttle: ThrottleFunction = (func, delay = 16) => {
    let prev = Date.now()
    return function (...args: any[]) {
        const now = Date.now()
        if (now - prev >= delay) {
            func.apply(this, args)
            prev = Date.now()
        }
    }
}

// 在第一次触发时不会执行，而是在 `delay` 秒之后才执行
const throttleTimer: ThrottleFunction = (func, delay = 16) => {
    let timer: any = null
    return function (...args: any[]) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args)
                timer = null
            }, delay)
        }
    }
}

export { throttle, throttleTimer }
