/* eslint-disable no-undef */
import { shallow } from '@vue/test-utils';
import CurrencyDelta from './CurrencyDelta.vue';

describe('CurrencyDelta.vue', () => {
  it('when get first value should show zero value', () => {
    // Arrange
    const value = 1500.55;

    // Act
    const wrapper = shallow(CurrencyDelta, {
      propsData: { value },
    });

    // Assert
    expect(wrapper.find('span').text()).toMatch('(0.00%)');
  });

  it('when get value bigger then previose should show positive value', () => {
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

  it('when get value smaller then previose should show negative value', () => {
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

  it('when get value bigger then previose should add decreased class', () => {
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

  it('when get value smaller then previose should remove decreased class', () => {
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
