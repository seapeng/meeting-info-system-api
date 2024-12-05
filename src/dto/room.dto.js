class createRoomDTO {
  name;
  building;
  floor;
  orderNumber;
  constructor(roomDetail) {
    this.name = roomDetail.name;
    this.building = roomDetail.building;
    this.floor = roomDetail.floor;
    this.orderNumber = roomDetail.orderNumber;
  }
}
class updateRoomDTO {
  name;
  building;
  floor;
  orderNumber;
  constructor(roomDetail) {
    this.name = roomDetail.name;
    this.building = roomDetail.building;
    this.floor = roomDetail.floor;
    this.orderNumber = roomDetail.orderNumber;
  }
}

module.exports = { createRoomDTO, updateRoomDTO };
