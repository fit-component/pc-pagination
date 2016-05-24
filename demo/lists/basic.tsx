import * as React from 'react'
import Pagination from '../../src'

export default class Demo extends React.Component <any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            page: 1
        }
    }

    handleChange(page: number) {
        this.setState({
            page: page
        })
    }

    render() {
        return (
            <div>
                <Pagination onChange={this.handleChange.bind(this)}
                            next={true}
                            style={{marginRight:10}}/>
                {this.state.page}
            </div>
        )
    }
}