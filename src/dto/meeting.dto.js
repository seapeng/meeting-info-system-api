class createMeetingDTO {
  title;
  management;
  room;
  date;
  startTime;
  endTime;
  status;
  constructor(meetingDetail) {
    this.title = meetingDetail.title;
    this.management = meetingDetail.management;
    this.room = meetingDetail.room;
    this.date = meetingDetail.date;
    this.startTime = meetingDetail.startTime;
    this.endTime = meetingDetail.endTime;
    this.status = meetingDetail.status;
  }
}
class updateMeetingDTO {
  title;
  management;
  room;
  date;
  startTime;
  endTime;
  status;
  constructor(meetingDetail) {
    this.title = meetingDetail.title;
    this.management = meetingDetail.management;
    this.room = meetingDetail.room;
    this.date = meetingDetail.date;
    this.startTime = meetingDetail.startTime;
    this.endTime = meetingDetail.endTime;
    this.status = meetingDetail.status;
  }
}
class historyMeetingDTO {
  title;
  management;
  room;
  floor;
  building;
  date;
  startTime;
  endTime;
  constructor(meetingDetail) {
    this.title = meetingDetail.title;
    this.management = meetingDetail.management;
    this.room = meetingDetail.room;
    this.floor = meetingDetail.floor;
    this.building = meetingDetail.building;
    this.date = meetingDetail.date;
    this.startTime = meetingDetail.startTime;
    this.endTime = meetingDetail.endTime;
  }
}

module.exports = { createMeetingDTO, updateMeetingDTO, historyMeetingDTO };
