import { expect } from "chai";
import sinon from "sinon";

describe("foo", () => {
    it("should say foo", () => {
        expect("foo").to.equal("foo");
    });
    it("should say foo foo", () => {
        expect("fail").to.equal("foo foo");
    });
});
