/* eslint-disable */
import Autocompete from './Autocomplete.vue';
import { shallow } from '@vue/test-utils';

describe('Autocomplete.vue', () => {
  it('when component starts should not show list of options', () => {
    // Arrange

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: { getItems: text => Promise.resolve([]) },
    });

    // Assert
    expect(wrapper.find('.result').isVisible()).toBeFalsy();
  });

  it('when there are 2 elements in list of options should render 2 elements', () => {
    // Arrange
    const list = ['BTC', 'ETH'];

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: { getItems: text => Promise.resolve([]) },
    });
    wrapper.setData({ result: list });

    // Assert
    expect(wrapper.findAll('.result div')).toHaveLength(2);
  });

  it('when input lost focus should clear input value', () => {
    // Arrange

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: {
        value: '',
        getItems: value => Promise.resolve([value]),
      },
    });
    wrapper.setData({ currentText: 'bt' });
    wrapper.find('input').trigger('blur');

    // Assert
    expect(wrapper.find('input').element.value).toMatch('');
  });

  it('after element choosed when lost focus should not clear input value', () => {
    // Arrange

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: {
        value: '',
        getItems: value => Promise.resolve([value]),
      },
    });
    wrapper.setData({ currentText: 'bt', isChoosed: true });
    wrapper.find('input').trigger('blur');

    // Assert
    expect(wrapper.find('input').element.value).toMatch('bt');
  });

  it('when choose option should hide list of options', () => {
    // Arrange
    const list = ['BTC', 'ETH'];

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: { getItems: text => Promise.resolve([]) },
    });
    wrapper.setData({ result: list });
    wrapper.find('.result div').trigger('click');

    // Assert
    expect(wrapper.findAll('.result div')).toHaveLength(0);
  });

  it('when choose option should set value to input', () => {
    // Arrange
    const list = ['BTC', 'ETH'];

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: { getItems: text => Promise.resolve([]) },
    });
    wrapper.setData({ result: list });
    wrapper.find('.result div').trigger('click');

    // Assert
    expect(wrapper.find('input').element.value).toMatch('BTC');
  });
});
