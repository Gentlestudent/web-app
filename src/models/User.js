class User {
  constructor(user) {
    this.id = user.uid || user.id;
    this.email = user.email;
    this.isVerified = user.emailVerified || user.isVerified;
  }
}

export default User;
