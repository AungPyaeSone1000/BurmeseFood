import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";

const categories = [
  "Noodles",
  "Curry",
  "Salads",
  "Soups",
  "Sides",
  "Snacks",
  "Drinks",
];

const loading = false;

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-8 mt-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold text-emerald-600 mb-6">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-black font-medium text-sm "
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-white rounded-md py-2 px-3 shadow-sm text-black border border-gray-600
          focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-black font-medium text-sm "
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mt-1 block w-full bg-white rounded-md py-2 px-3 shadow-sm text-black border border-gray-600
          focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-black font-medium text-sm "
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step={0.01}
            className="mt-1 block w-full bg-white rounded-md py-2 px-3 shadow-sm text-black border border-gray-600
          focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-black font-medium text-sm "
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-white rounded-md py-2 px-3 shadow-sm text-black border border-gray-600
          focus:outline-none focus:ring-2 focus:border-emerald-500 focus:ring-emerald-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mt-1">
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            htmlFor="image"
            className="cursor-pointer flex justify-center py-2 px-4 border border-transparent 
			rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
		  hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-gray-600">Image Uploaded</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 mt-6 border border-transparent 
			rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
		  hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5 " />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
export default CreateProductForm;
