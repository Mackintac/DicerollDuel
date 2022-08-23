"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
const util_1 = require("src/util/util");
describe('util integration testing suite', () => {
    it('function should return a json object with error info', () => {
        const duckERROR = {
            statusCode: 500,
            message: 'duck test fail',
        };
        expect((0, util_1.InternalError)(duckERROR)).toStrictEqual({
            json: {
                status: 'failure',
                msg: 'duck test fail',
            },
            code: 500,
        });
    });
    it('should return timestamp string based on current time', () => {
        expect(typeof (0, util_1.time_stamp)()).toBe('string');
    });
});
