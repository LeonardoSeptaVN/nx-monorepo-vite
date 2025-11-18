// 'use client';

// import React, { useState } from 'react';
// import { Trash2, Plus, Calculator } from 'lucide-react';
// import { Button, Input, Heading, Label } from '@nx-monorepo/ui';

// interface Order {
//   id: number;
//   name: string;
//   items: string;
//   price: number;
// }

// interface Calculation extends Order {
//   orderPrice: number;
//   additional: number;
//   total: number;
// }

// interface Results {
//   calculations: Calculation[];
//   subtotal: number;
//   taxAmount: number;
//   serviceAmount: number;
//   deliveryFee: number;
//   totalBill: number;
// }

// export default function SplitBillCalculator() {
//   const [orders, setOrders] = useState<Order[]>([
//     { id: 1, name: '', items: '', price: 0 },
//   ]);
//   const [tax, setTax] = useState<number>(0);
//   const [deliveryFee, setDeliveryFee] = useState<number>(0);
//   const [serviceCharge, setServiceCharge] = useState<number>(0);
//   const [results, setResults] = useState<Results | null>(null);
//   const [taxMode, setTaxMode] = useState<'percent' | 'nominal'>('percent');
//   const [serviceMode, setServiceMode] = useState<'percent' | 'nominal'>(
//     'percent'
//   );

//   const addOrder = () => {
//     setOrders([...orders, { id: Date.now(), name: '', items: '', price: 0 }]);
//   };

//   const removeOrder = (id: number) => {
//     if (orders.length > 1) {
//       setOrders(orders.filter((order) => order.id !== id));
//     }
//   };

//   const updateOrder = (
//     id: number,
//     field: keyof Order,
//     value: string | number
//   ) => {
//     setOrders(
//       orders.map((order) =>
//         order.id === id ? { ...order, [field]: value } : order
//       )
//     );
//   };

//   const calculateBill = () => {
//     const subtotal = orders.reduce(
//       (sum, order) => sum + (Number(order.price) || 0),
//       0
//     );
//     const taxAmount =
//       taxMode === 'percent' ? (subtotal * Number(tax)) / 100 : Number(tax);

//     const serviceAmount =
//       serviceMode === 'percent'
//         ? (subtotal * Number(serviceCharge)) / 100
//         : Number(serviceCharge);
//     const totalBill =
//       subtotal + taxAmount + Number(deliveryFee) + serviceAmount;
//     const additionalPerPerson =
//       (taxAmount + Number(deliveryFee) + serviceAmount) / orders.length;

//     const calculations: Calculation[] = orders.map((order) => {
//       const orderPrice = Number(order.price) || 0;
//       const total = orderPrice + additionalPerPerson;
//       return {
//         ...order,
//         orderPrice,
//         additional: additionalPerPerson,
//         total,
//       };
//     });

//     setResults({
//       calculations,
//       subtotal,
//       taxAmount,
//       serviceAmount,
//       deliveryFee: Number(deliveryFee),
//       totalBill,
//     });
//   };

//   const formatRupiah = (number: number): string => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(number);
//   };

//   const resetCalculator = () => {
//     setOrders([{ id: 1, name: '', items: '', price: 0 }]);
//     setTax(0);
//     setDeliveryFee(0);
//     setServiceCharge(0);
//     setResults(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//           <Heading
//             size="h1"
//             className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center"
//           >
//             Split Bill Calculator
//           </Heading>
//           <p className="text-gray-600 text-center mb-8">
//             Hitung tagihan bersama dengan mudah
//           </p>

//           {/* Orders Section */}
//           <div className="space-y-4 mb-6">
//             <Heading
//               size="h2"
//               className="text-xl font-semibold text-gray-700 flex items-center gap-2"
//             >
//               <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
//                 1
//               </span>
//               Daftar Pesanan
//             </Heading>

//             {orders.map((order, index) => (
//               <div
//                 key={order.id}
//                 className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <span className="font-medium text-gray-700">
//                     Pesanan #{index + 1}
//                   </span>
//                   {orders.length > 1 && (
//                     <Button
//                       onClick={() => removeOrder(order.id)}
//                       className="text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       <Trash2 size={20} />
//                     </Button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                   <div>
//                     <Label className="block text-sm font-medium text-gray-700 mb-1">
//                       Nama Pemesan
//                     </Label>
//                     <Input
//                       type="text"
//                       value={order.name}
//                       onChange={(value) => updateOrder(order.id, 'name', value)}
//                       placeholder="Masukkan nama"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <Label className="block text-sm font-medium text-gray-700 mb-1">
//                       Item Pesanan
//                     </Label>
//                     <Input
//                       type="text"
//                       value={order.items}
//                       onChange={(value) =>
//                         updateOrder(order.id, 'items', value)
//                       }
//                       placeholder="Nasi Goreng, Teh"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <Label className="block text-sm font-medium text-gray-700 mb-1">
//                       Harga (Rp)
//                     </Label>
//                     <Input
//                       type="number"
//                       value={order.price}
//                       onChange={(value) =>
//                         updateOrder(order.id, 'price', value)
//                       }
//                       placeholder="0"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <Button
//               onClick={addOrder}
//               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
//             >
//               <Plus size={20} />
//               Tambah Pesanan
//             </Button>
//           </div>

