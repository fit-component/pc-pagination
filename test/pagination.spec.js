import React from 'react'
import { shallow, mount } from 'enzyme'
import Pagination from 'fit-pagination'

describe('fit-pagination', function () {
    it('有上一页,下一页这两个按钮', ()=> {
        const node = mount(<Pagination/>)
        expect(node.find('.before').text()).to.eql('上一页')
        expect(node.find('.after').text()).to.eql('下一页')
    })

    //it('单页初始状态,上一页不能点', ()=> {
    //    const span = container.getElementsByTagName("span")
    //    const classname = span[0].getAttribute("class")
    //    expect(classname).toEqual("before disabled")
    //})

    //it('[next=true]下一页能点', ()=> {
    //    const container = document.createElement('div')
    //    const component = (
    //        <Pagination next={true}/>
    //    )
    //    render(component, container)
    //
    //    const spans = container.getElementsByTagName("span")
    //    console.log(spans)
    //    const classname = spans[2].getAttribute("class")
    //    expect(classname).toEqual("after")
    //})
    //
    //it('[next=false]下一页不能点', ()=> {
    //    const container = document.createElement('div')
    //    const component = (
    //        <Pagination next={false}/>
    //    )
    //    render(component, container)
    //
    //    const span = container.getElementsByTagName("span")
    //    const classname = span[2].getAttribute("class")
    //    expect(classname).toEqual("after disabled")
    //})
    //
    //it('点了下一页,上一页就可以点击了', ()=> {
    //    const container = document.createElement('div')
    //    const component = (
    //        <Pagination next={true}/>
    //    )
    //    render(component, container)
    //
    //    const x = container.getElementsByTagName("span")
    //    const classnameBefore = x[0].getAttribute("class")
    //    expect(classnameBefore).toEqual("before disabled")
    //    ReactTestUtils.Simulate.click(x[2])
    //
    //    const classnameAfter = x[0].getAttribute("class")
    //    expect(classnameAfter).toEqual("before")
    //})

    //it('Click before', ()=> {
    //    const component = (
    //        <Pagination next={true}/>
    //    )
    //    render(component, container)
    //
    //    const x = container.getElementsByTagName("span")
    //
    //    ReactTestUtils.Simulate.click(x[2])
    //    const classname = x[0].getAttribute("class")
    //    expect(classname).toEqual("before")
    //
    //    ReactTestUtils.Simulate.click(x[0])
    //    const classname = x[0].getAttribute("class")
    //    expect(classname).toEqual("before disabled")
    //})
    //
    //it('Loading = false', ()=> {
    //    function handleChange() {
    //        this.setState({
    //            loading: true
    //        })
    //    }
    //
    //    const component = (
    //        <div>
    //            <Pagination onChange={this.handleChange}
    //                        next={true}
    //                        loading={true}/>
    //        </div>
    //    )
    //    render(component, container)
    //
    //    const x = container.getElementsByTagName("span")
    //    const classname = x[0].getAttribute("class")
    //    expect(classname).toEqual("before disabled")
    //
    //    const x = container.getElementsByTagName("span")
    //    const classname = x[0].getAttribute("class")
    //
    //    ReactTestUtils.Simulate.click(x[2])
    //    expect(classname).toEqual("before disabled")
    //})
})


//import React from 'react'
//import { shallow } from 'enzyme'
//import sinon from 'sinon'
//import Pagination from 'fit-pagination'
//
//describe('fit-pagination', function () {
//    it('有上一页,下一页这两个按钮', ()=> {
//        const node = shallow(<Pagination/>)
//        expect(node.find('before').text()).toEqual('上一页')
//        expect(node.find('after').text()).toEqual('下一页')
//    })