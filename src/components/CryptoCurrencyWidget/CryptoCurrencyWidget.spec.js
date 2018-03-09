/* eslint-disable no-undef */
import { shallow } from '@vue/test-utils';
import CryptoCurrencyWidget from './CryptoCurrencyWidget.vue';

describe('CryptoCurrencyWidget.vue', () => {
  it('when send name should render title with name', () => {
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

  it('when component is mounted should show loading', () => {
    // Arrange
    const value = 'BTC';

    // Act
    const wrapper = shallow(CryptoCurrencyWidget, {
      propsData: { value },
    });

    // Assert
    expect(wrapper.find('div.loading').exists()).toBeTruthy();
  });

  it('when isLoading false should remove loading spinner', () => {
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
