import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCatergoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCatergoryController(
  importCategoryUseCase
);

export { importCategoryController };
