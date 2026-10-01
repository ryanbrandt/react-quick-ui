import { version } from "react";
import { version as domVersion } from "react-dom";

// Guards the React 18 run (yarn test:react18): fails if the version switch
// in jest.config.js stops applying.
describe("React version under test", () => {
  const expectedMajor = process.env.REACT_VERSION ?? "19";

  it("is the expected major for react and react-dom", () => {
    expect(version.split(".")[0]).toBe(expectedMajor);
    expect(domVersion.split(".")[0]).toBe(expectedMajor);
  });
});
