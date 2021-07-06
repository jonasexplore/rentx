import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecification {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecification): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository, ICreateSpecification };
