import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/product/product.model.js";

dotenv.config();

mongoose.connect(
  `${process.env.MONGO_URI}`,
  (error, mongoConnectionInstance) => {
    if (error) throw Error("Mongoose Connection!!, Error: " + error);
    if (!process.env.NODE_ENV) {
      const { host, port, name } = mongoConnectionInstance;
      console.log({ host, port, name });
      // createProducts();
    }
  }
);

const productsArray = [
  {
    name: "AirPods Pro (with Magsafe Charging Case)",
    category: "audio",
    description:
      "AirPods Pro feature Active Noise Cancellation for immersive sound. Transparency mode for hearing the world around you. They’re sweat and water resistant1 and have a customizable fit for all-day comfort.",
    model: "GSRF MLWK3AM/A",
    brand: "Apple",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4900/4900942_sd.jpg;maxHeight=640;maxWidth=550",
    price: 199.99,
    cntInStock: 5,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Beats Studio³ Wireless Noise Cancelling Headphones",
    category: "audio",
    description:
      "Beats Studio³ Wireless headphones deliver a premium listening experience with Pure Adaptive Noise Cancelling (Pure ANC) to actively block external noise, and real-time audio calibration to preserve clarity, range, and emotion. It continuously pinpoints sounds to block while automatically responding to individual fit and music playback. The efficiency of the Apple W1 chip supports up to 22 hours of battery life with Pure ANC on, and Pure ANC off for low-power mode provides up to 40 hours of playback.",
    cntInStock: 5,
    model: "MX3X2LL/A",
    brand: "Beats by Dr. Dre",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5920/5920901cv12d.jpg;maxHeight=640;maxWidth=550",
    price: 199.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "WH-1000XM5 Wireless Noise-Canceling Over-the-Ear Headphones",
    category: "audio",
    description:
      "The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise canceling and exceptional call quality.",
    cntInStock: 5,
    model: "WH-1000XM5/B",
    brand: "Sony",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_rd.jpg;maxHeight=640;maxWidth=550",
    price: 399.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Powerbeats Pro Totally Wireless Earbuds",
    category: "audio",
    description:
      "Totally wireless Powerbeats Pro Earbuds are built to revolutionize your workouts. With zero wires to hold you back, the adjustable, secure-fit earhooks are customizable for extended comfort and stability. A reinforced design for sweat and water resistance lets you take it to the next level. Each earbud has full volume and track controls and up to 9 hours of listening time to fuel your training with powerful, balanced sound.",
    cntInStock: 5,
    model: "MV6Y2LL/A",
    brand: "Beats by Dr. Dre",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6341/6341988cv11d.jpg;maxHeight=640;maxWidth=550",
    price: 179.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "WF-1000XM4 True Wireless Noise Cancelling In-Ear Headphones",
    category: "audio",
    description:
      "Take the next step in truly wireless noise canceling performance and exceptional sound quality. The new Integrated Processor V1 delivers unmatched performance while using even less power. Adding in drastically enhanced call quality, IPX4 water resistance and up to 24 hours of battery life with wireless charging.",
    cntInStock: 5,
    model: "WF1000XM4/B",
    brand: "Sony",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6462/6462204_sd.jpg;maxHeight=640;maxWidth=550",
    price: 279.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "iPhone 13 Pro 5G 128GB",
    category: "cellphones",
    description:
      "iPhone 13 Pro. The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Superfast 5G. Durable design and a huge leap in battery life.",
    cntInStock: 5,
    model: "MLTT3LL/A",
    brand: "Apple",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6443/6443321_sd.jpg;maxHeight=640;maxWidth=550",
    price: 999.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "iPhone 13 Pro Max 5G 128GB",
    category: "cellphones",
    description:
      "iPhone 13 Pro Max. The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Superfast 5G. Durable design and the best battery life ever in an iPhone.",
    cntInStock: 5,
    model: "MNCP3LL/A",
    brand: "Apple",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6487/6487447_sd.jpg;maxHeight=640;maxWidth=550",
    price: 1099.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Pixel 6 Pro 128GB (Unlocked)",
    category: "cellphones",
    description:
      "Introducing Pixel 6 Pro, the completely redesigned, fully loaded Google 5G phone.* With a powerful camera system, next-gen security, and the custom-built Google Tensor processor, it’s the smartest and fastest Pixel yet.",
    cntInStock: 5,
    model: "GA03149-US",
    brand: "Google",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6483/6483636_sd.jpg;maxHeight=640;maxWidth=550",
    price: 899.0,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Galaxy S22+ 128GB (Unlocked)",
    category: "cellphones",
    description:
      "Galaxy S22+ is redefining the epic standard – both for what a smartphone can do with video and for what you can communicate, create, and experience with it. In other words, if you’ve got something to say, Galaxy S22+ makes it possible to say anything you want with video, at any time-even in the darkness of night.",
    cntInStock: 5,
    model: "SM-S906UZWAXAA",
    brand: "Samsung",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6494/6494444_sd.jpg;maxHeight=640;maxWidth=550",
    price: 999.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Galaxy S22 Ultra 128GB (Unlocked)",
    category: "cellphones",
    description:
      "The power of our fastest chip ever, long lasting battery, and sophisticated AI enables revolutionary night-time video that’s as clear-as-day. And, for the first time, S Pen with its increased super-powers has been embedded in Galaxy S22 Ultra’s beautifully sleek design. Today, Galaxy S22 Ultra sets an epic standard of smartphone experience.",
    cntInStock: 5,
    model: "SM-S908UDRAXAA",
    brand: "Samsung",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6494/6494426_sd.jpg;maxHeight=640;maxWidth=550",
    price: 1199.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "G15 15.6 FHD Gaming Laptop",
    category: "computers",
    description:
      "Experience the thrill of the game with the new Dell G15 gaming laptop. Featuring AMD® Ryzen processors, NVIDIA® GeForce® graphics, improved thermal design and Game Shift technology.",
    cntInStock: 5,
    model: "G15RE-A954GRY-PUS/A975GRY-PUS",
    brand: "Dell",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6461/6461724_sd.jpg;maxHeight=640;maxWidth=550",
    price: 799.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "ROG Zephyrus 16 WQXGA 165Hz Gaming Laptop",
    category: "computers",
    description:
      "Dive headfirst into one of the best gaming laptop experiences on Windows 11. The ROG Zephyrus M16 packs a 14-core Intel® Core™ i9-12900H CPU and NVIDIA® GeForce RTX™ 3070 Ti GPU into a super thin gaming laptop. Enjoy a fast 165Hz refresh rate, 16GB of RAM, and 1TB of PCIe 4.0 SSD storage all wrapped in a light 4.41 lbs chassis. The future is thin and light.",
    cntInStock: 5,
    model: "GU603ZW-M16.I93070T",
    brand: "ASUS",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6494/6494637_sd.jpg;maxHeight=640;maxWidth=550",
    price: 1999.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Nitro 5 - 15.6 FHD Gaming Laptop",
    category: "computers",
    description:
      "Fire it up then go full throttle faster and more effectively than ever with Acer's next evolution of its Nitro 5 gaming laptop. The new Nitro 5 soars to new levels of performance for gamers and creators, courtesy of its 12th Gen Intel® Core™ processor and NVIDIA® GeForce RTX 3050 Ti graphics—powered by Ampere™ NVIDIA's RTX architecture! Next, toss in the vivid, crystal-clear 15.6” Full HD display with a 144Hz IPS panel, ample cooling and a 4-zone RGB keyboard and you can see why the Nitro 5 is a knockout hit for gamers of every level!",
    cntInStock: 5,
    model: "AN515-58-5046",
    brand: "Acer",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6504/6504566_sd.jpg;maxHeight=640;maxWidth=550",
    price: 899.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "TUF Gaming 17.3 Laptop",
    category: "computers",
    description:
      "The latest Intel 11th Core i5 processor with GeForce® RTX3050 Ti graphics also equipped with a large 17.3 FHD 144hz display. Personalize your laptop with RGB keyboard.",
    cntInStock: 5,
    model: "FX706HE-211.TM17-1",
    brand: "ASUS",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6485/6485599_sd.jpg;maxHeight=640;maxWidth=550",
    price: 749.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "ROG Zephyrus 14 WQXGA 120Hz Gaming Laptop",
    category: "computers",
    description:
      "Game like a pro on Windows 11 with this ROG Zephyrus G14. Double up on AMD firepower with Ryzen 9 6900HS CPU and Radeon RX 6700S GPU featuring exclusive AMD SmartShift and Smart Access Memory technology that dynamically boosts performance for any task. Be confident in screen quality with an ROG Nebula 120Hz Display. Leap into the next generation of memory and storage with 16GB of DDR5 RAM, and 1TB of PCIe 4.0 SSD storage.",
    cntInStock: 5,
    model: "GA402RJ-G14.R96700",
    brand: "ASUS",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6494/6494638_sd.jpg;maxHeight=640;maxWidth=550",
    price: 1499.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "m15 R5 15.6 FHD Gaming Laptop",
    category: "computers",
    description:
      "The Alienware m15 Ryzen Edition R5 gaming laptop is our first laptop powered with AMD Ryzen™ 5000 series processors and NVIDIA® GeForce RTX™ 30-series graphics. To keep performance prioritized and temperatures under control our Alienware Cryo-tech™ cooling technology helps and is designed to keep gameplay and confidence high. Each gaming experience on the m15 is intended to wow players visually, built around a 15” screen, this new generation of m15s are focused on delivering an uncompromised visual experience. Even the visual ID has taken a step forward and introduces newly evolved Legend industrial design.",
    cntInStock: 5,
    model: "AWM15R5-A610BLK-PUS",
    brand: "Alienware",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6468/6468117_sd.jpg;maxHeight=640;maxWidth=550",
    price: 1699.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "OMEN - 16.1 Gaming Laptop",
    category: "computers",
    description:
      "Yes, it's that powerful: Play with performance with a powerful AMD processor and mighty graphics. All that power stays cool with our frosty OMEN Tempest Cooling. We can't stop others from feeling a little envy. Gaming shouldn't feel this good: Feast your eyes on this 16.1 diagonal inch machine, boasting a high resolution and fast refresh rate. The floating hinge design and Audio by Bang & Olufsen show it off while you go off. And the long battery life lets you play even longer. One place. All play. OMEN Gaming Hub is your one-stop shop to elevating your play. From getting rewards just by gaming, to controlling every little performance and lighting option of your machine, the list goes on. Every game, every play, every moment is now in your control.",
    cntInStock: 5,
    model: "16-c0012dx",
    brand: "HP",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6479/6479079cv11d.jpg;maxHeight=640;maxWidth=550",
    price: 1149.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "PlayStation 5 Console",
    category: "videogames",
    description:
      "The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio*, and an all-new generation of incredible PlayStation games. *3D audio via built-in TV speakers or analog/USB stereo headphones. Set up and latest system software update required.",
    cntInStock: 5,
    model: "3006634/3005718",
    brand: "Sony",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6426/6426149_sd.jpg;maxHeight=640;maxWidth=550",
    price: 499.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Xbox Series X 1TB Console",
    category: "videogames",
    description:
      "Xbox Series X, the fastest, most powerful Xbox ever. Explore rich new worlds with 12 teraflops of raw graphic processing power, DirectX ray tracing, a custom SSD, and 4K gaming. Make the most of every gaming minute with Quick Resume, lightning-fast load times, and gameplay of up to 120 FPS—all powered by Xbox Velocity Architecture. Enjoy thousands of games from four generations of Xbox, with hundreds of optimized titles that look and play better than ever. And when you add Xbox Game Pass Ultimate (membership sold separately or included when you choose Xbox All Access), you get an instant library of 100+ high-quality games, including day one releases from Xbox Game Studios like Halo Infinite, Forza Horizon 5, and Microsoft Flight Simulator.",
    cntInStock: 5,
    model: "RRT-00001",
    brand: "Microsoft",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428324_sd.jpg;maxHeight=640;maxWidth=550",
    price: 499.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
  {
    name: "Xbox Series S 512 GB All-Digital Console (Disc-free Gaming)",
    category: "videogames",
    description:
      "Go all-digital with Xbox Series S and enjoy next-gen performance in the smallest Xbox ever, at a great price. Make the most of every gaming minute with Quick Resume, lightning-fast load times, and gameplay of up to 120 FPS—all powered by Xbox Velocity Architecture. Enjoy digital games from four generations of Xbox, with hundreds of optimized titles that look and play better than ever. And when you add Xbox Game Pass Ultimate (membership sold separately or included when you choose Xbox All Access), you get online multiplayer to play with friends and an instant library of 100+ high-quality games, including day one releases from Xbox Game Studios like Halo Infinite, Forza Horizon 5, and Minecraft Dungeons.",
    cntInStock: 5,
    model: "RRS-00001",
    brand: "Microsoft",
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430277_sd.jpg;maxHeight=640;maxWidth=550",
    price: 299.99,
    owner: "62cad84d9776a1b2863b2cc5",
  },
];

const createProducts = async () => {
  try {
    const products = await Product.create(productsArray);
  } catch (err) {
    console.log(err.message);
  }
};
