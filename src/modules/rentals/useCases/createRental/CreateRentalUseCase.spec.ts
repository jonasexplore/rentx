import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRental: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;
let carsRepository: CarsRepositoryInMemory;

describe("Create rental", () => {
  const dayWith24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    dayjsProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRental = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider,
      carsRepository
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "car test",
      daily_rate: 100,
      license_plate: "10213",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
    const rental = await createRental.execute({
      car_id: car.id,
      expected_return_date: dayWith24hours,
      user_id: "SADSD",
    });

    expect(rental).toBeInstanceOf(Rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "123123",
      expected_return_date: dayWith24hours,
      user_id: "SADSD",
    });

    expect(async () => {
      await createRental.execute({
        car_id: "AADSAD",
        expected_return_date: dayWith24hours,
        user_id: "SADSD",
      });
    }).rejects.toEqual(new AppError("THERE_IS_A_RENTAL_IN_PROGRESS_FOR_USER"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "123123",
      expected_return_date: dayWith24hours,
      user_id: "SADSD",
    });

    expect(async () => {
      await createRental.execute({
        car_id: "123123",
        expected_return_date: dayWith24hours,
        user_id: "AAAAA",
      });
    }).rejects.toEqual(new AppError("CAR_IS_NOT_AVAILABLE"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRental.execute({
        car_id: "AADSAD",
        expected_return_date: dayjs().toDate(),
        user_id: "ADADDD",
      });
    }).rejects.toEqual(new AppError("INVALID_RETURN_TIME"));
  });
});
