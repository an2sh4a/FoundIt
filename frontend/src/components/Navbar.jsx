export default function Navbar({ setPage }) {

  return (
    <div className="bg-white shadow-sm">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <h1
          onClick={() => setPage("landing")}
          className="text-xl font-bold text-indigo-600 cursor-pointer"
        >
          Lost&Found
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => setPage("dashboard")}
            className="text-gray-600 hover:text-indigo-600"
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("browse")}
            className="text-gray-600 hover:text-indigo-600"
          >
            Browse
          </button>

          <button
            onClick={() => setPage("login")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  )

}