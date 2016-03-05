import React from 'react'
import Pagination from './pagination'
import PaginationAll from './pagination-all'

export default class ButtonGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    jump(page) {
        this.refs.child.jump(page)
    }

    render() {
        let child = null

        if (this.props.allPage) {
            child = (
                <PaginationAll ref="child" {...this.props}/>
            )
        } else {
            child = (
                <Pagination ref="child" {...this.props}/>
            )
        }

        return (
            <div>{child}</div>
        )
    }
}

export { Pagination, PaginationAll }