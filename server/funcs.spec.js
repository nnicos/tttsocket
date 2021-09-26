const { generateText, validateInput } = require('./funcs');

test('should output name and age', () => {
    const text = generateText('Nico', 29);
    expect(text).toBe('Nico (29 years old)')
    expect(text).toBeDefined();
    expect(text).not.toBeNull();
});

//validateInput
test('should return true', () => {
    const text = "im Text";
    expect(validateInput(text)).toBeDefined();
    expect(validateInput(text)).toBe(true);
    expect(validateInput(text)).not.toBeNull();
});
test('should return false', () => {
    const text = 43;
    expect(validateInput(text)).toBe(false);
});

