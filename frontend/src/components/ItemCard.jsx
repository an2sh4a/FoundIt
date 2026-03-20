import { claimItem } from "../api"

export default function ItemCard({item}){

  const claim = async()=>{

    await claimItem(item.id)

    alert("Claim request submitted")

  }

  return(

    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition cursor-pointer">

      <div className="mb-3 text-sm text-gray-400">
        Found Item
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {item.name}
      </h3>

      <p className="text-gray-600 text-sm">
        Color: {item.color}
      </p>

      <p className="text-gray-600 text-sm mb-4">
        Location: {item.location}
      </p>

      <button
        onClick={claim}
        className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        Claim Item
      </button>

    </div>

  )

}