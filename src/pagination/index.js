import React from 'react'
import Simple from './simple'
import AllPage from './all-page'

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
                <AllPage ref="child" {...this.props}/>
            )
        } else {
            child = (
                <Simple ref="child" {...this.props}/>
            )
        }

        return (
            <div>{child}</div>
        )
    }
}
