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

// delete block
export const deleteBlock: RequestHandler = asyncHandler(async (req, res) => {
  await service.deleteBlock(req.params._id);
  res.status(200).json(dataFormatter("Block deleted successfully"));
});

//check room availability
export const checkRoomAvailability: RequestHandler = asyncHandler(
  async (req, res) => {
    const roomStatus = await service.getRoomAvailability(req.params.roomCode);
    res.status(200).json(dataFormatter(roomStatus));
  }
);

//  update room
export const updateRoom = asyncHandler(async (req, res) => {
  // const {status, student}  requires student data
  res.json(dataFormatter(req.body));
});

//  available rooms in a block
export const availableRooms: RequestHandler = asyncHandler(async (req, res) => {
  const availableRooms = await service.availableRooms(req.params._id);
  res.status(200).json(dataFormatter(availableRooms));
});

// block data with filtering
export const blockData: RequestHandler = asyncHandler(async (req, res) => {
  const blockData = await service.blockDetailsByName(req.params.name[0]);
  res.status(200).json(dataFormatter(blockData));
});

//change room availability
export const changeRoomAvailability: RequestHandler = asyncHandler(
  async (req, res) => {
    await service.changeRoomAvailability(req.params.code);
    res.status(200).json(dataFormatter(`${req.params.code} updated`));
  }
);

//hostel occupancy statistics
export const hostelOccupancy = asyncHandler(async (req, res) => {
  const hostelOccupancy = await service.hostelOccupancy();
  res.status(200).json(dataFormatter(hostelOccupancy));
});
