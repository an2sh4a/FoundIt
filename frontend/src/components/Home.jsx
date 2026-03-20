export default function Home({setPage}){

  return(

    <div className="home">

      <h1>Welcome to Digital Lost & Found</h1>

      <p>
        Report lost items, list found belongings, and help reconnect
        people with their valuables.
      </p>

      <div className="home-actions">

        <button onClick={()=>setPage("lost")}>Report Lost Item</button>

        <button onClick={()=>setPage("found")}>Report Found Item</button>

        <button onClick={()=>setPage("browse")}>Browse Items</button>

      </div>

    </div>

  )

}