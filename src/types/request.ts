// extending the Express.Request interface to include tokenPayload and it's properties
// declare is used to tell the compiler that we are declaring the shape of an entity
// name space is used to create the custom types
declare namespace Express {
  interface Request {
    tokenPayload: {
      _id: string;
      email: string;
      role: "student" | "staff" | "warden";
      department?: "maintenance" | "chef" | "warden";
    };
  }
}
