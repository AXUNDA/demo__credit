export class custom_error extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name;
      this.status = status;
    }
  
    statusCode() {
      return this.status;
    }
  }
  
 
  