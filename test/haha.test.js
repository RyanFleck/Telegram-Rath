const Haha = require('../src/utils/haha');

test('add two and two, should make four', () => {
    expect(Haha.options().includes(Haha.haha())).toBe(true);
    expect(Haha.options().includes(Haha.haha())).toBe(true);
    expect(Haha.options().includes(Haha.haha())).toBe(true);
    expect(Haha.options().includes(Haha.haha())).toBe(true);
    expect(Haha.options().includes(Haha.haha())).toBe(true);
});
