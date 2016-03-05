import React from 'react'
import classNames from 'classnames'
import './index.scss'

export default class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: this.props.defaultPage,
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
            currentPage: page,
            activeButtonName: activeButtonName
        }, ()=> {
            this.props.onChange(page)
        })
    }

    render() {
        let beforeClass = classNames({
            'before': true,
            'disabled': this.state.currentPage === 1 || this.props.loading
        })

        let afterClass = classNames({
            'after': true,
            'disabled': !this.props.next || this.props.loading
        })

        let beforeLoading = null
        let afterLoading = null

        switch (this.state.activeButtonName) {
        case 'before':
            if (!this.props.loading) break
            beforeLoading = (
                <i className="fa fa-circle-o-notch fa-spin loading"/>
            )
            break
        case 'after':
            if (!this.props.loading) break
            afterLoading = (
                <i className="fa fa-circle-o-notch fa-spin loading"/>
            )
            break
        }

        return (
            <nav className="_namespace">
                <ul className="pager">
                    <li>
                        <span onClick={this.handleChange.bind(this,this.state.currentPage-1,(this.state.currentPage === 1 || this.props.loading),'before')}
                              className={beforeClass}>
                            {beforeLoading ? beforeLoading : null}
                            上一页
                        </span>
                    </li>
                    <li>
                        <span onClick={this.handleChange.bind(this,this.state.currentPage+1,(!this.props.next || this.props.loading),'after')}
                              className={afterClass}>
                            下一页
                            {afterLoading ? afterLoading : null}
                        </span>
                    </li>
                </ul>
            </nav>
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