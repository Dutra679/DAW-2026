import { httpClient } from "../../../lib/http-client";
import type { Product } from "../dtos/product";

const PRODUCTS_ENDPOINT = "/products?key=deccf170";

export const productService = {
  async listAll(): Promise<Product[]> {
    const response = await httpClient.get<Product[]>(PRODUCTS_ENDPOINT);
    return response.data;
  },
};
