/* eslint-disable no-undef */
import formatValueMixin from './formatValueMixin';

describe('formatValueMixin', () => {
  it('mixin has format method', () => {
    // Assert
    expect(formatValueMixin.methods.format).not.toBeNull();
  });

  it('format number 1234.56', () => {
    // Arrange
    const value = 1234.56;

    // Act
    const formatted = formatValueMixin.methods.format(value);

    // Assert
    expect(formatted).toMatch('1,234.56');
  });

  it('format number 1234', () => {
    // Arrange
    const value = 1234;

    // Act
    const formatted = formatValueMixin.methods.format(value);

    // Assert
    expect(formatted).toMatch('1,234.00');
  });

  it('format number 0.56', () => {
    // Arrange
    const value = 0.56;

    // Act
    const formatted = formatValueMixin.methods.format(value);

    // Assert
    expect(formatted).toMatch('0.56');
  });
});
