// Utility tests to demonstrate testing infrastructure

describe('Testing Infrastructure', () => {
  it('should support basic JavaScript functionality', () => {
    expect(1 + 1).toBe(2);
  });

  it('should support TypeScript types', () => {
    const message: string = 'Hello, Big Red Button!';
    expect(typeof message).toBe('string');
    expect(message).toContain('Big Red Button');
  });

  it('should support async/await', async () => {
    const promise = Promise.resolve('test');
    const result = await promise;
    expect(result).toBe('test');
  });

  it('should support array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers.includes(3)).toBe(true);
    expect(numbers.filter(n => n > 3)).toEqual([4, 5]);
  });

  it('should support object operations', () => {
    const config = {
      appName: 'Big Red Button',
      version: '1.0.0',
      features: ['countdown', 'explosion', 'animation']
    };
    
    expect(config.appName).toBe('Big Red Button');
    expect(config.features).toContain('countdown');
    expect(Object.keys(config)).toHaveLength(3);
  });
});
