/* eslint-disable no-undef */
import { shallow } from '@vue/test-utils';
import CurrencyValue from './CurrencyValue.vue';

describe('CurrencyValue.vue', () => {
  it('render first value', () => {
    // Arrange
    const value = 1500.55;

    // Act
    const wrapper = shallow(CurrencyValue, {
      propsData: { value },
    });

    // Assert
    expect(wrapper.find('span').text()).toMatch('$1,500.55');
  });

  it('render changed positive value', () => {
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

  it('render changed negative value', () => {
    // Arrange
    const value = 1000;

    // Act
    const wrapper = shallow(CurrencyValue, {
      propsData: { value },
    });
    wrapper.setProps({ value: 900.55 });

    // Assert
    expect(wrapper.find('span').text()).toMatch('$900.55');
  });

  it('render changed positive color', () => {
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

  it('render changed negative color', () => {
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
