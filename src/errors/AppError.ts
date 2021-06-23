export class AppError {
  constructor(
    private readonly message: string,
    private readonly statusCode = 400
  ) {}
}
