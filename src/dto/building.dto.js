class createBuildingDTO {
  name;
  orderNumber;
  constructor(buildingDetail) {
    this.name = buildingDetail.name;
    this.orderNumber = buildingDetail.orderNumber;
  }
}

class updateBuildingDTO {
  name;
  orderNumber;
  constructor(buildingDetail) {
    this.name = buildingDetail.name;
    this.orderNumber = buildingDetail.orderNumber;
  }
}

module.exports = { createBuildingDTO, updateBuildingDTO };
