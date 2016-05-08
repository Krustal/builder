import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import RatioInput from '../../../src/components/form/ratio_input.jsx';

storiesOf('Ratio Input', module)
  .add('default', () => (
    <RatioInput />
  ))
  .add('with labels', () => (
    <RatioInput numerator="current" denominator="max" />
  ));
