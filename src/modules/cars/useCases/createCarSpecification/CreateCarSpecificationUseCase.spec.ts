import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      brand: "volkswagen",
      category_id: "category_id",
      daily_rate: 100,
      description: "Subcompacto",
      fine_amount: 60,
      license_plate: "AYT0912",
      name: "Virtus",
    });

    const specification = await specificationsRepository.create({
      description: "test",
      name: "test",
    });

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(carSpecification).toHaveProperty("specifications");
    expect(carSpecification.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "b13ff46c-270e-46c0-8291-cc83b750c0c6";
    const specifications_id = ["f90e8189-a39e-4eec-bef8-50db9dffb480"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
