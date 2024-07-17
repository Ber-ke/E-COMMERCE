import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CartProvider from "./Context/CartProvider.jsx";
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./layouts/Layout.jsx";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './index.css'
import ScrollToUp from "./components/ScrollToUp.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ScrollToUp/>
        <CartProvider>
            <Layout>
                <App/>
            </Layout>
        </CartProvider>
    </BrowserRouter>
)
