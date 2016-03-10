import React from 'react'
import classNames from 'classnames'
import './index.scss'

// 根据当前页,总页数生成展示页数列表,...用null表示
let getMiddleNumbers = (current, all)=> {
    if (all <= 7) {
        let arrs = []
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

export default class PaginationAll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: this.props.defaultPage,
            prevPage: this.props.defaultPage,
            activeButtonName: ''
        }
    }

    // 外部调用翻页
    jump(page) {
        let activeButtonName
        if (page === this.state.currentPage)return

        this.handleChange(page, false, page)
    }

    handleChange(page, disable, activeButtonName) {
        if (disable)return
        let tempPage = this.state.currentPage
        this.setState({
            currentPage: page,
            prevPage: tempPage,
            activeButtonName: activeButtonName
        }, ()=> {
            this.props.onChange(page)
        })
    }

    render() {
        const {className, loading, allPage, ...others} = this.props
        const classes = classNames({
            '_namespace': true,
            [className]: className
        })

        let beforeClass = classNames({
            'before': true,
            'disabled': this.state.currentPage === 1 || loading
        })

        let afterClass = classNames({
            'after': true,
            'disabled': this.state.currentPage === allPage || loading
        })

        let beforeLoading = null
        let afterLoading = null

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
        let middleNum = []

        if (!loading) {
            middleNum = getMiddleNumbers(this.state.currentPage, allPage)
        } else {
            middleNum = getMiddleNumbers(this.state.prevPage, allPage)
        }

        let middleNumbers = middleNum.map((number, index)=> {
            if (number !== null) {
                let numberClass = classNames({
                    'number-button': true,
                    'disabled': loading,
                    'active': number === this.state.currentPage && !loading
                })

                let numberAfterLoading = null
                if (this.state.activeButtonName === number && loading) {
                    numberAfterLoading = (
                        <i style={{marginLeft:5}}
                           className="fa fa-circle-o-notch fa-spin loading"/>
                    )
                }

                return (
                    <div key={index}
                         className={numberClass}
                         onClick={this.handleChange.bind(this,number,loading||number===this.state.currentPage,number)}>{number}{numberAfterLoading ? numberAfterLoading : null}</div>
                )
            } else {
                return (
                    <div key={index}
                         className="disabled">...</div>
                )
            }
        })

        return (
            <nav {...others} className={classes}>
                <div className="pagination">
                    <div className={beforeClass}
                         onClick={this.handleChange.bind(this,this.state.currentPage-1,(this.state.currentPage === 1 || loading),'before')}>
                        {beforeLoading ? beforeLoading : null}<i className="fa fa-chevron-left"/>
                    </div>

                    {middleNumbers}

                    <div className={afterClass}
                         onClick={this.handleChange.bind(this,this.state.currentPage+1,(this.state.currentPage === allPage || loading),'after')}>
                        <i className="fa fa-chevron-right"/>{afterLoading ? afterLoading : null}
                    </div>
                </div>
            </nav>
        )
    }
}

PaginationAll.defaultProps = {
    // @desc 初始分页
    defaultPage: 1,

    // @desc 总页数
    allPage: 10,

    // @desc 修改分页的回调
    onChange: ()=> {
    }
}