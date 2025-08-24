"use client";
import { useState } from "react";

// Dummy data for complaints
const schoolNames = [
  "Sunrise Academy", "Green Valley School", "Bluebell Public School", "Silver Oak High", "Maple Leaf School",
  "Starlight Academy", "Harmony School", "Crescent Public School", "Riverdale School", "Hilltop Academy"
];
function getRandomSchool(i: number) {
  return schoolNames[i % schoolNames.length];
}
function getRandomContact(i: number) {
  return `9801${(100000 + i).toString().slice(1)}`;
}
const initialComplaints = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  type: i % 2 === 0 ? "Student" : "School",
  complainant: i % 2 === 0 ? `Student ${i + 1}` : getRandomSchool(i),
  school: getRandomSchool(i),
  contact: getRandomContact(i),
  teacher: ["Priya Singh", "Vivaan Patel", "Kabir Kapoor", "Anaya Gupta", "Ishaan Joshi"][i % 5],
  class: ["Math 8A", "Science 7B", "English 6C", "History 9A", "Geography 10B"][i % 5],
  message: [
    "The teacher was late to class.",
    "Class was not conducted as scheduled.",
    "Teacher did not cover the syllabus.",
    "Classroom was not clean.",
    "Teacher was absent without notice.",
    "Class started late.",
    "Homework was not checked.",
    "Teacher was unprepared."
  ][i % 8],
  date: `2025-08-${20 + (i % 10)}`,
  status: i % 3 === 0 ? "Resolved" : "Pending"
}));

export default function ComplainBoxPage() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredComplaints = complaints.filter(c =>
    (!filter || c.type === filter) &&
    (!search ||
      c.complainant.toLowerCase().includes(search.toLowerCase()) ||
      (c.school && c.school.toLowerCase().includes(search.toLowerCase())) ||
      (c.contact && c.contact.includes(search)) ||
      c.teacher.toLowerCase().includes(search.toLowerCase()) ||
      c.class.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Complain Box</h1>
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:gap-8 gap-4">
        <div className="flex-1">
          <label className="block text-lg font-semibold mb-2 text-blue-900">Search</label>
          <input
            type="text"
            placeholder="Search by complainant, teacher, class, or message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50 text-blue-900 shadow-sm placeholder-blue-400"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2 text-blue-900">Type</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-50 text-blue-900 shadow-sm"
          >
            <option value="">All</option>
            <option value="Student">Student</option>
            <option value="School">School</option>
          </select>
        </div>
      </div>
      {/* Complaints Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Complainant</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">School Name</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Teacher</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Class</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Message</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">No complaints found.</td>
              </tr>
            ) : (
              filteredComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 font-bold text-blue-900">{c.type}</td>
                  <td className="px-4 py-3 font-bold text-blue-900">{c.complainant}</td>
                  <td className="px-4 py-3 font-bold text-blue-900">{c.school}</td>
                  <td className="px-4 py-3 font-bold text-blue-900">{c.contact}</td>
                  <td className="px-4 py-3 font-bold text-blue-900">{c.teacher}</td>
                  <td className="px-4 py-3 font-bold text-blue-900">{c.class}</td>
                  <td className="px-4 py-3 text-blue-900">{c.message}</td>
                  <td className="px-4 py-3 text-blue-900">{c.date}</td>
                  <td className={
                    c.status === "Resolved"
                      ? "px-4 py-3 font-bold text-green-700"
                      : "px-4 py-3 font-bold text-yellow-700"
                  }>
                    {c.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
