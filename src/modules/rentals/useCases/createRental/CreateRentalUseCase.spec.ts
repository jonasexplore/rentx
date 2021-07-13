import dayjs from "dayjs";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRental: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsDateProvider;

describe("Create rental", () => {
  const dayWith24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    dayjsProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRental = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRental.execute({
      car_id: "AADSAD",
      expected_return_date: dayWith24hours,
      user_id: "SADSD",
    });

    expect(rental).toBeInstanceOf(Rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRental.execute({
        car_id: "UASDAd",
        expected_return_date: dayWith24hours,
        user_id: "SADSD",
      });

      await createRental.execute({
        car_id: "AADSAD",
        expected_return_date: dayWith24hours,
        user_id: "SADSD",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRental.execute({
        car_id: "AADSAD",
        expected_return_date: dayWith24hours,
        user_id: "ADADDD",
      });

      await createRental.execute({
        car_id: "AADSAD",
        expected_return_date: dayWith24hours,
        user_id: "SADSD",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRental.execute({
        car_id: "AADSAD",
        expected_return_date: dayjs().toDate(),
        user_id: "ADADDD",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
