import Graph from '../components/Graph'
import NavBar from '../components/NavBar'
import Device from '../components/Device'


export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col justify-between `}>
      <div className='flex flex-row'>
        <NavBar />
        <div className='flex items-center w-full justify-center'>
          <Graph />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="m-5 border-2 border-white rounded-md">
            <Device name="Device 1" heartrate={90} oxygen={98} />
        </div>
        <div className="m-5 border-2 border-white rounded-md">
            <Device name="Device 2" heartrate={90} oxygen={98} />
        </div>
        <div className="m-5 border-2 border-white rounded-md">
            <Device name="Device 3" heartrate={90} oxygen={98} />
        </div>
        <div className="m-5 border-2 border-white rounded-md">
            <Device name="Device 4" heartrate={90} oxygen={98} />
        </div>
        <div className="m-5 border-2 border-white rounded-md">
            <Device name="Device 5" heartrate={90} oxygen={98} />
        </div>
      </div>
      
    </main>
  )
}
