import { hash } from "crypto";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/iuser";
import { CreateUserUsecase } from "../create-user.usecase";
import { IEncrypter } from "../../../domain/services/iencrypter";
import { ErrorMessages } from "../../../shared/messages";

jest.mock('bcrypt', () => ({
  __esModule: true,
  hash: jest.fn(() => Promise.resolve('hashed_password'))
}));

describe('CreateUserUsecase', () => {
  let mockUserRepository: IUserRepository;
  let mockEncrypter: IEncrypter;
  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      findByPhone: jest.fn(),
      save: jest.fn(),
      list: jest.fn()
    };

    mockEncrypter = {
      hash: jest.fn(),
      compare: jest.fn()
    };
  
    jest.clearAllMocks();
  });

  it('should create a user and return id', async () => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (mockUserRepository.findByPhone as jest.Mock).mockResolvedValue(null);
    (mockUserRepository.save as jest.Mock).mockResolvedValue(undefined);

    const usecase = CreateUserUsecase.create(mockUserRepository, mockEncrypter);
    
    const result = await usecase.execute({
      name: "John Test",
      email: "john.test@gmail.com",
      phone: "21992450336",
      password: "123456",
    });

    expect(result).toHaveProperty('id');
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.findByPhone).toHaveBeenCalledTimes(1);
    expect(mockEncrypter.hash).toHaveBeenCalledWith("123456");
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
  });

  it('sloud throw error if user already exist', async () => {
    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 'any-id',
      name: 'John Test',
      email: 'john.test@gmail.com', // <--
      phone: '21922335566',
      password: 'hashed_password'
    });

    const usecase = CreateUserUsecase.create(mockUserRepository, mockEncrypter);

    const result = await usecase.execute({
      name: "John Test",
      email: "john.test@gmail.com", // <--
      phone: "21992450336",
      password: "123456",
    });
    
    expect(result).toEqual({
      code: 401,
      status: false,
      message: ErrorMessages.USER_ALREADY_EXISTS
    });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockEncrypter.hash).not.toHaveBeenCalled();
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });

  it('should error if phone number already exist', async () => {
    (mockUserRepository.findByPhone as jest.Mock).mockResolvedValue({
      id: 'any-id',
      name: 'John Test',
      email: 'john.test@gmail.com',
      phone: '21922335566', // <--
      password: 'hashed_password'
    });

    const usecase = CreateUserUsecase.create(mockUserRepository, mockEncrypter);
    const result = await usecase.execute({
      name: "John Test",
      email: "john.test@gmail.com",
      phone: "21922335566", // <--
      password: "123456",
    });

    expect(result).toEqual({
      code: 401,
      status: false,
      message: ErrorMessages.USER_ALREADY_EXISTS
    });

    expect(mockUserRepository.findByPhone).toHaveBeenCalledTimes(1);
    expect(mockEncrypter.hash).not.toHaveBeenCalled();
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });

});