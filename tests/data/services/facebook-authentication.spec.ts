import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticationError } from "@/domain/errors/authentication";
import { FacebookAuthenticationService } from "@/data/services";
import { mock, MockProxy } from "vitest-mock-extended";
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import {
  SaveFacebookAccountRepository,
  LoadUserAccountRepository,
} from "@/data/contracts/repos/user-account";
describe("FacebookAuthenticationService", () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>;
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>;
  let sut: FacebookAuthenticationService;

  const token = "any_token";
  beforeEach(() => {
    facebookApi = mock();
    facebookApi.loadUser.mockResolvedValue({
      name: "any_name",
      email: "any_fb_email",
      facebookId: "any_facebook_id",
    });
    userAccountRepo = mock();

    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo
    );
  });
  it("load call LoadFacebookUserApi with correct params", async () => {
    await sut.perform({ token });

    expect(facebookApi.loadUser).toBeCalledWith({
      token,
    });
    expect(facebookApi.loadUser).toBeCalledTimes(1);
  });
  it("should return AuthenticationError when LoadFacebookUserApi returns undefined", async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined);
    const result = await sut.perform({ token });

    expect(result).toEqual(new AuthenticationError());
  });
  it("should return AuthenticationError when LoadFacebookUserApi returns data", async () => {
    await sut.perform({ token });

    expect(userAccountRepo.load).toBeCalledWith({
      email: "any_fb_email",
    });
    expect(userAccountRepo.load).toBeCalledTimes(1);
  });

  it("should return CreateUserAccountRepo when LoadUserAccountRepo returns undefined", async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined);
    await sut.perform({ token });

    expect(userAccountRepo.saveWithFacebook).toBeCalledWith({
      name: "any_name",
      email: "any_fb_email",
      facebookId: undefined,
      id: undefined,
    });
    expect(userAccountRepo.saveWithFacebook).toBeCalledTimes(1);
  });

  it("should return UpdateUserAccountRepo when LoadUserAccountRepo returns data", async () => {
    userAccountRepo.load.mockResolvedValueOnce({
        id: "any_id",
        name: "any_name",
    });
    await sut.perform({ token });

    expect(userAccountRepo.saveWithFacebook).toBeCalledWith({
      id: "any_id",
      name: "any_name",
      facebookId: undefined,
      email: "any_fb_email",
    });
    expect(userAccountRepo.saveWithFacebook).toBeCalledTimes(1);
  });
});
