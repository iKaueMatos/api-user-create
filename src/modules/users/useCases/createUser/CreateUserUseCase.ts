import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  name: string;
  email: string;
}

const userRepository = UsersRepository.getInstance();

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const usersRepositoryEmail = this.usersRepository.findByEmail(email);
    if (!usersRepositoryEmail) {
      return userRepository.create({name, email});
    }

    throw new Error("Email invalido. Já existente");
  }
}

export { CreateUserUseCase };

