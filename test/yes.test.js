const Yes = require('../src/utils/yes');

test('add two and two, should make four', () => {
    expect(Yes.options().includes(Yes.yes())).toBe(true);
    expect(Yes.options().includes(Yes.yes())).toBe(true);
    expect(Yes.options().includes(Yes.yes())).toBe(true);
    expect(Yes.options().includes(Yes.yes())).toBe(true);
    expect(Yes.options().includes(Yes.yes())).toBe(true);
});
