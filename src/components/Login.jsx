




function Login() {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1616455165195-239de2592faa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative w-full max-w-lg mx-auto px-4">
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-10 sm:p-12 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
          <div className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-white/80">Please enter your credentials</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/90 text-gray-900 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-white/20 bg-white/90 text-gray-900 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full rounded-lg bg-blue-600 text-white py-3.5 font-medium hover:bg-blue-700 transition-colors">
              Log in
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login


