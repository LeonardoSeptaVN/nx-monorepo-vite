'use client';

import React, { useState } from 'react';
import { Trash2, Plus, Calculator } from 'lucide-react';

interface Order {
  id: number;
  name: string;
  items: string;
  price: number;
}

interface Calculation extends Order {
  orderPrice: number;
  additional: number;
  total: number;
}

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
    const taxAmount = (subtotal * Number(tax)) / 100;
    const serviceAmount = (subtotal * Number(serviceCharge)) / 100;
    const totalBill =
      subtotal + taxAmount + Number(deliveryFee) + serviceAmount;
    const additionalPerPerson =
      (taxAmount + Number(deliveryFee) + serviceAmount) / orders.length;

    const calculations: Calculation[] = orders.map((order) => {
      const orderPrice = Number(order.price) || 0;
      const total = orderPrice + additionalPerPerson;
      return {
        ...order,
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            Split Bill Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Hitung tagihan bersama dengan mudah
          </p>

          {/* Orders Section */}
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Daftar Pesanan
            </h2>

            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium text-gray-700">
                    Pesanan #{index + 1}
                  </span>
                  {orders.length > 1 && (
                    <button
                      onClick={() => removeOrder(order.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Pemesan
                    </label>
                    <input
                      type="text"
                      value={order.name}
                      onChange={(e) =>
                        updateOrder(order.id, 'name', e.target.value)
                      }
                      placeholder="Masukkan nama"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Pesanan
                    </label>
                    <input
                      type="text"
                      value={order.items}
                      onChange={(e) =>
                        updateOrder(order.id, 'items', e.target.value)
                      }
                      placeholder="Nasi Goreng, Teh"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={order.price}
                      onChange={(e) =>
                        updateOrder(order.id, 'price', e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addOrder}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Tambah Pesanan
            </button>
          </div>

          {/* Additional Charges Section */}
          <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Biaya Tambahan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pajak (%)
                </label>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value) || 0)}
                  placeholder="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biaya Kirim (Rp)
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Charge (%)
                </label>
                <input
                  type="number"
                  value={serviceCharge}
                  onChange={(e) =>
                    setServiceCharge(Number(e.target.value) || 0)
                  }
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateBill}
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Calculator size={24} />
            Hitung Total Tagihan
          </button>

          {/* Results Section */}
          {results && (
            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Hasil Perhitungan
              </h2>

              {/* Individual Bills */}
              <div className="space-y-3 mb-6">
                {results.calculations.map((calc, index) => (
                  <div key={calc.id} className="bg-white rounded-lg p-4 shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {calc.name || `Pesanan #${index + 1}`}
                        </h3>
                        <p className="text-sm text-gray-600">{calc.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {formatRupiah(calc.total)}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Harga pesanan:</span>
                        <span>{formatRupiah(calc.orderPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biaya tambahan:</span>
                        <span>{formatRupiah(calc.additional)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-bold text-gray-800 mb-3">Ringkasan</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">
                      {formatRupiah(results.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak:</span>
                    <span className="font-medium">
                      {formatRupiah(results.taxAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge:</span>
                    <span className="font-medium">
                      {formatRupiah(results.serviceAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Kirim:</span>
                    <span className="font-medium">
                      {formatRupiah(results.deliveryFee)}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>TOTAL:</span>
                      <span className="text-green-600">
                        {formatRupiah(results.totalBill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={resetCalculator}
                className="w-full mt-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Hitung Ulang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
