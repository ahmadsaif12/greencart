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
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-[80vh] px-4 py-10">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add Shipping <span className="text-green-600">Address</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
              value={address.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
              value={address.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              required
            />
          </div>

          {/* Full Width Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
            value={address.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />

          {/* Full Width Street */}
          <input
            type="text"
            placeholder="Street"
            className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
            value={address.street}
            onChange={(e) => handleChange("street", e.target.value)}
            required
          />

          {/* Row 3: City and State */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
              value={address.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
              value={address.state}
              onChange={(e) => handleChange("state", e.target.value)}
              required
            />
          </div>

          {/* Row 4: Zip and Country */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Zip code"
              className="border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
              value={address.zipcode}
              onChange={(e) => handleChange("zipcode", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
              value={address.country}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            />
          </div>

          {/* Full Width Phone */}
          <input
            type="text"
            placeholder="Phone"
            className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-500"
            value={address.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition-colors uppercase tracking-wider"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Right Side: Illustration */}
      <div className="hidden md:flex w-1/2 justify-end">
        <img
          src={assets.add_address_iamge}
          alt="Illustration"
          className="w-[80%] object-contain"
        />
      </div>
    </div>
  );
};

export default AddAddress;