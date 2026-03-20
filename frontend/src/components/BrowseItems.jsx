import { useEffect, useState } from "react"
import { getFoundItems, claimItem } from "../api"
import ItemCard from "./ItemCard"

export default function BrowseItems(){

  const [items,setItems] = useState([])

  useEffect(()=>{

    load()

  },[])

  const load = async ()=>{

    const data = await getFoundItems()

    setItems(data)

  }

  return(

    <div>

      <h2 className="text-3xl font-semibold mb-8">
        Found Items
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {items.map(item=>(
          <ItemCard key={item.id} item={item}/>
        ))}

      </div>

    </div>

  )

}