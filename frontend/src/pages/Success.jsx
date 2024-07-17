import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {CartContext} from "../Context/CartProvider.jsx";

const Success = () => {

    const {setCartItems} = useContext(CartContext);

    useEffect(() => {
        setCartItems([]);
    }, [setCartItems]);

    return (
        <div className="success-page">
            <div className="container">
                <Result
                    status="success"
                    title="Ödeme Başarılı!"
                    subTitle="Süparişiniz Başarıyla Tamamlandı"
                    extra={[
                        <Link to={"/"} key="home">
                            <Button type="primary">Ana Sayfa</Button>
                        </Link>,
                        <a href="/admin/orders">
                            <Button key="buy">Siparişlerim</Button>
                        </a>
                    ]}
                />
            </div>
        </div>
    );
};

export default Success;