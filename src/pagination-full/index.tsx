import * as React from 'react'
import * as classNames from 'classnames'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'
import {Button, ButtonGroup} from '../../../button/src'
import Input from '../../../input/src'
import './index.scss'
import '../font/font.scss'

// 根据当前页,总页数生成展示页数列表,...用null表示
const getMiddleNumbers = (current: number, all: number) => {
    if (all <= 7) {
        let arrs: number[] = []
        for (let i = 0; i < all; i++) {
            arrs.push(i + 1)
        }
        return arrs
    }

    if (current <= 4) {
        return [1, 2, 3, 4, 5, 6, null, all]
    }

    if (all - current < 5) {
        let arr = [1, null]
        for (let i = all - 6; i <= all; i++) {
            arr.push(i)
        }
        return arr
    }

    let arr = [1, null]
    for (let i = current - 2; i <= current + 3; i++) {
        arr.push(i)
    }
    arr.push(null)
    arr.push(all)
    return arr
}

export default class PaginationFull extends React.Component<module.PropsInterface, module.StateInterface> {
    static defaultProps: module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    constructor(props: any) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            currentPage: this.props.defaultPage,
            prevPage: this.props.defaultPage
        })
    }

    // 外部调用翻页
    jump(page: number) {
        let activeButtonName: string
        if (page === this.state.currentPage) return
        this.handleChange(page, false, page.toString())
    }

    handleChange(page: number, disable: boolean, activeButtonName: string) {
        if (disable) return
        let tempPage = this.state.currentPage
        this.setState({
            currentPage: page,
            prevPage: tempPage,
            activeButtonName: activeButtonName
        }, () => {
            this.props.onChange(page)
        })
    }

    handleJumpNumberChange(event: any) {
        this.setState({
            jumpPageNumber: event.target.value
        })
    }

    doJump() {
        const jumpNumber = parseInt(this.state.jumpPageNumber)
        if (jumpNumber < 1 || jumpNumber > this.props.allPage)return
        this.jump(jumpNumber)
    }

    handleJumpKeyUp(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            const jumpNumber = parseInt(this.state.jumpPageNumber)
            if (jumpNumber < 1 || jumpNumber > this.props.allPage)return
            this.jump(jumpNumber)
        }
    }

    render() {
        const {loading, allPage} = this.props
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        let beforeClass = classNames({
            'before': true,
            'disabled': this.state.currentPage === 1 || loading
        })

        let afterClass = classNames({
            'after': true,
            'disabled': this.state.currentPage === allPage || loading
        })

        let beforeLoading: any = null
        let afterLoading: any = null

        switch (this.state.activeButtonName) {
            case 'before':
                if (!loading) break
                beforeLoading = (
                    <i className="fa fa-circle-o-notch fa-spin loading"/>
                )
                break
            case 'after':
                if (!loading) break
                afterLoading = (
                    <i className="fa fa-circle-o-notch fa-spin loading"/>
                )
                break
        }

        // 中间页数字
        let middleNum: number[] = []

        if (!loading) {
            middleNum = getMiddleNumbers(this.state.currentPage, allPage)
        } else {
            middleNum = getMiddleNumbers(this.state.prevPage, allPage)
        }

        let middleNumbers = middleNum.map((number, index) => {
            if (number !== null) {
                let buttonProps = {
                    disabled: loading,
                    active: number === this.state.currentPage && !loading
                }

                let numberAfterLoading: any = null
                if (this.state.activeButtonName === number.toString() && loading) {
                    numberAfterLoading = (
                        <i style={{ marginLeft: 5 }}
                           className="fa fa-circle-o-notch fa-spin loading"/>
                    )
                }

                return (
                    <Button {...buttonProps}
                        key={index}
                        onClick={this.handleChange.bind(this, number, loading || number === this.state.currentPage, number) }>{number}{numberAfterLoading ? numberAfterLoading : null}</Button>
                )
            } else {
                return (
                    <Button key={index}
                            disabled>...</Button>
                )
            }
        })

        // 跳转dom
        let JumpInput: React.ReactElement<any> = null
        let JumpButton: React.ReactElement<any> = null
        if (this.props.enableJump) {
            JumpInput =<Input className="inline-input"
                              label="页码"
                              placeholder="请输入数字"
                              onChange={this.handleJumpNumberChange.bind(this)}
                              onKeyUp={this.handleJumpKeyUp.bind(this)}
                              style={{width:100}}/>
            JumpButton = <Button onClick={this.doJump.bind(this)}>跳转</Button>
        }

        const _others = others(new module.Props(), this.props)

        return (
            <nav {..._others} className={classes}>
                <ButtonGroup className="pagination">
                    <Button className={beforeClass}
                            onClick={this.handleChange.bind(this, this.state.currentPage - 1, (this.state.currentPage === 1 || loading), 'before') }>
                        {beforeLoading ? beforeLoading : null}<i className="fit-pagination-left"/>
                    </Button>

                    {middleNumbers}

                    <Button className={afterClass}
                            onClick={this.handleChange.bind(this, this.state.currentPage + 1, (this.state.currentPage === allPage || loading), 'after') }>
                        <i className="fit-pagination-right"/>{afterLoading ? afterLoading : null}
                    </Button>

                    {JumpInput}
                    {JumpButton}
                </ButtonGroup>
            </nav>
        )
    }
}