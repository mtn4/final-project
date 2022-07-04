import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/product/product.model.js";

dotenv.config();

const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hakdj.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URL, (error, mongoConnectionInstance) => {
  if (error) throw Error("Mongoose Connection!!, Error: " + error);
  if (!process.env.NODE_ENV) {
    const { host, port, name } = mongoConnectionInstance;
    console.log({ host, port, name });
    // createProducts();
  }
});

const productsArray = [
  {
    name: "AirPods Pro (with Magsafe Charging Case)",
    category: "Audio",
    description:
      "AirPods Pro feature Active Noise Cancellation for immersive sound. Transparency mode for hearing the world around you. They’re sweat and water resistant1 and have a customizable fit for all-day comfort.",
    model: "GSRF MLWK3AM/A",
    brand: "Apple",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4900/4900942_sd.jpg;maxHeight=640;maxWidth=550",
    price: 199.99,
    countInStock: 5,
    owner: "62c1b4064715fd302ae0e882",
  },
];

const createProducts = async () => {
  try {
    const products = await Product.create(productsArray);
  } catch (err) {
    console.log(err.message);
  }
};
