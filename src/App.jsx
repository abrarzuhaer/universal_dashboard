import React, { useState } from 'react';
import AreaMap from './components/AreaMap';
import ChatBox from './components/ChatBox';

function App() {
  const [area, setArea] = useState("Dhaka, Bangladesh");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nationwide Dashboard</h1>
      <select
        onChange={(e) => setArea(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option>Dhaka, Bangladesh</option>
        <option>Chittagong, Bangladesh</option>
        <option>Rajshahi, Bangladesh</option>
      </select>
      <AreaMap location={area} />
      <ChatBox />
    </div>
  );
}

export default App;