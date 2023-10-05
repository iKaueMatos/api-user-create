import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  user_id: string;
}

const usersRepository = UsersRepository.getInstance();
class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = usersRepository.listIsAdmin({ id_user: user_id });

    if(users.length === 0) {
      throw new Error("Não existe usuarios com permissão para ser admin");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
