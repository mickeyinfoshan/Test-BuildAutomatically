var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var Hello = require('../../src/js/components/Hello.jsx');
var jasmineReact = require("jasmine-react-helpers");

describe('Hello', function() {
	it("should rende", function() {
		var ele = jasmineReact.render(<Hello />, document.getElementsByTagName("body")[0]);
		expect(ele).not.toBe(undefined);
		expect(ele.state.number).toBe(42);
	});
});