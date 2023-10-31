import { BlockRepo } from "../repositories/block";
import { IBlock, IRoom } from "../interfaces/block";
import ErrorResponses from "../errors/ErrorResponse";
import { roomCreator } from "../utils/roomCreator";
import { Types } from "mongoose";

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
}
