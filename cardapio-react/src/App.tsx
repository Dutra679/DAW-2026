import { ProductCard } from "./cases/products/components/product-card";
import { useProduct } from "./cases/products/hooks/use-product";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { NavigationBar } from "./components/layout/navigationBar";
import { categories } from "./data/categories";
import { useState } from "react";

function App() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const { products, loading, error } = useProduct();

  const visibleProducts =
    activeCategory === "todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  function handleSelectCategory(alias: string) {
    setActiveCategory(alias);
  }

  return (
    <>
      <Header />

      <NavigationBar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main>
        <section>
          <header>
            <h2>Produtos</h2>
            <p>
              Categoria <span id="selected-category">{activeCategory}</span>: {" "}
              {visibleProducts.length} itens
            </p>
          </header>

          {loading && (
            <p className="panel panel-loading">Carregando produtos...</p>
          )}

          {error && (
            <p className="panel panel-error">
              Não foi possível carregar os produtos: {error}
            </p>
          )}

          {!loading && !error && visibleProducts.length === 0 && (
            <p className="panel">Nenhum produto encontrado nesta categoria.</p>
          )}

          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        <aside>
          <h2>Seu pedido</h2>

          <div className="cart-empty">
            <img src="./assets/img/cart.svg" />
            <p>Seu carrinho está vazio</p>
            <p>Escolha um item do cardápio para começar</p>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
}

export default App;
