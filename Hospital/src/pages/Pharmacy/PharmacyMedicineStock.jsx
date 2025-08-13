// src/App.js
import React, { useState, useEffect } from 'react';
import Header from '../../components/Pharmacy/PharmacyMedicineStock/Header';
import StatsCards from '../../components/Pharmacy/PharmacyMedicineStock/StatsCards';
import StockChart from '../../components/Pharmacy/PharmacyMedicineStock/StockChart';
import MedicineTable from '../../components/Pharmacy/PharmacyMedicineStock/MedicineTable';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [medicines, setMedicines] = useState([]);
  
  // Mock data for medicines
  useEffect(() => {
    const demoStock = [
      { id: 1, name: "Amoxicillin 500mg", category: "Antibiotics", stock: 320, reorderLevel: 100 },
      { id: 2, name: "Ciprofloxacin 250mg", category: "Antibiotics", stock: 80, reorderLevel: 120 },
      { id: 3, name: "Paracetamol 1g", category: "Painkillers", stock: 540, reorderLevel: 200 },
      { id: 4, name: "Ibuprofen 200mg", category: "Painkillers", stock: 90, reorderLevel: 150 },
      { id: 5, name: "Cetirizine 10mg", category: "Antihistamines", stock: 40, reorderLevel: 60 },
      { id: 6, name: "Loratadine 10mg", category: "Antihistamines", stock: 0, reorderLevel: 50 },
      { id: 7, name: "Omeprazole 20mg", category: "Gastro", stock: 210, reorderLevel: 120 },
      { id: 8, name: "Metformin 500mg", category: "Diabetes", stock: 35, reorderLevel: 100 },
      { id: 9, name: "Aspirin 81mg", category: "Painkillers", stock: 180, reorderLevel: 150 },
      { id: 10, name: "Lisinopril 10mg", category: "Cardiovascular", stock: 65, reorderLevel: 100 },
      { id: 11, name: "Atorvastatin 20mg", category: "Cardiovascular", stock: 95, reorderLevel: 80 },
      { id: 12, name: "Levothyroxine 50mcg", category: "Hormones", stock: 120, reorderLevel: 100 },
    ];
    
    setMedicines(demoStock);
  }, []);
  
  // Calculate statistics
  const stats = {
    inStock: medicines.filter(m => m.stock > m.reorderLevel).length,
    lowStock: medicines.filter(m => m.stock <= m.reorderLevel && m.stock > 0).length,
    outOfStock: medicines.filter(m => m.stock === 0).length
  };
  
  // Filter medicines based on search and category
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Prepare chart data
  const chartData = {};
  medicines.forEach(medicine => {
    if (!chartData[medicine.category]) {
      chartData[medicine.category] = 0;
    }
    chartData[medicine.category] += medicine.stock;
  });
  
  const chartDataArray = Object.entries(chartData).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <StatsCards stats={stats} />
        
        <StockChart data={chartDataArray} />
        
        <MedicineTable medicines={filteredMedicines} />
        
        <footer className="text-center text-sm text-indigo-500 py-6">
          <p>Pharmacy Inventory System • Updated 2 hours ago</p>
        </footer>
      </div>
    </div>
  );
}

export default App;