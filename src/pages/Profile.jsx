import React, { useEffect, useMemo, useState } from "react";
import api from '../api/api'

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await api.get('/user/profile')
        if (!mounted) return
        const data = res?.data?.data || res?.data || null
        // When backend wraps inside { statusCode, success, message, data x}
        setProfile(data)
      } catch (err) {
        if (!mounted) return
        const status = err?.response?.status
        const msg = err?.response?.data?.message || err?.message
        setError(status ? `HTTP ${status}: ${msg}` : msg)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const formatted = useMemo(() => {
    if (!profile) return {}
    const formatDate = (iso) => {
      if (!iso) return '—'
      try { return new Date(iso).toLocaleString() } catch { return String(iso) }
    }
    return {
      createdAt: formatDate(profile.createdAt || profile.created_at),
      updatedAt: formatDate(profile.updatedAt || profile.updated_at),
      resetPasswordExpire: formatDate(profile.resetPasswordExpire),
    }
  }, [profile])

  if (loading) return (
    <div className="min-h-screen grid place-items-center px-4 py-8">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" aria-label="Loading" />
    </div>
  );
  if (error) return (
    <div className="min-h-screen grid place-items-center px-4 py-8">
      <p className="text-red-600">Error: {error}</p>
    </div>
  );
  if (!profile) return (
    <div className="min-h-screen grid place-items-center px-4 py-8">
      <p>No profile data found.</p>
    </div>
  );

  const documents = Array.isArray(profile.documents) ? profile.documents : []
  const profilePic = profile.profilePicture

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-4">
          {profilePic ? (
            <img
              src={profilePic}
              alt={profile.username ? `${profile.username} profile photo` : 'Profile photo'}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-100 shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 grid place-items-center text-gray-500 ring-2 ring-indigo-100 shadow-sm">N/A</div>
          )}
          <div>
            <h1 className="text-2xl font-semibold">{profile.username || 'User'}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${profile.isEmailVerified ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-yellow-50 text-yellow-700 ring-yellow-200'}`}>
                Email {profile.isEmailVerified ? 'Verified' : 'Not Verified'}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${profile.isActive ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-red-50 text-red-700 ring-red-200'}`}>
                {profile.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${profile.documentVerified ? 'bg-blue-50 text-blue-700 ring-blue-200' : 'bg-gray-50 text-gray-700 ring-gray-200'}`}>
                Doc: {profile.documentVerificationStatus || (profile.documentVerified ? 'verified' : 'unverified')}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-medium">Account Details</h2>
            <div className="mt-4 space-y-2">

              <Row label="User ID" value={profile.id} /> 
              <Row label="Username" value={profile.username} />
              <Row label="Email" value={profile.email} />
              <Row label="Role" value={profile.role} />
              <Row label="Phone" value={profile.phone} />
              <Row label="Address" value={profile.address} />
              <Row label="Contact ID" value={profile.contactID} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-medium">Timestamps</h2>
            <div className="mt-4 space-y-2">
              <Row label="Created At" value={formatted.createdAt} />
              <Row label="Updated At" value={formatted.updatedAt} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Documents</h2>
              {documents.length > 0 && (
                <span className="text-xs text-gray-500">{documents.length} file{documents.length > 1 ? 's' : ''}</span>
              )}
            </div>
            <div className="mt-4">
              {documents.length === 0 ? (
                <div className="grid place-items-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-10">
                  <div className="text-center">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-white shadow-sm ring-1 ring-gray-200 grid place-items-center">📄</div>
                    <p className="text-gray-600">No documents uploaded.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {documents.map((url, idx) => (
                    <a
                      key={url + idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block overflow-hidden rounded-xl border border-gray-200 shadow-sm ring-1 ring-transparent hover:ring-indigo-200 transition-all"
                    >
                      <span className="absolute left-2 top-2 z-10 inline-flex items-center rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        #{idx + 1}
                      </span>
                      <img
                        src={url}
                        alt={`Document ${idx + 1}`}
                        className="h-32 w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] font-medium text-gray-700 shadow-sm ring-1 ring-gray-200">
                          <span>🔍</span>
                          <span>Open</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  const display = value === null || value === undefined || value === '' ? '—' : String(value)
  return (
    <div className="flex items-start justify-between gap-6 py-2 border-b last:border-b-0">
      <span className="text-gray-600">{label}</span>
      <span className="max-w-[65%] text-gray-900 break-all">{display}</span>
    </div>
  )
}

export default Profile;
