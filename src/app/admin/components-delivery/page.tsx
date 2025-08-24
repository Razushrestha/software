

"use client";
import { useState } from "react";

type DeliveryItem = {
  componentId: number;
  name: string;
  delivered: boolean;
  deliveryDate: string | null;
};

type Partner = {
  partnerId: number;
  partnerName: string;
  items: DeliveryItem[];
};

// Use tutor names for partner names
const tutorNames = [
  "Aarav Sharma", "Priya Singh", "Vivaan Patel", "Anaya Gupta", "Ishaan Joshi", "Diya Mehra", "Kabir Kapoor", "Aanya Reddy", "Arjun Nair", "Myra Das",
  "Reyansh Rao", "Kiara Jain", "Advait Sethi", "Saanvi Bhatia", "Ayaan Choudhary", "Pari Malhotra", "Vihaan Sinha", "Navya Ghosh", "Dhruv Yadav", "Riya Verma",
  "Arnav Agarwal", "Sara Menon", "Yuvraj Pillai", "Meera Desai", "Krish Shetty", "Tara Iyer", "Shaurya Dutta", "Inaaya Paul", "Aadhya Bhatt", "Rudra Saxena"
];
function getRandomName(idx: number) {
  // Shuffle for more randomness if more than 30
  return tutorNames[(idx + Math.floor(Math.random() * tutorNames.length)) % tutorNames.length];
}
const initialPartners: Partner[] = Array.from({ length: 55 }, (_, i) => ({
  partnerId: i + 1,
  partnerName: getRandomName(i),
  items: [
    { componentId: 1, name: "Tablet", delivered: false, deliveryDate: null },
    { componentId: 2, name: "Charger", delivered: false, deliveryDate: null },
    { componentId: 3, name: "SIM Card", delivered: false, deliveryDate: null },
  ],
}));


export default function ComponentsDeliveryPage() {
  const [partners, setPartners] = useState(initialPartners);
  const [filter, setFilter] = useState("");

  // Efficient O(1) update by partnerId and componentId
  const markDelivered = (partnerId: number, componentId: number) => {
    setPartners(prev => prev.map(p => {
      if (p.partnerId !== partnerId) return p;
      return {
        ...p,
        items: p.items.map(item =>
          item.componentId === componentId
            ? { ...item, delivered: true, deliveryDate: new Date().toISOString().slice(0, 10) }
            : item
        ),
      };
    }));
  };

  // Filter partners by name
  const filteredPartners = filter
    ? partners.filter(p => p.partnerName.toLowerCase().includes(filter.toLowerCase()))
    : partners;

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-pink-50">
  <div className="flex-1 flex flex-col justify-center items-center w-full">
        <div className="w-full max-w-7xl px-2 md:px-8 py-8 flex flex-col flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-lg">Components Delivery Tracking</h1>
          <div className="mb-6 flex flex-wrap gap-3 items-center justify-between bg-white/80 rounded-xl shadow p-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search partner..."
                className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition text-base"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <span className="text-sm text-gray-500">Total partners: <span className="font-bold text-blue-700">{filteredPartners.length}</span></span>
            </div>
            <div className="text-xs text-gray-400 italic">Tip: Mark each component as delivered for every partner.</div>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden rounded-xl shadow-lg bg-white/90 min-h-[400px]">
            <div className="overflow-x-auto flex-1">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-200 to-pink-200 text-blue-900 sticky top-0 z-10">
                    <th className="p-3 border-b font-bold text-left">Partner</th>
                    <th className="p-3 border-b font-bold text-left">Component</th>
                    <th className="p-3 border-b font-bold text-center">Delivered?</th>
                    <th className="p-3 border-b font-bold text-center">Delivery Date</th>
                    <th className="p-3 border-b font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-400">No partners found.</td>
                    </tr>
                  )}
                  {filteredPartners.map(partner =>
                    partner.items.map((item, idx) => (
                      <tr
                        key={`${partner.partnerId}-${item.componentId}`}
                        className={
                          item.delivered
                            ? "bg-green-50/80 hover:bg-green-100 transition"
                            : "hover:bg-pink-50 transition"
                        }
                      >
                        {idx === 0 && (
                          <td
                            className="p-3 border-b font-semibold text-blue-700 align-middle bg-white/70"
                            rowSpan={partner.items.length}
                            style={{ verticalAlign: 'middle' }}
                          >
                            <div className="flex flex-col gap-1">
                              <span className="text-base md:text-lg font-bold text-blue-800">{partner.partnerName}</span>
                              <span className="text-xs text-gray-400">ID: {partner.partnerId}</span>
                            </div>
                          </td>
                        )}
                        <td className={`p-3 border-b align-middle text-xs text-blue-900 font-semibold`}>{item.name}</td>
                        <td className="p-3 border-b text-center align-middle">
                          {item.delivered ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              Delivered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-500 font-bold">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-3 border-b text-center align-middle">{item.deliveryDate || <span className="text-gray-400">-</span>}</td>
                        <td className="p-3 border-b text-center align-middle">
                          {!item.delivered && (
                            <button
                              className="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white px-4 py-1.5 rounded-lg shadow text-xs font-semibold transition-all duration-200"
                              onClick={() => markDelivered(partner.partnerId, item.componentId)}
                            >
                              Mark Delivered
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );