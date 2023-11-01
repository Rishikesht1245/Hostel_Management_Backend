import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormatter } from "../../utils/jsonFormatter";
import { BlockService } from "../../services/block";
import { ExecOptionsWithBufferEncoding } from "child_process";

const blockService = new BlockService();

//  Maintenance team can view all the blocks and change rooms availability

// All blocks data
export const allBlocksData: RequestHandler = asyncHandler(async (req, res) => {
  const allBlocksData = await blockService.allBlocks();
  res.status(200).json(dataFormatter(allBlocksData));
});

//Block data with filtering
export const blockData: RequestHandler = asyncHandler(async (req, res) => {
  const blockData = await blockService.blockDetailsByName(req.params.name[0]);
  res.json(dataFormatter(blockData));
});

//change room availability
export const changeRoomAvailability: RequestHandler = asyncHandler(
  async (req, res) => {
    await blockService.changeRoomAvailability(req.params.code);
    res.json(dataFormatter(`${req.params.code} updated`));
  }
);
