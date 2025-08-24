"use client";
import { useState } from "react";

const randomNames = [
  "Aarav Sharma", "Priya Singh", "Vivaan Patel", "Anaya Gupta", "Ishaan Joshi", "Diya Mehra", "Kabir Kapoor", "Aanya Reddy", "Arjun Nair", "Myra Das",
  "Reyansh Rao", "Kiara Jain", "Advait Sethi", "Saanvi Bhatia", "Ayaan Choudhary", "Pari Malhotra", "Vihaan Sinha", "Navya Ghosh", "Dhruv Yadav", "Riya Verma",
  "Arnav Agarwal", "Sara Menon", "Yuvraj Pillai", "Meera Desai", "Krish Shetty", "Tara Iyer", "Shaurya Dutta", "Inaaya Paul", "Aadhya Bhatt", "Rudra Saxena"
];
const initialTutors = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: randomNames[i % randomNames.length],
  contact: `98000000${(i + 1).toString().padStart(2, "0")}`,
  address: `Address ${i + 1}`,
  location: `Location ${((i % 5) + 1)}`,
  attendance: `${Math.floor(Math.random() * 100)}%`,
  salary: `$${(3000 + i * 100).toLocaleString()}`,
  holiday: `${Math.floor(Math.random() * 10)} days`,
}));

export default function TutorPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    contact: "",
    location: "",
    name: "",
    address: "",
  });
  const [tutors, setTutors] = useState(initialTutors);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    contact: "",
    address: "",
    location: "",
    attendance: "",
    salary: "",
    holiday: "",
  });
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTutors([
      ...tutors,
      {
        id: tutors.length + 1,
        ...registerData,
      },
    ]);
    setRegisterData({
      name: "",
      contact: "",
      address: "",
      location: "",
      attendance: "",
      salary: "",
      holiday: "",
    });
    setShowRegister(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleEditClick = (tutor: any) => {
    setEditId(tutor.id);
    setEditData({ ...tutor });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setTutors(tutors.map(t => (t.id === editId ? { ...editData, id: editId } : t)));
    setEditId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const filteredTutors = tutors.filter((tutor) => {
    return (
      (!filters.contact || tutor.contact.includes(filters.contact)) &&
      (!filters.location || tutor.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.name || tutor.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.address || tutor.address.toLowerCase().includes(filters.address.toLowerCase())) &&
      (!search ||
        tutor.name.toLowerCase().includes(search.toLowerCase()) ||
        tutor.contact.includes(search) ||
        tutor.address.toLowerCase().includes(search.toLowerCase()) ||
        tutor.location.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="flex justify-end mb-4">
        <button
          className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all text-lg tracking-wide"
          onClick={() => setShowRegister(true)}
        >
          Register
        </button>
      </div>
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-100 relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Register New Tutor</h2>
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Name</label>
                <input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Contact</label>
                <input type="text" name="contact" value={registerData.contact} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Address</label>
                <input type="text" name="address" value={registerData.address} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Location</label>
                <input type="text" name="location" value={registerData.location} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Attendance</label>
                  <input type="text" name="attendance" value={registerData.attendance} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Salary</label>
                  <input type="text" name="salary" value={registerData.salary} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Holiday</label>
                  <input type="text" name="holiday" value={registerData.holiday} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide mt-4">Add Tutor</button>
            </form>
          </div>
        </div>
      )}
      {/* Search and Register (school-style) */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:gap-8 gap-4">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2 text-blue-900">Search</label>
          <input
            type="text"
            placeholder="Search by any field..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50 text-blue-900 shadow-sm placeholder-blue-400"
          />
        </div>
        <button
          className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all text-lg tracking-wide"
          onClick={() => setShowRegister(true)}
        >
          Register New Tutor
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Address</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Attendance</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Salary</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Holiday</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {filteredTutors.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">No tutors found.</td>
              </tr>
            ) : (
              filteredTutors.map((tutor) => (
                <tr key={tutor.id} className="hover:bg-blue-50 transition">
                  {editId === tutor.id ? (
                    <>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="contact"
                          value={editData.contact}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="address"
                          value={editData.address}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="location"
                          value={editData.location}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="attendance"
                          value={editData.attendance}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="salary"
                          value={editData.salary}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input
                          name="holiday"
                          value={editData.holiday}
                          onChange={handleEditChange}
                          className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400"
                        />
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-blue-900 text-lg flex gap-2 justify-center">
                        <button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-600 hover:to-blue-500 text-white px-3 py-1 rounded-lg shadow font-semibold transition-all">Save</button>
                        <button onClick={handleCancel} className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white px-3 py-1 rounded-lg shadow font-semibold transition-all">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.name}</td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.contact}</td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.address}</td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.location}</td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.attendance}</td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.salary}</td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">{tutor.holiday}</td>
                      <td className="px-4 py-3 text-center font-bold text-blue-900 text-lg">
                        <button onClick={() => handleEditClick(tutor)} className="bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white px-4 py-1 rounded-lg shadow font-semibold transition-all">Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
