import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id: userId, end_date: null },
    });
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    return this.repository.findOne({
      where: { car_id: carId, end_date: null },
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.repository.find({ where: { user_id }, relations: ["car"] });
  }
}

export { RentalsRepository };
