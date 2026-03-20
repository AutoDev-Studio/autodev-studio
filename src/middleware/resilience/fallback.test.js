const fallback = require('./fallback');

describe('fallback', () => {
  let mockLogger;

  beforeEach(() => {
    mockLogger = require('../observability/logger');
    jest.spyOn(mockLogger, 'warn').mockImplementation(() => {});
    jest.spyOn(mockLogger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should execute primary function if it succeeds', async () => {
    const primary = jest.fn().mockResolvedValue('primary');
    const fb = jest.fn().mockResolvedValue('fallback');
    const wrapped = fallback(primary, fb);
    const result = await wrapped('arg');
    expect(result).toBe('primary');
    expect(primary).toHaveBeenCalledWith('arg');
    expect(fb).not.toHaveBeenCalled();
  });

  test('should execute fallback if primary fails', async () => {
    const primary = jest.fn().mockRejectedValue(new Error('primary fail'));
    const fb = jest.fn().mockResolvedValue('fallback');
    const wrapped = fallback(primary, fb);
    const result = await wrapped('arg');
    expect(result).toBe('fallback');
    expect(primary).toHaveBeenCalledWith('arg');
    expect(fb).toHaveBeenCalledWith('arg');
    expect(mockLogger.warn).toHaveBeenCalled();
  });

  test('should throw fallback error if both fail', async () => {
    const primary = jest.fn().mockRejectedValue(new Error('primary fail'));
    const fb = jest.fn().mockRejectedValue(new Error('fallback fail'));
    const wrapped = fallback(primary, fb);
    await expect(wrapped('arg')).rejects.toThrow('fallback fail');
    expect(mockLogger.error).toHaveBeenCalled();
  });
});