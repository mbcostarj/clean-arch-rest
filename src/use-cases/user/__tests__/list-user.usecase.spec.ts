import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/iuser";
import { ListUserUsecase } from "../list-user.usecase";

describe('ListUserUsecase', () => {
  let mockUserRepository: IUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      list: jest.fn()
    };

    jest.clearAllMocks();
  });

  it('shold list users and return them as DTOs', async () => {
    //Arrange
    const mockUsers: User[] = [
      User.create("John Doe", "john.doe@test.com", "pass123"),
      User.create("Blue Tom", "bluetom@test.com", "pass321")
    ];

    (mockUserRepository.list as jest.Mock).mockResolvedValue(mockUsers);

    const usecase = ListUserUsecase.create(mockUserRepository);

    //Act
    const result = await usecase.execute();

    //Assert
    expect(result).toEqual({
      users: [
        {id: mockUsers[0].id, name: "John Doe", email: "john.doe@test.com"},
        {id: mockUsers[1].id, name: "Blue Tom", email: "bluetom@test.com"}
      ]
    });

    expect(mockUserRepository.list).toHaveBeenCalledTimes(1);

  });

});