// libs/ui/src/lib/molecules/OrderForm/OrderForm.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Label } from '../../atoms/label/label';

export interface Order {
  id: number;
  name: string;
  items: string;
  price: number;
}

export interface OrderFormProps {
  order: Order;
  index: number;
  showDelete: boolean;
  onUpdate: (id: number, field: keyof Order, value: string | number) => void;
  onDelete: (id: number) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  order,
  index,
  showDelete,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <span className="font-medium text-gray-700">Pesanan #{index + 1}</span>
        {showDelete && (
          <Button
            onClick={() => onDelete(order.id)}
            variant="danger"
            size="sm"
            className="!p-2"
          >
            <Trash2 size={20} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label className="mb-1">Nama Pemesan</Label>
          <Input
            type="text"
            value={order.name}
            onChange={(value) => onUpdate(order.id, 'name', value)}
            placeholder="Masukkan nama"
          />
        </div>

        <div>
          <Label className="mb-1">Item Pesanan</Label>
          <Input
            type="text"
            value={order.items}
            onChange={(value) => onUpdate(order.id, 'items', value)}
            placeholder="Nasi Goreng, Teh"
          />
        </div>

        <div>
          <Label className="mb-1">Harga (Rp)</Label>
          <Input
            type="number"
            value={order.price}
            onChange={(value) => onUpdate(order.id, 'price', value)}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
