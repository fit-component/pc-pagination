import * as React from 'react'
import {PaginationFull} from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <PaginationFull allPage={6}/>
        )
    }
}