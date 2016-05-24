import * as React from 'react'
import {PaginationFull} from '../../src'

export default class Demo extends React.Component <any,any> {
    render() {
        return (
            <div>
                <PaginationFull allPage={7}/>
                <PaginationFull allPage={9}
                                style={{marginTop:10}}/>
                <PaginationFull allPage={10}
                                style={{marginTop:10}}/>
                <PaginationFull allPage={1000}
                                style={{marginTop:10}}/>
            </div>
        )
    }
}