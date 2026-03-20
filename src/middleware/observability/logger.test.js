const logger = require('./logger');

describe('logger', () => {
  test('should have info method', () => {
    expect(typeof logger.info).toBe('function');
  });

  test('should have error method', () => {
    expect(typeof logger.error).toBe('function');
  });

  test('should have warn method', () => {
    expect(typeof logger.warn).toBe('function');
  });

  test('should have debug method', () => {
    expect(typeof logger.debug).toBe('function');
  });

  test('should log with correct format', () => {
    const spy = jest.spyOn(logger.transports[0], 'log');
    logger.info('test message', { foo: 'bar' });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('should include timestamp in log output', () => {
    const spy = jest.spyOn(logger.transports[0], 'log');
    logger.info('timestamp test');
    expect(spy).toHaveBeenCalled();
    const logEntry = spy.mock.calls[0][0];
    expect(logEntry).toHaveProperty('timestamp');
    spy.mockRestore();
  });

  test('should include level in log output', () => {
    const spy = jest.spyOn(logger.transports[0], 'log');
    logger.info('level test');
    expect(spy).toHaveBeenCalled();
    const logEntry = spy.mock.calls[0][0];
    expect(logEntry).toHaveProperty('level', 'info');
    spy.mockRestore();
  });

  test('should include defaultMeta service', () => {
    const spy = jest.spyOn(logger.transports[0], 'log');
    logger.info('service test');
    expect(spy).toHaveBeenCalled();
    const logEntry = spy.mock.calls[0][0];
    expect(logEntry).toHaveProperty('service', 'api');
    spy.mockRestore();
  });
});