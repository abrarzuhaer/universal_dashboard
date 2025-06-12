import React, { useState } from 'react';
import AreaMap from './components/AreaMap';
import ChatbotWidget from './components/ChatbotWidget';
import './App.css';
import logo2 from './assets/logo2.png';

// All your icon imports are correct and should be here
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineViewColumns,
  HiOutlineCalendarDays,
  HiOutlineCheckBadge,
  HiOutlineDocumentDuplicate,
  HiOutlineArchiveBox,
  HiOutlineChatBubbleOvalLeft,
  HiOutlinePresentationChartLine,
  HiOutlineCog6Tooth,
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineDocumentText,
  HiOutlineArrowDownTray,
  HiOutlineMegaphone,
  HiOutlineArrowLeftOnRectangle,
} from 'react-icons/hi2';

const committeeAreas = {
  Central: 'Dhaka, Bangladesh',
  Sub: 'Chittagong, Bangladesh',
  District: 'Rajshahi, Bangladesh',
  Metros: 'Khulna, Bangladesh',
  Upazila: 'Barisal, Bangladesh',
  Union: 'Sylhet, Bangladesh',
  Ward: 'Rangpur, Bangladesh',
};

// This is the ONE AND ONLY definition for the DashboardApp component.
// It correctly receives the 'onLogout' prop from App.jsx.
export default function DashboardApp({ onLogout }) {
  // All state hooks (useState) must be inside the component function.
  const [area, setArea] = useState('Dhaka, Bangladesh');
  const [memberOpen, setMemberOpen] = useState(true);
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
  const [sentMessages, setSentMessages] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', id: '', phone: '' });
  const [view, setView] = useState('dashboard');
  const iconStyle = {
    marginRight: '10px',
    verticalAlign: 'middle',
    fontSize: '1.2rem',
  };

  // Helper functions like this also go inside the component.
  const handleSendMessageToMember = () => {
    if (selectedRecipient && messageText.trim()) {
      const newMessage = {
        to: selectedRecipient,
        text: messageText,
        date: new Date().toLocaleString(),
      };
      setSentMessages([...sentMessages, newMessage]);
      setMessageText('');
      alert(`Message sent to ${selectedRecipient}`);
    } else {
      alert('Please select a recipient and type a message.');
    }
  };

  // The return statement contains all the JSX for this component.
  return (
    <div>
      <div className="sidebar">
        <div style={{ padding: '0.5rem', textAlign: 'center' }}>
          <img src={logo2} alt="Dashboard Logo" style={{ width: '85px' }} />
        </div>
        <h2
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => setView('dashboard')}
        >
          <HiOutlineChartBar style={{ ...iconStyle, fontSize: '1.5rem' }} />{' '}
          Dashboard
        </h2>
        <div
          style={{
            padding: '10px 0rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setView('notice_board')}
        >
          <HiOutlineMegaphone style={iconStyle} /> Notice Board
        </div>
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '10px' }}>
          <li
            onClick={() => setMemberOpen(!memberOpen)}
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            <HiOutlineUserGroup style={iconStyle} /> Members{' '}
            {memberOpen ? '🔽' : '▶️'}
          </li>
          {memberOpen && (
            <>
              <li
                style={{
                  paddingLeft: '1rem',
                  cursor: 'pointer',
                  color: view === 'members_list' ? 'blue' : 'inherit',
                }}
                onClick={() => setView('members_list')}
              >
                <HiOutlineViewColumns style={iconStyle} /> View All Members
              </li>
              <li
                style={{
                  paddingLeft: '1rem',
                  cursor: 'pointer',
                  color: view === 'add_member' ? 'blue' : 'inherit',
                }}
                onClick={() => setView('add_member')}
              >
                <HiOutlineUserPlus style={iconStyle} /> Add New Member
              </li>
            </>
          )}
          <li onClick={() => setView('events')} style={{ cursor: 'pointer' }}>
            <HiOutlineCalendarDays style={iconStyle} /> Events
          </li>
          <li onClick={() => setView('tasks')} style={{ cursor: 'pointer' }}>
            <HiOutlineCheckBadge style={iconStyle} /> Tasks
          </li>
          <li
            onClick={() => setView('documents')}
            style={{ cursor: 'pointer' }}
          >
            <HiOutlineDocumentDuplicate style={iconStyle} /> Documents
          </li>
          <li onClick={() => setView('voters')} style={{ cursor: 'pointer' }}>
            <HiOutlineArchiveBox style={iconStyle} /> Voters
          </li>
          <li
            style={{
              cursor: 'pointer',
              fontWeight: view === 'messaging' ? 'bold' : 'normal',
            }}
            onClick={() => setView('messaging')}
          >
            <HiOutlineChatBubbleOvalLeft style={iconStyle} /> Messaging
          </li>
          <li
            onClick={() => setView('analytics')}
            style={{ cursor: 'pointer' }}
          >
            <HiOutlinePresentationChartLine style={iconStyle} /> Analytics
          </li>
          <li onClick={() => setView('settings')} style={{ cursor: 'pointer' }}>
            <HiOutlineCog6Tooth style={iconStyle} /> Settings
          </li>
          <li
            onClick={onLogout}
            style={{
              cursor: 'pointer',
              color: '#c82333',
              fontWeight: 'bold',
              marginTop: '1rem',
            }}
          >
            <HiOutlineArrowLeftOnRectangle style={iconStyle} /> Logout
          </li>
          <hr />
          <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            <HiOutlineBuildingOffice2 style={iconStyle} /> Committee
            <span
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowCommittee(!showCommittee);
              }}
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
                    setView('dashboard');
                  }}
                >
                  <HiOutlineMapPin style={{ ...iconStyle, color: 'red' }} />{' '}
                  {key}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>

      <div className="main">
        {view === 'dashboard' && (
          <>
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
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <HiOutlineMagnifyingGlass
                    style={{
                      position: 'absolute',
                      left: '10px',
                      fontSize: '1.2rem',
                      color: '#888',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    style={{
                      border: '1px solid black',
                      padding: '8px 12px 8px 35px',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  />
                </div>
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
                  onClick={() => setView('notice_board')}
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
                  6,50,78,653
                </div>
                <div style={{ color: 'blue', fontWeight: 'bold' }}>
                  Rejection - Terminations
                </div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 'bold' }}>Donations</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  ৳ 5,83,64,70,254
                </div>
                <div style={{ color: 'blue', fontWeight: 'bold' }}></div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 'bold' }}>Upcoming Events</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
                {/* <div style={{ color: 'blue', fontWeight: 'bold' }}>
                  Terminations
                </div> */}
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
                      <td>Publication</td>
                      <td>Code of Conduct</td>
                      <td>Central</td>
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
                      <td>Sakib Arman</td>
                      <td>Coordinator</td>
                      <td>Dhaka Central</td>
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginTop: '1rem',
                alignItems: 'stretch',
              }}
            >
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
        {view === 'events' && (
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineCalendarDays style={iconStyle} /> Upcoming Events
            </h3>
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h4>Annual General Meeting</h4>
              <p>
                <strong>Date:</strong> July 25, 2025
              </p>
              <p>
                <strong>Location:</strong> Community Hall, Dhaka
              </p>
              <span
                style={{
                  background: 'blue',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                }}
              >
                Upcoming
              </span>
            </div>
            <div
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h4>Charity Drive Kick-off</h4>
              <p>
                <strong>Date:</strong> August 5, 2025
              </p>
              <p>
                <strong>Location:</strong> Central Office
              </p>
              <span
                style={{
                  background: 'blue',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                }}
              >
                Upcoming
              </span>
            </div>
            <button
              style={{
                padding: '10px 15px',
                border: 'none',
                background: 'green',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              + Add New Event
            </button>
          </div>
        )}
        {view === 'tasks' && (
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineCheckBadge style={iconStyle} /> Task List
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <input type="checkbox" style={{ marginRight: '10px' }} />{' '}
                Finalize budget for Q3
              </li>
              <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <input type="checkbox" style={{ marginRight: '10px' }} />{' '}
                Contact venue for AGM
              </li>
              <li
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  textDecoration: 'line-through',
                  color: '#888',
                }}
              >
                <input
                  type="checkbox"
                  checked
                  readOnly
                  style={{ marginRight: '10px' }}
                />{' '}
                Send out weekly newsletter
              </li>
              <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <input type="checkbox" style={{ marginRight: '10px' }} />{' '}
                Prepare presentation for stakeholders
              </li>
            </ul>
            <input
              type="text"
              placeholder="Add a new task..."
              style={{
                marginTop: '1rem',
                padding: '10px',
                width: 'calc(100% - 120px)',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              style={{
                padding: '10px 15px',
                border: 'none',
                background: 'green',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Add Task
            </button>
          </div>
        )}
        {view === 'documents' && (
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineDocumentDuplicate style={iconStyle} /> Document Library
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>
                    Date Added
                  </th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px' }}>
                    <HiOutlineDocumentText style={{ marginRight: '5px' }} />{' '}
                    Q2_Budget.pdf
                  </td>
                  <td style={{ padding: '8px' }}>PDF</td>
                  <td style={{ padding: '8px' }}>2025-06-01</td>
                  <td style={{ padding: '8px' }}>
                    <HiOutlineArrowDownTray style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px' }}>
                    <HiOutlineDocumentText style={{ marginRight: '5px' }} />{' '}
                    Meeting_Minutes.docx
                  </td>
                  <td style={{ padding: '8px' }}>DOCX</td>
                  <td style={{ padding: '8px' }}>2025-05-28</td>
                  <td style={{ padding: '8px' }}>
                    <HiOutlineArrowDownTray style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px' }}>
                    <HiOutlineDocumentText style={{ marginRight: '5px' }} />{' '}
                    Campaign_Plan.pptx
                  </td>
                  <td style={{ padding: '8px' }}>PPTX</td>
                  <td style={{ padding: '8px' }}>2025-05-20</td>
                  <td style={{ padding: '8px' }}>
                    <HiOutlineArrowDownTray style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              style={{
                marginTop: '1rem',
                padding: '10px 15px',
                border: 'none',
                background: 'green',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              + Upload Document
            </button>
          </div>
        )}
        {view === 'voters' && (
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineArchiveBox style={iconStyle} /> Voter Database
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>
                    Voter ID
                  </th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Ward</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px' }}>Aarav Sharma</td>
                  <td style={{ padding: '8px' }}>BDV123456</td>
                  <td style={{ padding: '8px' }}>Ward 5</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{ color: 'green' }}>Verified</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px' }}>Isha Rahman</td>
                  <td style={{ padding: '8px' }}>BDV654321</td>
                  <td style={{ padding: '8px' }}>Ward 2</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{ color: 'green' }}>Verified</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px' }}>Farhan Khan</td>
                  <td style={{ padding: '8px' }}>BDV987654</td>
                  <td style={{ padding: '8px' }}>Ward 5</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{ color: 'orange' }}>Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {view === 'analytics' && (
          <div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center' }}>
                <HiOutlinePresentationChartLine style={iconStyle} /> Key Metrics
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <h4>Member Growth</h4>
                  <p style={{ fontSize: '2rem', color: 'green', margin: 0 }}>
                    +15%
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4>Donation Increase</h4>
                  <p style={{ fontSize: '2rem', color: 'green', margin: 0 }}>
                    +25%
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4>Event Attendance</h4>
                  <p style={{ fontSize: '2rem', color: 'green', margin: 0 }}>
                    +40%
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <h3>Voter Engagement Over Time</h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '200px',
                  gap: '8px',
                  justifyContent: 'center',
                  border: '1px solid #eee',
                  padding: '1rem',
                }}
              >
                {[15, 20, 45, 38, 62, 80].map((val, i) => (
                  <div
                    key={i}
                    style={{
                      width: '40px',
                      height: `${val}%`,
                      background: 'blue',
                      borderRadius: '5px 5px 0 0',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
        {view === 'settings' && (
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineCog6Tooth style={iconStyle} /> Application Settings
            </h3>
            <div style={{ marginTop: '1rem' }}>
              <h4>Profile</h4>
              <label style={{ display: 'block', margin: '10px 0' }}>
                Name:{' '}
                <input
                  type="text"
                  defaultValue="Admin User"
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </label>
              <label style={{ display: 'block', margin: '10px 0' }}>
                Email:{' '}
                <input
                  type="email"
                  defaultValue="admin@example.com"
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </label>
            </div>
            <hr style={{ margin: '2rem 0' }} />
            <div style={{ marginTop: '1rem' }}>
              <h4>
                <HiOutlineBell style={{ marginRight: '5px' }} /> Notifications
              </h4>
              <label style={{ display: 'block', margin: '10px 0' }}>
                <input type="checkbox" defaultChecked /> Email Notifications
              </label>
              <label style={{ display: 'block', margin: '10px 0' }}>
                <input type="checkbox" /> SMS Alerts
              </label>
            </div>
            <button
              style={{
                marginTop: '2rem',
                padding: '10px 15px',
                border: 'none',
                background: 'blue',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Save Settings
            </button>
          </div>
        )}
        {view === 'notice_board' && (
          <div>
            <div
              className="card"
              style={{
                backgroundColor: '#fffbe6',
                border: '1px solid #facc15',
              }}
            >
              <h3
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#b45309',
                }}
              >
                <HiOutlineMegaphone style={iconStyle} /> Pinned Notice
              </h3>
              <h4>Annual General Meeting (AGM) Date Finalized</h4>
              <p>
                <strong>Posted On:</strong> June 10, 2025
              </p>
              <p>
                The Annual General Meeting for all committee members has been
                scheduled for
                <strong> July 25, 2025</strong>. All members are requested to
                attend. Further details regarding the venue and agenda will be
                shared shortly.
              </p>
            </div>
            <div className="card" style={{ marginTop: '1rem' }}>
              <h3>Recent Notices</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li
                  style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}
                >
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    Q3 Budget Submission Deadline
                  </p>
                  <small>Posted by Admin on June 9, 2025</small>
                </li>
                <li
                  style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}
                >
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    New Health and Safety Guidelines
                  </p>
                  <small>Posted by Admin on June 7, 2025</small>
                </li>
                <li
                  style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}
                >
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    Office Closure for Public Holiday
                  </p>
                  <small>Posted by Admin on June 5, 2025</small>
                </li>
              </ul>
              <button
                style={{
                  marginTop: '1rem',
                  padding: '10px 15px',
                  border: 'none',
                  background: 'green',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                + Post New Notice
              </button>
            </div>
          </div>
        )}
        {view === 'messaging' && (
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
            <h3>Send Message to Member</h3>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              Select Recipient:
              <select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                style={{
                  marginLeft: '10px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">-- Choose a member --</option>
                {Object.entries(memberLists).flatMap(([area, members]) =>
                  members.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} ({area})
                    </option>
                  ))
                )}
              </select>
            </label>
            <textarea
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{
                width: '100%',
                height: '120px',
                marginTop: '10px',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            ></textarea>
            <button
              onClick={handleSendMessageToMember}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Send Message
            </button>
            <div style={{ marginTop: '2rem' }}>
              <h4>Sent Messages Log</h4>
              {sentMessages.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {sentMessages.map((msg, index) => (
                    <li
                      key={index}
                      style={{
                        border: '1px solid #eee',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '10px',
                      }}
                    >
                      <strong>To:</strong> {msg.to}
                      <br />
                      <strong>Message:</strong> {msg.text}
                      <br />
                      <small>
                        <em>Sent: {msg.date}</em>
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No messages sent yet.</p>
              )}
            </div>
          </div>
        )}
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
                value={newMember.area || ''}
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
                  setNewMember({ name: '', id: '', phone: '', area: '' });
                  alert(`Member ${newMember.name} added to ${newMember.area}.`);
                  setView('members_list');
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
      </div>

      <ChatbotWidget />
    </div>
  );
}

////////////////////////////////

// import React, { useState } from 'react';
// import AreaMap from './components/AreaMap';
// import ChatbotWidget from './components/ChatbotWidget';
// import './App.css';
// import logo2 from './assets/logo2.png';

// import {
//   HiOutlineChartBar, HiOutlineUserGroup, HiOutlineUserPlus, HiOutlineViewColumns,
//   HiOutlineCalendarDays, HiOutlineCheckBadge, HiOutlineDocumentDuplicate,
//   HiOutlineArchiveBox, HiOutlineChatBubbleOvalLeft, HiOutlinePresentationChartLine,
//   HiOutlineCog6Tooth, HiOutlineBuildingOffice2, HiOutlineMapPin,
//   HiOutlineMagnifyingGlass, HiOutlineBell, HiOutlinePencil, HiOutlineTrash,
//   HiOutlineDocumentText, HiOutlineArrowDownTray, HiOutlineMegaphone,
//   HiOutlineArrowLeftOnRectangle,
// } from 'react-icons/hi2';

// const committeeAreas = {
//   Central: 'Dhaka, Bangladesh', Sub: 'Chittagong, Bangladesh', District: 'Rajshahi, Bangladesh',
//   Metros: 'Khulna, Bangladesh', Upazila: 'Barisal, Bangladesh', Union: 'Sylhet, Bangladesh',
//   Ward: 'Rangpur, Bangladesh',
// };

// // The component is defined ONCE here. It receives "onLogout" as a prop.
// export default function DashboardApp({ onLogout }) {
//   // All state and handlers are inside this single component function.
//   const [area, setArea] = useState('Dhaka, Bangladesh');
//   const [memberOpen, setMemberOpen] = useState(true);
//   const [memberLists, setMemberLists] = useState({
//     Central: [
//       { name: 'Ali', id: '001', phone: '01700000000' },
//       { name: 'Fatima', id: '002', phone: '01700000001' },
//     ],
//     Sub: [{ name: 'Raju', id: '003', phone: '01700000002' }],
//     District: [{ name: 'Kamal', id: '004', phone: '01700000003' }],
//     Metros: [{ name: 'Tania', id: '005', phone: '01700000004' }],
//     Upazila: [], Union: [], Ward: [],
//   });
//   const [showCommittee, setShowCommittee] = useState(true);
//   const [selectedRecipient, setSelectedRecipient] = useState('');
//   const [messageText, setMessageText] = useState('');
//   const [sentMessages, setSentMessages] = useState([]);
//   const [newMember, setNewMember] = useState({ name: '', id: '', phone: '' });
//   const [view, setView] = useState('dashboard');
//   const iconStyle = { marginRight: '10px', verticalAlign: 'middle', fontSize: '1.2rem' };

//   const handleSendMessageToMember = () => {
//     if (selectedRecipient && messageText.trim()) {
//       const newMessage = {
//         to: selectedRecipient, text: messageText, date: new Date().toLocaleString(),
//       };
//       setSentMessages([...sentMessages, newMessage]);
//       setMessageText('');
//       alert(`Message sent to ${selectedRecipient}`);
//     } else {
//       alert('Please select a recipient and type a message.');
//     }
//   };

//   return (
//     <div>
//       <div className="sidebar">
//         <div style={{ padding: '0.5rem', textAlign: 'center' }}>
//           <img src={logo2} alt="Dashboard Logo" style={{ width: '85px' }} />
//         </div>
//         <h2 style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', cursor: 'pointer' }} onClick={() => setView('dashboard')}>
//           <HiOutlineChartBar style={{ ...iconStyle, fontSize: '1.5rem' }} /> Dashboard
//         </h2>
//         <div style={{ padding: '10px 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setView('notice_board')}>
//           <HiOutlineMegaphone style={iconStyle} /> Notice Board
//         </div>
//         <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '10px' }}>
//           <li onClick={() => setMemberOpen(!memberOpen)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
//             <HiOutlineUserGroup style={iconStyle} /> Members {memberOpen ? '🔽' : '▶️'}
//           </li>
//           {memberOpen && (
//             <>
//               <li style={{ paddingLeft: '1rem', cursor: 'pointer', color: view === 'members_list' ? 'blue' : 'inherit' }} onClick={() => setView('members_list')}>
//                 <HiOutlineViewColumns style={iconStyle} /> View All Members
//               </li>
//               <li style={{ paddingLeft: '1rem', cursor: 'pointer', color: view === 'add_member' ? 'blue' : 'inherit' }} onClick={() => setView('add_member')}>
//                 <HiOutlineUserPlus style={iconStyle} /> Add New Member
//               </li>
//             </>
//           )}
//           <li onClick={() => setView('events')} style={{ cursor: 'pointer' }}><HiOutlineCalendarDays style={iconStyle} /> Events</li>
//           <li onClick={() => setView('tasks')} style={{ cursor: 'pointer' }}><HiOutlineCheckBadge style={iconStyle} /> Tasks</li>
//           <li onClick={() => setView('documents')} style={{ cursor: 'pointer' }}><HiOutlineDocumentDuplicate style={iconStyle} /> Documents</li>
//           <li onClick={() => setView('voters')} style={{ cursor: 'pointer' }}><HiOutlineArchiveBox style={iconStyle} /> Voters</li>
//           <li style={{ cursor: 'pointer', fontWeight: view === 'messaging' ? 'bold' : 'normal' }} onClick={() => setView('messaging')}>
//             <HiOutlineChatBubbleOvalLeft style={iconStyle} /> Messaging
//           </li>
//           <li onClick={() => setView('analytics')} style={{ cursor: 'pointer' }}><HiOutlinePresentationChartLine style={iconStyle} /> Analytics</li>
//           <li onClick={() => setView('settings')} style={{ cursor: 'pointer' }}><HiOutlineCog6Tooth style={iconStyle} /> Settings</li>
//           <li onClick={onLogout} style={{ cursor: 'pointer', color: '#c82333', fontWeight: 'bold', marginTop: '1rem' }}>
//             <HiOutlineArrowLeftOnRectangle style={iconStyle} /> Logout
//           </li>
//           <hr />
//           <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>
//             <HiOutlineBuildingOffice2 style={iconStyle} /> Committee
//             <span style={{ cursor: 'pointer', marginLeft: 10 }} onClick={(e) => { e.stopPropagation(); setShowCommittee(!showCommittee); }}>
//               {showCommittee ? '🔽' : '▶️'}
//             </span>
//           </li>
//           {showCommittee && (
//             <ul style={{ paddingLeft: '1.5rem' }}>
//               {Object.keys(committeeAreas).map((key) => (
//                 <li key={key} style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setArea(committeeAreas[key]); setView('dashboard'); }}>
//                   <HiOutlineMapPin style={{ ...iconStyle, color: 'red' }} /> {key}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </ul>
//       </div>

//       <div className="main">
//         {view === 'dashboard' && (
//           <>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '20px',
//                   margin: '0 auto',
//                 }}
//               >
//                 {/* --- START: UPDATED SEARCH BOX --- */}
//                 <div
//                   style={{
//                     position: 'relative',
//                     display: 'flex',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <HiOutlineMagnifyingGlass
//                     style={{
//                       position: 'absolute',
//                       left: '10px',
//                       fontSize: '1.2rem',
//                       color: '#888', // A semi-transparent grey color
//                     }}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     style={{
//                       border: '1px solid black',
//                       padding: '8px 12px 8px 35px', // Increased left padding for the icon
//                       borderRadius: '8px',
//                       fontSize: '14px',
//                     }}
//                   />
//                 </div>
//                 {/* --- END: UPDATED SEARCH BOX --- */}

//                 <span
//                   style={{
//                     color: 'blue',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                   }}
//                 >
//                   Search
//                 </span>
//                 {/* --- THIS IS THE SPAN THAT NEEDS THE OnClick --- */}
//                 <span
//                   style={{
//                     color: 'blue',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                   }}
//                   onClick={() => setView('notice_board')} // Add this handler
//                 >
//                   Notice Board
//                 </span>
//                 {/* --- END OF CHANGE --- */}
//               </div>

//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <span
//                   role="img"
//                   aria-label="search"
//                   style={{ fontSize: '16px' }}
//                 >
//                   🔍
//                 </span>
//                 <span role="img" aria-label="bell" style={{ fontSize: '16px' }}>
//                   🔔
//                 </span>
//               </div>
//             </div>

//             {/* Top row of cards */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(4, 1fr)',
//                 gap: '1rem',
//                 marginBottom: '1rem',
//               }}
//             >
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Total Members</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   1,250
//                 </div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>
//                   Rejection
//                 </div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Donations</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   ৳ 5,300
//                 </div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>d</div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Upcoming Events</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>
//                   Terminations
//                 </div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Tasks</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
//                 <div
//                   style={{
//                     backgroundColor: '#e0e0e0',
//                     height: '8px',
//                     borderRadius: '4px',
//                     marginTop: '6px',
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: '60%',
//                       height: '8px',
//                       backgroundColor: 'green',
//                       borderRadius: '4px',
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Middle row of cards */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '1rem',
//               }}
//             >
//               <div className="card">
//                 <h3>Campaign Overview</h3>
//                 <div>
//                   <p>Campaign 1</p>
//                   <div
//                     style={{
//                       backgroundColor: '#eee',
//                       height: '8px',
//                       borderRadius: '4px',
//                       marginBottom: '10px',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: '26%',
//                         height: '8px',
//                         backgroundColor: 'red',
//                         borderRadius: '4px',
//                       }}
//                     ></div>
//                   </div>
//                   <p>Campaign 2</p>
//                   <div
//                     style={{
//                       backgroundColor: '#eee',
//                       height: '8px',
//                       borderRadius: '4px',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: '50%',
//                         height: '8px',
//                         backgroundColor: 'green',
//                         borderRadius: '4px',
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="card">
//                 <h3>Document Library</h3>
//                 <table
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     borderCollapse: 'collapse',
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Role</th>
//                       <th>Location</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Flyer</td>
//                       <td>Policy</td>
//                       <td>UmoT</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div className="card">
//                 <h3>Member Management</h3>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Role</th>
//                       <th>Location</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Rean</td>
//                       <td>Ship</td>
//                       <td>Lip</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div className="card">
//                 <h3>Event Calendar</h3>
//                 <table
//                   style={{
//                     width: '100%',
//                     textAlign: 'center',
//                     marginTop: '10px',
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
//                         (day) => (
//                           <th key={day}>{day}</th>
//                         )
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       {[20, 21, 22, 23, 24, 25, 26].map((d) => (
//                         <td key={d}>{d}</td>
//                       ))}
//                     </tr>
//                     <tr>
//                       {[27, 28, 29, 30, 31, 1, 2].map((d) => (
//                         <td
//                           key={d}
//                           style={
//                             d === 27
//                               ? { backgroundColor: '#cef', fontWeight: 'bold' }
//                               : {}
//                           }
//                         >
//                           {d}
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Bottom row of cards (Voter, Insights, Analytics) */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(3, 1fr)',
//                 gap: '1rem',
//                 marginTop: '1rem',
//                 alignItems: 'stretch',
//               }}
//             >
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Voter and Constituency Insights - {area}</h3>
//                 <AreaMap location={area} />
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '0.5rem',
//                     fontSize: '12px',
//                   }}
//                 >
//                   <span>🟢 Policy</span>
//                   <span>🔵 Regatine</span>
//                 </div>
//               </div>
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Insights</h3>
//                 <svg width="100%" height="150" viewBox="0 0 32 32">
//                   <circle r="16" cx="16" cy="16" fill="#eee" />
//                   <path d="M16 16 L16 0 A16 16 0 0 1 31.9 16 Z" fill="green" />
//                   <path
//                     d="M16 16 L31.9 16 A16 16 0 0 1 20.4 30.3 Z"
//                     fill="orange"
//                   />
//                   <path d="M16 16 L20.4 30.3 A16 16 0 0 1 16 0 Z" fill="red" />
//                 </svg>
//                 <ul
//                   style={{
//                     paddingLeft: '1rem',
//                     fontSize: '14px',
//                     marginTop: '0.5rem',
//                   }}
//                 >
//                   <li>Positive: 55%</li>
//                   <li>Neutral: 15%</li>
//                   <li>Negative: 30%</li>
//                 </ul>
//               </div>
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Analytics and Reporting</h3>
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'flex-end',
//                     height: '100px',
//                     gap: '8px',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {[15, 20, 25, 18, 22].map((val, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         width: '20px',
//                         height: `${val * 3}px`,
//                         background: 'green',
//                       }}
//                     ></div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     display: 'flex',
//                     gap: '8px',
//                     fontSize: '12px',
//                     marginTop: '4px',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <span>Mar</span>
//                   <span>Apr</span>
//                   <span>May</span>
//                   <span>Jun</span>
//                   <span>Jul</span>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* --- DEMO PAGE FOR EVENTS --- */}
//         {view === 'events' && (
//           <div className="card">
//             <h3 style={{ display: 'flex', alignItems: 'center' }}>
//               <HiOutlineCalendarDays style={iconStyle} /> Upcoming Events
//             </h3>
//             <div
//               style={{
//                 border: '1px solid #eee',
//                 borderRadius: '8px',
//                 padding: '1rem',
//                 marginBottom: '1rem',
//               }}
//             >
//               <h4>Annual General Meeting</h4>
//               <p>
//                 <strong>Date:</strong> July 25, 2025
//               </p>
//               <p>
//                 <strong>Location:</strong> Community Hall, Dhaka
//               </p>
//               <span
//                 style={{
//                   background: 'blue',
//                   color: 'white',
//                   padding: '4px 8px',
//                   borderRadius: '12px',
//                   fontSize: '0.8rem',
//                 }}
//               >
//                 Upcoming
//               </span>
//             </div>
//             <div
//               style={{
//                 border: '1px solid #eee',
//                 borderRadius: '8px',
//                 padding: '1rem',
//                 marginBottom: '1rem',
//               }}
//             >
//               <h4>Charity Drive Kick-off</h4>
//               <p>
//                 <strong>Date:</strong> August 5, 2025
//               </p>
//               <p>
//                 <strong>Location:</strong> Central Office
//               </p>
//               <span
//                 style={{
//                   background: 'blue',
//                   color: 'white',
//                   padding: '4px 8px',
//                   borderRadius: '12px',
//                   fontSize: '0.8rem',
//                 }}
//               >
//                 Upcoming
//               </span>
//             </div>
//             <button
//               style={{
//                 padding: '10px 15px',
//                 border: 'none',
//                 background: 'green',
//                 color: 'white',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//               }}
//             >
//               + Add New Event
//             </button>
//           </div>
//         )}

//         {/* --- DEMO PAGE FOR TASKS --- */}
//         {view === 'tasks' && (
//           <div className="card">
//             <h3 style={{ display: 'flex', alignItems: 'center' }}>
//               <HiOutlineCheckBadge style={iconStyle} /> Task List
//             </h3>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
//                 <input type="checkbox" style={{ marginRight: '10px' }} />{' '}
//                 Finalize budget for Q3
//               </li>
//               <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
//                 <input type="checkbox" style={{ marginRight: '10px' }} />{' '}
//                 Contact venue for AGM
//               </li>
//               <li
//                 style={{
//                   padding: '10px',
//                   borderBottom: '1px solid #eee',
//                   textDecoration: 'line-through',
//                   color: '#888',
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked
//                   readOnly
//                   style={{ marginRight: '10px' }}
//                 />{' '}
//                 Send out weekly newsletter
//               </li>
//               <li style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
//                 <input type="checkbox" style={{ marginRight: '10px' }} />{' '}
//                 Prepare presentation for stakeholders
//               </li>
//             </ul>
//             <input
//               type="text"
//               placeholder="Add a new task..."
//               style={{
//                 marginTop: '1rem',
//                 padding: '10px',
//                 width: 'calc(100% - 120px)',
//                 borderRadius: '5px',
//                 border: '1px solid #ccc',
//               }}
//             />
//             <button
//               style={{
//                 padding: '10px 15px',
//                 border: 'none',
//                 background: 'green',
//                 color: 'white',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 marginLeft: '10px',
//               }}
//             >
//               Add Task
//             </button>
//           </div>
//         )}

//         {/* --- DEMO PAGE FOR DOCUMENTS --- */}
//         {view === 'documents' && (
//           <div className="card">
//             <h3 style={{ display: 'flex', alignItems: 'center' }}>
//               <HiOutlineDocumentDuplicate style={iconStyle} /> Document Library
//             </h3>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ borderBottom: '1px solid #ccc' }}>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>Type</th>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>
//                     Date Added
//                   </th>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td style={{ padding: '8px' }}>
//                     <HiOutlineDocumentText style={{ marginRight: '5px' }} />{' '}
//                     Q2_Budget.pdf
//                   </td>
//                   <td style={{ padding: '8px' }}>PDF</td>
//                   <td style={{ padding: '8px' }}>2025-06-01</td>
//                   <td style={{ padding: '8px' }}>
//                     <HiOutlineArrowDownTray style={{ cursor: 'pointer' }} />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ padding: '8px' }}>
//                     <HiOutlineDocumentText style={{ marginRight: '5px' }} />{' '}
//                     Meeting_Minutes.docx
//                   </td>
//                   <td style={{ padding: '8px' }}>DOCX</td>
//                   <td style={{ padding: '8px' }}>2025-05-28</td>
//                   <td style={{ padding: '8px' }}>
//                     <HiOutlineArrowDownTray style={{ cursor: 'pointer' }} />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ padding: '8px' }}>
//                     <HiOutlineDocumentText style={{ marginRight: '5px' }} />{' '}
//                     Campaign_Plan.pptx
//                   </td>
//                   <td style={{ padding: '8px' }}>PPTX</td>
//                   <td style={{ padding: '8px' }}>2025-05-20</td>
//                   <td style={{ padding: '8px' }}>
//                     <HiOutlineArrowDownTray style={{ cursor: 'pointer' }} />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <button
//               style={{
//                 marginTop: '1rem',
//                 padding: '10px 15px',
//                 border: 'none',
//                 background: 'green',
//                 color: 'white',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//               }}
//             >
//               + Upload Document
//             </button>
//           </div>
//         )}

//         {/* --- DEMO PAGE FOR VOTERS --- */}
//         {view === 'voters' && (
//           <div className="card">
//             <h3 style={{ display: 'flex', alignItems: 'center' }}>
//               <HiOutlineArchiveBox style={iconStyle} /> Voter Database
//             </h3>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ borderBottom: '1px solid #ccc' }}>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>
//                     Voter ID
//                   </th>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>Ward</th>
//                   <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td style={{ padding: '8px' }}>Aarav Sharma</td>
//                   <td style={{ padding: '8px' }}>BDV123456</td>
//                   <td style={{ padding: '8px' }}>Ward 5</td>
//                   <td style={{ padding: '8px' }}>
//                     <span style={{ color: 'green' }}>Verified</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ padding: '8px' }}>Isha Rahman</td>
//                   <td style={{ padding: '8px' }}>BDV654321</td>
//                   <td style={{ padding: '8px' }}>Ward 2</td>
//                   <td style={{ padding: '8px' }}>
//                     <span style={{ color: 'green' }}>Verified</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ padding: '8px' }}>Farhan Khan</td>
//                   <td style={{ padding: '8px' }}>BDV987654</td>
//                   <td style={{ padding: '8px' }}>Ward 5</td>
//                   <td style={{ padding: '8px' }}>
//                     <span style={{ color: 'orange' }}>Pending</span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* --- DEMO PAGE FOR ANALYTICS --- */}
//         {view === 'analytics' && (
//           <div>
//             <div className="card" style={{ marginBottom: '1rem' }}>
//               <h3 style={{ display: 'flex', alignItems: 'center' }}>
//                 <HiOutlinePresentationChartLine style={iconStyle} /> Key Metrics
//               </h3>
//               <div
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(3, 1fr)',
//                   gap: '1rem',
//                 }}
//               >
//                 <div style={{ textAlign: 'center' }}>
//                   <h4>Member Growth</h4>
//                   <p style={{ fontSize: '2rem', color: 'green', margin: 0 }}>
//                     +15%
//                   </p>
//                 </div>
//                 <div style={{ textAlign: 'center' }}>
//                   <h4>Donation Increase</h4>
//                   <p style={{ fontSize: '2rem', color: 'green', margin: 0 }}>
//                     +25%
//                   </p>
//                 </div>
//                 <div style={{ textAlign: 'center' }}>
//                   <h4>Event Attendance</h4>
//                   <p style={{ fontSize: '2rem', color: 'green', margin: 0 }}>
//                     +40%
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="card">
//               <h3>Voter Engagement Over Time</h3>
//               {/* Fake Bar Chart */}
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'flex-end',
//                   height: '200px',
//                   gap: '8px',
//                   justifyContent: 'center',
//                   border: '1px solid #eee',
//                   padding: '1rem',
//                 }}
//               >
//                 {[15, 20, 45, 38, 62, 80].map((val, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       width: '40px',
//                       height: `${val}%`,
//                       background: 'blue',
//                       borderRadius: '5px 5px 0 0',
//                     }}
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* --- DEMO PAGE FOR SETTINGS --- */}
//         {view === 'settings' && (
//           <div className="card">
//             <h3 style={{ display: 'flex', alignItems: 'center' }}>
//               <HiOutlineCog6Tooth style={iconStyle} /> Application Settings
//             </h3>
//             <div style={{ marginTop: '1rem' }}>
//               <h4>Profile</h4>
//               <label style={{ display: 'block', margin: '10px 0' }}>
//                 Name:{' '}
//                 <input
//                   type="text"
//                   defaultValue="Admin User"
//                   style={{ marginLeft: '10px', padding: '5px' }}
//                 />
//               </label>
//               <label style={{ display: 'block', margin: '10px 0' }}>
//                 Email:{' '}
//                 <input
//                   type="email"
//                   defaultValue="admin@example.com"
//                   style={{ marginLeft: '10px', padding: '5px' }}
//                 />
//               </label>
//             </div>
//             <hr style={{ margin: '2rem 0' }} />
//             <div style={{ marginTop: '1rem' }}>
//               <h4>
//                 <HiOutlineBell style={{ marginRight: '5px' }} /> Notifications
//               </h4>
//               <label style={{ display: 'block', margin: '10px 0' }}>
//                 <input type="checkbox" defaultChecked /> Email Notifications
//               </label>
//               <label style={{ display: 'block', margin: '10px 0' }}>
//                 <input type="checkbox" /> SMS Alerts
//               </label>
//             </div>
//             <button
//               style={{
//                 marginTop: '2rem',
//                 padding: '10px 15px',
//                 border: 'none',
//                 background: 'blue',
//                 color: 'white',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//               }}
//             >
//               Save Settings
//             </button>
//           </div>
//         )}

//         {/* --- DEMO PAGE FOR NOTICE BOARD --- */}
//         {view === 'notice_board' && (
//           <div>
//             <div
//               className="card"
//               style={{
//                 backgroundColor: '#fffbe6',
//                 border: '1px solid #facc15',
//               }}
//             >
//               <h3
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   color: '#b45309',
//                 }}
//               >
//                 <HiOutlineMegaphone style={iconStyle} /> Pinned Notice
//               </h3>
//               <h4>Annual General Meeting (AGM) Date Finalized</h4>
//               <p>
//                 <strong>Posted On:</strong> June 10, 2025
//               </p>
//               <p>
//                 The Annual General Meeting for all committee members has been
//                 scheduled for
//                 <strong> July 25, 2025</strong>. All members are requested to
//                 attend. Further details regarding the venue and agenda will be
//                 shared shortly.
//               </p>
//             </div>

//             <div className="card" style={{ marginTop: '1rem' }}>
//               <h3>Recent Notices</h3>
//               <ul style={{ listStyle: 'none', padding: 0 }}>
//                 <li
//                   style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}
//                 >
//                   <p style={{ margin: 0, fontWeight: 'bold' }}>
//                     Q3 Budget Submission Deadline
//                   </p>
//                   <small>Posted by Admin on June 9, 2025</small>
//                 </li>
//                 <li
//                   style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}
//                 >
//                   <p style={{ margin: 0, fontWeight: 'bold' }}>
//                     New Health and Safety Guidelines
//                   </p>
//                   <small>Posted by Admin on June 7, 2025</small>
//                 </li>
//                 <li
//                   style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}
//                 >
//                   <p style={{ margin: 0, fontWeight: 'bold' }}>
//                     Office Closure for Public Holiday
//                   </p>
//                   <small>Posted by Admin on June 5, 2025</small>
//                 </li>
//               </ul>
//               <button
//                 style={{
//                   marginTop: '1rem',
//                   padding: '10px 15px',
//                   border: 'none',
//                   background: 'green',
//                   color: 'white',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 + Post New Notice
//               </button>
//             </div>
//           </div>
//         )}

//         {/* --- MESSAGING VIEW CONTENT IS RESTORED --- */}
//         {view === 'messaging' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>Send Message to Member</h3>
//             <label style={{ display: 'block', marginBottom: '10px' }}>
//               {' '}
//               Select Recipient:
//               <select
//                 value={selectedRecipient}
//                 onChange={(e) => setSelectedRecipient(e.target.value)}
//                 style={{
//                   marginLeft: '10px',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 <option value="">-- Choose a member --</option>
//                 {Object.entries(memberLists).flatMap(([area, members]) =>
//                   members.map((member) => (
//                     <option key={member.id} value={member.name}>
//                       {member.name} ({area})
//                     </option>
//                   ))
//                 )}
//               </select>
//             </label>
//             <textarea
//               placeholder="Type your message..."
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               style={{
//                 width: '100%',
//                 height: '120px',
//                 marginTop: '10px',
//                 padding: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ccc',
//               }}
//             ></textarea>
//             <button
//               onClick={handleSendMessageToMember}
//               style={{
//                 marginTop: '10px',
//                 padding: '10px 20px',
//                 backgroundColor: 'blue',
//                 color: 'white',
//                 borderRadius: '6px',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               Send Message
//             </button>
//             <div style={{ marginTop: '2rem' }}>
//               <h4>Sent Messages Log</h4>
//               {sentMessages.length > 0 ? (
//                 <ul style={{ listStyle: 'none', padding: 0 }}>
//                   {sentMessages.map((msg, index) => (
//                     <li
//                       key={index}
//                       style={{
//                         border: '1px solid #eee',
//                         padding: '10px',
//                         borderRadius: '5px',
//                         marginBottom: '10px',
//                       }}
//                     >
//                       <strong>To:</strong> {msg.to}
//                       <br />
//                       <strong>Message:</strong> {msg.text}
//                       <br />
//                       <small>
//                         <em>Sent: {msg.date}</em>
//                       </small>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No messages sent yet.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* --- VIEW ALL MEMBERS CONTENT IS RESTORED --- */}
//         {view === 'members_list' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>All Members</h3>
//             {Object.keys(memberLists).map((areaKey) => (
//               <div key={areaKey} style={{ marginBottom: '1.5rem' }}>
//                 <h4>📍 {areaKey} Committee</h4>
//                 {memberLists[areaKey].length > 0 ? (
//                   <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
//                     {memberLists[areaKey].map((member, i) => (
//                       <li
//                         key={member.id || i}
//                         style={{
//                           marginBottom: '8px',
//                           borderBottom: '1px solid #eee',
//                           paddingBottom: '8px',
//                         }}
//                       >
//                         👤 <strong>{member.name}</strong>
//                         <br />
//                         🆔 ID: {member.id}
//                         <br />
//                         📞 Phone: {member.phone}
//                         <span
//                           onClick={() => {
//                             const updated = { ...memberLists };
//                             updated[areaKey] = updated[areaKey].filter(
//                               (_, idx) => idx !== i
//                             );
//                             setMemberLists(updated);
//                           }}
//                           style={{
//                             color: 'red',
//                             cursor: 'pointer',
//                             marginLeft: '15px',
//                             fontSize: '0.9rem',
//                           }}
//                         >
//                           ❌ Remove
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No members in {areaKey} committee.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* --- ADD NEW MEMBER CONTENT IS RESTORED --- */}
//         {view === 'add_member' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>Add New Member</h3>
//             <label
//               style={{
//                 display: 'block',
//                 marginBottom: '8px',
//                 fontWeight: 'bold',
//               }}
//             >
//               Select Committee Area:
//               <select
//                 value={newMember.area || ''}
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, area: e.target.value })
//                 }
//                 style={{
//                   marginLeft: '10px',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 <option value="">-- Choose Area --</option>
//                 {Object.keys(memberLists).map((areaKey) => (
//                   <option key={areaKey} value={areaKey}>
//                     {areaKey}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <input
//               type="text"
//               placeholder="Name"
//               value={newMember.name}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, name: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <input
//               type="text"
//               placeholder="ID"
//               value={newMember.id}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, id: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={newMember.phone}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, phone: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '15px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <button
//               onClick={() => {
//                 if (
//                   newMember.name &&
//                   newMember.id &&
//                   newMember.phone &&
//                   newMember.area
//                 ) {
//                   const updated = { ...memberLists };
//                   updated[newMember.area] = [
//                     ...updated[newMember.area],
//                     newMember,
//                   ];
//                   setMemberLists(updated);
//                   setNewMember({ name: '', id: '', phone: '', area: '' });
//                   alert(`Member ${newMember.name} added to ${newMember.area}.`);
//                   setView('members_list');
//                 } else {
//                   alert(
//                     'Please fill out all fields and select a committee area.'
//                   );
//                 }
//               }}
//               style={{
//                 width: '100%',
//                 padding: '12px 20px',
//                 backgroundColor: 'green',
//                 color: 'white',
//                 borderRadius: '6px',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontSize: '1rem',
//               }}
//             >
//               ✅ Submit New Member
//             </button>
//           </div>
//         )}
//       </div>

//       {/* --- The NEW floating chatbot widget is rendered here --- */}
//       <ChatbotWidget />
//     </div>
//   );
// }

// export default App;
// /////////////////////
// import React, { useState } from 'react';
// import AreaMap from './components/AreaMap'; // Assuming AreaMap component exists and works
// import './App.css'; // Ensure you have this file for basic layout

// const committeeAreas = {
//   Central: 'Dhaka, Bangladesh',
//   Sub: 'Chittagong, Bangladesh',
//   District: 'Rajshahi, Bangladesh',
//   Metros: 'Khulna, Bangladesh',
//   Upazila: 'Barisal, Bangladesh',
//   Union: 'Sylhet, Bangladesh',
//   Ward: 'Rangpur, Bangladesh',
// };

// function App() {
//   const [area, setArea] = useState('Dhaka, Bangladesh');
//   const [memberOpen, setMemberOpen] = useState(true); // Controls overall Members section dropdown

//   const [memberLists, setMemberLists] = useState({
//     Central: [
//       { name: 'Ali', id: '001', phone: '01700000000' },
//       { name: 'Fatima', id: '002', phone: '01700000001' },
//     ],
//     Sub: [{ name: 'Raju', id: '003', phone: '01700000002' }],
//     District: [{ name: 'Kamal', id: '004', phone: '01700000003' }],
//     Metros: [{ name: 'Tania', id: '005', phone: '01700000004' }],
//     Upazila: [],
//     Union: [],
//     Ward: [],
//   });

//   const [showCommittee, setShowCommittee] = useState(true);
//   const [selectedRecipient, setSelectedRecipient] = useState('');
//   const [messageText, setMessageText] = useState('');
//   const [sentMessages, setSentMessages] = useState([]); // Log of sent messages

//   const [newMember, setNewMember] = useState({ name: '', id: '', phone: '' });
//   const [showAddForm, setShowAddForm] = useState({}); // State for individual area add forms (not currently used as it's a general form)

//   // State to manage overall view ('dashboard', 'messaging', 'members_list', 'add_member')
//   const [view, setView] = useState('dashboard');

//   // New state for chatbot history
//   const [chatHistory, setChatHistory] = useState([]);

//   return (
//     <div>
//       <div className="sidebar">
//         <h2 style={{ marginBottom: '1rem' }}>📊 Dashboard</h2>
//         <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
//           {/* Members Section - Parent Toggle */}
//           <li
//             onClick={() => setMemberOpen(!memberOpen)}
//             style={{ cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             🧑‍🤝‍🧑 Members {memberOpen ? '🔽' : '▶️'}
//           </li>

//           {/* Members Sub-options (visible when memberOpen is true) */}
//           {memberOpen && (
//             <>
//               {/* Option to view all members */}
//               <li
//                 style={{
//                   paddingLeft: '1rem',
//                   cursor: 'pointer',
//                   color: view === 'members_list' ? 'blue' : 'inherit', // Highlight if active
//                 }}
//                 onClick={() => setView('members_list')}
//               >
//                 📋 View All Members
//               </li>

//               {/* Option to add a new member (general form, not per area here) */}
//               <li
//                 style={{
//                   paddingLeft: '1rem',
//                   cursor: 'pointer',
//                   color: view === 'add_member' ? 'blue' : 'inherit', // Highlight if active
//                 }}
//                 onClick={() => setView('add_member')}
//               >
//                 ➕ Add New Member
//               </li>
//             </>
//           )}

//           {/* General navigation items */}
//           <li onClick={() => setView('events')}>📅 Events</li>
//           <li onClick={() => setView('tasks')}>✅ Tasks</li>
//           <li onClick={() => setView('documents')}>📁 Documents</li>
//           <li onClick={() => setView('voters')}>🗳️ Voters</li>

//           <li
//             style={{
//               cursor: 'pointer',
//               fontWeight: view === 'messaging' ? 'bold' : 'normal',
//             }}
//             onClick={() => setView('messaging')}
//           >
//             💬 Messaging
//           </li>

//           <li onClick={() => setView('analytics')}>📈 Analytics</li>
//           <li onClick={() => setView('settings')}>⚙️ Settings</li>

//           <hr />

//           {/* Committee Section */}
//           <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>
//             🏛️ Committee
//             <span
//               style={{ cursor: 'pointer', marginLeft: 10 }}
//               onClick={() => setShowCommittee(!showCommittee)}
//             >
//               {showCommittee ? '🔽' : '▶️'}
//             </span>
//           </li>
//           {showCommittee && (
//             <ul style={{ paddingLeft: '1.5rem' }}>
//               {Object.keys(committeeAreas).map((key) => (
//                 <li
//                   key={key}
//                   style={{ cursor: 'pointer', color: 'blue' }}
//                   onClick={() => {
//                     setArea(committeeAreas[key]);
//                     setView('dashboard'); // Go back to dashboard view when selecting area
//                   }}
//                 >
//                   📍 {key}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </ul>
//       </div>
//       <div className="main">
//         {/* Dashboard Content */}
//         {view === 'dashboard' && (
//           <>
//             {/* Search bar and icons */}
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '20px',
//                   margin: '0 auto',
//                 }}
//               >
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   style={{
//                     border: '1px solid black',
//                     padding: '6px 12px',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                   }}
//                 />
//                 <span
//                   style={{
//                     color: 'blue',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                   }}
//                 >
//                   Search
//                 </span>
//                 <span
//                   style={{
//                     color: 'blue',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                   }}
//                 >
//                   Notice Board
//                 </span>
//               </div>

//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <span
//                   role="img"
//                   aria-label="search"
//                   style={{ fontSize: '16px' }}
//                 >
//                   🔍
//                 </span>
//                 <span role="img" aria-label="bell" style={{ fontSize: '16px' }}>
//                   🔔
//                 </span>
//               </div>
//             </div>

//             {/* Top row of cards */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(4, 1fr)',
//                 gap: '1rem',
//                 marginBottom: '1rem',
//               }}
//             >
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Total Members</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   1,250
//                 </div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>
//                   Rejection
//                 </div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Donations</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   ৳ 5,300
//                 </div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>d</div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Upcoming Events</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>
//                   Terminations
//                 </div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Tasks</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
//                 <div
//                   style={{
//                     backgroundColor: '#e0e0e0',
//                     height: '8px',
//                     borderRadius: '4px',
//                     marginTop: '6px',
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: '60%',
//                       height: '8px',
//                       backgroundColor: 'green',
//                       borderRadius: '4px',
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Middle row of cards */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '1rem',
//               }}
//             >
//               <div className="card">
//                 <h3>Campaign Overview</h3>
//                 <div>
//                   <p>Campaign 1</p>
//                   <div
//                     style={{
//                       backgroundColor: '#eee',
//                       height: '8px',
//                       borderRadius: '4px',
//                       marginBottom: '10px',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: '26%',
//                         height: '8px',
//                         backgroundColor: 'red',
//                         borderRadius: '4px',
//                       }}
//                     ></div>
//                   </div>
//                   <p>Campaign 2</p>
//                   <div
//                     style={{
//                       backgroundColor: '#eee',
//                       height: '8px',
//                       borderRadius: '4px',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: '50%',
//                         height: '8px',
//                         backgroundColor: 'green',
//                         borderRadius: '4px',
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card">
//                 <h3>Document Library</h3>
//                 <table
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     borderCollapse: 'collapse',
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Role</th>
//                       <th>Location</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Flyer</td>
//                       <td>Policy</td>
//                       <td>UmoT</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="card">
//                 <h3>Member Management</h3>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Role</th>
//                       <th>Location</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Rean</td>
//                       <td>Ship</td>
//                       <td>Lip</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="card">
//                 <h3>Event Calendar</h3>
//                 <table
//                   style={{
//                     width: '100%',
//                     textAlign: 'center',
//                     marginTop: '10px',
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
//                         (day) => (
//                           <th key={day}>{day}</th>
//                         )
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       {[20, 21, 22, 23, 24, 25, 26].map((d) => (
//                         <td key={d}>{d}</td>
//                       ))}
//                     </tr>
//                     <tr>
//                       {[27, 28, 29, 30, 31, 1, 2].map((d) => (
//                         <td
//                           key={d}
//                           style={
//                             d === 27
//                               ? { backgroundColor: '#cef', fontWeight: 'bold' }
//                               : {}
//                           }
//                         >
//                           {d}
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Bottom row of cards (Voter, Insights, Analytics) */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(3, 1fr)',
//                 gap: '1rem',
//                 marginTop: '1rem',
//                 alignItems: 'stretch',
//               }}
//             >
//               {/* Voter and Constituency Insights */}
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Voter and Constituency Insights - {area}</h3>
//                 <AreaMap location={area} />

//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '0.5rem',
//                     fontSize: '12px',
//                   }}
//                 >
//                   <span>🟢 Policy</span>
//                   <span>🔵 Regatine</span>
//                 </div>
//               </div>

//               {/* Insights */}
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Insights</h3>
//                 <svg width="100%" height="150" viewBox="0 0 32 32">
//                   <circle r="16" cx="16" cy="16" fill="#eee" />
//                   <path d="M16 16 L16 0 A16 16 0 0 1 31.9 16 Z" fill="green" />
//                   <path
//                     d="M16 16 L31.9 16 A16 16 0 0 1 20.4 30.3 Z"
//                     fill="orange"
//                   />
//                   <path d="M16 16 L20.4 30.3 A16 16 0 0 1 16 0 Z" fill="red" />
//                 </svg>
//                 <ul
//                   style={{
//                     paddingLeft: '1rem',
//                     fontSize: '14px',
//                     marginTop: '0.5rem',
//                   }}
//                 >
//                   <li>Positive: 55%</li>
//                   <li>Neutral: 15%</li>
//                   <li>Negative: 30%</li>
//                 </ul>
//               </div>

//               {/* Analytics */}
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Analytics and Reporting</h3>
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'flex-end',
//                     height: '100px',
//                     gap: '8px',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {[15, 20, 25, 18, 22].map((val, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         width: '20px',
//                         height: `${val * 3}px`,
//                         background: 'green',
//                       }}
//                     ></div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     display: 'flex',
//                     gap: '8px',
//                     fontSize: '12px',
//                     marginTop: '4px',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <span>Mar</span>
//                   <span>Apr</span>
//                   <span>May</span>
//                   <span>Jun</span>
//                   <span>Jul</span>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Messaging Component (now with basic chatbot) */}
//         {view === 'messaging' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>Chat with Bot</h3> {/* Renamed heading */}
//             {/* Chat History Display */}
//             <div
//               style={{
//                 border: '1px solid #eee',
//                 padding: '10px',
//                 height: '250px', // Fixed height for chat window
//                 overflowY: 'auto',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 backgroundColor: '#f9f9f9',
//               }}
//             >
//               {chatHistory.length === 0 && (
//                 <p style={{ color: '#888' }}>Start a conversation...</p>
//               )}
//               {chatHistory.map((msg, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     textAlign: msg.sender === 'user' ? 'right' : 'left',
//                     marginBottom: '8px',
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: 'inline-block',
//                       padding: '8px 12px',
//                       borderRadius: '15px',
//                       backgroundColor:
//                         msg.sender === 'user' ? '#007bff' : '#e0e0e0',
//                       color: msg.sender === 'user' ? 'white' : 'black',
//                     }}
//                   >
//                     {msg.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <textarea
//               placeholder="Type your message..."
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               style={{
//                 width: '100%',
//                 height: '80px', // Slightly smaller for chat input
//                 marginTop: '10px',
//                 padding: '8px',
//                 borderRadius: '6px',
//                 border: '1px solid #ccc',
//               }}
//             ></textarea>
//             <br />
//             <button
//               onClick={() => {
//                 if (messageText.trim()) {
//                   const userMessage = messageText.trim();
//                   setChatHistory((prev) => [
//                     ...prev,
//                     { text: userMessage, sender: 'user' },
//                   ]);
//                   setMessageText('');

//                   // Simple Bot Logic based on keywords
//                   let botResponse = 'I am a simple bot. How can I help you?';
//                   if (
//                     userMessage.toLowerCase().includes('hello') ||
//                     userMessage.toLowerCase().includes('hi')
//                   ) {
//                     botResponse = 'Hello there! How can I assist you today?';
//                   } else if (userMessage.toLowerCase().includes('member')) {
//                     botResponse =
//                       'You can view and add members from the "Members" section in the sidebar.';
//                   } else if (userMessage.toLowerCase().includes('map')) {
//                     botResponse =
//                       'The map shows committee areas in Bangladesh. You can select different areas from the Committee section.';
//                   } else if (userMessage.toLowerCase().includes('help')) {
//                     botResponse =
//                       'I can answer questions about members, map, events, or donations. Try asking about one of these topics!';
//                   } else if (userMessage.toLowerCase().includes('events')) {
//                     botResponse =
//                       'Check the "Events" section in the sidebar for upcoming events.';
//                   } else if (userMessage.toLowerCase().includes('donation')) {
//                     botResponse =
//                       'Donation information is available on the dashboard. Would you like to contribute?';
//                   }

//                   // Simulate bot typing delay
//                   setTimeout(() => {
//                     setChatHistory((prev) => [
//                       ...prev,
//                       { text: botResponse, sender: 'bot' },
//                     ]);
//                   }, 500);
//                 } else {
//                   alert('Please type a message.');
//                 }
//               }}
//               style={{
//                 marginTop: '10px',
//                 padding: '8px 16px',
//                 backgroundColor: 'blue',
//                 color: 'white',
//                 borderRadius: '6px',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               Send Message
//             </button>
//             {/* The old select recipient and sent messages log are no longer needed for chatbot */}
//             {/*
//             <label>
//               Select Recipient:
//               <select
//                 value={selectedRecipient}
//                 onChange={(e) => setSelectedRecipient(e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               >
//                 <option value="">-- Choose --</option>
//                 {Object.entries(memberLists).flatMap(([area, members]) =>
//                   members.map((member) => (
//                     <option key={member.id} value={member.name}>
//                       {member.name} ({area})
//                     </option>
//                   ))
//                 )}
//               </select>
//             </label>

//             <br />
//             <button
//               onClick={() => {
//                 if (selectedRecipient && messageText) {
//                   setSentMessages([
//                     ...sentMessages,
//                     { to: selectedRecipient, text: messageText },
//                   ]);
//                   setMessageText('');
//                   alert(`Message sent to ${selectedRecipient}`);
//                 } else {
//                   alert('Please select a recipient and type a message.');
//                 }
//               }}
//             >
//               Send
//             </button>
//             */}
//           </div>
//         )}

//         {/* View All Members Component */}
//         {view === 'members_list' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>All Members</h3>
//             {Object.keys(memberLists).map((areaKey) => (
//               <div key={areaKey} style={{ marginBottom: '1.5rem' }}>
//                 <h4>📍 {areaKey} Committee</h4>
//                 {memberLists[areaKey].length > 0 ? (
//                   <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
//                     {memberLists[areaKey].map((member, i) => (
//                       <li
//                         key={member.id || i}
//                         style={{
//                           marginBottom: '8px',
//                           borderBottom: '1px solid #eee',
//                           paddingBottom: '8px',
//                         }}
//                       >
//                         👤 <strong>{member.name}</strong>
//                         <br />
//                         🆔 ID: {member.id}
//                         <br />
//                         📞 Phone: {member.phone}
//                         <span
//                           onClick={() => {
//                             const updated = { ...memberLists };
//                             updated[areaKey] = updated[areaKey].filter(
//                               (_, idx) => idx !== i
//                             );
//                             setMemberLists(updated);
//                           }}
//                           style={{
//                             color: 'red',
//                             cursor: 'pointer',
//                             marginLeft: '15px',
//                             fontSize: '0.9rem',
//                           }}
//                         >
//                           ❌ Remove
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No members in {areaKey} committee.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add New Member Form */}
//         {view === 'add_member' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>Add New Member</h3>
//             <label
//               style={{
//                 display: 'block',
//                 marginBottom: '8px',
//                 fontWeight: 'bold',
//               }}
//             >
//               Select Committee Area:
//               <select
//                 value={newMember.area || ''} // Use newMember.area to track selected area for new member
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, area: e.target.value })
//                 }
//                 style={{
//                   marginLeft: '10px',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 <option value="">-- Choose Area --</option>
//                 {Object.keys(memberLists).map((areaKey) => (
//                   <option key={areaKey} value={areaKey}>
//                     {areaKey}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <input
//               type="text"
//               placeholder="Name"
//               value={newMember.name}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, name: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <input
//               type="text"
//               placeholder="ID"
//               value={newMember.id}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, id: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={newMember.phone}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, phone: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '15px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <button
//               onClick={() => {
//                 if (
//                   newMember.name &&
//                   newMember.id &&
//                   newMember.phone &&
//                   newMember.area
//                 ) {
//                   const updated = { ...memberLists };
//                   updated[newMember.area] = [
//                     ...updated[newMember.area],
//                     newMember,
//                   ];
//                   setMemberLists(updated);
//                   setNewMember({ name: '', id: '', phone: '', area: '' }); // Clear form and area
//                   alert(`Member ${newMember.name} added to ${newMember.area}.`);
//                   setView('members_list'); // Go to member list after adding
//                 } else {
//                   alert(
//                     'Please fill out all fields and select a committee area.'
//                   );
//                 }
//               }}
//               style={{
//                 width: '100%',
//                 padding: '12px 20px',
//                 backgroundColor: 'green',
//                 color: 'white',
//                 borderRadius: '6px',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontSize: '1rem',
//               }}
//             >
//               ✅ Submit New Member
//             </button>
//           </div>
//         )}
//       </div>{' '}
//       {/* Closes the .main div */}
//     </div>
//   );
// }

// export default App;

/////////////////////////

// import React, { useState } from 'react';
// import AreaMap from './components/AreaMap'; // Assuming AreaMap
// //import './App.css'; // Assuming you create this for styles

// const committeeAreas = {
//   Central: 'Dhaka, Bangladesh',
//   Sub: 'Chittagong, Bangladesh',
//   District: 'Rajshahi, Bangladesh',
//   Metros: 'Khulna, Bangladesh',
//   Upazila: 'Barisal, Bangladesh',
//   Union: 'Sylhet, Bangladesh',
//   Ward: 'Rangpur, Bangladesh',
// };

// function App() {
//   const [area, setArea] = useState('Dhaka, Bangladesh');
//   const [memberOpen, setMemberOpen] = useState(true); // Controls overall Members section dropdown

//   // Updated memberLists to store objects with name, id, and phone
//   const [memberLists, setMemberLists] = useState({
//     Central: [
//       { name: 'Ali', id: '001', phone: '01700000000' },
//       { name: 'Fatima', id: '002', phone: '01700000001' },
//     ],
//     Sub: [{ name: 'Raju', id: '003', phone: '01700000002' }],
//     District: [{ name: 'Kamal', id: '004', phone: '01700000003' }],
//     Metros: [{ name: 'Tania', id: '005', phone: '01700000004' }],
//     Upazila: [],
//     Union: [],
//     Ward: [],
//   });

//   const [showCommittee, setShowCommittee] = useState(true);
//   const [selectedRecipient, setSelectedRecipient] = useState('');
//   const [messageText, setMessageText] = useState('');
//   const [sentMessages, setSentMessages] = useState([]); // Optional log

//   // New states for adding members
//   const [newMember, setNewMember] = useState({ name: '', id: '', phone: '' });
//   // This will store a boolean for each area key, e.g., { Central: false, Sub: true }
//   const [showAddForm, setShowAddForm] = useState({});

//   // State to manage overall view ('dashboard', 'messaging', 'members_list', 'add_member')
//   const [view, setView] = useState('dashboard');

//   return (
//     <div>
//       <div className="sidebar">
//         <h2 style={{ marginBottom: '1rem' }}>📊 Dashboard</h2>
//         <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
//           {/* Members Section - Parent Toggle */}
//           <li
//             onClick={() => setMemberOpen(!memberOpen)}
//             style={{ cursor: 'pointer', fontWeight: 'bold' }}
//           >
//             🧑‍🤝‍🧑 Members {memberOpen ? '🔽' : '▶️'}
//           </li>

//           {/* Members Sub-options (visible when memberOpen is true) */}
//           {memberOpen && (
//             <>
//               {/* Option to view all members */}
//               <li
//                 style={{
//                   paddingLeft: '1rem',
//                   cursor: 'pointer',
//                   color: view === 'members_list' ? 'blue' : 'inherit', // Highlight if active
//                 }}
//                 onClick={() => setView('members_list')}
//               >
//                 📋 View All Members
//               </li>

//               {/* Option to add a new member (general form, not per area here) */}
//               <li
//                 style={{
//                   paddingLeft: '1rem',
//                   cursor: 'pointer',
//                   color: view === 'add_member' ? 'blue' : 'inherit', // Highlight if active
//                 }}
//                 onClick={() => setView('add_member')}
//               >
//                 ➕ Add New Member
//               </li>
//             </>
//           )}

//           {/* General navigation items */}
//           <li onClick={() => setView('events')}>📅 Events</li>
//           <li onClick={() => setView('tasks')}>✅ Tasks</li>
//           <li onClick={() => setView('documents')}>📁 Documents</li>
//           <li onClick={() => setView('voters')}>🗳️ Voters</li>

//           <li
//             style={{
//               cursor: 'pointer',
//               fontWeight: view === 'messaging' ? 'bold' : 'normal',
//             }}
//             onClick={() => setView('messaging')}
//           >
//             💬 Messaging
//           </li>

//           <li onClick={() => setView('analytics')}>📈 Analytics</li>
//           <li onClick={() => setView('settings')}>⚙️ Settings</li>

//           <hr />

//           {/* Committee Section */}
//           <li style={{ marginTop: '1rem', fontWeight: 'bold' }}>
//             🏛️ Committee
//             <span
//               style={{ cursor: 'pointer', marginLeft: 10 }}
//               onClick={() => setShowCommittee(!showCommittee)}
//             >
//               {showCommittee ? '🔽' : '▶️'}
//             </span>
//           </li>
//           {showCommittee && (
//             <ul style={{ paddingLeft: '1.5rem' }}>
//               {Object.keys(committeeAreas).map((key) => (
//                 <li
//                   key={key}
//                   style={{ cursor: 'pointer', color: 'blue' }}
//                   onClick={() => {
//                     setArea(committeeAreas[key]);
//                     setView('dashboard'); // Go back to dashboard view when selecting area
//                   }}
//                 >
//                   📍 {key}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </ul>
//       </div>
//       <div className="main">
//         {/* Dashboard Content */}
//         {view === 'dashboard' && (
//           <>
//             {/* Search bar and icons */}
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '1rem',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '20px',
//                   margin: '0 auto',
//                 }}
//               >
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   style={{
//                     border: '1px solid black',
//                     padding: '6px 12px',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                   }}
//                 />
//                 <span
//                   style={{
//                     color: 'blue',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                   }}
//                 >
//                   Search
//                 </span>
//                 <span
//                   style={{
//                     color: 'blue',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                   }}
//                 >
//                   Notice Board
//                 </span>
//               </div>

//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <span
//                   role="img"
//                   aria-label="search"
//                   style={{ fontSize: '16px' }}
//                 >
//                   🔍
//                 </span>
//                 <span role="img" aria-label="bell" style={{ fontSize: '16px' }}>
//                   🔔
//                 </span>
//               </div>
//             </div>

//             {/* Top row of cards */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(4, 1fr)',
//                 gap: '1rem',
//                 marginBottom: '1rem',
//               }}
//             >
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Total Members</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   1,250
//                 </div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>
//                   Rejection
//                 </div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Donations</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//                   ৳ 5,300
//                 </div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>d</div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Upcoming Events</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
//                 <div style={{ color: 'blue', fontWeight: 'bold' }}>
//                   Terminations
//                 </div>
//               </div>
//               <div className="card">
//                 <div style={{ fontWeight: 'bold' }}>Tasks</div>
//                 <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
//                 <div
//                   style={{
//                     backgroundColor: '#e0e0e0',
//                     height: '8px',
//                     borderRadius: '4px',
//                     marginTop: '6px',
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: '60%',
//                       height: '8px',
//                       backgroundColor: 'green',
//                       borderRadius: '4px',
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Middle row of cards */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '1rem',
//               }}
//             >
//               <div className="card">
//                 <h3>Campaign Overview</h3>
//                 <div>
//                   <p>Campaign 1</p>
//                   <div
//                     style={{
//                       backgroundColor: '#eee',
//                       height: '8px',
//                       borderRadius: '4px',
//                       marginBottom: '10px',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: '26%',
//                         height: '8px',
//                         backgroundColor: 'red',
//                         borderRadius: '4px',
//                       }}
//                     ></div>
//                   </div>
//                   <p>Campaign 2</p>
//                   <div
//                     style={{
//                       backgroundColor: '#eee',
//                       height: '8px',
//                       borderRadius: '4px',
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: '50%',
//                         height: '8px',
//                         backgroundColor: 'green',
//                         borderRadius: '4px',
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card">
//                 <h3>Document Library</h3>
//                 <table
//                   style={{
//                     width: '100%',
//                     textAlign: 'left',
//                     borderCollapse: 'collapse',
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Role</th>
//                       <th>Location</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Flyer</td>
//                       <td>Policy</td>
//                       <td>UmoT</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="card">
//                 <h3>Member Management</h3>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Role</th>
//                       <th>Location</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Rean</td>
//                       <td>Ship</td>
//                       <td>Lip</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="card">
//                 <h3>Event Calendar</h3>
//                 <table
//                   style={{
//                     width: '100%',
//                     textAlign: 'center',
//                     marginTop: '10px',
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
//                         (day) => (
//                           <th key={day}>{day}</th>
//                         )
//                       )}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       {[20, 21, 22, 23, 24, 25, 26].map((d) => (
//                         <td key={d}>{d}</td>
//                       ))}
//                     </tr>
//                     <tr>
//                       {[27, 28, 29, 30, 31, 1, 2].map((d) => (
//                         <td
//                           key={d}
//                           style={
//                             d === 27
//                               ? { backgroundColor: '#cef', fontWeight: 'bold' }
//                               : {}
//                           }
//                         >
//                           {d}
//                         </td>
//                       ))}
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Bottom row of cards (Voter, Insights, Analytics) */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(3, 1fr)',
//                 gap: '1rem',
//                 marginTop: '1rem',
//                 alignItems: 'stretch',
//               }}
//             >
//               {/* Voter and Constituency Insights */}
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Voter and Constituency Insights - {area}</h3>
//                 <AreaMap location={area} />

//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '0.5rem',
//                     fontSize: '12px',
//                   }}
//                 >
//                   <span>🟢 Policy</span>
//                   <span>🔵 Regatine</span>
//                 </div>
//               </div>

//               {/* Insights */}
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Insights</h3>
//                 <svg width="100%" height="150" viewBox="0 0 32 32">
//                   <circle r="16" cx="16" cy="16" fill="#eee" />
//                   <path d="M16 16 L16 0 A16 16 0 0 1 31.9 16 Z" fill="green" />
//                   <path
//                     d="M16 16 L31.9 16 A16 16 0 0 1 20.4 30.3 Z"
//                     fill="orange"
//                   />
//                   <path d="M16 16 L20.4 30.3 A16 16 0 0 1 16 0 Z" fill="red" />
//                 </svg>
//                 <ul
//                   style={{
//                     paddingLeft: '1rem',
//                     fontSize: '14px',
//                     marginTop: '0.5rem',
//                   }}
//                 >
//                   <li>Positive: 55%</li>
//                   <li>Neutral: 15%</li>
//                   <li>Negative: 30%</li>
//                 </ul>
//               </div>

//               {/* Analytics */}
//               <div
//                 className="card"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <h3>Analytics and Reporting</h3>
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'flex-end',
//                     height: '100px',
//                     gap: '8px',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {[15, 20, 25, 18, 22].map((val, i) => (
//                     <div
//                       key={i}
//                       style={{
//                         width: '20px',
//                         height: `${val * 3}px`,
//                         background: 'green',
//                       }}
//                     ></div>
//                   ))}
//                 </div>
//                 <div
//                   style={{
//                     display: 'flex',
//                     gap: '8px',
//                     fontSize: '12px',
//                     marginTop: '4px',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <span>Mar</span>
//                   <span>Apr</span>
//                   <span>May</span>
//                   <span>Jun</span>
//                   <span>Jul</span>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Messaging Component */}
//         {view === 'messaging' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')} // Back to dashboard
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>

//             <h3>Send Message to Member</h3>

//             <label>
//               Select Recipient:
//               <select
//                 value={selectedRecipient}
//                 onChange={(e) => setSelectedRecipient(e.target.value)}
//                 style={{ marginLeft: '10px' }}
//               >
//                 <option value="">-- Choose --</option>
//                 {Object.entries(memberLists).flatMap(([area, members]) =>
//                   members.map((member) => (
//                     <option key={member.id} value={member.name}>
//                       {member.name} ({area})
//                     </option>
//                   ))
//                 )}
//               </select>
//             </label>

//             <br />
//             <textarea
//               placeholder="Type your message..."
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               style={{
//                 width: '100%',
//                 height: '100px',
//                 marginTop: '10px',
//                 padding: '8px',
//                 borderRadius: '6px',
//                 border: '1px solid #ccc',
//               }}
//             ></textarea>
//             <br />
//             <button
//               onClick={() => {
//                 if (selectedRecipient && messageText) {
//                   setSentMessages([
//                     ...sentMessages,
//                     { to: selectedRecipient, text: messageText },
//                   ]);
//                   setMessageText('');
//                   alert(`Message sent to ${selectedRecipient}`);
//                 } else {
//                   alert('Please select a recipient and type a message.');
//                 }
//               }}
//               style={{
//                 marginTop: '10px',
//                 padding: '8px 16px',
//                 backgroundColor: 'blue',
//                 color: 'white',
//                 borderRadius: '6px',
//                 border: 'none',
//                 cursor: 'pointer',
//               }}
//             >
//               Send
//             </button>
//           </div>
//         )}

//         {/* View All Members Component */}
//         {view === 'members_list' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>All Members</h3>
//             {Object.keys(memberLists).map((areaKey) => (
//               <div key={areaKey} style={{ marginBottom: '1.5rem' }}>
//                 <h4>📍 {areaKey} Committee</h4>
//                 {memberLists[areaKey].length > 0 ? (
//                   <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
//                     {memberLists[areaKey].map((member, i) => (
//                       <li
//                         key={member.id || i}
//                         style={{
//                           marginBottom: '8px',
//                           borderBottom: '1px solid #eee',
//                           paddingBottom: '8px',
//                         }}
//                       >
//                         👤 <strong>{member.name}</strong>
//                         <br />
//                         🆔 ID: {member.id}
//                         <br />
//                         📞 Phone: {member.phone}
//                         <span
//                           onClick={() => {
//                             const updated = { ...memberLists };
//                             updated[areaKey] = updated[areaKey].filter(
//                               (_, idx) => idx !== i
//                             );
//                             setMemberLists(updated);
//                           }}
//                           style={{
//                             color: 'red',
//                             cursor: 'pointer',
//                             marginLeft: '15px',
//                             fontSize: '0.9rem',
//                           }}
//                         >
//                           ❌ Remove
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No members in {areaKey} committee.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Add New Member Form */}
//         {view === 'add_member' && (
//           <div className="card" style={{ marginTop: '1rem' }}>
//             <button
//               onClick={() => setView('dashboard')}
//               style={{
//                 marginBottom: '1rem',
//                 padding: '6px 12px',
//                 backgroundColor: '#ccc',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               ← Back to Dashboard
//             </button>
//             <h3>Add New Member</h3>
//             <label
//               style={{
//                 display: 'block',
//                 marginBottom: '8px',
//                 fontWeight: 'bold',
//               }}
//             >
//               Select Committee Area:
//               <select
//                 value={newMember.area || ''} // Use newMember.area to track selected area for new member
//                 onChange={(e) =>
//                   setNewMember({ ...newMember, area: e.target.value })
//                 }
//                 style={{
//                   marginLeft: '10px',
//                   padding: '8px',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 <option value="">-- Choose Area --</option>
//                 {Object.keys(memberLists).map((areaKey) => (
//                   <option key={areaKey} value={areaKey}>
//                     {areaKey}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <input
//               type="text"
//               placeholder="Name"
//               value={newMember.name}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, name: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <input
//               type="text"
//               placeholder="ID"
//               value={newMember.id}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, id: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={newMember.phone}
//               onChange={(e) =>
//                 setNewMember({ ...newMember, phone: e.target.value })
//               }
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 marginBottom: '15px',
//                 borderRadius: '6px',
//                 border: '1px solid #ddd',
//               }}
//             />
//             <button
//               onClick={() => {
//                 if (
//                   newMember.name &&
//                   newMember.id &&
//                   newMember.phone &&
//                   newMember.area
//                 ) {
//                   const updated = { ...memberLists };
//                   updated[newMember.area] = [
//                     ...updated[newMember.area],
//                     newMember,
//                   ];
//                   setMemberLists(updated);
//                   setNewMember({ name: '', id: '', phone: '', area: '' }); // Clear form and area
//                   alert(`Member ${newMember.name} added to ${newMember.area}.`);
//                   setView('members_list'); // Go to member list after adding
//                 } else {
//                   alert(
//                     'Please fill out all fields and select a committee area.'
//                   );
//                 }
//               }}
//               style={{
//                 width: '100%',
//                 padding: '12px 20px',
//                 backgroundColor: 'green',
//                 color: 'white',
//                 borderRadius: '6px',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontSize: '1rem',
//               }}
//             >
//               ✅ Submit New Member
//             </button>
//           </div>
//         )}
//       </div>{' '}
//       {/* Closes the .main div */}
//     </div>
//   );
// }

// export default App;

// // import React, { useState, useReducer } from 'react';
// // import AreaMap from './components/AreaMap';
// // import './App.css'; // Assuming you create this for styles

// // const committeeAreas = {
// //   Central: 'Dhaka, Bangladesh',
// //   Sub: 'Chittagong, Bangladesh',
// //   District: 'Rajshahi, Bangladesh',
// //   Metros: 'Khulna, Bangladesh',
// //   Upazila: 'Barisal, Bangladesh',
// //   Union: 'Sylhet, Bangladesh',
// //   Ward: 'Rangpur, Bangladesh',
// // };

// // const initialMembers = {
// //   Central: [
// //     { name: 'Ali', id: '001', phone: '01700000000' },
// //     { name: 'Fatima', id: '002', phone: '01700000001' },
// //   ],
// //   Sub: [{ name: 'Raju', id: '001', phone: '01700000000' }],
// //   District: [{ name: 'Kamal', id: '001', phone: '01700000000' }],
// //   Metros: [{ name: 'Tania', id: '001', phone: '01700000000' }],
// //   Upazila: [],
// //   Union: [],
// //   Ward: [],
// // };

// // function memberReducer(state, action) {
// //   switch (action.type) {
// //     case 'ADD_MEMBER': {
// //       const { area, member } = action.payload;
// //       return { ...state, [area]: [...state[area], member] };
// //     }
// //     case 'REMOVE_MEMBER': {
// //       const { area, index } = action.payload;
// //       return {
// //         ...state,
// //         [area]: state[area].filter((_, i) => i !== index),
// //       };
// //     }
// //     default:
// //       return state;
// //   }
// // }

// // function Sidebar({ view, setView }) {
// //   return (
// //     <div className="sidebar">
// //       <h2 className="sidebar-title">📊 Dashboard</h2>
// //       <ul className="sidebar-list">
// //         <li
// //           onClick={() => setView('dashboard')}
// //           className={view === 'dashboard' ? 'active' : ''}
// //         >
// //           🏠 Dashboard
// //         </li>
// //         <li
// //           onClick={() => setView('members')}
// //           className={view === 'members' ? 'active' : ''}
// //         >
// //           🧑‍🤝‍🧑 Members
// //         </li>
// //         <li
// //           onClick={() => setView('addMember')}
// //           className={view === 'addMember' ? 'active' : ''}
// //         >
// //           ➕ Add Member
// //         </li>
// //         <li
// //           onClick={() => setView('messaging')}
// //           className={view === 'messaging' ? 'active' : ''}
// //         >
// //           💬 Messaging
// //         </li>
// //       </ul>
// //     </div>
// //   );
// // }

// // function MemberList({ memberLists, dispatch }) {
// //   return (
// //     <div className="card">
// //       <h3>All Members (List View)</h3>
// //       {Object.entries(memberLists).map(([areaKey, members]) => (
// //         <div key={areaKey} style={{ marginBottom: '1.5rem' }}>
// //           <h4>📍 {areaKey} Committee</h4>
// //           {members.length > 0 ? (
// //             members.map((member, i) => (
// //               <div key={member.id} className="member-entry">
// //                 <p>
// //                   <strong>👤 {member.name}</strong>
// //                 </p>
// //                 <p>
// //                   🆔 ID: {member.id} | 📞 {member.phone}
// //                 </p>
// //                 <button
// //                   onClick={() =>
// //                     dispatch({
// //                       type: 'REMOVE_MEMBER',
// //                       payload: { area: areaKey, index: i },
// //                     })
// //                   }
// //                   className="remove-btn"
// //                 >
// //                   ❌ Remove
// //                 </button>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No members in {areaKey} committee.</p>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function AddMemberForm({ memberLists, dispatch, setView }) {
// //   const [newMember, setNewMember] = useState({
// //     name: '',
// //     id: '',
// //     phone: '',
// //     area: '',
// //   });

// //   const handleSubmit = () => {
// //     const { name, id, phone, area } = newMember;
// //     if (!name || !id || !phone || !area) {
// //       alert('Please fill all fields');
// //       return;
// //     }
// //     dispatch({
// //       type: 'ADD_MEMBER',
// //       payload: { area, member: { name, id, phone } },
// //     });
// //     setNewMember({ name: '', id: '', phone: '', area: '' });
// //     setView('members');
// //   };

// //   return (
// //     <div className="card form-container">
// //       <h3>Add Member</h3>
// //       <select
// //         value={newMember.area}
// //         onChange={(e) => setNewMember({ ...newMember, area: e.target.value })}
// //       >
// //         <option value="">Select Area</option>
// //         {Object.keys(memberLists).map((areaKey) => (
// //           <option key={areaKey} value={areaKey}>
// //             {areaKey}
// //           </option>
// //         ))}
// //       </select>
// //       <input
// //         type="text"
// //         placeholder="Name"
// //         value={newMember.name}
// //         onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
// //       />
// //       <input
// //         type="text"
// //         placeholder="ID"
// //         value={newMember.id}
// //         onChange={(e) => setNewMember({ ...newMember, id: e.target.value })}
// //       />
// //       <input
// //         type="text"
// //         placeholder="Phone"
// //         value={newMember.phone}
// //         onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
// //       />
// //       <button onClick={handleSubmit} className="submit-btn">
// //         ✅ Add Member
// //       </button>
// //     </div>
// //   );
// // }

// // function MessagingPanel({
// //   memberLists,
// //   selectedRecipient,
// //   setSelectedRecipient,
// //   messageText,
// //   setMessageText,
// //   sentMessages,
// //   setSentMessages,
// // }) {
// //   const handleSend = () => {
// //     if (selectedRecipient && messageText) {
// //       setSentMessages([
// //         ...sentMessages,
// //         { to: selectedRecipient, text: messageText },
// //       ]);
// //       setMessageText('');
// //       setSelectedRecipient('');
// //       alert(`Message sent to ${selectedRecipient}`);
// //     } else {
// //       alert('Please select a recipient and type a message.');
// //     }
// //   };

// //   return (
// //     <div className="card messaging-panel">
// //       <h3>Send Message to Member</h3>
// //       <select
// //         value={selectedRecipient}
// //         onChange={(e) => setSelectedRecipient(e.target.value)}
// //       >
// //         <option value="">-- Choose --</option>
// //         {Object.entries(memberLists).flatMap(([area, members]) =>
// //           members.map((member) => (
// //             <option key={member.id} value={`${member.name} (${area})`}>
// //               {member.name} ({area})
// //             </option>
// //           ))
// //         )}
// //       </select>
// //       <textarea
// //         placeholder="Type your message..."
// //         value={messageText}
// //         onChange={(e) => setMessageText(e.target.value)}
// //       />
// //       <button onClick={handleSend}>Send</button>
// //     </div>
// //   );
// // }

// // function Dashboard({ area }) {
// //   return (
// //     <>
// //       {/* Search bar and icons */}
// //       <div
// //         style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           marginBottom: '1rem',
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             gap: '20px',
// //             margin: '0 auto',
// //           }}
// //         >
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             style={{
// //               border: '1px solid black',
// //               padding: '6px 12px',
// //               borderRadius: '8px',
// //               fontSize: '14px',
// //             }}
// //           />
// //           <span
// //             style={{
// //               color: 'blue',
// //               fontWeight: 'bold',
// //               cursor: 'pointer',
// //               fontSize: '14px',
// //             }}
// //           >
// //             Search
// //           </span>
// //           <span
// //             style={{
// //               color: 'blue',
// //               fontWeight: 'bold',
// //               cursor: 'pointer',
// //               fontSize: '14px',
// //             }}
// //           >
// //             Notice Board
// //           </span>
// //         </div>

// //         <div style={{ display: 'flex', gap: '10px' }}>
// //           <span role="img" aria-label="search" style={{ fontSize: '16px' }}>
// //             🔍
// //           </span>
// //           <span role="img" aria-label="bell" style={{ fontSize: '16px' }}>
// //             🔔
// //           </span>
// //         </div>
// //       </div>

// //       {/* Card layout will go below */}
// //     </>
// //   );
// // }

// // function App() {
// //   const [memberLists, dispatch] = useReducer(memberReducer, initialMembers);
// //   const [view, setView] = useState('dashboard');
// //   const [selectedRecipient, setSelectedRecipient] = useState('');
// //   const [messageText, setMessageText] = useState('');
// //   const [sentMessages, setSentMessages] = useState([]);
// //   const [area, setArea] = useState('Dhaka, Bangladesh');

// //   return (
// //     <div className="app-container">
// //       <Sidebar view={view} setView={setView} />
// //       <div className="main">
// //         {view === 'dashboard' && <Dashboard area={area} />}
// //         {view === 'members' && (
// //           <MemberList memberLists={memberLists} dispatch={dispatch} />
// //         )}
// //         {view === 'addMember' && (
// //           <AddMemberForm
// //             memberLists={memberLists}
// //             dispatch={dispatch}
// //             setView={setView}
// //           />
// //         )}
// //         {view === 'messaging' && (
// //           <MessagingPanel
// //             memberLists={memberLists}
// //             selectedRecipient={selectedRecipient}
// //             setSelectedRecipient={setSelectedRecipient}
// //             messageText={messageText}
// //             setMessageText={setMessageText}
// //             sentMessages={sentMessages}
// //             setSentMessages={setSentMessages}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
