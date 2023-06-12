import React, { useState, useEffect, useRef, RefObject } from "react";
import styled from "styled-components";
import { useDeviceData } from "../hooks/useDeviceData";
import { updateColour } from "@/actions/colour";
import { DeviceColour } from "@/types/deviceColours";

type DeviceProps = {
  name: string,
  heartrate: number,
  oxygen: number
}

type LedType = "Heartrate Low" | "Heartrate High" | "Oxygen Low" | "Oxygen High";

function Device(p: DeviceProps) {

  const { data: deviceData, isLoading: isDeviceDataLoading, hasError: hasDeviceDataError } = useDeviceData();
  
  let currentDeviceData: DeviceColour | undefined = undefined;

  if (!isDeviceDataLoading && !hasDeviceDataError && deviceData && deviceData.length > 0) {
    const data = deviceData.find((d: any) => d.name === p.name)
    if (!!data)
      currentDeviceData = {
        name: data.name,
        colourHeartLow: data.colourHeartLow,
        colourHeartHigh: data.colourHeartHigh,
        colourOxLow: data.colourOxLow,
        colourOxHigh: data.colourOxHigh
      }
  }

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = (heartrateLow: string, heartrateHigh: string, oxygenLow: string, oxygenHigh: string) => {
    if(isEditing){
      updateColour(p.name, heartrateLow, heartrateHigh, oxygenLow, oxygenHigh);
    }
    setIsEditing(!isEditing);
  }

  if (!!currentDeviceData) {
    return (
      <div className="bg-zinc-900 rounded-md p-10 ">
        <h2 className="text-white text-center font-bold">{p.name}</h2>
        <div className="my-4">
          <span className="text-white">Heartrate: {p.heartrate}</span>
        </div>
        <div className="my-4">
          <span className="text-white">Oxygen: {p.oxygen}</span>
        </div>
          <DeviceColours 
            currentDeviceData={currentDeviceData}
            isEditing={isEditing}
            toggleEditing={toggleEditing}
          />
      
      </div>
    );
  }
  return (null)
}

export default Device;


function DeviceColours(p: { 
  currentDeviceData: DeviceColour, 
  isEditing: boolean,
  toggleEditing: (heartrateLow: string, heartrateHigh: string, oxygenLow: string, oxygenHigh: string) => void
  }) {

  const [heartrateLow, setHeartrateLow] = useState(p.currentDeviceData.colourHeartLow); 
  const [heartrateHigh, setHeartrateHigh] = useState(p.currentDeviceData.colourHeartHigh);
  const [oxygenLow, setOxygenLow] = useState(p.currentDeviceData.colourOxLow);
  const [oxygenHigh, setOxygenHigh] = useState(p.currentDeviceData.colourOxHigh);
  
  const CurrentColourBlock = styled.div<{colour: string}>`
  background-color: ${(p: { colour: any; }) => p.colour};
  height: 16px;
  width: 16px;
  border-radius: 10px;
  `;

  function updateLed(led: LedType, colour: string){
    if (led === "Heartrate Low") {
      setHeartrateLow(colour);
    }
    else if (led === "Heartrate High") {
      setHeartrateHigh(colour);
    }
    else if (led === "Oxygen Low") {
      setOxygenLow(colour);
    }
    else if (led === "Oxygen High") {
      setOxygenHigh(colour);
    }
  }


  function DeviceColourSetting(p:{name: LedType, colour: string, isEditing: boolean}) {

    const ref = useRef<HTMLDivElement>(null);
    const [colour, setColour] = useState(p.colour);

    useClickOutside(ref, () => {
      updateLed(p.name, colour);
    });

    const updateAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColour(event.target.value);
    }

    return(
      <div className="flex space-x-4 items-center py-2 justify-between">
        
        <label className="text-white align-middle mr-10">{p.name}</label>
        <div className="w-10 h-6 flex justify-center">
          { p.isEditing ?
            <div ref={ref}>
              <input type="color" value={p.colour} onChange={updateAll} />
            </div>
            : <CurrentColourBlock colour={p.colour}/>
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <DeviceColourSetting name="Heartrate Low" colour={heartrateLow} isEditing={p.isEditing}/>
      <DeviceColourSetting name="Heartrate High" colour={heartrateHigh} isEditing={p.isEditing}/>
      <DeviceColourSetting name="Oxygen Low" colour={oxygenLow} isEditing={p.isEditing}/>
      <DeviceColourSetting name="Oxygen High" colour={oxygenHigh} isEditing={p.isEditing}/>
      <button
          className="bg-white hover:bg-gray-200 text-black text-sm py-2 px-8 rounded-md  flex mx-auto mt-6 justify-center min-w-full"
          onClick={() => p.toggleEditing(heartrateLow, heartrateHigh, oxygenLow, oxygenHigh)}>
            {p.isEditing ? "Save" : "Edit"}
      </button>
    </>
  )
}


function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
}