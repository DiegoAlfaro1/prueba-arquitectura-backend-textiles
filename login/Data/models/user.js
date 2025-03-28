const bcrypt = require("bcryptjs");

export class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = hashPassword(password);
  }

  static async hashPassword(password) {
    return (hashedPassword = await bcrypt.hash(password, 10));
  }
}
