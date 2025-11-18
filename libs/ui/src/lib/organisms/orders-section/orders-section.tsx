// libs/ui/src/lib/organisms/OrdersSection/OrdersSection.tsx
import React from 'react';

import { Plus } from 'lucide-react';
import { Button } from '../../atoms/button/button';
import { Heading } from '../../atoms/heading/heading';
import { OrderForm, Order } from '../../molecules/order-form/order-form';

export interface OrdersSectionProps {
  orders: Order[];
  onAddOrder: () => void;
  onUpdateOrder: (
    id: number,
    field: keyof Order,
    value: string | number
  ) => void;
  onRemoveOrder: (id: number) => void;
}

export const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  onAddOrder,
  onUpdateOrder,
  onRemoveOrder,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <Heading
        size="h2"
        className="text-xl font-semibold text-gray-700 flex items-center gap-2"
      >
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
          1
        </span>
        Daftar Pesanan
      </Heading>

      {orders.map((order, index) => (
        <OrderForm
          key={order.id}
          order={order}
          index={index}
          showDelete={orders.length > 1}
          onUpdate={onUpdateOrder}
          onDelete={onRemoveOrder}
        />
      ))}

      <Button
        onClick={onAddOrder}
        className="w-full py-3 flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Tambah Pesanan
      </Button>
    </div>
  );
};

export default OrdersSection;
