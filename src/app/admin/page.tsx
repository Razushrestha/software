
"use client";
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const sidebarItems = [
  { label: 'Tutor', path: '/admin/tutor' },
  { label: 'School', path: '/admin/school' },
  { label: 'Partner', path: '/admin/partner' },
  { label: 'Attendance', path: '/admin/attendance' },
  { label: 'Activities', path: '/admin/activities' },
  { label: 'Teacher Profile', path: '/admin/teacher-profile' },
  { label: 'School Info', path: '/admin/school-info' },
  { label: 'Exam', path: '/admin/exam' },
  { label: 'Payment/Commission Partner', path: '/admin/payment-commission-partner' },
  { label: 'Schools Fees', path: '/admin/schools-fees' },
  { label: 'Hierachical', path: '/admin/hierachical' },
  { label: 'Pay Out Process', path: '/admin/pay-out-process' },
  { label: 'Components Delivery', path: '/admin/components-delivery' },
  { label: 'Complain Box', path: '/admin/complain-box' },
  { label: 'Teacher Learning Material', path: '/admin/teacher-learning-material' },
  { label: 'Progress Track', path: '/admin/progress-track' },
];


const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Activity',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.15)',
      pointBackgroundColor: '#6366f1',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#6366f1',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6366f1', font: { weight: "bold" as const } },
    },
    y: {
      grid: { color: '#e0e7ff' },
      ticks: { color: '#6366f1', font: { weight: "bold" as const } },
    },
  },
  aspectRatio: 2.2,
};

const pieData = {
  labels: ['Attendance', 'Exams', 'Payments', 'Complaints'],
  datasets: [
    {
      label: 'Overview',
      data: [300, 50, 100, 60],
      backgroundColor: [
        'rgba(59,130,246,0.8)',
        'rgba(245,158,66,0.8)',
        'rgba(16,185,129,0.8)',
        'rgba(239,68,68,0.8)',
      ],
      borderColor: [
        '#fff', '#fff', '#fff', '#fff'
      ],
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: '#6366f1',
        font: { weight: "bold" as const, size: 14 },
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: '#6366f1',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
  },
  aspectRatio: 1.7,
};

const leaderboard = [
  { name: 'John Doe', score: 98 },
  { name: 'Jane Smith', score: 95 },
  { name: 'Emily Johnson', score: 92 },
  { name: 'Michael Brown', score: 89 },
  { name: 'Sarah Lee', score: 87 },
];

export default function AdminHome() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 border-r border-blue-100 shadow-lg p-6 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Dashboard</h2>
        <nav className="flex-1 flex flex-col gap-2">
          {sidebarItems.map(item => (
            <a key={item.label} href={item.path} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 font-medium transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col gap-8 relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Welcome, Admin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Overview (Line Graph)</h3>
                <div className="w-full max-w-xl">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4 text-blue-700">Distribution (Pie Chart)</h3>
                <div className="w-full max-w-xs">
                  <Pie data={pieData} options={pieOptions} />
                </div>
                {/* Leaderboard below the pie chart */}
                <div className="w-full mt-8 rounded-2xl border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
                  <h3 className="text-lg font-extrabold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide drop-shadow">Teacher Leaderboard</h3>
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 to-pink-100">
                        <th className="py-2 px-3 font-semibold text-blue-700">Rank</th>
                        <th className="py-2 px-3 font-semibold text-blue-700">Name</th>
                        <th className="py-2 px-3 font-semibold text-blue-700">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((teacher, idx) => (
                        <tr key={teacher.name} className={
                          idx === 0 ? 'bg-gradient-to-r from-yellow-200 to-yellow-50 font-bold' :
                          idx === 1 ? 'bg-gradient-to-r from-purple-100 to-blue-50 font-semibold' :
                          idx === 2 ? 'bg-gradient-to-r from-pink-100 to-orange-50 font-medium' :
                          'hover:bg-blue-50 transition-colors'
                        }>
                          <td className="py-2 px-3">{idx + 1}</td>
                          <td className={
                            'py-2 px-3 ' +
                            (idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-purple-600' : idx === 2 ? 'text-pink-600' : 'text-blue-700') +
                            ' font-semibold tracking-wide'
                          }>{teacher.name}</td>
                          <td className="py-2 px-3 text-blue-800 font-bold">{teacher.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
