import { expect } from "chai";
import sinon from "sinon";

describe("front-end", () => {
    it("should say bar", () => {
        expect("bar").to.equal("bar");
    });
    it("should say bar bar", () => {
        expect("fail").to.equal("bar bar");
    });
});
