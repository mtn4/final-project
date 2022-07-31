import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import { data } from "../../utils/data";
import "./HomeScreen.css";

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <Carousel images={data} />
    </div>
  );
}
