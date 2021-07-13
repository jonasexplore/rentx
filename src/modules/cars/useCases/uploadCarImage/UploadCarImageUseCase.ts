import { inject, injectable } from "tsyringe";

import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private readonly carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, image_name }: ICreateCarImageDTO): Promise<void> {
    image_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
    });
  }
}

export { UploadCarImageUseCase };
