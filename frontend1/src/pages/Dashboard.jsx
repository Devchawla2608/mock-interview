import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/contexts/AuthContext';
const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleSignOut = async() => {
    await logout()
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Welcome to the Dashboard</h1>
        <button onClick={handleSignOut} style={styles.signOutBtn}>Sign Out</button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p>1,234</p>
        </div>
        <div style={styles.card}>
          <h3>Active Sessions</h3>
          <p>87</p>
        </div>
        <div style={styles.card}>
          <h3>New Signups</h3>
          <p>56</p>
        </div>
      </div>

      <div style={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <ul>
          <li>User JohnDoe registered</li>
          <li>Admin updated pricing</li>
          <li>Support ticket resolved</li>
        </ul>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  signOutBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  statsContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  card: {
    flex: 1,
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  recentActivity: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  }
};

export default Dashboard;
