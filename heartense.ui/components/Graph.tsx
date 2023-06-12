import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {useSensorData} from "../hooks/useSensorData";

type People = {
  name: string,
  colour: string,
}

export default function Graph() {

  const {data: sensorData, isLoading, hasError} = useSensorData();

  const people: People[] = [
    {
      name: "Bryce",
      colour: "#39da8a", 
    },
    {
      name: "Kate",
      colour: "#ff5c5c"
    },
    {
      name: "Aidyn",
      colour: "#5b8dee"
    },
    {
      name: "Tom",
      colour: "#fdac41"
    },
    {
      name: "Varad",
      colour: "#73e0e6"
    }
  ]

  const [selectedNames, setSelectedNames] = useState(["Bryce", "Kate", "Aidyn", "Yagumi", "Varad"])
  const [graphData, setGraphData] = useState("heart_rate");
  const [isFilterVisible, setFilterVisible] = useState(true);

  const handleCheckboxChange = (name: string) => {
    setSelectedNames((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  }; 

  const lines = people.map((person) => {
    if (!selectedNames.includes(person.name)) {
      return null;
    }
    return <Line type="monotone" dataKey={person.name+"."+graphData} stroke={person.colour} name={person.name} key={person.name} dot={false} isAnimationActive={false}/>
  });

  const toggleGraphData = () => {
    if (graphData === 'heart_rate') {
      setGraphData('blood_oxygen');
    } else {
      setGraphData('heart_rate');
    }
  };

  return (
    <>
    {!isLoading && !hasError && sensorData && sensorData.length > 0 ? 
      <div className="bg-zinc-900 pr-14 p-4 rounded-md justify-center flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            {isFilterVisible && (
              <>

              <form className="text-white flex flex-row space-x-4">
                { people.map((person) => {
                  return (
                    <div key={person.name} className="space-x-2">
                      <input type="checkbox" id={person.name} name={person.name} checked={selectedNames.includes(person.name)} onChange={(e) => handleCheckboxChange(person.name)}/>
                      <label htmlFor={person.name} className="ml-2">{person.name}</label>
                    </div>
                  )
                })}
              </form>
              </>
            )}
            </div>
          <div className="w-full items-center flex flex-col">
            <LineChart 
              title={graphData}
              width={1500} 
              height={500} 
              data={sensorData} 
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              {lines}
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis 
                dataKey="recorded_on" 
                type="category"
                tickFormatter={formatXAxis}
                stroke="white"
                />
              <YAxis type="number" domain={['dataMin', 'dataMax']} padding={{ top: 50, bottom: 50 }} stroke="white"/>
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
            </LineChart>
            <button
                className="bg-white font-bold hover:bg-gray-200 text-black text-sm py-2 rounded-md w-96 flex flex-col items-center justify-center my-2"
                onClick={toggleGraphData}
              >
                Toggle Graph Data
                <p className=" font-normal">Currently Showing: {graphData}</p>
              </button>
          </div>
        </div>
      </div>
    :null
    }
    </>
  );
}

const formatXAxis = (tickItem: number) => { 
  const date = new Date(tickItem);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleString("en-AU", options); 
}
