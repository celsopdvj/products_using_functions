import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import Card from "../Card/Card";
import "./Product.css"
import { Link } from "react-router-dom";

function Product() {

    const [products, setProducts] = useState(null)

    useEffect(() => {
        api
            .get("/products")
            .then(response => setProducts(response.data))
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <>
            <header>
                <Link className="button" to="/NewProduct">New Product</Link>
            </header>

            {products === null ?
                <div>Loading...</div> :
                products.length === 0 ?
                    <div>No products</div> :
                    <div className="row">
                        {products.map(p => {
                            return <Card key={p.id} product={p} />
                        })}
                    </div>
            }
        </>
    )

}

export default Product;