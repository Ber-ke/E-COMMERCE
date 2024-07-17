import {Button, Form, Input, message, Spin} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateCouponPage = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_API_BASE_URL;
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/coupons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success("Kupon Başarıyla Oluşturuldu.");
                form.resetFields();
                navigate("/admin/coupons");
            } else {
                message.error("Kupon Oluşturulurken hata oluştu.");
            }
        } catch (error) {
            console.log(error);
            console.log("Kupon güncelleme hatası:", error);
        } finally {
            setLoading(false);
        }
    };

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
                            message: 'Lütfen kupon kodunu giriniz !',
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
                            message: 'Lütfen kupon indirim oranını girin!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default CreateCouponPage;