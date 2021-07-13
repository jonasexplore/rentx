import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCar: CreateCarUseCase;
let listAvailableCars: ListAvailableCarsUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCar = new CreateCarUseCase(carsRepositoryInMemory);
    listAvailableCars = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car1 = await createCar.execute({
      brand: "volkswagen",
      category_id: "category_id",
      daily_rate: 100,
      description: "Subcompacto",
      fine_amount: 60,
      license_plate: "AYT0912",
      name: "Virtus",
    });

    const car2 = await createCar.execute({
      brand: "audi",
      category_id: "category_id",
      daily_rate: 160,
      description: "luxo",
      fine_amount: 100,
      license_plate: "BLA2785",
      name: "V8",
    });

    const cars = await listAvailableCars.execute({});

    expect(cars).toMatchObject([car1, car2]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await createCar.execute({
      brand: "audi",
      category_id: "category_id",
      daily_rate: 160,
      description: "luxo",
      fine_amount: 100,
      license_plate: "BLA2785",
      name: "A3 Sedan",
    });

    const cars = await listAvailableCars.execute({ name: "A3 Sedan" });

    expect(cars).toMatchObject([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await createCar.execute({
      brand: "hyundai",
      category_id: "category_id",
      daily_rate: 160,
      description: "luxo",
      fine_amount: 100,
      license_plate: "BLA2785",
      name: "V8",
    });

    const cars = await listAvailableCars.execute({ brand: "hyundai" });

    expect(cars).toMatchObject([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await createCar.execute({
      brand: "audi",
      category_id: "b4adb1dc-e66e-463a-8e5e-6948b6371fe7",
      daily_rate: 160,
      description: "luxo",
      fine_amount: 100,
      license_plate: "BLA2785",
      name: "V8",
    });

    const cars = await listAvailableCars.execute({
      category_id: "b4adb1dc-e66e-463a-8e5e-6948b6371fe7",
    });

    expect(cars).toMatchObject([car]);
  });

  it("should not be able to list all cars when noexist", async () => {
    const car = await createCar.execute({
      brand: "audi",
      category_id: "category_id",
      daily_rate: 160,
      description: "luxo",
      fine_amount: 100,
      license_plate: "BLA2785",
      name: "V8",
    });

    const cars = await listAvailableCars.execute({ brand: "brasil" });

    expect(cars).not.toMatchObject([car]);
  });
});
