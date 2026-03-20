export default function Landing({setPage}){

  return(

    <div>

      {/* HERO */}

      <section className="grid md:grid-cols-2 gap-16 items-center">

        <div>

          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Find Lost Items Faster
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            A simple platform where people report lost belongings,
            list found items, and reconnect owners with their valuables.
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={()=>setPage("signup")}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
            >
              Get Started
            </button>

            <button
              onClick={()=>setPage("browse")}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
            >
              Browse Items
            </button>

          </div>

        </div>

        {/* Illustration placeholder */}

        <div className="bg-emerald-100 rounded-2xl h-80 flex items-center justify-center text-emerald-700 text-xl font-semibold">
          Lost & Found Platform
        </div>

      </section>

      {/* FEATURES */}

      <section className="grid md:grid-cols-3 gap-8 mt-20">

        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Report Lost</h3>
          <p className="text-gray-600">
            Submit details of items you've lost quickly.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Share Found Items</h3>
          <p className="text-gray-600">
            Help others recover belongings you've discovered.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">Secure Claim</h3>
          <p className="text-gray-600">
            Request ownership verification before claiming.
          </p>
        </div>

      </section>

    </div>

  )

}