import React from 'react'
import classNames from 'classnames'
import {Button, ButtonGroup} from '../../../button/src'

export default class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage     : this.props.defaultPage,
            activeButtonName: ''
        }
    }

    // 外部调用翻页
    jump(page) {
        let activeButtonName
        if (page === this.state.currentPage)return

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
    handleChange(page, disable, activeButtonName) {
        if (disable)return
        this.setState({
            currentPage     : page,
            activeButtonName: activeButtonName
        }, ()=> {
            this.props.onChange(page)
        })
    }

    render() {
        const {className, loading, next, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className] : className
        })

        return (
            <ButtonGroup {...others} className={classes}>
                <Button onClick={this.handleChange.bind(this,this.state.currentPage-1,(this.state.currentPage === 1 || loading),'before')}
                        loading={this.state.activeButtonName==='before'&&this.props.loading}
                        disabled={this.state.currentPage===1}>
                    上一页
                </Button>
                <Button onClick={this.handleChange.bind(this,this.state.currentPage+1,(!next || loading),'after')}
                        loading={this.state.activeButtonName==='after'&&this.props.loading}
                        disabled={!this.props.next}>
                    下一页
                </Button>
            </ButtonGroup>
        )
    }
}

Pagination.defaultProps = {
    // @desc 初始分页数
    defaultPage: 1,

    // @desc 修改分页的回调
    onChange: ()=> {
    },

    // @desc 是否在loading
    loading: false,

    // @desc 是否有下一页
    next: false
}