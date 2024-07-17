import {Button, message, Popconfirm, Table} from "antd";
import {useCallback, useEffect, useState} from "react";

const UserPage = () => {

    const URL = import.meta.env.VITE_API_BASE_URL;

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}/api/user`);
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
    const deleteUser = async (userEmail) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/${userEmail}`, {
                method: "DELETE"
            });
            if (response.ok) {
                message.success("Kullanıcı Başarıyla Silindi.");
                fetchUsers();
            } else {
                message.error("Silme işlemi başarısız.");
            }
        } catch (error) {
            console.log("Silme hatası", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (imgSrc) => (
                <img src={imgSrc} alt="" style={{width: "50px", borderRadius: "50%", height: "50px"}}/>
            )
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Kullanıcıyı Sil"
                    description="Kullanıcıyı silmek istediğinizden emin misiniz?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteUser(record.email)}
                >
                    <Button type="primary" danger>Delete</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <Table dataSource={dataSource} columns={columns} rowKey={(record) => record._id} loading={loading}/>
    );
};

export default UserPage;