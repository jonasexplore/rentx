import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCar: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCar = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCar.execute({
      brand: "volkswagen",
      category_id: "category_id",
      daily_rate: 100,
      description: "Subcompacto",
      fine_amount: 60,
      license_plate: "AYT0912",
      name: "Virtus",
    });

    expect(car).toBeInstanceOf(Car);
    expect(car).toHaveProperty("id");
  });

  it("shound not be able to create a car with exists license plate", async () => {
    await createCar.execute({
      brand: "volkswagen",
      category_id: "category_id",
      daily_rate: 100,
      description: "Subcompacto",
      fine_amount: 60,
      license_plate: "AYZ0912",
      name: "Virtus",
    });

    expect(async () => {
      await createCar.execute({
        brand: "volkswagen",
        category_id: "category_id",
        daily_rate: 100,
        description: "Subcompacto",
        fine_amount: 60,
        license_plate: "AYZ0912",
        name: "Virtus",
      });
    }).rejects.toEqual(new AppError("LICENSE_PLATE_ALREADY_EXISTS"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCar.execute({
      brand: "volkswagen",
      category_id: "category_id",
      daily_rate: 100,
      description: "Subcompacto",
      fine_amount: 60,
      license_plate: "ABT0912",
      name: "Virtus",
    });

    expect(car.available).toBe(true);
  });
});
