import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/iuser";
import { IEncrypter } from "../../../domain/services/iencrypter";
import { ITokenService } from "../../../domain/services/itoken-service";
import { ITokenStore } from "../../../domain/services/itoken-store";
import { ErrorMessages, SuccessMessages } from "../../../shared/messages";
import { AutenticateUserUsecase } from "../autenticate-user.usecase";

describe("AutenticateUsecase", ()=>{

  const user = User.create("John Doe", "john.doe@test.com", "hashed_password");
  let mockUserRepository: IUserRepository;
  let mockTokenService: ITokenService;
  let mockTokenStore: ITokenStore;
  let mockEncrypter: IEncrypter;

  beforeEach(()=>{
    
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      list: jest.fn(),
    }

    mockTokenService = {
      sign: jest.fn(),
    }

    mockTokenStore = {
      set: jest.fn()
    }

    mockEncrypter = {
      hash: jest.fn(),
      compare: jest.fn()
    }

  });

  it("should return error if user is not found", async () => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (mockEncrypter.compare as jest.Mock).mockResolvedValue(false);

    const usecase = AutenticateUserUsecase.create(
      mockUserRepository,
      mockTokenService,
      mockTokenStore,
      mockEncrypter
    );

    const result = await usecase.execute({
      email: user.email,
      password: "wrong-password"
    });

    expect(result).toEqual({
      status: false,
      message: ErrorMessages.INVALID_PASSWORD
    });
  });

  it("should return token ans user on success", async () => {
    const fakeToken = "mocked.jwt.token";

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (mockEncrypter.compare as jest.Mock).mockResolvedValue(true);
    (mockTokenService.sign as jest.Mock).mockReturnValue(fakeToken);
    (mockTokenStore.set as jest.Mock).mockResolvedValue(undefined);

    const usecase = AutenticateUserUsecase.create(
      mockUserRepository,
      mockTokenService,
      mockTokenStore,
      mockEncrypter
    );

    const result = await usecase.execute({
      email: user.email,
      password: "correct-password",
    });

    expect(result).toEqual({
      status: true,
      message: SuccessMessages.LOGIN_SUCCESSFULLY,
      token: fakeToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    expect(mockTokenStore.set).toHaveBeenCalledWith(user.id, fakeToken);

  });


});