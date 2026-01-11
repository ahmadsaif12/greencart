import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AddAddress = () => {
  const { navigate, addAddress } = useAppContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !city || !state || !zipcode || !phone) {
      alert("Please fill all fields");
      return;
    }

    addAddress({ firstName, lastName, email, city, state, zipcode, phone });
    alert("Address added successfully!");
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold mb-8 text-center text-gray-700">
          Add New Address
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1 text-black-600">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1 text-black-600">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-black-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* City & State */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1 text-black-600">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1 text-black-600">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>

          {/* Zipcode & Phone */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1 text-black-600">Zipcode</label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Zipcode"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1 text-black-600">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4  mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white font-medium py-3 px-6 rounded hover:bg-green-700 transition w-full"
            >
              Save Address
            </button>

            
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
