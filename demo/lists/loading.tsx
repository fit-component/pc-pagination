import * as React from 'react'
import Pagination from '../../src'

export default class Demo extends React.Component <any,any> {
    constructor(props:any) {
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
            <Pagination loading={this.state.loading}
                        onChange={this.handleChange.bind(this)}
                        next={true}/>
        )
    }
}