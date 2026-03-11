import React, { useState } from 'react';
import { ExpenseProvider } from './contexts/ExpenseContext';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import TransactionScreen from './components/TransactionScreen';
import AddExpenseScreen from './components/AddExpenseScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('transactions');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'transactions':
        return <TransactionScreen />;
      case 'add':
        return <AddExpenseScreen onComplete={() => setActiveTab('home')} />;
      case 'analytics':
        return <AnalyticsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <ExpenseProvider>
      <div className="app-container">
        <main className="app-main">
          {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </ExpenseProvider>
  );
};

export default App;
