/* eslint-disable no-undef */
import { shallow } from '@vue/test-utils';
import CryptoCurrencyWidget from './CryptoCurrencyWidget.vue';

describe('CryptoCurrencyWidget.vue', () => {
  it('render title', () => {
    // Arrange
    const name = 'BTC';

    // Act
    const wrapper = shallow(CryptoCurrencyWidget, {
      propsData: { name },
    });
    wrapper.setData({ isLoading: false });

    // Assert
    expect(wrapper.find('h2').text()).toMatch('BTC - USD');
  });

  it('show loading', () => {
    // Arrange
    const value = 'BTC';

    // Act
    const wrapper = shallow(CryptoCurrencyWidget, {
      propsData: { value },
    });

    // Assert
    expect(wrapper.find('div.loading').exists()).toBeTruthy();
  });

  it('hide loading', () => {
    // Arrange
    const value = 'BTC';

    // Act
    const wrapper = shallow(CryptoCurrencyWidget, {
      propsData: { value },
    });
    wrapper.setData({ isLoading: false });

    // Assert
    expect(wrapper.find('div.loading').exists()).toBeFalsy();
  });
});
