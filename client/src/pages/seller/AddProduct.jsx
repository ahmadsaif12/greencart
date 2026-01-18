import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const { axios } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price: Number(price),
        offerPrice: Number(offerPrice),
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">

        {/* Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill("").map((_, idx) => (
              <label key={idx} htmlFor={`image${idx}`}>
                <input
                  type="file"
                  accept="image/*"
                  id={`image${idx}`}
                  hidden
                  onChange={(e) => {
                    const updated = [...files];
                    updated[idx] = e.target.files[0];
                    setFiles(updated);
                  }}
                />
                <img
                  src={files[idx] ? URL.createObjectURL(files[idx]) : assets.upload_area}
                  alt="upload"
                  width={100}
                  height={100}
                  className="cursor-pointer max-w-24"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((item, i) => (
              <option key={i} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Offer Price"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button className="bg-primary text-white px-6 py-2 rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
