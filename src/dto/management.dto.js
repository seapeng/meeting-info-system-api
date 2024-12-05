class createManagementDTO {
  title;
  fullName;
  position;
  gender;
  orderNumber;
  constructor(managementDetail) {
    this.title = managementDetail.title;
    this.fullName = managementDetail.fullName;
    this.position = managementDetail.position;
    this.gender = managementDetail.gender;
    this.orderNumber = managementDetail.orderNumber;
  }
}
class updateManagementDTO {
  title;
  fullName;
  position;
  gender;
  orderNumber;
  constructor(managementDetail) {
    this.title = managementDetail.title;
    this.fullName = managementDetail.fullName;
    this.position = managementDetail.position;
    this.gender = managementDetail.gender;
    this.orderNumber = managementDetail.orderNumber;
  }
}

module.exports = { createManagementDTO, updateManagementDTO };
