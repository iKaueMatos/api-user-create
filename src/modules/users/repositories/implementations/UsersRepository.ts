import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User(name, email);
    this.users.push(user);

    return user;
  }

  findById(id: string, isAdmin?: boolean): User | undefined {
    const user = this.users.find((user) => user.id_user === id);

    if (isAdmin && user && user.admin) {
      return user;
    }

    return user;
  }

  findByEmail(email: string): User | undefined {
    const userEmail = this.users.find((user) => user.email === email);
    

    return userEmail;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex((user) => user.id_user === receivedUser.id_user);

    if (userIndex === -1) {
      throw new Error("Usuario não encontrado");
    }

    this.users[userIndex].admin = true;
    this.users[userIndex].updated_at = new Date();

    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }

  listIsAdmin({ id_user }): User[] {
    const user = this.findById(id_user, true);
    
    if (user) {
      return this.users;
    }

    return [];
  }
}

export { UsersRepository };

