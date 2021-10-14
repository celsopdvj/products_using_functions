import React from 'react'
import "./NewProduct.css"
import { Link } from "react-router-dom";
import api from "../../Services/api"
import { useState } from "react"

function NewProduct(props) {

    const [product, setProduct] = useState({
        description: props?.location?.state?.product?.description ?? "",
        brand: props?.location?.state?.product?.brand ?? "",
        price: props?.location?.state?.product?.price ?? "",
        image: props?.location?.state?.product?.image ?? "",
        id: props?.location?.state?.product?.id ?? ""
    })

    const submitToApi = (event) => {
        event.preventDefault();

        if (product.id === "") {
            api
                .post("/products", {
                    description: product.description,
                    brand: product.brand,
                    price: product.price,
                    image: product.image,
                })
                .then(response => {
                    window.location = "/"
                })
                .catch(err =>
                    console.error(err)
                )
        } else {
            api
                .patch(`/products/${product.id}`, {
                    description: product.description,
                    brand: product.brand,
                    price: product.price,
                    image: product.image,
                })
                .then(response => {
                    window.location = "/"
                })
                .catch(err =>
                    console.error(err)
                )
        }
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <header>
                <Link className="button" to="/">Back</Link>
            </header>
            <div className="form-wrapper">
                <form onSubmit={submitToApi}>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" name="description" placeholder="Product description" value={product.description} onChange={handleInputChange} />

                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" name="brand" placeholder="Product brand" value={product.brand} onChange={handleInputChange} />

                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" placeholder="Product price" value={product.price} onChange={handleInputChange} />

                    <label htmlFor="image">Image</label>
                    <input type="text" id="image" name="image" placeholder="Link to product image" value={product.image} onChange={handleInputChange} />

                    <input type="submit" value={product.id === "" ? "Create" : "Update"} />
                </form>
            </div>
        </>
    )
}

export default NewProduct
