import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

interface ICreateCategory {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategory): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const foundCategory = this.categories.find(
      (category) => category.name === name
    );

    return foundCategory;
  }
}

export { CategoriesRepository };
