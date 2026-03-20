const logger = require('./logger');

describe('logger', () => {
  test('should have info method', () => {
    expect(typeof logger.info).toBe('function');
  });

  test('should log with correct format', () => {
    const spy = jest.spyOn(logger.transports[0], 'log');
    logger.info('test message', { foo: 'bar' });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});