import { inject, injectable } from "tsyringe";

import { IListAllAvailableCarsParams } from "@modules/cars/dtos/IListAllAvailableCars";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    name,
  }: IListAllAvailableCarsParams): Promise<Car[]> {
    return this.carsRepository.listAllAvailableCars({
      brand,
      category_id,
      name,
    });
  }
}

export { ListAvailableCarsUseCase };
