import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, addItem, updateItem, deleteItem, Item } from "../redux/dataSlice";
import { Button, Modal, Pagination, Segmented, Input, Space } from "antd";
import { TableOutlined, AppstoreOutlined, LogoutOutlined } from "@ant-design/icons";
import ListView from "../components/ListView";
import CardView from "../components/CardView";
import ItemForm from "../components/ItemForm";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.data);

  const [view, setView] = useState<"Card" | "Table">("Table");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddEdit = (values: any) => {
    const itemWithAvatar = { ...values, avatar: values.avatar || "https://via.placeholder.com/150" };
    if (editingItem) {
      dispatch(updateItem({ ...editingItem, ...itemWithAvatar }));
    } else {
      const newItem: Item = { id: items.length + 100, ...itemWithAvatar };
      dispatch(addItem(newItem));
    }
    setEditingItem(null);
    setModalOpen(false);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  // --- Filter items based on search ---
  const filteredItems = items.filter((item) =>
    `${item.firstName} ${item.lastName} ${item.email}`.toLowerCase().includes(searchText.toLowerCase())
  );

  // --- Pagination ---
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Users</h2>
          <Space>
            <Search
              placeholder="Search users"
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1); // reset to first page when search changes
              }}
            />
            <Button type="primary" onClick={() => setModalOpen(true)}>
              Create User
            </Button>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </div>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Segmented
            options={[
              { label: "Table", value: "Table", icon: <TableOutlined /> },
              { label: "Card", value: "Card", icon: <AppstoreOutlined /> },
            ]}
            value={view}
            onChange={(value) => setView(value as "Card" | "Table")}
          />
        </div>

        {view === "Card" ? (
          <CardView items={paginatedItems} onEdit={handleEdit} onDelete={(id) => dispatch(deleteItem(id))} />
        ) : (
          <ListView items={paginatedItems} onEdit={handleEdit} onDelete={(id) => dispatch(deleteItem(id))} />
        )}

        {filteredItems.length > pageSize && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredItems.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        <Modal
          title={editingItem ? "Edit User" : "Create User"}
          open={modalOpen}
          footer={null}
          onCancel={() => {
            setModalOpen(false);
            setEditingItem(null);
          }}
        >
          <ItemForm item={editingItem} onSubmit={handleAddEdit} />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
