const requestLogger = require('./requestLogger');
const logger = require('./logger');

jest.mock('./logger', () => ({
  info: jest.fn()
}));

describe('requestLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call next', () => {
    const req = { method: 'GET', ip: '127.0.0.1', originalUrl: '/test' };
    const res = { on: jest.fn() };
    const next = jest.fn();
    requestLogger(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should log on finish with correct parameters', () => {
    const req = { method: 'POST', ip: '192.168.1.1', originalUrl: '/api' };
    const res = { on: jest.fn(), statusCode: 201 };
    const next = jest.fn();
    requestLogger(req, res, next);
    
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    
    const finishCallback = res.on.mock.calls[0][1];
    finishCallback();
    
    expect(logger.info).toHaveBeenCalledWith('request', {
      method: 'POST',
      path: '/api',
      statusCode: 201,
      durationMs: expect.any(Number),
      ip: '192.168.1.1'
    });
  });

  test('should log with correct path when originalUrl is present', () => {
    const req = { method: 'GET', ip: '10.0.0.1', originalUrl: '/users/123', url: '/users' };
    const res = { on: jest.fn(), statusCode: 200 };
    const next = jest.fn();
    requestLogger(req, res, next);
    
    const finishCallback = res.on.mock.calls[0][1];
    finishCallback();
    
    expect(logger.info).toHaveBeenCalledWith('request', expect.objectContaining({
      path: '/users/123'
    }));
  });

  test('should log with url when originalUrl is not present', () => {
    const req = { method: 'DELETE', ip: '172.16.0.1', url: '/items/456' };
    const res = { on: jest.fn(), statusCode: 204 };
    const next = jest.fn();
    requestLogger(req, res, next);
    
    const finishCallback = res.on.mock.calls[0][1];
    finishCallback();
    
    expect(logger.info).toHaveBeenCalledWith('request', expect.objectContaining({
      path: '/items/456'
    }));
  });
});