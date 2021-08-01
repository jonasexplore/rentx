import { inject, injectable } from "tsyringe";

import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private readonly carsImagesRepository: ICarsImagesRepository,

    @inject("StorageProvider")
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, image_name }: ICreateCarImageDTO): Promise<void> {
    image_name.map(async (image) => {
      await this.carsImagesRepository.create({ car_id, image_name: image });
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImageUseCase };
