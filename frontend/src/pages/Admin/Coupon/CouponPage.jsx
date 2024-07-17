import {Button, message, Popconfirm, Space, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CouponPage = () => {

    const URL = import.meta.env.VITE_API_BASE_URL;

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchCoupon = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/coupons`);
            if (response.ok) {
                const data = await response.json();
                setDataSource(data);
            } else {
                message.error("İşlem Başarısız!");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [URL]);
    const deleteCoupon = async (couponId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/coupons/${couponId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                message.success("Kupon Başarıyla Silindi.");
                fetchCoupon();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.log("Silme hatası", error);
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, [fetchCoupon]);

    const columns = [
        {
            title: 'Kopun Kodu',
            dataIndex: 'code',
            key: 'code',
            render: (code) => <b>{code}</b>,
        },
        {
            title: 'İndirim Oranı',
            dataIndex: 'discountPercent',
            key: 'discountPercent',
            render: (text) => <span>%{text}</span>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" primary
                            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}>Edit</Button>
                    <Popconfirm
                        title="Kategoriyi Sil"
                        description="Kategoriyi silmek istediğinizden emin misiniz?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteCoupon(record._id)}
                    >
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Table dataSource={dataSource} columns={columns} rowKey={(record) => record._id} loading={loading}/>
    );
};

export default CouponPage;