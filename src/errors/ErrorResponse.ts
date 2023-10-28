/* all the errors present here will be used for throw errors inside the controllers
which will be caught by the error handling middleware */
export default class ErrorResponses extends Error {
  // initializing the values with the constructor (auto initialize : - public )
  constructor(public statusCode: number, public message: string) {
    super(message);
    // to set the prototype of instance to be error response class
    Object.setPrototypeOf(this, new.target.prototype);
  }

  //   static methods : can be accessed without creating instance
  //    1. unauthorized error
  static unAuthorized(invalidData: string): ErrorResponses {
    return new ErrorResponses(401, invalidData);
  }

  // 2. No data found
  static noDataFound(data: string): ErrorResponses {
    return new ErrorResponses(404, `No ${data} found`);
  }

  // 3. Bad request or Invalid mongo DB ID
  static badRequest(): ErrorResponses {
    return new ErrorResponses(404, "Bad Request");
  }

  // 4. MongoDB Error (including mongo db validation)
  static mongoError(): ErrorResponses {
    return new ErrorResponses(500, "Internal Server Error");
  }

  // 5. Not found API End Points
  static endPointNotFound(url: string): ErrorResponses {
    return new ErrorResponses(404, `Cannot find ${url} on this server`);
  }

  // invalid data
  static customError(message: string): ErrorResponses {
    return new ErrorResponses(400, message);
  }
}
