
"use client";
import { useState } from "react";

const randomSchools = [
  "Sunrise Academy", "Green Valley School", "Bluebell Public School", "Silver Oak High", "Maple Leaf School", "Starlight Academy", "Harmony School", "Crescent Public School", "Riverdale School", "Hilltop Academy",
  "Bright Future School", "Golden Gate School", "Evergreen Academy", "Rainbow Public School", "Unity School", "Wisdom Valley School", "Heritage School", "Pinecrest Academy", "Lakeside School", "Summit School",
  "Springfield School", "Oakridge Academy", "Skyline School", "Aspire Public School", "Elite School", "Noble Academy", "Victory School", "Liberty School", "Hope Valley School", "Dreamland School"
];
const initialSchools = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: randomSchools[i % randomSchools.length],
  address: `Address ${i + 1}`,
  principal: `Principal ${i + 1}`,
  schoolContact: `98010000${(i + 1).toString().padStart(2, "0")}`,
  principalContact: `98020000${(i + 1).toString().padStart(2, "0")}`,
  subscription: ["Free", "Basic", "Premium"][i % 3],
  payment: i % 2 === 0 ? "Paid" : "Not Paid",
  totalClasses: `${Math.floor(Math.random() * 10) + 20}`,
}));

export default function SchoolPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    principal: "",
    contact: "",
    subscription: "",
    payment: "",
  });
  const [schools, setSchools] = useState(initialSchools);
  type School = {
    id: number;
    name: string;
    address: string;
    principal: string;
    schoolContact: string;
    principalContact: string;
    subscription: string;
    payment: string;
    totalClasses: string;
  };
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<School>>({});
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    address: "",
    principal: "",
    schoolContact: "",
    principalContact: "",
    subscription: "Free",
    payment: "Paid",
    totalClasses: "0",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchools([
      ...schools,
      {
        id: schools.length + 1,
        ...registerData,
      },
    ]);
    setRegisterData({
      name: "",
      address: "",
      principal: "",
      schoolContact: "",
      principalContact: "",
      subscription: "Free",
      payment: "Paid",
      totalClasses: "0",
    });
    setShowRegister(false);
  };
  const handleEditClick = (school: School) => {
    setEditId(school.id);
    setEditData({ ...school });
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    setSchools(schools.map(s => {
      if (s.id === editId) {
        // Ensure all required fields are present and fallback to previous values if missing
        return {
          id: editId!,
          name: editData.name ?? s.name,
          address: editData.address ?? s.address,
          principal: editData.principal ?? s.principal,
          schoolContact: editData.schoolContact ?? s.schoolContact,
          principalContact: editData.principalContact ?? s.principalContact,
          subscription: editData.subscription ?? s.subscription,
          payment: editData.payment ?? s.payment,
          totalClasses: editData.totalClasses ?? s.totalClasses,
        };
      }
      return s;
    }));
    setEditId(null);
    setEditData({});
  };
  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };
  const filteredSchools = schools.filter((school) => {
    return (
      (!filters.name || school.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.address || school.address.toLowerCase().includes(filters.address.toLowerCase())) &&
      (!filters.principal || school.principal.toLowerCase().includes(filters.principal.toLowerCase())) &&
      (!filters.contact || school.schoolContact.includes(filters.contact) || school.principalContact.includes(filters.contact)) &&
      (!filters.subscription || school.subscription === filters.subscription) &&
      (!filters.payment || school.payment === filters.payment) &&
      (!search ||
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.address.toLowerCase().includes(search.toLowerCase()) ||
        school.principal.toLowerCase().includes(search.toLowerCase()) ||
        school.schoolContact.includes(search) ||
        school.principalContact.includes(search) ||
        school.subscription.toLowerCase().includes(search.toLowerCase()) ||
        (school.payment && school.payment.toLowerCase().includes(search.toLowerCase()))
      )
    );
  });

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      {/* Search, Filters, and Register */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:gap-8 gap-4">
        <div className="flex-1 flex flex-col md:flex-row md:items-end md:gap-6 gap-4">
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
          <div>
            <label className="block text-lg font-semibold mb-2 text-blue-900">Subscription</label>
            <select name="subscription" value={filters.subscription} onChange={handleFilterChange} className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50 text-blue-900 shadow-sm">
              <option value="">All</option>
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-blue-900">Payment Status</label>
            <select name="payment" value={filters.payment} onChange={handleFilterChange} className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50 text-blue-900 shadow-sm">
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Not Paid">Not Paid</option>
            </select>
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all text-lg tracking-wide"
          onClick={() => setShowRegister(true)}
        >
          Register New School
        </button>
      </div>

  {/* Filters (removed, now in search row) */}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-100 relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowRegister(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Register New School</h2>
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">School Name</label>
                <input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Address</label>
                <input type="text" name="address" value={registerData.address} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Principal Name</label>
                <input type="text" name="principal" value={registerData.principal} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">School Contact</label>
                  <input type="text" name="schoolContact" value={registerData.schoolContact} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Principal Contact</label>
                  <input type="text" name="principalContact" value={registerData.principalContact} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Subscription</label>
                  <select name="subscription" value={registerData.subscription} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm">
                    <option value="Free">Free</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Payment Status</label>
                  <select name="payment" value={registerData.payment} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm">
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-base font-semibold text-gray-800 mb-1">Total Classes</label>
                  <input type="text" name="totalClasses" value={registerData.totalClasses} onChange={handleRegisterChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide mt-4">Add School</button>
            </form>
          </div>
        </div>
      )}

      {/* School List Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider" style={{fontSize: '9pt'}}>S.N</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">School Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Address</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Principal Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Contacts</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Subscription</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Total Classes</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {filteredSchools.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">No schools found.</td>
              </tr>
            ) : (
              filteredSchools.map((school, idx) => (
                <tr key={school.id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{idx + 1}</td>
                  {editId === school.id ? (
                    <>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input name="name" value={editData.name} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400" />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input name="address" value={editData.address} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400" />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input name="principal" value={editData.principal} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400" />
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <div className="flex flex-col gap-1">
                          <input name="schoolContact" value={editData.schoolContact} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400 mb-1" placeholder="School Contact" />
                          <input name="principalContact" value={editData.principalContact} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400" placeholder="Principal Contact" />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <select name="subscription" value={editData.subscription} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400">
                          <option value="Free">Free</option>
                          <option value="Basic">Basic</option>
                          <option value="Premium">Premium</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <select name="payment" value={editData.payment} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400">
                          <option value="Paid">Paid</option>
                          <option value="Not Paid">Not Paid</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900 text-lg">
                        <input name="totalClasses" value={editData.totalClasses} onChange={handleEditChange} className="w-full px-2 py-1 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400" />
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-blue-900 text-lg flex gap-2 justify-center">
                        <button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-blue-400 hover:from-green-600 hover:to-blue-500 text-white px-3 py-1 rounded-lg shadow font-semibold transition-all">Save</button>
                        <button onClick={handleCancel} className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white px-3 py-1 rounded-lg shadow font-semibold transition-all">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{school.name}</td>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{school.address}</td>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{school.principal}</td>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>
                        <div className="flex flex-col gap-1">
                          <span style={{fontSize: '9pt'}}>School: {school.schoolContact}</span>
                          <span style={{fontSize: '9pt'}}>Principal: {school.principalContact}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{school.subscription}</td>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{school.payment}</td>
                      <td className="px-4 py-3 font-bold text-blue-900" style={{fontSize: '9pt'}}>{school.totalClasses}</td>
                      <td className="px-4 py-3 text-center font-bold text-blue-900" style={{fontSize: '9pt'}}>
                        <button onClick={() => handleEditClick(school)} className="bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white px-4 py-1 rounded-lg shadow font-semibold transition-all" style={{fontSize: '9pt'}}>Edit</button>
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
