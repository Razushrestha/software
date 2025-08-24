"use client";
import { useState } from "react";

// Generate 50 weeks, with dummy data for weeks 1-3, rest are locked by default
const initialMaterials = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  week: `Week ${i + 1}`,
  videoTitle: i < 3 ? `Video for Week ${i + 1}` : '',
  videoUrl: i < 3 ? `https://www.youtube.com/embed/dQw4w9WgXcQ?week=${i + 1}` : '',
  notesTitle: i < 3 ? `Notes for Week ${i + 1}` : '',
  notesUrl: i < 3 ? `https://example.com/notes-week${i + 1}.pdf` : '',
  postedAt: i < 3 ? `2025-08-2${i + 1}` : '',
  locked: i > 2,
  classLinks: {}
}));

// Dummy: 30 partners (schools)
const totalPartners = 30;
// Dummy: For each week, randomly assign some partners as having watched
function getWatchedPartners(weekIdx: number) {
  // For demo, first (weekIdx+5)%30 partners have watched
  const watched = (weekIdx + 5) % (totalPartners + 1); // 0..30
  return watched;
}

export default function TeacherLearningMaterialPage() {
  // State for per-class edit modal
  const [editClassData, setEditClassData] = useState<any>({});

  // When opening the edit modal, load current classLinks for the week
  const openEditModal = (idx: number) => {
    const classLinks = materials[idx].classLinks || {};
    setEditClassData({ ...classLinks });
    setEditIdx(idx);
  };

  // Handle input change in modal
  const handleEditClassChange = (cls: number, field: string, value: string) => {
    setEditClassData((prev: any) => ({
      ...prev,
      [cls]: {
        ...prev[cls],
        [field]: value
      }
    }));
  };

  // Save per-class video/notes to materials
  const handleSaveClassLinks = () => {
    setMaterials(prev => prev.map((mat, idx) =>
      idx === editIdx ? { ...mat, classLinks: { ...editClassData } } : mat
    ));
    setEditIdx(null);
  };
  // Edit modal state
  const [editIdx, setEditIdx] = useState<number | null>(null);
  // Toggle lock/unlock for a week
  const handleToggleLock = (idx: number) => {
    setMaterials(prev => prev.map((mat, i) =>
      i === idx ? { ...mat, locked: !mat.locked } : mat
    ));
  };
  const [activeWeekIdx, setActiveWeekIdx] = useState<number | null>(null);
  const [materials, setMaterials] = useState(initialMaterials);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    week: "",
    videoTitle: "",
    videoUrl: "",
    notesTitle: "",
    notesUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadData({ ...uploadData, [e.target.name]: e.target.value });
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Find week index
    const weekIdx = Number((uploadData.week || "").replace(/[^\d]/g, "")) - 1;
    if (weekIdx < 0 || weekIdx >= 50) {
      alert("Please enter a valid week between 1 and 50.");
      return;
    }
    setMaterials(prev => prev.map((mat, idx) =>
      idx === weekIdx
        ? {
            ...mat,
            ...uploadData,
            postedAt: new Date().toISOString().slice(0, 10),
            locked: weekIdx > 2 // lock if week > 3
          }
        : mat
    ));
    setUploadData({ week: "", videoTitle: "", videoUrl: "", notesTitle: "", notesUrl: "" });
    setShowUpload(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-400 to-pink-500 drop-shadow-lg animate-fade-in"
          style={{
            animation: 'fadeInScale 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          Teacher Learning Material
        </h1>
        <style>{`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.85) translateY(-30px); }
            60% { opacity: 1; transform: scale(1.05) translateY(8px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-in { animation: fadeInScale 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        `}</style>
        <button
          className="mt-6 bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all text-lg tracking-wide"
          onClick={() => setShowUpload(true)}
        >
          Upload New Material
        </button>
      </div>

      {showUpload && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-100 relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowUpload(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Upload Weekly Material</h2>
            <form className="space-y-4" onSubmit={handleUpload}>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Week</label>
                <input type="text" name="week" value={uploadData.week} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" placeholder="e.g. Week 3" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Video Title</label>
                <input type="text" name="videoTitle" value={uploadData.videoTitle} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Video URL (YouTube embed)</label>
                <input type="text" name="videoUrl" value={uploadData.videoUrl} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" placeholder="https://www.youtube.com/embed/..." required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Notes Title</label>
                <input type="text" name="notesTitle" value={uploadData.notesTitle} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Notes URL (PDF)</label>
                <input type="text" name="notesUrl" value={uploadData.notesUrl} onChange={handleChange} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" placeholder="https://...pdf" required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide mt-4">Upload</button>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Weekly Material List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {materials.map((mat, idx) => (
          <div
            key={mat.id}
            className="bg-white rounded-lg shadow p-3 flex flex-col gap-2 border border-blue-100 relative max-w-xs mx-auto text-sm hover:ring-2 hover:ring-blue-400 transition-all"
            style={{ minWidth: 220 }}
          >
            {/* Lock/Unlock image centered in card */}
            <div className="flex flex-col items-center justify-center py-8 min-h-[140px]">
              <button
                onClick={e => { e.stopPropagation(); handleToggleLock(idx); }}
                title={mat.locked ? 'Unlock this week' : 'Lock this week'}
                className="focus:outline-none bg-transparent border-none p-0"
                style={{ background: 'none' }}
              >
                <img
                  src={mat.locked ? "/pngegg-locked.png" : "/unlock.png"}
                  alt={mat.locked ? "Locked" : "Unlocked"}
                  className="w-24 h-24 mx-auto mb-2"
                />
              </button>
              <div className={`font-bold text-lg ${mat.locked ? 'text-blue-400' : 'text-green-500'}`}>{mat.locked ? 'Locked' : 'Unlocked'}</div>
              {mat.locked ? (
                <div className="text-gray-400 text-sm mt-1">This week's material will be available soon.</div>
              ) : (
                <div className="text-gray-400 text-xs mt-1">Click to view all classes</div>
              )}
            </div>
            {/* Three-dot edit button - right top */}
            <div className="absolute top-2 right-2 z-10">
              <button
                className="p-1 rounded-full hover:bg-blue-100 focus:outline-none"
                title="Edit notes and video for all classes"
                onClick={e => { e.stopPropagation(); openEditModal(idx); }}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" fill="#6366f1"/><circle cx="12" cy="12" r="2" fill="#6366f1"/><circle cx="19" cy="12" r="2" fill="#6366f1"/></svg>
              </button>
            </div>
            <div className="flex justify-center items-center mb-1">
              <button
                className={`font-bold text-blue-700 text-base underline underline-offset-2 transition cursor-pointer bg-transparent border-none p-0 ${mat.locked ? 'cursor-not-allowed text-gray-400 no-underline' : 'hover:text-pink-500'}`}
                style={{ background: 'none' }}
                onClick={e => {
                  e.stopPropagation();
                  if (!mat.locked) setActiveWeekIdx(idx);
                }}
                disabled={mat.locked}
                tabIndex={mat.locked ? -1 : 0}
                aria-disabled={mat.locked}
              >
                {mat.week}
              </button>
            </div>
            {/* The lock/unlock image and state are now shown above, so this block is removed. */}
            <div className="absolute bottom-2 left-3 text-xs text-gray-400">{mat.postedAt}</div>
            <div className="absolute bottom-2 right-3 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded shadow" title="Partners who have read">
              total: {getWatchedPartners(idx)}/200
            </div>
      {/* Edit modal for per-class content */}
      {editIdx !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-blue-100 relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setEditIdx(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Edit Notes & Videos for {materials[editIdx].week}</h2>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              {[1,2,3,4,6,7,8,9,10].map(cls => (
                <div key={cls} className="border-b border-blue-100 pb-4 mb-4">
                  <div className="font-bold text-blue-700 mb-2">Class {cls}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Video URL</label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                        placeholder="https://www.youtube.com/embed/..."
                        value={editClassData[cls]?.videoUrl || ''}
                        onChange={e => handleEditClassChange(cls, 'videoUrl', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Notes URL (PDF)</label>
                      <input
                        type="text"
                        className="w-full px-2 py-1 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                        placeholder="https://...pdf"
                        value={editClassData[cls]?.notesUrl || ''}
                        onChange={e => handleEditClassChange(cls, 'notesUrl', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide"
              onClick={handleSaveClassLinks}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
          </div>
        ))}
      </div>

      {/* Modal for week details */}
      {activeWeekIdx !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-blue-100 relative">
                  <button
                    className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
                    onClick={() => setActiveWeekIdx(null)}
                  >
                    &times;
                  </button>
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">{materials[activeWeekIdx].week} - All Classes</h2>
                  <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                    {[1,2,3,4,6,7,8,9,10].map(cls => {
                      const classLinks = (materials[activeWeekIdx] as any)?.classLinks || {};
                      const videoUrl = classLinks[String(cls)]?.videoUrl || '';
                      const notesUrl = classLinks[String(cls)]?.notesUrl || '';
                      return (
                        <div key={cls} className="border-b border-blue-100 pb-4 mb-4">
                          <div className="font-bold text-blue-700 mb-2">Class {cls}</div>
                          <div className="mb-2">
                            <div className="font-semibold text-blue-900 mb-0.5 text-xs">{videoUrl ? `Class ${cls} Video` : 'No video uploaded yet'}</div>
                            <div className="aspect-video w-full rounded overflow-hidden bg-black" style={{ minHeight: 90 }}>
                              {videoUrl ? (
                                <iframe
                                  src={videoUrl}
                                  title={`Class ${cls} Video`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full h-full border-none rounded"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">No video</div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-blue-900 mb-0.5 text-xs">{notesUrl ? `Class ${cls} Notes` : 'No notes uploaded yet'}</div>
                            {notesUrl ? (
                              <a
                                href={notesUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 hover:bg-pink-500 text-white font-bold py-1 px-2 rounded shadow transition-all text-xs"
                              >
                                View Notes (PDF)
                              </a>
                            ) : (
                              <span className="inline-block text-gray-400 text-xs">No notes</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
      )}
    </div>
  );
}