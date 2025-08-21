
const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'student', label: 'Student' },
  { value: 'partner', label: 'Partner' },
  { value: 'school', label: 'School' },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-tight drop-shadow-sm">Create your account</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm" placeholder="Full name" required />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm" placeholder="Email address" required />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm" placeholder="Password" required />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Role</label>
            <select className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 font-medium shadow-sm" required>
              <option value="">Select role</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide">Register</button>
        </form>
        <p className="mt-8 text-center text-base text-gray-700 font-medium">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-bold">Login</a>
        </p>
      </div>
    </div>
  );
}
