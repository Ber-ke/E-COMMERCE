import {Button, Form, Input, message, Spin} from "antd";
import {useState} from "react";

const CreateCategoryPage = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const URL = import.meta.env.VITE_API_BASE_URL;
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success("Kategori Başarıyla Oluşturuldu.");
                form.resetFields();
            } else {
                message.error("Kategori Oluşturulurken hata oluştu.");
            }
        } catch (error) {
            console.log(error);
            console.log("Kategori güncelleme hatası:", error);
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
                    label="Ürün İsmi"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen ürün Adını girin!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Kategori Görseli (Link)"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen kategori görsel linkini girin!',
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

export default CreateCategoryPage;