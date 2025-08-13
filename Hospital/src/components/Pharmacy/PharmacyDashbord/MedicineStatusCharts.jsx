import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
        <p className="font-medium text-gray-900">{payload[0].payload.name}</p>
        <p className="text-sm">
          <span className="text-gray-600">Quantity: </span>
          <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MedicineStatusChart({ data }) {
  const colors = ["#FACC15", "#3B82F6", "#22C55E"]; // Tailwind colors

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-indigo-900">Medicine Status</h3>
        <div className="flex space-x-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: colors[idx] }}
              ></div>
              <span className="text-xs text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E7FF" />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#4F46E5' }}
            />
            <YAxis 
              allowDecimals={false} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: '#4F46E5' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="Quantity" radius={[4, 4, 0, 0]}>
              {data.map((_, idx) => (
                <Cell key={idx} fill={colors[idx]} />
              ))}
              <LabelList 
                dataKey="value" 
                position="top" 
                fill="#4F46E5" 
                className="font-medium text-sm"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}