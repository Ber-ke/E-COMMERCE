import {Button, Form, Input, message, Spin} from "antd";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const UpdateCouponPage = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const params = useParams();
    const couponId = params.id;
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_API_BASE_URL;
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/coupons/${couponId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success("Kupon Başarıyla Güncellendi.");
                navigate("/admin/coupons");
            } else {
                message.error("Kupon Güncellenirken hata oluştu.");
            }
        } catch (error) {
            console.log(error);
            console.log("Kupon güncelleme hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSingleCoupon = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/api/coupons/${couponId}`);
                if (!response.ok) {
                    throw new Error("Verileri getirme hatası");
                }
                const data = await response.json();
                if (data) {
                    form.setFieldsValue({
                        code: data.code,
                        discountPercent: data.discountPercent,
                    })
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleCoupon();
    }, [URL, couponId, form]);

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Kupon Kodu"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen kupon kodu girin!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="İndirim Oranı"
                    name="discountPercent"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen indirim oranını girin!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default UpdateCouponPage;