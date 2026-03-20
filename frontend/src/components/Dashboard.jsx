export default function Dashboard({setPage}){

  return(

    <div>

      <h2 className="text-3xl font-semibold mb-10 text-center">
        What would you like to do?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md">

          <h3 className="text-xl font-semibold mb-4">
            Report Lost Item
          </h3>

          <button
            onClick={()=>setPage("lost")}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            Start
          </button>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md">

          <h3 className="text-xl font-semibold mb-4">
            Report Found Item
          </h3>

          <button
            onClick={()=>setPage("found")}
            className="px-4 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500"
          >
            Start
          </button>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md">

          <h3 className="text-xl font-semibold mb-4">
            Claim Item
          </h3>

          <button
            onClick={()=>setPage("browse")}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Browse
          </button>

        </div>

      </div>

    </div>

  )

}