import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Pill,
  TrendingUp,
  BarChart3,
  MoreVertical,
  Activity,
  ArrowUp,
  ArrowDown,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, percentage, color, trends }) => {
  const isPositive = percentage >= 0;
  const textColorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColorClass = isPositive ? 'bg-green-100' : 'bg-red-100';
  const iconBgClass = `bg-${color}-100`;
  const iconColorClass = `text-${color}-600`;
  
  const maxValue = trends && trends.length > 0 ? Math.max(...trends) : 1;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
          {percentage !== null && (
            <div className="flex items-center mt-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${bgColorClass} ${textColorClass} flex items-center`}>
                {isPositive ? <ArrowUp size={10} className="mr-1" /> : <ArrowDown size={10} className="mr-1" />}
                {Math.abs(percentage)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgClass} ${iconColorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {trends && trends.length > 0 && (
        <div className="mt-6">
          <div className="h-[50px] flex items-end space-x-1">
            {trends.map((value, index) => (
              <div 
                key={index}
                className={`flex-1 bg-gradient-to-t from-${color}-500 to-${color}-400 rounded-t transition-all duration-300 hover:opacity-80`}
                style={{ height: `${Math.max(10, (value / maxValue) * 100)}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>7d ago</span>
            <span>Today</span>
          </div>
        </div>
      )}
    </div>
  );
};

const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-sm text-gray-600">{item.label}</div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-100 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12 text-sm font-semibold text-gray-800 text-right">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, title, color = "blue" }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  // Create SVG path
  const pathData = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 280;
    const y = 200 - ((value - minValue) / range) * 180;
    return `${index === 0 ? 'M' : 'L'} ${x + 10} ${y + 10}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last 12 months</span>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <svg width="300" height="220" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line 
              key={i}
              x1="10" 
              y1={10 + i * 45} 
              x2="290" 
              y2={10 + i * 45}
              stroke="#f3f4f6" 
              strokeWidth="1"
            />
          ))}
          
          {/* Area under curve */}
          <path
            d={`${pathData} L 290 210 L 10 210 Z`}
            fill={`url(#gradient-${color})`}
            opacity="0.1"
          />
          
          {/* Main line */}
          <path
            d={pathData}
            stroke={color === 'blue' ? '#3b82f6' : '#10b981'}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 280 + 10;
            const y = 210 - ((value - minValue) / range) * 180;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color === 'blue' ? '#3b82f6' : '#10b981'}
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color === 'blue' ? '#3b82f6' : '#10b981'} />
              <stop offset="100%" stopColor={color === 'blue' ? '#93c5fd' : '#86efac'} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Month labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
            <span key={month} className="w-6 text-center">{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [patientsRes, doctorsRes, medicinesRes, appointmentsRes] = await Promise.all([
        fetch('http://localhost:8080/admin/getAllPatient', { credentials: 'include' }),
        fetch('http://localhost:8080/admin/getAllDoctors', { credentials: 'include' }),
        fetch('http://localhost:8080/admin/getAllMedicines', { credentials: 'include' }),
        fetch('http://localhost:8080/admin/getAllAppoinments', { credentials: 'include' }),
      ]);

      if (!patientsRes.ok) throw new Error(`Patients fetch failed: ${patientsRes.status}`);
      if (!doctorsRes.ok) throw new Error(`Doctors fetch failed: ${doctorsRes.status}`);
      if (!medicinesRes.ok) throw new Error(`Medicines fetch failed: ${medicinesRes.status}`);
      if (!appointmentsRes.ok) throw new Error(`Appointments fetch failed: ${appointmentsRes.status}`);

      const [patientsData, doctorsData, medicinesData, appointmentsData] = await Promise.all([
        patientsRes.json(),
        doctorsRes.json(),
        medicinesRes.json(),
        appointmentsRes.json(),
      ]);

      setPatients(patientsData.data || []);
      setDoctors(doctorsData.data || []);
      setMedicines(medicinesData.data || []);
      setAppointments(appointmentsData.data || []);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Improved month trend calculation using appointment dates
  const generateMonthlyTrends = (dataArray, dateField = 'date') => {
    if (!dataArray || dataArray.length === 0) return Array(12).fill(0);
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Initialize array for 12 months
    const monthCounts = Array(12).fill(0);
    
    // Count items by month
    dataArray.forEach(item => {
      let itemDate;
      
      // Handle different date field structures
      if (item.appointment && item.appointment[dateField]) {
        itemDate = new Date(item.appointment[dateField]);
      } else if (item[dateField]) {
        itemDate = new Date(item[dateField]);
      } else if (item.createdAt) {
        itemDate = new Date(item.createdAt);
      } else {
        return; // Skip if no date found
      }
      
      // Only count if it's a valid date and within the current year
      if (!isNaN(itemDate.getTime()) && itemDate.getFullYear() === currentYear) {
        const month = itemDate.getMonth();
        monthCounts[month]++;
      }
    });
    
    // Return months in order from Jan to Dec for current year
    return monthCounts;
  };

  // Calculate appointment trends specifically from appointment dates
  const getAppointmentTrends = () => {
    if (!appointments || appointments.length === 0) return Array(12).fill(0);
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const monthCounts = Array(12).fill(0);
    
    appointments.forEach(appointment => {
      // Check different possible date locations
      let appointmentDate;
      
      if (appointment.date) {
        appointmentDate = new Date(appointment.date);
      } else if (appointment.appointment && appointment.appointment.date) {
        appointmentDate = new Date(appointment.appointment.date);
      } else if (appointment.createdAt) {
        appointmentDate = new Date(appointment.createdAt);
      }
      
      if (appointmentDate && !isNaN(appointmentDate.getTime()) && appointmentDate.getFullYear() === currentYear) {
        const month = appointmentDate.getMonth();
        monthCounts[month]++;
      }
    });
    
    return monthCounts;
  };

  // Calculate metrics from actual data
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => {
    const appointmentDate = a.date || (a.appointment && a.appointment.date);
    return appointmentDate === today;
  });
  
  const availableDoctors = doctors.filter(d => d.available || d.status === 'available');
  const lowStockMedicines = medicines.filter(m => (m.stock || m.quantity || 0) < 20);
  const completedAppointments = appointments.filter(a => {
    const status = a.status || (a.appointment && a.appointment.status);
    return status === 'completed' || status === 'done';
  });
  const completionRate = appointments.length > 0 ? Math.round((completedAppointments.length / appointments.length) * 100) : 0;

  // Calculate previous month percentage changes
  const calculatePercentageChange = (monthlyData) => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentValue = monthlyData[currentMonth] || 0;
    const lastValue = monthlyData[lastMonth] || 0;
    
    if (lastValue === 0) return currentValue > 0 ? 100 : 0;
    return Math.round(((currentValue - lastValue) / lastValue) * 100);
  };

  // Generate department/specialty data for bar chart
  const getDepartmentStats = () => {
    const departments = {};
    doctors.forEach(doctor => {
      const dept = doctor.specialty || doctor.department || 'General';
      departments[dept] = (departments[dept] || 0) + 1;
    });
    
    return Object.entries(departments)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  };

  // Get monthly trends for different data types
  const patientTrends = generateMonthlyTrends(patients);
  const appointmentTrends = getAppointmentTrends();
  const doctorTrends = generateMonthlyTrends(doctors);
  const medicineTrends = generateMonthlyTrends(medicines);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <p className="mt-6 text-lg text-gray-600">Loading dashboard data...</p>
        <div className="mt-2 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <div className="rounded-full bg-red-100 p-4 w-20 h-20 flex items-center justify-center mx-auto">
          <Activity className="text-red-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-6">Connection Error</h2>
        <p className="text-gray-600 mt-3 leading-relaxed">{error}</p>
        <button
          onClick={fetchData}
          className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Healthcare Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time overview of your healthcare management system</p>
          </div>
          <div className="flex items-center space-x-3">
           
            <button 
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <TrendingUp size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={Users} 
          title="Total Patients" 
          value={patients.length} 
          percentage={calculatePercentageChange(patientTrends)}
          color="blue"
          trends={patientTrends.slice(-7)}
        />
        <MetricCard 
          icon={UserCheck} 
          title="Active Doctors" 
          value={doctors.length} 
          percentage={calculatePercentageChange(doctorTrends)}
          color="green"
          trends={doctorTrends.slice(-7)}
        />
        <MetricCard 
          icon={Pill} 
          title="Medicines Available" 
          value={medicines.length} 
          percentage={calculatePercentageChange(medicineTrends)}
          color="purple"
          trends={medicineTrends.slice(-7)}
        />
        <MetricCard 
          icon={Calendar} 
          title="Total Appointments" 
          value={appointments.length} 
          percentage={calculatePercentageChange(appointmentTrends)}
          color="orange"
          trends={appointmentTrends.slice(-7)}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 mb-8">
        {/* Department Distribution */}
        {doctors.length > 0 && (
          <BarChart 
            data={getDepartmentStats()}
            title="Doctors by Department"
          />
        )}
        
        {/* If no doctors, show medicine trends */}
        {doctors.length === 0 && (
          <LineChart 
            data={medicineTrends} 
            title="Medicine Inventory Trends"
            color="green"
          />
        )}
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Available Doctors */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <UserCheck size={24} />
            </div>
            <Eye size={16} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Available Doctors</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-gray-800">{availableDoctors.length}</h3>
              <span className="text-sm text-gray-500">/ {doctors.length}</span>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 rounded-full h-2 transition-all duration-500"
                style={{ width: doctors.length > 0 ? `${(availableDoctors.length / doctors.length) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <Pill size={24} />
            </div>
            <div className={`w-3 h-3 rounded-full ${lowStockMedicines.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Low Stock Medicines</p>
            <h3 className="text-2xl font-bold text-gray-800">{lowStockMedicines.length}</h3>
            <p className="text-xs text-gray-500 mt-2">
              {lowStockMedicines.length > 0 ? 'Action Required' : 'All medicines in stock'}
            </p>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Calendar size={24} />
            </div>
            <Clock size={16} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Today's Appointments</p>
            <h3 className="text-2xl font-bold text-gray-800">{todayAppointments.length}</h3>
            <p className="text-xs text-gray-500 mt-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <CheckCircle size={24} />
            </div>
            <TrendingUp size={16} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Appointment Completion</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-gray-800">{completionRate}%</h3>
              <span className="text-sm text-gray-500">({completedAppointments.length}/{appointments.length})</span>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Monthly Appointment Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {appointmentTrends.map((count, index) => {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const isCurrentMonth = index === new Date().getMonth();
            
            return (
              <div key={index} className={`text-center p-3 rounded-lg ${isCurrentMonth ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                <div className={`text-xl font-bold ${isCurrentMonth ? 'text-blue-600' : 'text-gray-800'}`}>{count}</div>
                <div className={`text-sm ${isCurrentMonth ? 'text-blue-500' : 'text-gray-500'}`}>{monthNames[index]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-gray-600">Registered Patients</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{appointments.length}</div>
            <div className="text-sm text-gray-600">Total Appointments</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{medicines.length}</div>
            <div className="text-sm text-gray-600">Medicine Inventory</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;