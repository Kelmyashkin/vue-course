/* eslint-disable */
import Autocompete from './Autocomplete.vue';
import { shallow } from '@vue/test-utils';

describe('Autocomplete.vue', () => {
  it('render no elements', () => {
    // Arrange
    const promise = value => Promise.resolve([value, 'BTC', 'ETH']);

    // Act
    const wrapper = shallow(Autocompete, {
      value: '',
      getItems: promise,
    });

    // Assert
    expect(wrapper.findAll('p')).toHaveLength(0);
  });

  // it('renders after input', () => {
  //   // Arrange
  //   const promise = value => Promise.resolve(['BTC', 'ETH']);

  //   // Act
  //   const wrapper = shallow(Autocompete, {
  //     propsData: {
  //       value: '',
  //       getItems: promise,
  //     },
  //   });
  //   wrapper.find('input').trigger('input');

  //   // Assert
  //   expect(wrapper.html()).toHaveLength(3);
  // });
});
