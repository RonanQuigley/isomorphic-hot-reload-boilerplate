import { expect } from "chai";
describe("foo", () => {
    it("should say jar jar", () => {
        expect("jar jar").to.equal("jar jar");
    });
    it("should say binks", () => {
        expect("duck").to.equal("binks");
    });
});
