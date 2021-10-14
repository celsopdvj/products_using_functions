import React from "react";
import "./Card.css"
import { Link } from "react-router-dom";
import api from "../../Services/api";

function Card(props) {

    const deleteProduct = () => {
        api
            .delete(`/products/${props.product.id}`)
            .then(response => {
                window.location = "/"
            })
            .catch(err =>
                console.error(err)
            )
    }

    return (
        <div className="el-wrapper">
            <div className="box-up">
                <img className="img" src={props.product.image} alt="" />
                <div className="img-info">
                    <div className="info-inner">
                        <span className="p-name">{props.product.description}</span>
                        <span className="p-company">{props.product.brand}</span>
                        <button className="p-company" onClick={deleteProduct}>X</button>
                    </div>
                </div>
            </div>

            <div className="box-down">
                <div className="h-bg">
                    <div className="h-bg-inner"></div>
                </div>

                <Link className="cart" to={{
                    pathname: "/NewProduct",
                    state: {
                        product: {
                            id: props.product.id,
                            description: props.product.description,
                            image: props.product.image,
                            brand: props.product.brand,
                            price: props.product.price
                        }
                    }
                }}>
                    <span className="price">R${props.product.price}</span>
                    <span className="add-to-cart">
                        <span className="txt">Edit</span>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Card;