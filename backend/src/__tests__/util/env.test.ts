process.env.NODE_ENV = 'prod';
import { prod } from 'src/util/env';

describe('env testing suit', () => {
  it('prod should return true boolean value', async () => {
    expect(prod).toEqual(true);
  });
});
