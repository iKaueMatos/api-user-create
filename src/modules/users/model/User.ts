import { v4 as uuidV4 } from 'uuid';
class User {
  id_user: string;

  name: string;

  admin: boolean;

  email: string;

  created_at: Date;

  updated_at: Date;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.id_user = uuidV4();
    this.created_at = new Date();
}
}

export { User };

