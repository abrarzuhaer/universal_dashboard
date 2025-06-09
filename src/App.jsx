import React, { useState } from 'react';
import AreaMap from './components/AreaMap'; // Assuming AreaMap exists

const committeeAreas = {
  Central: 'Dhaka, Bangladesh',
  Sub: 'Chittagong, Bangladesh',
  District: 'Rajshahi, Bangladesh',
  Metros: 'Khulna, Bangladesh',
  Upazila: 'Barisal, Bangladesh',
  Union: 'Sylhet, Bangladesh',
  Ward: 'Rangpur, Bangladesh',
};

function App() {
  const [area, setArea] = useState('Dhaka, Bangladesh');
  const [memberOpen, setMemberOpen] = useState(true); // Controls overall Members section dropdown

  // Updated memberLists to store objects with name, id, and phone
  const [memberLists, setMemberLists] = useState({
    Central: [
      { name: 'Ali', id: '001', phone: '01700000000' },
      { name: 'Fatima', id: '002', phone: '01700000001' },
    ],
    Sub: [{ name: 'Raju', id: '003', phone: '01700000002' }],
    District: [{ name: 'Kamal', id: '004', phone: '01700000003' }],
    Metros: [{ name: 'Tania', id: '005', phone: '01700000004' }],
    Upazila: [],
    Union: [],
    Ward: [],
  });

  const [showCommittee, setShowCommittee] = useState(true);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sentMessages, setSentMessages] = useState([]); // Optional log

  // New states for adding members
  const [newMember, setNewMember] = useState({ name: '', id: '', phone: '' });
  // This will store a boolean for each area key, e.g., { Central: false, Sub: true }
  const [showAddForm, setShowAddForm] = useState({});

  // State to manage overall view ('dashboard', 'messaging', 'members_list', 'add_member')
  const [view, setView] = useState('dashboard');

  return (
    <div>
      <div className="sidebar">
        <h2 style={{ marginBottom: '1rem' }}>📊 Dashboard</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {/* Members Section - Parent Toggle */}
          <li
            onClick={() => setMemberOpen(!memberOpen)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            🧑‍🤝‍🧑 Members {memberOpen ? '🔽' : '▶️'}
          </li>

          {/* Members Sub-options (visible when memberOpen is true) */}
          {memberOpen && (
            <>
              {/* Option to view all members */}
              <li
                style={{
                  paddingLeft: '1rem',
                  cursor: 'pointer',
                  color: view === 'members_list' ? 'blue' : 'inherit', // Highlight if active
                }}
                onClick={() => setView('members_list')}
              >
                📋 View All Members
              </li>

              {/* Option to add a new member (general form, not per area here) */}
              <li
                style={{
                  paddingLeft: '1rem',
                  cursor: 'pointer',
                  color: view === 'add_member' ? 'blue' : 'inherit', // Highlight if active
                }}
                onClick={() => setView('add_member')}
              >
                ➕ Add New Member
              </li>
            </>
          )}

          {/* General navigation items */}
          <li onClick={() => setView('events')}>📅 Events</li>
          <li onClick={() => setView('tasks')}>✅ Tasks</li>
          <li onClick={() => setView('documents')}>📁 Documents</li>
          <li onClick={() => setView('voters')}>🗳️ Voters</li>

          <li
            style={{
              cursor: 'pointer',
              fontWeight: view === 'messaging' ? 'bold' : 'normal',
            }}
            onClick={() => setView('messaging')}
          >
            💬 Messaging
          </li>

          <li onClick={() => setView('analytics')}>📈 Analytics</li>
          <li onClick={() => setView('settings')}>⚙️ Settings</li>

          <hr />

          {/* Committee Section */}
          <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            🏛️ Committee
            <span
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={() => setShowCommittee(!showCommittee)}
            >
              {showCommittee ? '🔽' : '▶️'}
            </span>
          </li>
          {showCommittee && (
            <ul style={{ paddingLeft: '1.5rem' }}>
              {Object.keys(committeeAreas).map((key) => (
                <li
                  key={key}
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => {
                    setArea(committeeAreas[key]);
                    setView('dashboard'); // Go back to dashboard view when selecting area
                  }}
                >
                  📍 {key}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
      <div className="main">
        {/* Dashboard Content */}
        {view === 'dashboard' && (
          <>
            {/* Search bar and icons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  margin: '0 auto',
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    border: '1px solid black',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <span
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Search
                </span>
                <span
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Notice Board
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <span
                  role="img"
                  aria-label="search"
                  style={{ fontSize: '16px' }}
                >
                  🔍
                </span>
                <span role="img" aria-label="bell" style={{ fontSize: '16px' }}>
                  🔔
                </span>
              </div>
            </div>

            {/* Top row of cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div className="card">
                <div style={{ fontWeight: 'bold' }}>Total Members</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  1,250
                </div>
                <div style={{ color: 'blue', fontWeight: 'bold' }}>
                  Rejection
                </div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 'bold' }}>Donations</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  ৳ 5,300
                </div>
                <div style={{ color: 'blue', fontWeight: 'bold' }}>d</div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 'bold' }}>Upcoming Events</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
                <div style={{ color: 'blue', fontWeight: 'bold' }}>
                  Terminations
                </div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 'bold' }}>Tasks</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
                <div
                  style={{
                    backgroundColor: '#e0e0e0',
                    height: '8px',
                    borderRadius: '4px',
                    marginTop: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '60%',
                      height: '8px',
                      backgroundColor: 'green',
                      borderRadius: '4px',
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Middle row of cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <div className="card">
                <h3>Campaign Overview</h3>
                <div>
                  <p>Campaign 1</p>
                  <div
                    style={{
                      backgroundColor: '#eee',
                      height: '8px',
                      borderRadius: '4px',
                      marginBottom: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '26%',
                        height: '8px',
                        backgroundColor: 'red',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </div>
                  <p>Campaign 2</p>
                  <div
                    style={{
                      backgroundColor: '#eee',
                      height: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <div
                      style={{
                        width: '50%',
                        height: '8px',
                        backgroundColor: 'green',
                        borderRadius: '4px',
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3>Document Library</h3>
                <table
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    borderCollapse: 'collapse',
                  }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Flyer</td>
                      <td>Policy</td>
                      <td>UmoT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="card">
                <h3>Member Management</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rean</td>
                      <td>Ship</td>
                      <td>Lip</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="card">
                <h3>Event Calendar</h3>
                <table
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <thead>
                    <tr>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                        (day) => (
                          <th key={day}>{day}</th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {[20, 21, 22, 23, 24, 25, 26].map((d) => (
                        <td key={d}>{d}</td>
                      ))}
                    </tr>
                    <tr>
                      {[27, 28, 29, 30, 31, 1, 2].map((d) => (
                        <td
                          key={d}
                          style={
                            d === 27
                              ? { backgroundColor: '#cef', fontWeight: 'bold' }
                              : {}
                          }
                        >
                          {d}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom row of cards (Voter, Insights, Analytics) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginTop: '1rem',
                alignItems: 'stretch',
              }}
            >
              {/* Voter and Constituency Insights */}
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Voter and Constituency Insights - {area}</h3>
                <AreaMap location={area} />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  <span>🟢 Policy</span>
                  <span>🔵 Regatine</span>
                </div>
              </div>

              {/* Insights */}
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Insights</h3>
                <svg width="100%" height="150" viewBox="0 0 32 32">
                  <circle r="16" cx="16" cy="16" fill="#eee" />
                  <path d="M16 16 L16 0 A16 16 0 0 1 31.9 16 Z" fill="green" />
                  <path
                    d="M16 16 L31.9 16 A16 16 0 0 1 20.4 30.3 Z"
                    fill="orange"
                  />
                  <path d="M16 16 L20.4 30.3 A16 16 0 0 1 16 0 Z" fill="red" />
                </svg>
                <ul
                  style={{
                    paddingLeft: '1rem',
                    fontSize: '14px',
                    marginTop: '0.5rem',
                  }}
                >
                  <li>Positive: 55%</li>
                  <li>Neutral: 15%</li>
                  <li>Negative: 30%</li>
                </ul>
              </div>

              {/* Analytics */}
              <div
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Analytics and Reporting</h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    height: '100px',
                    gap: '8px',
                    justifyContent: 'center',
                  }}
                >
                  {[15, 20, 25, 18, 22].map((val, i) => (
                    <div
                      key={i}
                      style={{
                        width: '20px',
                        height: `${val * 3}px`,
                        background: 'green',
                      }}
                    ></div>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    fontSize: '12px',
                    marginTop: '4px',
                    justifyContent: 'center',
                  }}
                >
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Messaging Component */}
        {view === 'messaging' && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <button
              onClick={() => setView('dashboard')} // Back to dashboard
              style={{
                marginBottom: '1rem',
                padding: '6px 12px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ← Back to Dashboard
            </button>

            <h3>Send Message to Member</h3>

            <label>
              Select Recipient:
              <select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                style={{ marginLeft: '10px' }}
              >
                <option value="">-- Choose --</option>
                {Object.entries(memberLists).flatMap(([area, members]) =>
                  members.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} ({area})
                    </option>
                  ))
                )}
              </select>
            </label>

            <br />
            <textarea
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{
                width: '100%',
                height: '100px',
                marginTop: '10px',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            ></textarea>
            <br />
            <button
              onClick={() => {
                if (selectedRecipient && messageText) {
                  setSentMessages([
                    ...sentMessages,
                    { to: selectedRecipient, text: messageText },
                  ]);
                  setMessageText('');
                  alert(`Message sent to ${selectedRecipient}`);
                } else {
                  alert('Please select a recipient and type a message.');
                }
              }}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        )}

        {/* View All Members Component */}
        {view === 'members_list' && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <button
              onClick={() => setView('dashboard')}
              style={{
                marginBottom: '1rem',
                padding: '6px 12px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ← Back to Dashboard
            </button>
            <h3>All Members</h3>
            {Object.keys(memberLists).map((areaKey) => (
              <div key={areaKey} style={{ marginBottom: '1.5rem' }}>
                <h4>📍 {areaKey} Committee</h4>
                {memberLists[areaKey].length > 0 ? (
                  <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                    {memberLists[areaKey].map((member, i) => (
                      <li
                        key={member.id || i}
                        style={{
                          marginBottom: '8px',
                          borderBottom: '1px solid #eee',
                          paddingBottom: '8px',
                        }}
                      >
                        👤 <strong>{member.name}</strong>
                        <br />
                        🆔 ID: {member.id}
                        <br />
                        📞 Phone: {member.phone}
                        <span
                          onClick={() => {
                            const updated = { ...memberLists };
                            updated[areaKey] = updated[areaKey].filter(
                              (_, idx) => idx !== i
                            );
                            setMemberLists(updated);
                          }}
                          style={{
                            color: 'red',
                            cursor: 'pointer',
                            marginLeft: '15px',
                            fontSize: '0.9rem',
                          }}
                        >
                          ❌ Remove
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No members in {areaKey} committee.</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add New Member Form */}
        {view === 'add_member' && (
          <div className="card" style={{ marginTop: '1rem' }}>
            <button
              onClick={() => setView('dashboard')}
              style={{
                marginBottom: '1rem',
                padding: '6px 12px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ← Back to Dashboard
            </button>
            <h3>Add New Member</h3>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
              }}
            >
              Select Committee Area:
              <select
                value={newMember.area || ''} // Use newMember.area to track selected area for new member
                onChange={(e) =>
                  setNewMember({ ...newMember, area: e.target.value })
                }
                style={{
                  marginLeft: '10px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">-- Choose Area --</option>
                {Object.keys(memberLists).map((areaKey) => (
                  <option key={areaKey} value={areaKey}>
                    {areaKey}
                  </option>
                ))}
              </select>
            </label>

            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            />
            <input
              type="text"
              placeholder="ID"
              value={newMember.id}
              onChange={(e) =>
                setNewMember({ ...newMember, id: e.target.value })
              }
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newMember.phone}
              onChange={(e) =>
                setNewMember({ ...newMember, phone: e.target.value })
              }
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            />
            <button
              onClick={() => {
                if (
                  newMember.name &&
                  newMember.id &&
                  newMember.phone &&
                  newMember.area
                ) {
                  const updated = { ...memberLists };
                  updated[newMember.area] = [
                    ...updated[newMember.area],
                    newMember,
                  ];
                  setMemberLists(updated);
                  setNewMember({ name: '', id: '', phone: '', area: '' }); // Clear form and area
                  alert(`Member ${newMember.name} added to ${newMember.area}.`);
                  setView('members_list'); // Go to member list after adding
                } else {
                  alert(
                    'Please fill out all fields and select a committee area.'
                  );
                }
              }}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: 'green',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              ✅ Submit New Member
            </button>
          </div>
        )}
      </div>{' '}
      {/* Closes the .main div */}
    </div>
  );
}

export default App;
