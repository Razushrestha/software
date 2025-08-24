"use client";
import { useState } from "react";

// Generate 50 weeks, with dummy data for weeks 1-3, rest are locked by default
const initialMaterials = Array.from({ length: 50 }, (_, i) => {
  if (i < 3) {
    return {
      id: i + 1,
      week: `Week ${i + 1}`,
      videoTitle: [
        "Introduction to Algebra",
        "Geometry Fundamentals",
        "Trigonometry Basics"
      ][i],
      videoUrl: [
        "https://www.youtube.com/embed/HEfHFsfGXjs",
        "https://www.youtube.com/embed/mtYJ7y1P2tA",
        "https://www.youtube.com/embed/2IdtqGM6bJc"
      ][i],
      notesTitle: [
        "Algebra Basics Notes",
        "Geometry Notes",
        "Trigonometry Notes"
      ][i],
      notesUrl: [
        "https://example.com/notes/algebra-basics.pdf",
        "https://example.com/notes/geometry.pdf",
        "https://example.com/notes/trigonometry.pdf"
      ][i],
      postedAt: `2025-08-0${i + 1}`,
      locked: false
    };
  } else {
    return {
      id: i + 1,
      week: `Week ${i + 1}`,
      videoTitle: "",
      videoUrl: "",
      notesTitle: "",
      notesUrl: "",
      postedAt: "",
      locked: true
    };
  }
});

// Dummy: 30 partners (schools)
const totalPartners = 30;
// Dummy: For each week, randomly assign some partners as having watched
function getWatchedPartners(weekIdx: number) {
  // For demo, first (weekIdx+5)%30 partners have watched
  const watched = (weekIdx + 5) % (totalPartners + 1); // 0..30
  return watched;
}

export default function TeacherLearningMaterialPage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    week: "",
    videoTitle: "",
    videoUrl: "",
    notesTitle: "",
    notesUrl: ""
  });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    videoTitle: '',
    videoUrl: '',
    notesTitle: '',
    notesUrl: ''
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
          <div key={mat.id} className="bg-white rounded-lg shadow p-3 flex flex-col gap-2 border border-blue-100 relative max-w-xs mx-auto text-sm">
            {/* Edit dots at top right */}
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-blue-100 focus:outline-none"
              title="Edit notes and video"
              onClick={() => {
                setEditIdx(idx);
                setEditData({
                  videoTitle: mat.videoTitle,
                  videoUrl: mat.videoUrl,
                  notesTitle: mat.notesTitle,
                  notesUrl: mat.notesUrl
                });
              }}
              style={{zIndex: 20}}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" fill="#6366f1"/><circle cx="12" cy="12" r="2" fill="#6366f1"/><circle cx="19" cy="12" r="2" fill="#6366f1"/></svg>
            </button>
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-700 text-base">{mat.week}</span>
            </div>
      {/* Edit Modal */}
      {editIdx !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-100 relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setEditIdx(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Edit Weekly Material</h2>
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              setMaterials(mats => mats.map((m, i) => i === editIdx ? {
                ...m,
                videoTitle: editData.videoTitle,
                videoUrl: editData.videoUrl,
                notesTitle: editData.notesTitle,
                notesUrl: editData.notesUrl
              } : m));
              setEditIdx(null);
            }}>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Video Title</label>
                <input type="text" name="videoTitle" value={editData.videoTitle} onChange={e => setEditData({...editData, videoTitle: e.target.value})} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Video URL (YouTube embed)</label>
                <input type="text" name="videoUrl" value={editData.videoUrl} onChange={e => setEditData({...editData, videoUrl: e.target.value})} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" placeholder="https://www.youtube.com/embed/..." required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Notes Title</label>
                <input type="text" name="notesTitle" value={editData.notesTitle} onChange={e => setEditData({...editData, notesTitle: e.target.value})} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" required />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-1">Notes URL (PDF)</label>
                <input type="text" name="notesUrl" value={editData.notesUrl} onChange={e => setEditData({...editData, notesUrl: e.target.value})} className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 shadow-sm" placeholder="https://...pdf" required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide mt-4">Save Changes</button>
            </form>
          </div>
        </div>
      )}
            <div className="flex justify-center mb-2">
              <button
                className={`px-3 py-1 rounded text-xs font-bold shadow transition-all ${mat.locked ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                onClick={() => setMaterials(mats => mats.map((m, i) => i === idx ? { ...m, locked: !m.locked } : m))}
                type="button"
                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 12, zIndex: 10 }}
              >
                {mat.locked ? 'Unlock' : 'Lock'}
              </button>
            </div>
            <div style={{ height: 32 }} />
            {mat.locked ? (
              <div className="flex flex-col items-center justify-center py-8">
                <img src="/pngegg-locked.png" alt="Locked" className="w-24 h-24 mx-auto mb-2" />
                <div className="text-blue-400 font-bold text-lg">Locked</div>
                <div className="text-gray-400 text-sm mt-1">This week's material will be available soon.</div>
              </div>
            ) : (
              <>
                <div className="mb-1">
                  <div className="font-semibold text-blue-900 mb-0.5 text-xs">{mat.videoTitle}</div>
                  <div className="aspect-video w-full rounded overflow-hidden bg-black" style={{ minHeight: 90 }}>
                    <iframe
                      src={mat.videoUrl}
                      title={mat.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-none rounded"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-blue-900 mb-0.5 text-xs">{mat.notesTitle}</div>
                  <a
                    href={mat.notesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-pink-500 text-white font-bold py-1 px-2 rounded shadow transition-all text-xs"
                  >
                    View Notes (PDF)
                  </a>
                </div>
              </>
            )}
            {/* Admin badge for locked weeks with upload */}
            {mat.locked && mat.videoTitle && (
              <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Uploaded (Locked)</div>
            )}
            {/* Date at bottom left */}
            {mat.postedAt && (
              <div className="absolute bottom-2 left-2 text-[10px] text-gray-400">{mat.postedAt}</div>
            )}
            {/* Watched/Left stats at bottom right */}
            <div className="absolute bottom-2 right-2 bg-blue-50 border border-blue-200 rounded px-2 py-1 text-xs text-blue-700 font-semibold shadow" style={{zIndex: 5}}>
              {(() => {
                const watched = getWatchedPartners(idx);
                const left = totalPartners - watched;
                return (
                  <>
                    Watched: {watched} / {totalPartners}<br />
                    Left: {left} / {totalPartners}
                  </>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
