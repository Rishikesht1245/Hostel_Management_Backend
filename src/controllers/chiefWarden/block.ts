import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { BlockService } from "../../services/block";
import { dataFormatter } from "../../utils/jsonFormatter";

//  block service
const service = new BlockService();

//  create new block
export const newBlock: RequestHandler = asyncHandler(async (req, res) => {
  const { name, code, numberOfRooms } = req.body;
  await service.createBlock(name, code, numberOfRooms);
  res
    .status(201)
    .json(dataFormatter(`Block ${name} created with ${numberOfRooms} rooms`));
});

// getAll Blocks
export const allBlocks: RequestHandler = asyncHandler(async (req, res) => {
  const blocksData = await service.allBlocks();
  res.status(200).json(dataFormatter(blocksData));
});
