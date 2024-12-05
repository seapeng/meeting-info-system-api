class signInDTO {
  username;
  password;
  constructor(signInDetail) {
    this.username = signInDetail.username;
    this.password = signInDetail.password;
  }
}

module.exports = {signInDTO}
