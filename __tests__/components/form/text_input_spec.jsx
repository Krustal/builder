import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import TextInput from '../../../src/components/form/text_input';

const inputElement = (element) => element && element.type === 'input';

describe('TextInput', () => {
  it('can run tests inside an es6 block', () => {
    expect(true).toBe(true);
  });

  it('be a label', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TextInput updateCB={() => {}} />);
    const output = renderer.getRenderOutput();
    expect(output.type).toBe('label');
  });

  it('contains a text input element', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<TextInput updateCB={() => {}} />);
    const output = renderer.getRenderOutput();
    const input = output.props.children.find(inputElement);
    expect(input).toBeTruthy();
  });

  it('onChange triggers', () => {
    const onChangeCB = sinon.spy();
    const element = TestUtils
      .renderIntoDocument(<TextInput updateCB={onChangeCB} />);
    const input = element.input;
    input.value = 'giraffe';
    TestUtils.Simulate.change(input, { target: { value: 'giraffe' } });
    expect(onChangeCB.called).toBeTruthy();
  });
});
