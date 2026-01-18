import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const AddAddress = () => {
  const { navigate, axios, user } = useAppContext();

  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (field, value) => {
    setAddress({ ...address, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add an address");
      navigate("/cart");
      return;
    }

    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!user) navigate("/cart");
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 flex">
      <div className="w-full md:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-semibold mb-8 text-center text-gray-700">
            Add New Address
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(address).map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-black-600">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={address[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={`Enter ${field}`}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="bg-green-600 text-white font-medium py-3 px-6 rounded hover:bg-green-700 transition w-full mt-4"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:block w-1/2 relative">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="absolute bottom-0 right-0 w-full max-w-lg opacity-90"
        />
      </div>
    </div>
  );
};

export default AddAddress;
