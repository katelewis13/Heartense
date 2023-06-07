import Graph from '../components/Graph'
import Device from '../components/Device'


export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col justify-between mt-10`}>
      <div className='flex flex-row'>
        <div className='flex items-center w-full justify-center'>
          <Graph />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        {
          devices.map((device) => {
            return (
              <div key={device.name} className="m-5 border-2 border-white rounded-md">
                <Device name={device.name} heartrate={device.heartrate} oxygen={device.oxygen} />
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

type Device = {
  name: string,
  heartrate: number,
  oxygen: number
}


const devices: Device[] = [
  {
    name: "Device 1",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Device 2",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Device 3",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Device 4",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Device 5",
    heartrate: 90,
    oxygen: 98
  }
]