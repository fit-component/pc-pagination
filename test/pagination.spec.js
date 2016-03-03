/**
 * Created by wangrui on 16/3/3.
 */
import React from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Pagination from 'fit-pagination';

describe('PC Pagination : ', function () {

    it('Basic', function () {
        var state = 1;
        function handleChange(page) {
            this.setState({
                page: page
            })
        }
        var container = document.createElement('div');
        render(
            <div>
                <Pagination onChange={this.handleChange}
                            next={true}/>
                {this.state}
            </div>, container);
        var x = container.getElementsByTagName("span");
        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before disabled");

        var before = container.innerHTML.toString().indexOf("上一页");
        var next = container.innerHTML.toString().indexOf("下一页");
        expect(before).not.toBe(-1);
        expect(next).not.toBe(-1);
    });

    it('Click next', function () {
        var state = 1;
        function handleChange(page) {
            this.setState({
                page: page
            })
        }
        var container = document.createElement('div');
        render(
            <div>
                <Pagination onChange={this.handleChange}
                            next={true}/>
                {this.state}
            </div>, container);
        var x = container.getElementsByTagName("span");
        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before disabled");
        ReactTestUtils.Simulate.click(x[2]);

        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before");
    });

    it('Click before', function () {
        var state = 1;
        function handleChange(page) {
            this.setState({
                page: page
            })
        }
        var container = document.createElement('div');
        render(
            <div>
                <Pagination onChange={this.handleChange}
                            next={true}/>
                {this.state}
            </div>, container);
        var x = container.getElementsByTagName("span");
        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before disabled");
        ReactTestUtils.Simulate.click(x[2]);

        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before");

        ReactTestUtils.Simulate.click(x[0]);
        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before disabled");
    });

    it('Loading = false', function () {
        function handleChange() {
            this.setState({
                loading: true
            })
        }
        var container = document.createElement('div');
        render(
            <div>
                <Pagination onChange={this.handleChange}
                            next={true}
                            loading={true}/>
            </div>, container);
        var x = container.getElementsByTagName("span");
        var classname = x[0].getAttribute("class");

        expect(classname).toEqual("before disabled");
        ReactTestUtils.Simulate.click(x[2]);
        var classname = x[0].getAttribute("class");
        expect(classname).toEqual("before disabled");
    });
});