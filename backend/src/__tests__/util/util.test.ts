process.env.NODE_ENV = 'test';
import { InternalError, time_stamp } from 'src/util/util';

describe('util unit testing suite', () => {
  it('function should return a json object with error info', () => {
    const duckERROR = {
      statusCode: 500,
      message: 'duck test fail',
    };

    expect(InternalError(duckERROR)).toStrictEqual({
      json: {
        status: 'failure',
        // msg: (<Error>duckERROR).message,
        msg: 'duck test fail',
      },
      code: 500,
    });
  });

  it('should return timestamp string based on current time', () => {
    expect(typeof time_stamp()).toBe('string');
  });
});
