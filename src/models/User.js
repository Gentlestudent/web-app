class User {
  constructor(user) {
    this.id = user.uid;
    this.email = user.email;
    this.isVerified = user.emailVerified;
  }
}

export default User;
