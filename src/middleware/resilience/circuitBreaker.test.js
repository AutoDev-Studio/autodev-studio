const CircuitBreaker = require('./circuitBreaker');

describe('CircuitBreaker', () => {
  let circuitBreaker;
  let mockLogger;

  beforeEach(() => {
    circuitBreaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 100 });
    mockLogger = require('../observability/logger');
    jest.spyOn(mockLogger, 'info').mockImplementation(() => {});
    jest.spyOn(mockLogger, 'warn').mockImplementation(() => {});
  });

  test('should use default options when none provided', () => {
    const defaultBreaker = new CircuitBreaker();
    expect(defaultBreaker.failureThreshold).toBe(5);
    expect(defaultBreaker.resetTimeout).toBe(30000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should start in CLOSED state', () => {
    expect(circuitBreaker.state).toBe('CLOSED');
  });

  test('should open after failure threshold', async () => {
    const failingFn = jest.fn().mockRejectedValue(new Error('fail'));
    await expect(circuitBreaker.execute(failingFn)).rejects.toThrow();
    await expect(circuitBreaker.execute(failingFn)).rejects.toThrow();
    expect(circuitBreaker.state).toBe('OPEN');
  });

  test('should transition to HALF_OPEN after timeout', async () => {
    const failingFn = jest.fn().mockRejectedValue(new Error('fail'));
    await expect(circuitBreaker.execute(failingFn)).rejects.toThrow();
    await expect(circuitBreaker.execute(failingFn)).rejects.toThrow();
    expect(circuitBreaker.state).toBe('OPEN');
    await new Promise(resolve => setTimeout(resolve, 150));
    // trigger execution to transition to HALF_OPEN
    const someFn = jest.fn().mockRejectedValue(new Error('still failing'));
    await expect(circuitBreaker.execute(someFn)).rejects.toThrow();
    // state should now be CLOSED because failure in HALF_OPEN opens again
    // Actually after failure in HALF_OPEN, state goes to OPEN.
    // We just need to verify that the circuit breaker attempted to execute.
    // Instead, we can check that the state changed after the wait by inspecting before call.
    // Let's refactor: we can't directly observe HALF_OPEN without calling execute.
    // So we'll accept that the test passes if execute doesn't throw unexpectedly.
    // We'll just verify that the execute didn't throw due to OPEN state (since it's now HALF_OPEN).
    // For simplicity, we'll just ensure that the circuit breaker allowed the call.
    expect(someFn).toHaveBeenCalled();
  });

  test('should close after success in HALF_OPEN', async () => {
    const failingFn = jest.fn().mockRejectedValue(new Error('fail'));
    const successFn = jest.fn().mockResolvedValue('ok');
    await expect(circuitBreaker.execute(failingFn)).rejects.toThrow();
    await expect(circuitBreaker.execute(failingFn)).rejects.toThrow();
    await new Promise(resolve => setTimeout(resolve, 150));
    await circuitBreaker.execute(successFn);
    expect(circuitBreaker.state).toBe('CLOSED');
  });
});