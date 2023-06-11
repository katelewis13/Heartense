import React, { useState } from "react";
import styled from "styled-components";

function Device(p:{
  name: string,
  heartrate: number,
  oxygen: number
  }) {
  const [heartrateLow, setHeartrateLow] = useState<string>("#000000");
  const [heartrateHigh, setHeartrateHigh] = useState<string>("#000000");
  const [oxygenLow, setOxygenLow] = useState<string>("#000000");
  const [oxygenHigh, setOxygenHigh] = useState<string>("#000000");

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  const CurrentColourBlock = styled.div<{colour: string}>`
    background-color: ${(p: { colour: any; }) => p.colour};
    height: 16px;
    width: 16px;
    border-radius: 10px;
  `;
  type LedType = "Heartrate Low" | "Heartrate High" | "Oxygen Low" | "Oxygen High";

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

  function DeviceColourSetting(p:{name: LedType, colour: string}) {

    return(
      <div className="flex space-x-4 items-center py-2 justify-between">
        <label className="text-white align-middle mr-10">{p.name}</label>
        <div className="w-10 h-6 flex justify-center">
          { isEditing ?
            <input type="color" value={p.colour} onChange={(e) => updateLed(p.name, e.target.value)} />
            : <CurrentColourBlock colour={p.colour}/>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 rounded-md p-10 ">
      <h2 className="text-white text-center font-bold">{p.name}</h2>
      <div className="my-4">
        <span className="text-white">Heartrate: {p.heartrate}</span>
      </div>
      <div className="my-4">
        <span className="text-white">Oxygen: {p.oxygen}</span>
      </div>

      <DeviceColourSetting name="Heartrate Low" colour={heartrateLow}/>
      <DeviceColourSetting name="Heartrate High" colour={heartrateHigh}/>
      <DeviceColourSetting name="Oxygen Low" colour={oxygenLow}/>
      <DeviceColourSetting name="Oxygen High" colour={oxygenHigh}/>
        
      <button
        className="bg-white hover:bg-gray-200 text-black text-sm py-2 px-8 rounded-md  flex mx-auto mt-6 justify-center min-w-full"
        onClick={() => toggleEditing()}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}

export default Device;

