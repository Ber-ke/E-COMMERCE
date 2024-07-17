import {Button, message, Popconfirm, Space, Table} from "antd";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CategoryPage = () => {

    const URL = import.meta.env.VITE_API_BASE_URL;

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchCategory = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/categories`);
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
    const deleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                message.success("Kategori Başarıyla Silindi.");
                fetchCategory();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.log("Silme hatası", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const columns = [
        {
            title: 'Kategori Görseli',
            dataIndex: 'img',
            key: 'img',
            render: (imgSrc) => (
                <img src={imgSrc} alt="Image" width={100}/>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{text}</b>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" primary onClick={() => navigate(`/admin/categories/update/${record._id}`)}>Düzenle</Button>
                    <Popconfirm
                        title="Kategoriyi Sil"
                        description="Kategoriyi silmek istediğinizden emin misiniz?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteCategory(record._id)}
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

export default CategoryPage;