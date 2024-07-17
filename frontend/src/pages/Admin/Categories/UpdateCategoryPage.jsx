import {Button, Form, Input, message, Spin} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const UpdateCategoryPage = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const params = useParams();
    const categoryId = params.id;
    const URL = import.meta.env.VITE_API_BASE_URL;
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/categories/${categoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                message.success("Kategori Başarıyla Güncellendi.");
            } else {
                message.error("Kategori Güncellenirken hata oluştu.");
            }
        } catch (error) {
            console.log(error);
            console.log("Kategori güncelleme hatası:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSingleCategory = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/api/categories/${categoryId}`);
                if (!response.ok) {
                    throw new Error("Verileri getirme hatası");
                }
                const data = await response.json();
                if (data) {
                    form.setFieldsValue({
                        name: data.name,
                        img: data.img,
                    })
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleCategory();
    }, [URL, categoryId, form]);

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Kategori İsmi"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen kategori Adını girin!',
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
                        Güncelle
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default UpdateCategoryPage;