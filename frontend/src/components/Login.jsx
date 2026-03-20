export default function Login() {

  return (

    <div className="flex justify-center items-center py-20">

      <div className="bg-white w-96 p-8 rounded-xl shadow-sm">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login
        </h2>

        <input
          placeholder="Username"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
          Login
        </button>

      </div>

    </div>

  )

}