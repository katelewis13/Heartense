import Graph from '../components/Graph'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col justify-between `}>
      <div className='flex flex-row'>
        <NavBar />
        <div className='flex items-center w-full justify-center'>
          <Graph />
        </div>
      </div>
      
    </main>
  )
}
