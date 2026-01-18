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
    <div className="bg-white min-h-screen">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-6 space-y-6 max-w-2xl">
        
        {/* Images */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Images</p>
          <div className="flex flex-wrap items-center gap-4">
            {Array(4).fill("").map((_, idx) => (
              <label key={idx} htmlFor={`image${idx}`} className="cursor-pointer group">
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
                <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 group-hover:border-primary transition-all overflow-hidden">
                  <img
                    src={files[idx] ? URL.createObjectURL(files[idx]) : assets.upload_area}
                    alt="upload"
                    className={files[idx] ? "w-full h-full object-cover" : "w-10 opacity-40"}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write name here"
            className="w-full border border-gray-200 p-3 rounded-xl focus:border-primary outline-none transition-all"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here (use new line for points)"
            rows={4}
            className="w-full border border-gray-200 p-3 rounded-xl focus:border-primary outline-none transition-all resize-none"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Category */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-xl focus:border-primary outline-none bg-white cursor-pointer appearance-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map((item, i) => (
                <option key={i} value={item.path}>{item.path}</option>
              ))}
            </select>
          </div>

          {/* Price & Offer Price */}
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Pricing</label>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl w-full focus:border-primary outline-none"
                required
              />
              <input
                type="number"
                placeholder="Offer Price"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl w-full focus:border-primary outline-none font-bold text-primary"
                required
              />
            </div>
          </div>
        </div>

        <button className="bg-primary text-white px-12 py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all w-full md:w-max">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;