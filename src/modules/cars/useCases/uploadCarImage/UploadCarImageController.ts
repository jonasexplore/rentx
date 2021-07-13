import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const filenames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ car_id, image_name: filenames });

    return response.sendStatus(201);
  }
}

export { UploadCarImageController };
