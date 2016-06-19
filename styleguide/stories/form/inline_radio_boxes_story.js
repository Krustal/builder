import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import InlineRadioBoxes from '../../../src/components/form/inline_radio_boxes.jsx';

const defaultProps = {
  field: 'choice',
  options: [
    { label: 'str', value: 'a' },
    { label: 'dex', value: 'b' },
    { label: 'con', value: 'd' }
  ]
};

storiesOf('Inline Radio Boxes', module)
  .add('default', () => (
    <InlineRadioBoxes {...defaultProps}
      selectionCB={action('selection')}/>
  ));
