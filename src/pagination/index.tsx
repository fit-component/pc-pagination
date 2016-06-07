import * as React from 'react'
import * as classNames from 'classnames'
import {Button, ButtonGroup} from '../../../button/src'
import * as module from './module'
import {others} from '../../../../common/transmit-transparently/src'

export default class Pagination extends React.Component <module.PropsInterface, module.StateInterface> {
    static defaultProps:module.PropsInterface = new module.Props()
    public state: module.StateInterface = new module.State()

    constructor(props: any) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            currentPage: this.props.defaultPage
        })
    }

    // 外部调用翻页
    jump(page: number) {
        let activeButtonName: string
        if (page === this.state.currentPage) return

        if (page > this.state.currentPage) {
            if (!this.props.next) {
                return
            }
            activeButtonName = 'after'
        }

        if (page < this.state.currentPage) {
            activeButtonName = 'before'
        }

        this.handleChange(page, false, activeButtonName)
    }

    // 翻页
    handleChange(page: number, disable: boolean, activeButtonName: string) {
        if (disable) return
        this.setState({
            currentPage: page,
            activeButtonName: activeButtonName
        }, () => {
            this.props.onChange(page)
        })
    }

    render() {
        const {loading, next} = this.props
        const classes = classNames({
            '_namespace': true,
            [this.props['className']]: !!this.props['className']
        })

        const _others = others(new module.Props(), this.props)

        return (
            <ButtonGroup {..._others} className={classes}>
                <Button onClick={this.handleChange.bind(this, this.state.currentPage - 1, (this.state.currentPage === 1 || loading), 'before') }
                    loading={this.state.activeButtonName === 'before' && this.props.loading}
                    disabled={this.state.currentPage === 1}>
                    上一页
                </Button>
                <Button onClick={this.handleChange.bind(this, this.state.currentPage + 1, (!next || loading), 'after') }
                    loading={this.state.activeButtonName === 'after' && this.props.loading}
                    disabled={!this.props.next}>
                    下一页
                </Button>
            </ButtonGroup>
        )
    }
}