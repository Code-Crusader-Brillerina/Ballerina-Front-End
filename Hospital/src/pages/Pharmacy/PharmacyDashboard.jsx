import React, { useEffect, useState, useMemo } from "react";
import MedicineStatusChart from "../../components/Pharmacy/PharmacyDashbord/MedicineStatusCharts";

const demoItems = [
  { id: 1, name: "Amoxicillin 600mg", status: "processing", qty: 120 },
  { id: 2, name: "Paracetamol 1g", status: "sending", qty: 80 },
  { id: 3, name: "Ibuprofen 200mg", status: "received", qty: 300 },
  { id: 4, name: "Aspirin 100mg", status: "processing", qty: 60 },
];

const doctorList = [
  { id: 1, name: "Dr. Maya Fornado", specialization: "Cardiologist" },
  { id: 2, name: "Dr. Liam Smith", specialization: "Dermatologist" },
  { id: 3, name: "Dr. Sarah Johnson", specialization: "Pediatrician" },
  { id: 4, name: "Dr. Michael Lee", specialization: "Neurologist" },
];

const statusColors = {
  processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
  sending: "bg-blue-100 text-blue-800 border-blue-300",
  received: "bg-green-100 text-green-800 border-green-300",
};

const SummaryCard = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl border-l-4 ${color} shadow-sm transition-all hover:shadow-md`}>
    <div className="text-sm font-medium opacity-80">{title}</div>
    <div className="text-3xl font-bold mt-1">{value}</div>
  </div>
);

function PharmacyDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(demoItems);
  }, []);

  const counts = useMemo(() => {
    const base = { processing: 0, sending: 0, received: 0 };
    for (const it of items) base[it.status] += it.qty;
    return base;
  }, [items]);

  const chartData = [
    { name: "Processing", value: counts.processing },
    { name: "Sending", value: counts.sending },
    { name: "Received", value: counts.received },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">Pharmacy Status Dashboard</h1>
            <p className="text-indigo-700 mt-1">Track medicine inventory and doctor information</p>
          </div>
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
            <div className="text-sm text-indigo-600">Today</div>
            <div className="font-medium">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard 
            title="Processing" 
            value={counts.processing} 
            color={statusColors.processing} 
          />
          <SummaryCard 
            title="Sending" 
            value={counts.sending} 
            color={statusColors.sending} 
          />
          <SummaryCard 
            title="Received" 
            value={counts.received} 
            color={statusColors.received} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <MedicineStatusChart data={chartData} />
          
          {/* Doctor List */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-indigo-900">Doctor List</h3>
              <div className="text-sm text-indigo-500 font-medium">4 Specialists</div>
            </div>
            
            <div className="space-y-3">
              {doctorList.map((doc) => (
                <div 
                  key={doc.id} 
                  className="flex items-center p-3 rounded-lg border border-indigo-100 hover:bg-indigo-50 transition-colors"
                >
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-3">
                    {doc.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-indigo-600">{doc.specialization}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medicine List */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-lg text-indigo-900 mb-4">Medicine Inventory</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-indigo-700 border-b border-indigo-100">
                  <th className="pb-3 font-medium">Medicine</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-indigo-50 last:border-0 hover:bg-indigo-50">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDashboard;