//           {/* Additional Charges Section */}
//           <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200 mb-6">
//             <Heading
//               size="h2"
//               className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2"
//             >
//               <span className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
//                 2
//               </span>
//               Biaya Tambahan
//             </Heading>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label className="block text-sm font-medium text-gray-700 mb-1">
//                   Pajak
//                 </Label>

//                 <div className="flex gap-2">
//                   <select
//                     className="border border-gray-300 rounded-lg px-2"
//                     value={taxMode}
//                     onChange={(e) =>
//                       setTaxMode(e.target.value as 'percent' | 'nominal')
//                     }
//                   >
//                     <option value="percent">%</option>
//                     <option value="nominal">Rp</option>
//                   </select>

//                   <Input
//                     type="number"
//                     value={tax}
//                     onChange={(value) => setTax(Number(value) || 0)}
//                     placeholder={taxMode === 'percent' ? '10' : '1000'}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label className="block text-sm font-medium text-gray-700 mb-1">
//                   Biaya Kirim (Rp)
//                 </Label>
//                 <Input
//                   type="number"
//                   value={deliveryFee}
//                   onChange={(value) => setDeliveryFee(Number(value) || 0)}
//                   placeholder="0"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <Label className="block text-sm font-medium text-gray-700 mb-1">
//                   Service Charge
//                 </Label>

//                 <div className="flex gap-2">
//                   <select
//                     className="border border-gray-300 rounded-lg px-2"
//                     value={serviceMode}
//                     onChange={(e) =>
//                       setServiceMode(e.target.value as 'percent' | 'nominal')
//                     }
//                   >
//                     <option value="percent">%</option>
//                     <option value="nominal">Rp</option>
//                   </select>

//                   <Input
//                     type="number"
//                     value={serviceCharge}
//                     onChange={(value) => setServiceCharge(Number(value) || 0)}
//                     placeholder={serviceMode === 'percent' ? '5' : '1000'}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Calculate Button */}
//           <Button
//             onClick={calculateBill}
//             className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
//           >
//             <Calculator size={24} />
//             Hitung Total Tagihan
//           </Button>

//           {/* Results Section */}
//           {results && (
//             <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
//               <Heading
//                 size="h2"
//                 className="text-2xl font-bold text-gray-800 mb-4"
//               >
//                 Hasil Perhitungan
//               </Heading>

//               {/* Individual Bills */}
//               <div className="space-y-3 mb-6">
//                 {results.calculations.map((calc, index) => (
//                   <div key={calc.id} className="bg-white rounded-lg p-4 shadow">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <Heading size="h3" className="font-bold text-gray-800">
//                           {calc.name || `Pesanan #${index + 1}`}
//                         </Heading>
//                         <p className="text-sm text-gray-600">{calc.items}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-green-600">
//                           {formatRupiah(calc.total)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       <div className="flex justify-between">
//                         <span>Harga pesanan:</span>
//                         <span>{formatRupiah(calc.orderPrice)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Biaya tambahan:</span>
//                         <span>{formatRupiah(calc.additional)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Summary */}
//               <div className="bg-white rounded-lg p-4 shadow-md">
//                 <h3 className="font-bold text-gray-800 mb-3">Ringkasan</h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span>Subtotal:</span>
//                     <span className="font-medium">
//                       {formatRupiah(results.subtotal)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Pajak:</span>
//                     <span className="font-medium">
//                       {formatRupiah(results.taxAmount)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Service Charge:</span>
//                     <span className="font-medium">
//                       {formatRupiah(results.serviceAmount)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Biaya Kirim:</span>
//                     <span className="font-medium">
//                       {formatRupiah(results.deliveryFee)}
//                     </span>
//                   </div>
//                   <div className="border-t-2 border-gray-300 pt-2 mt-2">
//                     <div className="flex justify-between text-lg font-bold">
//                       <span>TOTAL:</span>
//                       <span className="text-green-600">
//                         {formatRupiah(results.totalBill)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Button
//                 onClick={resetCalculator}
//                 className="w-full mt-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
//                 label="Hitung Ulang"
//               ></Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
