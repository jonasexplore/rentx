import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategory {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategory): Promise<void>;
}

export { ICategoriesRepository, ICreateCategory };
