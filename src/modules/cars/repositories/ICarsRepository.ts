import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAllAvailableCarsParams } from "../dtos/IListAllAvailableCars";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  listAllAvailableCars(data: IListAllAvailableCarsParams): Promise<Car[]>;
}

export { ICarsRepository };
