import { CarImage } from "../infra/typeorm/entities/CarImage";

interface IRequest {
  car_id: string;
  image_name: string;
}

interface ICarsImagesRepository {
  create({ car_id, image_name }: IRequest): Promise<CarImage>;
}

export { ICarsImagesRepository };
