const retry = require('./retry');

describe('retry', () => {
  let mockLogger;

  beforeEach(() => {
    mockLogger = require('../observability/logger');
    jest.spyOn(mockLogger, 'warn').mockImplementation(() => {});
    jest.spyOn(mockLogger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return result on first success', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const result = await retry(fn, { maxAttempts: 3 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should retry on failure and succeed', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');
    const result = await retry(fn, { maxAttempts: 3, baseDelay: 10 });
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(mockLogger.warn).toHaveBeenCalled();
  });

  test('should throw after max attempts', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('fail'));
    await expect(retry(fn, { maxAttempts: 2, baseDelay: 10 })).rejects.toThrow('fail');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(mockLogger.error).toHaveBeenCalled();
  });
});