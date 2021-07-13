import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByUserId(userId: string): Promise<Rental>;
  findOpenRentalByCarId(carId: string): Promise<Rental>;
}

export { IRentalsRepository };
