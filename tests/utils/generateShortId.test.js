import generateShortId from '../../utils/generateShortId.js';

describe('generateShortId', () => {
  it('should generate a string', () => {
    const id = generateShortId();
    expect(typeof id).toBe('string');
  });

  it('should generate unique IDs', () => {
    const id1 = generateShortId();
    const id2 = generateShortId();
    expect(id1).not.toBe(id2);
  });

  it('should generate IDs with default length', () => {
    const id = generateShortId();
    expect(id.length).toBe(8);
  });

  it('should generate IDs with custom length', () => {
    const id = generateShortId(12);
    expect(id.length).toBe(12);
  });

  it('should generate alphanumeric IDs', () => {
    const id = generateShortId();
    expect(id).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('should handle multiple calls without errors', () => {
    const ids = [];
    for (let i = 0; i < 100; i++) {
      ids.push(generateShortId());
    }
    
    // Check all are unique
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(100);
  });
}); 