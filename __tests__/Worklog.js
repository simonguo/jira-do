import 'react-native';
import React from 'react';

import { formatSecond } from '../app/components/WorklogItem';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Worklog', () => {

  test('formatSecond', () => {
    expect(formatSecond(3600)).toBe('1 小时');
    expect(formatSecond(1800)).toBe('0.5 小时');
    expect(formatSecond(360)).toBe('0.1 小时');
  });


});

