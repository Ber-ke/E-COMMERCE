import "./Cart.css";
import CartProgress from "./CartProgress.jsx";
import CartTable from "./CartTable.jsx";
import CartCoupon from "./CartCoupon.jsx";
import CartTotals from "./CartTotals.jsx";
import {useContext} from "react";
import {CartContext} from "../../Context/CartProvider.jsx";
const Cart = () => {

    const {cartItems} = useContext(CartContext);

    return (
        <section className="cart-page">
            <div className="container">
                {cartItems.length > 0 ? <div className="cart-page-wrapper">
                    <form className="cart-form">
                        <CartProgress/>
                        <div className="shop-table-wrapper">
                            <CartTable/>
                            <CartCoupon/>
                        </div>
                    </form>
                    <CartTotals/>
                </div> : <h3>Sepette Hiç Ürün Yok !</h3>}
            </div>
        </section>
    );
};

export default Cart;