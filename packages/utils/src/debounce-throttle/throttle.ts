// 在一段时间内只允许函数执行一次

/**
 * 时间戳实现
 * 第一次事件肯定触发，最后一次不会触发
 */
function throttle(fn: (...args: any[]) => void, delay: number = 16) {
    let startTime = Date.now()
    return function (...args: any[]) {
        const endTime = Date.now()
        if (endTime - startTime < delay) return
        fn.apply(this, args)
        startTime = Date.now()
    }
}

/**
 * 定时器实现
 * 第一次事件不会触发，最后一次一定触发
 */
function throttleTimer(fn: (...args: any[]) => void, delay: number = 16) {
    let timer: NodeJS.Timeout | null = null
    return function (...args: any[]) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

export { throttle, throttleTimer }
