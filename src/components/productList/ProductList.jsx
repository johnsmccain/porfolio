import React from "react";
import Product from "../product/Product";
import "./productList.css";
import { product } from "../../data";
export default function ProductList() {
  return (
    <div className="pl">
      <div className="pl-texts">
        <h1 className="pl-title">Some Things I’ve Built</h1>
        <p className="pl-desc">Create & inspire. it's John</p>
      </div>
      <div className="pl-list">
        {product.map((item) => (
          <Product key={item.id} img={item.img} link={item.link} />
        ))}
      </div>
    </div>
  );
}
