
function Profile() {

  return ( 
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Sidebar */}
        <section className="md:col-span-1 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white grid place-items-center text-2xl font-semibold">
              MS
            </div>

            {/* Name & Email */}
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Muhammad Shaheer Aziz
            </h2>
            <p className="text-sm text-gray-500">h.m.shaheeraziz@gmail.com</p>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                Email verified
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                approved
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-700 ring-1 ring-gray-200">
                user
              </span>
            </div>
          </div>

          {/* User Info */}
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">User ID</dt>
              <dd
                className="text-gray-900 font-medium truncate max-w-[60%]"
                title="7b785a52-eeb7-4022-9968-a30aa4bfd269"
              >
                7b785a52-eeb7-4022-9968-a30aa4bfd269
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Phone</dt>
              <dd className="text-gray-900 font-medium">+1 (908) 862-2232</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Active</dt>
              <dd className="text-gray-900 font-medium">Yes</dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-gray-500">Address</dt>
              <dd className="text-gray-900 font-medium text-right max-w-[60%]">
                America
              </dd>
            </div>
          </dl>
        </section>

        {/* Right Section */}
        <section className="md:col-span-2 space-y-6">
          {/* Account Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-base font-semibold text-gray-900">
              Account details
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Created</div>
                <div className="font-medium text-gray-900">
                  3/27/2025, 9:41:22 PM
                </div>
              </div>
              <div>
                <div className="text-gray-500">Last updated</div>
                <div className="font-medium text-gray-900">
                  7/19/2025, 11:03:12 PM
                </div>
              </div>
              <div>
                <div className="text-gray-500">Contact ID</div>
                <div className="font-medium text-gray-900">
                  jo8iKD0aQkigERbWrtEi
                </div>
              </div>
              <div>
                <div className="text-gray-500">Email token</div>
                <div className="font-medium text-gray-900">—</div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                Documents
              </h3>
              <span className="text-sm text-gray-500">2 file(s)</span>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <a
                href="#"
                className="group block overflow-hidden rounded-xl border border-gray-200"
              >
                <img
                  src="https://res.cloudinary.com/dvkl41t5v/image/upload/v1743111882/iqtdjpw4o6pwergrbyjj.jpg"
                  alt="Document 1"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
              <a
                href="#"
                className="group block overflow-hidden rounded-xl border border-gray-200"
              >
                <img
                  src="https://res.cloudinary.com/dvkl41t5v/image/upload/v1743111883/toea4gmuzixj0xnsaqnd.jpg"
                  alt="Document 2"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
