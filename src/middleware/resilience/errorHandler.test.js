const errorHandler = require('./errorHandler');

describe('errorHandler', () => {
  let mockReq, mockRes, mockNext, mockLogger;

  beforeEach(() => {
    mockReq = { originalUrl: '/test', method: 'GET' };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    mockLogger = require('../observability/logger');
    jest.spyOn(mockLogger, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should handle error with default values', () => {
    const err = new Error('Something broke');
    errorHandler(err, mockReq, mockRes, mockNext);
    expect(mockLogger.error).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something broke',
        type: 'server'
      }
    });
  });

  test('should classify client errors', () => {
    const err = { status: 400, message: 'Bad request', code: 'BAD_REQUEST' };
    errorHandler(err, mockReq, mockRes, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        code: 'BAD_REQUEST',
        message: 'Bad request',
        type: 'client'
      }
    });
  });
});