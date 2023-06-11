import Graph from '../components/Graph'
import Device from '../components/Device'
import {useSensorData} from "../hooks/useSensorData";

export default function Home() {

  const {latest, isLoading, hasError} = useSensorData();

  return (
    <main className={`flex min-h-screen flex-col justify-between mt-10`}>
      <div className='flex flex-row'>
        <div className='flex items-center w-full justify-center'>
          <Graph />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        { latest != null && !isLoading && !hasError &&
          latest.map((person) => {
            return (
              <div key={person.name} className="m-5 border-2 border-white rounded-md">
                <Device name={person.name} heartrate={person.heartRate} oxygen={person.bloodOxygen}/>
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
    name: "Bryce",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Kate",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Aidyn",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Yagumi",
    heartrate: 90,
    oxygen: 98
  },
  {
    name: "Varad",
    heartrate: 90,
    oxygen: 98
  }
]