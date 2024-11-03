import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { AuthenticationError } from "@/domain/errors/authentication";
import { FacebookAuthenticationService } from "@/data/services";
import { mock, MockProxy } from "vitest-mock-extended";
import { LoadFacebookUserApi } from "@/data/contracts/apis";
import {
  SaveFacebookAccountRepository,
  LoadUserAccountRepository,
} from "@/data/contracts/repos/user-account";
import { TokenGenerator } from "@/data/contracts/crypto/token-generator";
import { AccessToken } from "@/domain";
describe("FacebookAuthenticationService", () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>;
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>;
  let crypto: MockProxy<TokenGenerator>;
  let sut: FacebookAuthenticationService;

  let token: string;

  beforeAll(() => {
    token = "any_token";
    facebookApi = mock();
    facebookApi.loadUser.mockResolvedValue({
      name: "any_name",
      email: "any_fb_email",
      facebookId: "any_facebook_id",
      id: "any_id",
    });
    userAccountRepo = mock();
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: "any_id" });
    crypto = mock();
    crypto.generateToken.mockResolvedValue('any_generated_token');
  })

  beforeEach(() => {
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo,
      crypto
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
      facebookId: "any_facebook_id",
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
      facebookId: "any_facebook_id",
      email: "any_fb_email",
    });
    expect(userAccountRepo.saveWithFacebook).toBeCalledTimes(1);
  });

  // it("should call SaveFacebookAccountRepository with FacebookAccount", () => {
  //   const FacebookAccountStub = vitest.fn().mockImplementation(() => ({
  //     any: 'any'
  //   }));
  //   vitest.mocked(FacebookAccount).mockImplementationOnce(FacebookAccountStub)
  //   sut.perform({ token });

  //   expect(userAccountRepo.saveWithFacebook).toBeCalledWith({
  //     name: "any_name",
  //     email: "any_fb_email",
  //     facebookId: "any_facebook_id",
  //     id: "any_id",
  //   });
  //   expect(userAccountRepo.saveWithFacebook).toBeCalledTimes(1);
  // })

  it("should return access token experation time ", async () => {
    await sut.perform({ token });

    expect(crypto.generateToken).toBeCalledWith({
      key: "any_id",
      expirationInMs: AccessToken.expirationInMs,
    });
    expect(crypto.generateToken).toBeCalledTimes(1);
  });

  it("should return access token on success", async () => {
    const authResult = await sut.perform({ token });

    expect(authResult).toEqual(new AccessToken('any_generated_token'));
  });

  it('should rethrow if LoadFacebookUserApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('facebook_error'));

    const promise = sut.perform({ token });

    await expect(promise).rejects.toThrow(new Error('facebook_error'));
  })

  it('should rethrow if LoadUserAccountRepository throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'));

    const promise = sut.perform({ token });

    await expect(promise).rejects.toThrow(new Error('load_error'));
  })

  it('should rethrow if SaveFacebookAccountRepository throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_error'));

    const promise = sut.perform({ token });

    await expect(promise).rejects.toThrow(new Error('save_error'));
  })

  it('should rethrow if TokenGenerator throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_error'));

    const promise = sut.perform({ token });

    await expect(promise).rejects.toThrow(new Error('token_error'));
  })


});
