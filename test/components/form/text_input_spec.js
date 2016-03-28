import TextInput from '../../../src/components/form/text_input.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const inputElement = (element) => {
  return element && element.type === 'input';
};

const testDOM = function(markup) {
  if (typeof document !== 'undefined') return;
  global.document = jsdom(markup || '');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
};
testDOM('<html><body></body></html>');

describe('TextInput', () => {

  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function(){
    this.sinon.restore();
  });

  it('be a label', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TextInput />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.eq('label');
  });

  it('contains a text input element', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TextInput />);
    const output = renderer.getRenderOutput();

    expect(output.props.children.find(inputElement)).to.not.be.undefined;
  });

  it('onChange triggers', function() {
    const onChangeCB = this.sinon.spy();
    const element = TestUtils.renderIntoDocument(<TextInput updateCB={onChangeCB}/>);
    const input = element.refs.input;
    input.value = 'giraffe';
    TestUtils.Simulate.change(input, { target: { value: 'giraffe' } });
    expect(onChangeCB).to.have.been.called;
  });
});
