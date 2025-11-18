'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import {
  Button,
  Heading,
  OrdersSection,
  ChargesSection,
  ResultsSection,
  Order,
  Calculation,
} from '@nx-monorepo/ui';

interface Results {
  calculations: Calculation[];
  subtotal: number;
  taxAmount: number;
  serviceAmount: number;
  deliveryFee: number;
  totalBill: number;
}

export default function SplitBillCalculator() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, name: '', items: '', price: 0 },
  ]);
  const [tax, setTax] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const [results, setResults] = useState<Results | null>(null);
  const [taxMode, setTaxMode] = useState<'percent' | 'nominal'>('percent');
  const [serviceMode, setServiceMode] = useState<'percent' | 'nominal'>(
    'percent'
  );

  const addOrder = () => {
    setOrders([...orders, { id: Date.now(), name: '', items: '', price: 0 }]);
  };

  const removeOrder = (id: number) => {
    if (orders.length > 1) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const updateOrder = (
    id: number,
    field: keyof Order,
    value: string | number
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      )
    );
  };

  const calculateBill = () => {
    const subtotal = orders.reduce(
      (sum, order) => sum + (Number(order.price) || 0),
      0
    );

    const taxAmount =
      taxMode === 'percent' ? (subtotal * Number(tax)) / 100 : Number(tax);

    const serviceAmount =
      serviceMode === 'percent'
        ? (subtotal * Number(serviceCharge)) / 100
        : Number(serviceCharge);

    const totalBill =
      subtotal + taxAmount + Number(deliveryFee) + serviceAmount;

    const additionalPerPerson =
      (taxAmount + Number(deliveryFee) + serviceAmount) / orders.length;

    const calculations: Calculation[] = orders.map((order) => {
      const orderPrice = Number(order.price) || 0;
      const total = orderPrice + additionalPerPerson;
      return {
        id: order.id,
        name: order.name,
        items: order.items,
        orderPrice,
        additional: additionalPerPerson,
        total,
      };
    });

    setResults({
      calculations,
      subtotal,
      taxAmount,
      serviceAmount,
      deliveryFee: Number(deliveryFee),
      totalBill,
    });
  };

  const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const resetCalculator = () => {
    setOrders([{ id: 1, name: '', items: '', price: 0 }]);
    setTax(0);
    setDeliveryFee(0);
    setServiceCharge(0);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <Heading
            size="h1"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center"
          >
            Split Bill Calculator
          </Heading>
          <p className="text-gray-600 text-center mb-8">
            Hitung tagihan bersama dengan mudah
          </p>

          {/* Orders Section */}
          <OrdersSection
            orders={orders}
            onAddOrder={addOrder}
            onUpdateOrder={updateOrder}
            onRemoveOrder={removeOrder}
          />

          {/* Additional Charges Section */}
          <ChargesSection
            tax={tax}
            taxMode={taxMode}
            deliveryFee={deliveryFee}
            serviceCharge={serviceCharge}
            serviceMode={serviceMode}
            onTaxChange={setTax}
            onTaxModeChange={setTaxMode}
            onDeliveryFeeChange={setDeliveryFee}
            onServiceChargeChange={setServiceCharge}
            onServiceModeChange={setServiceMode}
          />

          {/* Calculate Button */}
          <Button
            onClick={calculateBill}
            variant="success"
            className="w-full py-4 font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <Calculator size={24} />
            Hitung Total Tagihan
          </Button>

          {/* Results Section */}
          {results && (
            <ResultsSection
              calculations={results.calculations}
              subtotal={results.subtotal}
              taxAmount={results.taxAmount}
              serviceAmount={results.serviceAmount}
              deliveryFee={results.deliveryFee}
              totalBill={results.totalBill}
              formatCurrency={formatRupiah}
              onReset={resetCalculator}
            />
          )}
        </div>
      </div>
    </div>
  );
}
