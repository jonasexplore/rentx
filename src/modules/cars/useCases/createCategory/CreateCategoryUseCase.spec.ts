import { validate } from "uuid";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const newCategory = {
      name: "Alimentos",
      description: "Categoria responsável por separar os alimentos",
    };

    await createCategory.execute(newCategory);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      newCategory.name
    );

    expect(createdCategory).toBeInstanceOf(Category);
    expect(createdCategory).toHaveProperty("id");
    expect(validate(createdCategory.id)).toBe(true);
  });

  it("should not be create duplicate category", async () => {
    const newCategory = {
      name: "Alimentos",
      description: "Categoria responsável por separar os alimentos",
    };

    await createCategory.execute(newCategory);

    expect(async () => {
      await createCategory.execute(newCategory);
    }).rejects.toEqual(new AppError("CATEGORY_ALREADY_EXISTS"));
  });
});
