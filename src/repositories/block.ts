import { CRUD } from "./CRUD";
import { IBlock } from "../interfaces/block";
import { Model } from "mongoose";
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

  //    we need to implement rest of the methods after successful login of students
}
