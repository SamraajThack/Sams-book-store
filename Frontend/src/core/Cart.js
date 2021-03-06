import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import { getCart } from "./cartHelpers";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />

        {items.map((p, i) => (
          <div className='col-8'>
            <Card 
            key={i}
            product={p}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        
          </div>
          
          
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        {" "}
        Your cart is empty. <br /> <Link to="/shop"> Continue shopping</Link>
      </h2>
    );
  };

  return (
    <Layout
      title="Shopping Cart"
      description="Manage you cart items - add, remove, checkout or continue shopping "
      className="container-fluid"
    >
      <br/>
      <div className="row">
        <div className = 'col-5 d-flex justify-content-center'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-4">
          <h2 className = "mb-4"> Your cart summary</h2>
          <hr/>
          <Checkout products = {items} setRun={setRun} run={run}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
