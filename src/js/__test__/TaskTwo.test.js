import NumberTwo from '../modules/NumberTwo';

test('test new NumberTwo element', () => {
  const expected = 'test';
  const received = new NumberTwo(expected);

  expect(received.element).toEqual(expected);
});
