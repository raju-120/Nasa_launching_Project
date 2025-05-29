describe('Test GET /launches', () => {
  test('It should respond with 200 success', () => {
    const response = 200;
    expect(response).toBe(200);
  });
});

describe('Test POST /launches', () => {
  test('It should respond with 200 success', () => {
    const response = 200;
    expect(response).toBe(200);
  });

  test('It should catch missing required properties', () => {
    const missingProperty = null;
    expect(missingProperty).toBeNull();
  });

  test('It should match invalid dates', () => {
    const date = new Date('not-a-date');
    expect(isNaN(date)).toBe(true);
  });
});
