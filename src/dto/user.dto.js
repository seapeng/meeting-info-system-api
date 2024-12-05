class createUserDTO {
  firstName;
  lastName;
  username;
  position;
  role;
  avatar;
  password;
  isEnable;
  orderNumber;
  constructor(userDetail) {
    this.firstName = userDetail.firstName;
    this.lastName = userDetail.lastName;
    this.username = userDetail.username;
    this.position = userDetail.position;
    this.role = userDetail.role;
    this.avatar = userDetail.avatar;
    this.password = userDetail.password;
    this.isEnable = userDetail.isEnable;
    this.orderNumber = userDetail.orderNumber;
  }
}

class updateUserDTO {
  position;
  role;
  isEnable;
  orderNumber;
  constructor(userDetail) {
    this.position = userDetail.position;
    this.roleId = userDetail.role;
    this.isEnable = userDetail.isEnable;
    this.orderNumber = userDetail.orderNumber;
  }
}

class chanagePasswordDTO {
  password;
  constructor(userDetail) {
    this.password = userDetail.password;
  }
}

class updateProfileDTO {
  firstName;
  lastName;
  username;
  avatar;
  constructor(userDetail) {
    this.firstName = userDetail.firstName;
    this.lastName = userDetail.lastName;
    this.username = userDetail.username;
    this.avatar = userDetail.avatar;
  }
}

module.exports = {
  createUserDTO,
  updateUserDTO,
  chanagePasswordDTO,
  updateProfileDTO,
};
