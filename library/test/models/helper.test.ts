const lib = require("../../lib/models/index");
const Model = lib.Model;

test("lastReset - Weekly_Thursday", () => {
  // This is PST 2023 July 1 (Saturday) 5:35 PM
  const currentDate = new Date(1688258091000);

  // Expected last reset is PST 2023 June 29 (Wednesday) at 5PM
  const expectedLastReset = new Date(1687996800000);

  // Function under test
  const resultLastReset = Model.lastReset(currentDate, "Weekly_Thursday");
  expect(resultLastReset.getTime()).toBe(expectedLastReset.getTime());
});

test("nextReset - Weekly_Thursday", () => {
  // This is PST 2023 July 1 (Saturday) 5:35 PM
  const currentDate = new Date(1688258091000);

  // Expected next reset is PST 2023 July 5 (Wednesday) at 5PM
  const expectedNextReset = new Date(1688601600000);

  // Function under test
  const resultNextReset = Model.nextReset(currentDate, "Weekly_Thursday");
  expect(resultNextReset.getTime()).toBe(expectedNextReset.getTime());
});
