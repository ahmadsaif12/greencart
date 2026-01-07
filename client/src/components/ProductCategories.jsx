import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assets";
import ProductCard from "./ProductCard";

const ProductCategories = () => {
  const { products = [] } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
  (item) => item.path.toLowerCase() === category.toLowerCase()
);

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16 px-6">
      {searchCategory && (
        <div className="flex flex-col items-start w-max mb-6">
          <p className="text-2xl font-medium">{searchCategory.text.toLowerCase()}</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {filteredProducts.map((product) => (
              
              <ProductCard product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductCategories;
