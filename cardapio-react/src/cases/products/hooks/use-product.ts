import { useEffect, useState } from "react";
import type { Product } from "../dtos/product";
import { productService } from "../services/product-service";

export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const result = await productService.listAll();
        if (active) setProducts(result);
      } catch (requestError) {
        if (!active) return;

        const message =
          requestError instanceof Error
            ? requestError.message
            : "Não foi possível carregar os produtos.";

        setError(message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
