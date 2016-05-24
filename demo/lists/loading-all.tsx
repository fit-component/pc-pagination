import * as React from 'react'
import {PaginationFull} from '../../src'

export default class Demo extends React.Component <any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            loading: false
        }
    }

    handleChange() {
        this.setState({
            loading: true
        })
    }

    render() {
        return (
            <PaginationFull
                loading={this.state.loading}
                onChange={this.handleChange.bind(this)}
                allPage={500}/>
        )
    }
}