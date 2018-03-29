import { expect } from "chai";

describe("front-end", () => {
    it("should say bar", () => {
        expect("bar").to.equal("bar");
    });
    it("should say bar bar", () => {
        expect("fail").to.equal("bar bar");
    });
});
