import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import RatioInput from '../../../src/components/form/ratio_input';

storiesOf('Ratio Input', module)
  .add('default', () => (
    <RatioInput />
  ))
  .add('with labels', () => (
    <RatioInput
      numeratorLabel="current"
      numerator={5}
      numeratorChange={action('numerator change')}
      denominatorLabel="max"
      denominator={10}
    />
  ));
