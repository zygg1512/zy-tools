// 当高频事件停止后才触发一次函数，一直触发高频事件则防抖永远不会执行

/**
 * 方案一 只执行最后一次
 */
function debounce(fn: (...args: any[]) => void, delay: number = 16) {
    let timer: NodeJS.Timeout | null = null
    return function (...args: any[]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            // this 指向调用返回函数的对象
            fn.apply(this, args)
        }, delay)
    }
}

/**
 * 方案二 选择是否立即执行函数
 */
function debounceIIFE(fn: (...args: any[]) => void, delay: number = 16, immediate: boolean = false) {
    let timer: NodeJS.Timeout | null = null
    return function (...args: any[]) {
        if (timer) clearTimeout(timer)
        if (immediate) {
            const doNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay)
            if (doNow) {
                fn.apply(this, args)
            }
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

export { debounce, debounceIIFE }
