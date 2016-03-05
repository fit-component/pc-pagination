import React from 'react'
import { shallow, mount } from 'enzyme'
import Pagination from 'fit-pagination'

describe('fit-pagination:all-page', ()=> {
    it('总页数只有1的时候,有上一页下一页,还有第一页但不能点', ()=> {
        const node = mount(<Pagination allPage="1"/>)
        expect(node.contains(<i className="fa fa-chevron-left"/>)).to.equal(true)
        expect(node.contains(<i className="fa fa-chevron-right"/>)).to.equal(true)
        expect(node.find('.number-button').length).to.equal(1)
        expect(node.find('.number-button').text()).to.equal("1")
        expect(node.find('.number-button').is('.active')).to.equal(true)
    })
})
