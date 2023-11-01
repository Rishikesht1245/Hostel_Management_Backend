import { BlockRepo } from "../repositories/block";
import { IBlock, IRoom, TotalRoomOccupancy } from "../interfaces/block";
import ErrorResponses from "../errors/ErrorResponse";
import { roomCreator } from "../utils/roomCreator";
import { ObjectId, Types } from "mongoose";

export class BlockService extends BlockRepo {
  // get all blocks
  async allBlocks(): Promise<IBlock[] | null> {
    return await this.getAll();
  }

  //   create new block
  async createBlock(name: string, code: string, numberOfRooms: number) {
    // only capital letters of digits
    if (!/^[A-Z]$/.test(code))
      throw ErrorResponses.customError("Invalid Block code");
    // function to create rooms return room code and number
    const roomsArray = roomCreator(code, numberOfRooms);
    const blockData = {
      name,
      code,
      occupancy: 0,
      rooms: roomsArray as IRoom[],
    };
    return await this.createNew(blockData as IBlock);
  }

  // Delete a block
  async deleteBlock(_id: string): Promise<IBlock | null> {
    return await this.deleteBlockById(_id);
  }

  // Block details By Id
  async blockDetailsById(_id: string): Promise<IBlock | null> {
    const blockDetails = await this.findOneAndPopulate(
      { _id },
      { path: "rooms.student", select: "name email" }
    );
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  //block Details by Name
  async blockDetailsByName(blockName: string): Promise<IBlock | null> {
    const blockDetails = await this.findOneAndPopulate(
      { code: blockName[0] },
      { path: "rooms.student", select: "name email" }
    );
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  //  Block details by room code
  async blockDetailsByRoomCode(roomCode: string): Promise<IBlock | null> {
    if (!/^[A-Z]\d{2}/g.test(roomCode))
      throw ErrorResponses.customError("Invalid Room code");
    const blockDetails = await this.findOneAndPopulate(
      { code: roomCode[0] },
      { path: "rooms.student", select: "name email" }
    );
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  //Fetch Room Details
  async roomDetails(roomCode: string) {
    if (!/^[A-Z]\d{2}/g.test(roomCode))
      throw ErrorResponses.customError("Invalid Room code");
    // calling the above function
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    const roomDetails = blockDetails?.rooms?.find(
      (room: IRoom) => room.code === roomCode
    );
    if (!roomDetails) throw ErrorResponses.noDataFound("room");
    return roomDetails;
  }

  //  get room availability : for checking the room is available or not
  async getRoomAvailability(roomCode: string): Promise<boolean> {
    if (!/^[A-Z]\d{2}/g.test(roomCode))
      throw ErrorResponses.customError("Invalid Room code");
    const roomDetails = await this.roomDetails(roomCode);
    if (!roomDetails) throw ErrorResponses.noDataFound("room details");
    return roomDetails?.availability;
  }

  //  available rooms in a particular block
  async availableRooms(blockId: string) {
    const blockDetails = await this.blockDetailsById(blockId);
    const availableRooms = blockDetails?.rooms?.filter(
      // return availability === true
      ({ availability }) => availability
    );
    return availableRooms;
  }

  // allot or change room
  async allotRoom(
    roomCode: string,
    student: string | ObjectId,
    resident: boolean = false
  ) {
    if (!/^[A-Z]\d{2}/g.test(roomCode))
      throw ErrorResponses.customError("Invalid Room code");
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    if (!blockDetails?._id) throw ErrorResponses.noDataFound("block");

    //check if room is available for allotting
    const availability = await this.getRoomAvailability(roomCode);
    if (!availability) throw ErrorResponses.customError("Unavailable room");
    return await this.updateRoomByBlockId(blockDetails._id, roomCode, {
      $set: {
        "rooms.$.student":
          typeof student === "string" ? new Types.ObjectId(student) : student,
        "rooms.$.availability": false,
      },
      $inc: { occupancy: resident ? 0 : 1 },
    });
  }

  // vacate room
  async vacateRoom(roomCode: string, resident: boolean = false) {
    if (!/^[A-Z]\d{2}/g.test(roomCode))
      throw ErrorResponses.customError("Invalid Room code");
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    if (!blockDetails?._id) throw ErrorResponses.noDataFound("block");
    return await this.vacateRoomByCode(blockDetails._id, roomCode, resident);
  }

  // change room of student
  async reassignStudent(oldRoomCode: string, newRoomCode: string) {
    if (!/^[A-Z]\d{2}/g.test(oldRoomCode) || !/^[A-Z]\d{2}/g.test(newRoomCode))
      throw ErrorResponses.customError("Invalid room code");

    if (oldRoomCode === newRoomCode)
      throw ErrorResponses.customError("Invalid Reassignment of student");

    // check if new room is available
    const availability = await this.getRoomAvailability(newRoomCode);
    if (!availability) throw ErrorResponses.customError("unavailable room");

    //  student details from old room code
    const { student } = await this.roomDetails(oldRoomCode);
    if (!student._id) throw ErrorResponses.customError("student");
    await this.vacateRoom(oldRoomCode, true);
    return await this.allotRoom(newRoomCode, student._id, true);
  }

  //  Total occupancy
  async hostelOccupancy(): Promise<TotalRoomOccupancy> {
    try {
      return await this.totalOccupancy();
    } catch (error) {
      throw ErrorResponses.customError("Error fetching rooms occupancy");
    }
  }

  //Change availability of room
  async changeRoomAvailability(roomCode: string) {
    if (!/^[A-Z]\d{2}/g.test(roomCode))
      throw ErrorResponses.customError("Invalid Room code");

    const availability = await this.getRoomAvailability(roomCode);
    return await this.updateRoomByCode(roomCode, {
      $set: { "rooms.$.availability": !availability },
    });
  }
}
