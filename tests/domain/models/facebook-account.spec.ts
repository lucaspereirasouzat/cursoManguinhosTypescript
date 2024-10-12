import { FacebookAccount } from "@/domain";
import { describe, expect, it } from "vitest";

describe("FacebookAccount", () => {
    const fbData = {
        name: "any_name",
        email: "any_email",
        facebookId: "any_fb_id",
    };
    it("should create with facebook data only", () => {
        const sut = new FacebookAccount(fbData);
        expect(sut).toEqual(fbData);
    })

    it("should update name if its empty", () => {
        const accountData = { id: "any_id" };
        const sut = new FacebookAccount(fbData, accountData);
        expect(sut).toEqual({
            id: "any_id",
            name: "any_name",
            email: "any_email",
            facebookId: "any_fb_id",
        });
    })

    it("should not update name if its not empty", () => {
        const accountData = { id: "any_id", name: "any_name" };
        const sut = new FacebookAccount(fbData, accountData);
        expect(sut).toEqual({
            id: "any_id",
            name: "any_name",
            email: "any_email",
            facebookId: "any_fb_id",
        });
    })
});