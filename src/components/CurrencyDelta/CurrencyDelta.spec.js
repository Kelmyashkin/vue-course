/* eslint-disable no-undef */
import { shallow } from '@vue/test-utils';
import CurrencyDelta from './CurrencyDelta.vue';

describe('CurrencyDelta.vue', () => {
  it('render first value', () => {
    // Arrange
    const value = 1500.55;

    // Act
    const wrapper = shallow(CurrencyDelta, {
      propsData: { value },
    });

    // Assert
    expect(wrapper.find('span').text()).toMatch('(0.00%)');
  });

  it('render changed positive value', () => {
    // Arrange
    const value = 100;

    // Act
    const wrapper = shallow(CurrencyDelta, {
      propsData: { value },
    });
    wrapper.setProps({ value: 110 });

    // Assert
    expect(wrapper.find('span').text()).toMatch('(10.00%)');
  });

  it('render changed negative value', () => {
    // Arrange
    const value = 100;

    // Act
    const wrapper = shallow(CurrencyDelta, {
      propsData: { value },
    });
    wrapper.setProps({ value: 90 });

    // Assert
    expect(wrapper.find('span').text()).toMatch('(-10.00%)');
  });

  it('render changed positive color', () => {
    // Arrange
    const value = 100;

    // Act
    const wrapper = shallow(CurrencyDelta, {
      propsData: { value },
    });
    wrapper.setProps({ value: 110 });

    // Assert
    expect(wrapper.contains('span.decreased')).toBeFalsy();
  });

  it('render changed negative color', () => {
    // Arrange
    const value = 100;

    // Act
    const wrapper = shallow(CurrencyDelta, {
      propsData: { value },
    });
    wrapper.setProps({ value: 90 });

    // Assert
    expect(wrapper.contains('span.decreased')).toBeTruthy();
  });
});
