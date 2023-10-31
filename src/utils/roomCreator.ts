//  function to create rooms require number of rooms

export const roomCreator = (
  blockCode: string,
  numberOfRooms: number
): { number: number; code: string }[] => {
  const roomArray = [];
  let currentRoom = 1;
  while (currentRoom <= numberOfRooms) {
    roomArray.push({
      number: currentRoom,
      code: `${blockCode}${currentRoom < 10 ? "0" + currentRoom : currentRoom}`,
    });
    currentRoom++;
  }
  return roomArray;
};
