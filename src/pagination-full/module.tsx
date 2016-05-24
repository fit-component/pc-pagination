export interface PropsInterface {
    /**
     * 初始分页
     */
    defaultPage?: number

    /**
     * 总页数
     */
    allPage?: number

    /**
     * 修改分页的回调
     */
    onChange?: (page?: number) => void

    [x: string]: any
}

export class Props implements PropsInterface {
    defaultPage = 1
    allPage = 10
    onChange = () => {
    }
}

export interface StateInterface {
    /**
     * 当前页码
     */
    currentPage?: number

    /**
     * 上一页码
     */
    prevPage?: number

    /**
     * 激活按钮名称
     */
    activeButtonName?: string
}

export class State implements StateInterface {
    activeButtonName = ''
}