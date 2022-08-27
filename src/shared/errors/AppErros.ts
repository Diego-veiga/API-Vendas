class AppError {
  public readonly message: string;
  public readonly startusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.startusCode = statusCode;
  }
}

export default AppError;
