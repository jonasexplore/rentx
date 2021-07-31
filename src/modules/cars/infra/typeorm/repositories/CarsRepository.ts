import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAllAvailableCarsParams } from "@modules/cars/dtos/IListAllAvailableCars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({
      where: {
        license_plate,
      },
    });
  }

  async listAllAvailableCars({
    brand,
    category_id,
    name,
  }: IListAllAvailableCarsParams): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }
    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }
    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    return carsQuery.getMany();
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
