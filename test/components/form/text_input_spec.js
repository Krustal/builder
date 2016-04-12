import TextInput from '../../../src/components/form/text_input.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const inputElement = (element) => {
  return element && element.type === 'input';
};

describe('TextInput', () => {

  it('can run tests inside an es6 block', () => {
    expect(true).to.be.true;
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
    const input = output.props.children.find(inputElement);
    expect(input).to.exist;
  });

  it('onChange triggers', function() {
    const onChangeCB = sinon.spy();
    const element = TestUtils.renderIntoDocument(<TextInput updateCB={onChangeCB}/>);
    const input = element.refs.input;
    input.value = 'giraffe';
    TestUtils.Simulate.change(input, { target: { value: 'giraffe' } });
    expect(onChangeCB).to.have.been.called;
  });
});
