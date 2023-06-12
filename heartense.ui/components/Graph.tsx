import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSpring, animated } from 'react-spring';
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
  const filterAnimation = useSpring({ width: isFilterVisible ? 240 : 0 });

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
    return <Line type="monotone" dataKey={person.name+"."+graphData} stroke={person.colour} name={person.name} key={person.name} dot={false}/>
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
      <div className="bg-zinc-900 pr-14 p-10 rounded-md">
        <div className="flex flex-row justify-center items-center">
          <button
            className="bg-white text-black rounded shadow"
            onClick={toggleGraphData}
          >
            Toggle Graph Data
          </button>
          <p className="text-white mt-4">
            Current Graph Data: {graphData}
          </p>
        </div>
        <div className="flex">
          <animated.div style={filterAnimation} className="overflow-hidden md:bg-transparent md:p-4 md:rounded-lg md:shadow-lg md:mr-6">
          <button className="text-white" onClick={() => setFilterVisible(!isFilterVisible)}>{isFilterVisible ? '<' : '>'}</button>
            {isFilterVisible && (
              <form className="text-white">
                { people.map((person) => {
                  return (
                    <div key={person.name}>
                      <input type="checkbox" id={person.name} name={person.name} checked={selectedNames.includes(person.name)} onChange={(e) => handleCheckboxChange(person.name)}/>
                      <label htmlFor={person.name} className="ml-2">{person.name}</label>
                    </div>
                  )
                })}
              </form>
            )}
          </animated.div>
          <div className="w-full">
            <LineChart 
              width={1200} 
              height={750} 
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
