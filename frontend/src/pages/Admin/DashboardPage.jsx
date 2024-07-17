import {Row, Col, Card, Statistic, message} from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import {useEffect, useState} from "react";
import login from "../../components/Auth/Login.jsx";

const DashboardPage = () => {

    const [paymentData, setPaymentData] = useState([]);
    const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch(`https://api.stripe.com/v1/payment_intents`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setPaymentData(data.data);
                } else {
                    message.error("İşlem Başarısız!");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchPayments();
    }, [MY_STRIPE_SECRET_KEY]);

    const totalIncome = paymentData.reduce((sum, item) => sum + item.amount, 0);

    const productSalesData = [
        {name: "Ocak", satilanUrunSayisi: 10},
        {name: "Şubat", satilanUrunSayisi: 15},
        {name: "Mart", satilanUrunSayisi: 20},
        {name: "Nisan", satilanUrunSayisi: 25},
        {name: "Mayıs", satilanUrunSayisi: 30},
        {name: "Haziran", satilanUrunSayisi: 35},
    ];


    const customerData = [
        {name: "Ocak", musteriSayisi: 20},
        {name: "Şubat", musteriSayisi: 25},
        {name: "Mart", musteriSayisi: 30},
        {name: "Nisan", musteriSayisi: 10},
        {name: "Mayıs", musteriSayisi: 40},
        {name: "Haziran", musteriSayisi: 45},
    ];

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Ürün Satışı" value={paymentData.length}/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Müşteri Sayısı" value={paymentData.length}/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Gelir" value={(totalIncome / 100).toFixed(2)} prefix="$"/>
                    </Card>
                </Col>
            </Row>
            <Card style={{marginTop: "20px"}}>
                <h2>Son Aydaki Ürün Satış Artışı</h2>
                <LineChart
                    width={600}
                    height={600}
                    data={productSalesData}
                    margin={{top: 5, right: 30, bottom: 5}}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="satilanUrunSayisi"
                        stroke="#8884d8"
                        activeDot={{r: 8}}
                    />
                </LineChart>
            </Card>
            <Card style={{marginTop: "20px"}}>
                <h2>Son Aydaki Müşteri Artışı</h2>
                <LineChart
                    width={600}
                    height={300}
                    data={customerData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="musteriSayisi"
                        stroke="#82ca9d"
                        activeDot={{r: 8}}
                    />
                </LineChart>
            </Card>
        </div>
    );
};

export default DashboardPage