/* eslint-disable */
import Autocompete from './Autocomplete.vue';
import { shallow } from '@vue/test-utils';

describe('Autocomplete.vue', () => {
  it('render no elements', () => {
    // Arrange

    // Act
    const wrapper = shallow(Autocompete, {
      propsData: { getItems: text => Promise.resolve([]) },
    });

    // Assert
    expect(wrapper.find('.result').isVisible()).toBeFalsy();
  });

  it('render 2 elements', () => {
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

  it('check blur before choose', () => {
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

  it('check blur after choose', () => {
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

  it('render choose element', () => {
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
    expect(wrapper.find('input').element.value).toMatch('BTC');
  });
});
