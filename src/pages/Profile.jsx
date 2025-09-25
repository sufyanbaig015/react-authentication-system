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
              className="h-20 w-20 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 grid place-items-center text-gray-500">N/A</div>
          )}
          <div>
            <h1 className="text-2xl font-semibold">{profile.username || 'User'}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${profile.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                Email {profile.isEmailVerified ? 'Verified' : 'Not Verified'}
              </span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${profile.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {profile.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${profile.documentVerified ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
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
            <h2 className="text-lg font-medium">Documents</h2>
            <div className="mt-4">
              {documents.length === 0 ? (
                <p className="text-gray-600">No documents uploaded.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {documents.map((url, idx) => (
                    <a key={url + idx} href={url} target="_blank" rel="noreferrer" className="block">
                      <img
                        src={url}
                        alt={`Document ${idx + 1}`}
                        className="h-32 w-full object-cover rounded-lg border"
                        loading="lazy"
                      />
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
    <div className="flex items-start justify-between gap-6">
      <span className="text-gray-600">{label}</span>
      <span className="max-w-[65%] text-gray-900 break-all">{display}</span>
    </div>
  )
}

export default Profile;
