it("Simulate Flaky test", () => {
  const num = Math.random();
  expect(num).toBeLessThan(0.9);
});
