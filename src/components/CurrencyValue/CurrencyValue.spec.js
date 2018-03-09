/* eslint-disable no-undef */
import { shallow } from '@vue/test-utils';
import CurrencyValue from './CurrencyValue.vue';

describe('CurrencyValue.vue', () => {
  it('when get value should show it', () => {
    // Arrange
    const value = 1500.55;

    // Act
    const wrapper = shallow(CurrencyValue, {
      propsData: { value },
    });

    // Assert
    expect(wrapper.find('span').text()).toMatch('$1,500.55');
  });

  it('when get other value should show changed value', () => {
    // Arrange
    const value = 1000;

    // Act
    const wrapper = shallow(CurrencyValue, {
      propsData: { value },
    });
    wrapper.setProps({ value: 1100.55 });

    // Assert
    expect(wrapper.find('span').text()).toMatch('$1,100.55');
  });

  it('when get value bigger than previouse should remove class decreased', () => {
    // Arrange
    const value = 100;

    // Act
    const wrapper = shallow(CurrencyValue, {
      propsData: { value },
    });
    wrapper.setProps({ value: 110 });

    // Assert
    expect(wrapper.contains('span.decreased')).toBeFalsy();
  });

  it('when get value smaller than previouse should add class decreased', () => {
    // Arrange
    const value = 100;

    // Act
    const wrapper = shallow(CurrencyValue, {
      propsData: { value },
    });
    wrapper.setProps({ value: 90 });

    // Assert
    expect(wrapper.contains('span.decreased')).toBeTruthy();
  });
});
