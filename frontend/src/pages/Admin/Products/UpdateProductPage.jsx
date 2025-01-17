import {Button, Form, Input, InputNumber, message, Select, Spin} from "antd";
import {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useNavigate, useParams} from "react-router-dom";

const UpdateProductPage = () => {

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const URL = import.meta.env.VITE_API_BASE_URL;
    const params = useParams();
    const navigate = useNavigate();
    const productId = params.id;


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [categoriesResponse, singleProductResponse] = await Promise.all([
                    fetch(`${URL}/api/categories`),
                    fetch(`${URL}/api/products/${productId}`),
                ]);
                if (!categoriesResponse.ok || !singleProductResponse.ok) {
                    message.error("Veri getirme başarısız.");
                    return;
                }

                const [categoriesData, singleProductData] = await Promise.all([
                    categoriesResponse.json(),
                    singleProductResponse.json(),
                ]);

                setCategories(categoriesData);

                if (singleProductData) {
                    form.setFieldsValue({
                        name: singleProductData.name,
                        category: singleProductData.category,
                        current: singleProductData.price.current,
                        discount: singleProductData.price.discount,
                        description: singleProductData.description,
                        img: singleProductData.img.join("\n"),
                        sizes: singleProductData.sizes.join("\n"),
                        color: singleProductData.color.join("\n"),
                    })
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [URL, productId, form]);

    console.log(categories);
    const onFinish = async (values) => {
        const imgLinks = values.img.split("\n").map((link) => link.trim());
        const color = values.color.split("\n").map((link) => link.trim());
        const sizes = values.sizes.split("\n").map((link) => link.trim());
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    price: {
                        current: values.current,
                        discount: values.discount,
                    },
                    color,
                    sizes,
                    img: imgLinks,
                }),
            });
            if (response.ok) {
                message.success("Ürün Başarıyla güncellendi.");
                form.resetFields();
                navigate("/admin/products")
            } else {
                message.error("Ürün güncellenirken hata oluştu.");
            }
        } catch (error) {
            console.log(error);
            console.log("Ürün güncelleme hatası:", error);
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
                    label="Ürün Kategorisi"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen 1 kategori seçin!',
                        },
                    ]}
                >
                    <Select>
                        {categories.map((category) => (
                            <Select.Option value={category._id} key={category._id}>{category.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Fiyat"
                    name="current"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen ürün fiyatını girin!',
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="İndirim Oranı"
                    name="discount"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen bir ürün indirim oranı girin!',
                        },
                    ]}
                >
                    <InputNumber/>
                </Form.Item>

                <Form.Item
                    label="Ürün Açıklaması"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen bir ürün indirim oranı girin!',
                        },
                    ]}
                >
                    <ReactQuill theme="snow" style={{backgroundColor: "white"}}/>
                </Form.Item>

                <Form.Item
                    label="Ürün Görselleri (Linkler)"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 4 ürün görsel linki girin!',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Her bir görsel linkini yeni bir satıra yazın."
                                    autoSize={{minRows: 4}}/>
                </Form.Item>

                <Form.Item
                    label="Ürün Bedenleri"
                    name="sizes"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 1 ürün bedeni girin!',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Her bir RGB kodu yeni bir satıra yazın."
                                    autoSize={{minRows: 4}}/>
                </Form.Item>

                <Form.Item
                    label="Ürün Renkleri (RGB Kodları)"
                    name="color"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen en az 1 beden ölçüsü girin!',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Her bir beden ölçüsünü yeni bir satıra yazın."
                                    autoSize={{minRows: 4}}/>
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

export default UpdateProductPage;