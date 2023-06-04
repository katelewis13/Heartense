import React, { useState } from "react";

interface DeviceProps {
  name: string;
  heartrate: number;
  oxygen: number;
}

const Device: React.FC<DeviceProps> = ({ name, heartrate, oxygen }) => {
  const [heartrateLow, setHeartrateLow] = useState<string>("#000000");
  const [heartrateHigh, setHeartrateHigh] = useState<string>("#000000");
  const [oxygenLow, setOxygenLow] = useState<string>("#000000");
  const [oxygenHigh, setOxygenHigh] = useState<string>("#000000");

  return (
    <div className="bg-zinc-900 rounded-md p-10">
      <h2 className="text-white text-center font-bold">{name}</h2>
      <div className="my-4">
        <span className="text-white">Heartrate: {heartrate}</span>
      </div>
      <div className="my-4">
        <span className="text-white">Oxygen: {oxygen}</span>
      </div>
      <div>
        <label className="text-white">Heartrate Low: </label>
        <input type="color" value={heartrateLow} onChange={(e) => setHeartrateLow(e.target.value)} />
      </div>
      <div>
        <label className="text-white">Heartrate High: </label>
        <input type="color" value={heartrateHigh} onChange={(e) => setHeartrateHigh(e.target.value)} />
      </div>
      <div>
        <label className="text-white">Oxygen Low: </label>
        <input type="color" value={oxygenLow} onChange={(e) => setOxygenLow(e.target.value)} />
      </div>
      <div>
        <label className="text-white">Oxygen High: </label>
        <input type="color" value={oxygenHigh} onChange={(e) => setOxygenHigh(e.target.value)} />
      </div>
    </div>
  );
}

export default Device;
