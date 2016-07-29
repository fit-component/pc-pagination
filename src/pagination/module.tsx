import * as React from 'react'

export interface PropsInterface {
    /**
     * 初始分页数
     */
    defaultPage?: number

    /**
     * 修改分页的回调
     */
    onChange?: (page?: number) => void

    /**
     * 是否在loading
     */
    loading?: boolean

    /**
     * 是否有下一页
     */
    next?: boolean
    
    [x: string]: any
}

export class Props implements PropsInterface {
    defaultPage = 1
    onChange = () => {
    }
    loading = false
    next = false
}

export interface StateInterface {
    /**
     * 当前页数
     */
    currentPage?: number

    /**
     * 激活按钮名称
     */
    activeButtonName?: string
}

export class State implements StateInterface {
    activeButtonName = ''
}