import { CRUD } from "./CRUD";
import { IBlock, TotalRoomOccupancy } from "../interfaces/block";
import { Model, ObjectId } from "mongoose";
import { BlockModel } from "../models/block";
import ErrorResponses from "../errors/ErrorResponse";

export abstract class BlockRepo extends CRUD {
  public model: Model<IBlock> = BlockModel;

  // get all blocks
  protected async getAll(): Promise<IBlock[] | null> {
    const blocksData = await this.findAll<IBlock>();
    if (blocksData?.length === 0) throw ErrorResponses.noDataFound("Blocks");
    return blocksData;
  }

  //Create a new Block
  protected async createNew(data: IBlock) {
    return await this.create<IBlock>(data);
  }

  //Update room by block Id
  protected async updateRoomByBlockId(
    _id: string | ObjectId,
    roomCode: string,
    data: any
  ) {
    const updatedRoom = await this.findOneAndUpdate<IBlock>(
      //"rooms.code" : rooms is an array of objects and it will check the code for each object
      { _id, "rooms.code": roomCode },
      data
    );
    if (!updatedRoom) throw ErrorResponses.noDataFound("room");
    return updatedRoom;
  }

  //Update room by code : data will be in obj with mongoose query form
  protected async updateRoomByCode(roomCode: string, data: any) {
    const updatedRoom = await this.findOneAndUpdate<IBlock>(
      { code: roomCode[0], "rooms.code": roomCode },
      data
    );
    if (!updatedRoom) throw ErrorResponses.noDataFound("room");
    return updatedRoom;
  }

  //Vacate room by code
  protected async vacateRoomByCode(
    _id: string | ObjectId,
    roomCode: string,
    resident: boolean = false
  ) {
    const updatedBlock = await this.findOneAndUpdate<IBlock>(
      { _id, "rooms.code": roomCode },
      {
        $unset: { "rooms.$.student": 1 },
        $set: { "rooms.$.availability": true },
        //decreasing the number of occupancy (if it is room changing resident will be true and increment by zero)
        $inc: { occupancy: resident ? 0 : -1 },
      }
    );
    if (!updatedBlock) throw ErrorResponses.noDataFound("block");
    return updatedBlock;
  }

  //  Total Room Occupancy : total count or occupied and available rooms
  protected async totalOccupancy(): Promise<TotalRoomOccupancy> {
    const aggregatedResult = await this.model.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          occupancy: { $sum: "$occupancy" },
          //  $size returns the size of the array field in document
          totalRooms: { $sum: { $size: "$rooms" } },
        },
      },
    ]);
    // number of rooms occupied and available in entire hostel
    const allBlocksData = aggregatedResult[0];
    //  active rooms
    const activeRoomsData = await this.model.aggregate([
      { $match: {} },
      //  create separate docs for each room in the rooms array
      { $unwind: "$rooms" },
    ]);
    const availableRooms = activeRoomsData.filter(
      ({ rooms }) => rooms.availability
    ).length;
    return {
      ...allBlocksData,
      availableRooms,
    };
  }

  //  Delete a block
  protected async deleteBlockById(_id: string): Promise<IBlock | null> {
    return await this.findByIdAndDelete<IBlock>(_id);
  }

  //Update block By Id
  protected async updateBlockById(
    _id: string,
    data: any
  ): Promise<IBlock | null> {
    const updatedBlock = await this.findByIdAndUpdate<IBlock>(_id, data);
    if (!updatedBlock) throw ErrorResponses.noDataFound("block");
    return updatedBlock;
  }
}
