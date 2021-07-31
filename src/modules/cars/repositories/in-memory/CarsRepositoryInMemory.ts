import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAllAvailableCarsParams } from "@modules/cars/dtos/IListAllAvailableCars";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async listAllAvailableCars({
    brand,
    category_id,
    name,
  }: IListAllAvailableCarsParams): Promise<Car[]> {
    if (brand)
      return this.cars.filter(
        (car) => car.available === true && car.brand === brand
      );

    if (category_id)
      return this.cars.filter(
        (car) => car.available === true && car.category_id === category_id
      );

    if (name)
      return this.cars.filter(
        (car) => car.available === true && car.name === name
      );

    return this.cars.filter((car) => car.available === true);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
