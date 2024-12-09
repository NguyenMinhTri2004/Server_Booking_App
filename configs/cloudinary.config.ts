import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configuration
cloudinary.config({
  cloud_name: "booking-appmt",
  api_key: "435619265824756",
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export default cloudinary
