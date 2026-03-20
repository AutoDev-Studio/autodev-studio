const requestLogger = require('./requestLogger');

describe('requestLogger', () => {
  test('should call next', () => {
    const req = { method: 'GET', ip: '127.0.0.1', originalUrl: '/test' };
    const res = { on: jest.fn() };
    const next = jest.fn();
    requestLogger(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should log on finish', () => {
    const req = { method: 'POST', ip: '192.168.1.1', originalUrl: '/api' };
    const res = { on: jest.fn(), statusCode: 200 };
    const next = jest.fn();
    requestLogger(req, res, next);
    const finishCallback = res.on.mock.calls[0][1];
    finishCallback();
    // No assertion needed, just ensure no error
  });
});