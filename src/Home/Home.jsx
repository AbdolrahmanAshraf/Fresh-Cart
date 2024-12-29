import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";
import CategorySlider from "../categorySlider/CategorySlider";

export default function Home() {
  return (
    <div>
      
      <MainSlider />
      <CategorySlider/>
      <Products />
    </div>
  );
}
