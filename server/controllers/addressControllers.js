import Address from "../models/Address.js"

//add address :/api/add/address

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.userId; // Get this from the request object, not the body

        // Spread the address fields and add the userId
        const newAddress = await Address.create({
            ...address,
            userId
        });

        res.json({ success: true, message: "Added Address Successfully", address: newAddress });
    } catch (error) {
        console.log("Error adding address:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
//get address: /api/address/get


export const getAddress = async (req, res) => {
    try {
       // FIXED: Use req.userId (populated by your authUser middleware)
       const userId = req.userId; 

       if (!userId) {
           return res.status(401).json({ success: false, message: "User not authorized" });
       }

       // Find all addresses belonging to this specific user
       const addresses = await Address.find({ userId });
       
       res.json({ success: true, addresses });
    } catch (error) {
       console.log("Error fetching addresses:", error.message);
       res.status(500).json({ success: false, message: error.message });
    }
}