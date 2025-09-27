import React, { useState } from 'react';
import { Row, Col } from 'antd'; // Using Row/Col for the grid
import { Item } from '../redux/dataSlice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CardViewProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete?: (id: number) => void;
}

const CardView: React.FC<CardViewProps> = ({ items, onEdit, onDelete }) => {
  // --- STATE TO TRACK HOVER ---
  // We store the ID of the currently hovered card. It's `null` if no card is hovered.
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // --- Style Objects for our Custom Card ---
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
    position: 'relative', // Crucial for positioning the overlay
    transition: 'box-shadow 0.3s',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
  };

  const avatarStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '16px',
  };

  const nameStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.85)',
    margin: '0 0 4px 0',
  };

  const emailStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
    margin: 0,
  };

  const actionButtonStyle: React.CSSProperties = {
    height: '44px',
    width: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // --- Component JSX ---
  return (
    <Row gutter={[16, 16]}>
      {items.map((emp) => {
        // Check if the current card is the one being hovered
        const isHovered = hoveredId === emp.id;

        return (
          <Col key={emp.id} xs={24} sm={12} md={8} lg={6}>
            <div
              style={{
                ...cardStyle,
                // Apply a stronger shadow on hover
                boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.09)',
              }}
              // --- JAVASCRIPT HOVER EVENTS ---
              onMouseEnter={() => setHoveredId(emp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Content */}
              <img
                src={emp.avatar || 'https://via.placeholder.com/150'}
                alt={`${emp.firstName} ${emp.lastName}`}
                style={avatarStyle}
              />
              <h3 style={nameStyle}>{`${emp.firstName} ${emp.lastName}`}</h3>
              <p style={emailStyle}>{emp.email}</p>

              {/* Hover Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'opacity 0.3s',
                  // --- CONDITIONAL STYLES ---
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: isHovered ? 'auto' : 'none',
                }}
              >
                {/* Edit Button */}
                <div
                  role="button"
                  onClick={() => onEdit(emp)}
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: '#1890ff', // Blue
                  }}
                >
                  <EditOutlined style={{ color: 'white', fontSize: 22 }} />
                </div>

                {/* Delete Button */}
                {onDelete && (
                  <div
                    role="button"
                    onClick={() => onDelete(emp.id)}
                    style={{
                      ...actionButtonStyle,
                      backgroundColor: '#ff4d4f', // Red
                    }}
                  >
                    <DeleteOutlined style={{ color: 'white', fontSize: 22 }} />
                  </div>
                )}
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardView;