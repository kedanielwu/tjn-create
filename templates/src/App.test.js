import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('App test', () => {
  it('should mount', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('#app')).toHaveLength(1);
    expect(wrapper.find('#text')).toHaveLength(1);
  });
});