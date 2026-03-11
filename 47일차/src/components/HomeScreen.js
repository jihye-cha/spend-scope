import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import './HomeScreen.css';

const HomeScreen = () => {
  const { expenses, totalAmount } = useExpenses();

  // 식비 지출 계산
  const foodSpending = expenses
    .filter(e => e.category === '식비')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 최근 지출 3건
  const recentTransactions = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">SpendScope</h1>
      </header>

      {/* 요약 지표 */}
      <div className="home__summary">
        <div className="spending-card">
          <span className="spending-card__label">Monthly Spending</span>
          <span className="spending-card__amount">${totalAmount.toLocaleString()}</span>
        </div>
        <div className="spending-card">
          <span className="spending-card__label">Food Spending</span>
          <span className="spending-card__amount">${foodSpending.toLocaleString()}</span>
        </div>
      </div>

      {/* 원형 차트 플레이스홀더 (CSS 기반) */}
      <section className="home__chart-section">
        <div className="category-chart">
          <div className="category-chart__circle">
            <span className="category-chart__label">Category Chart</span>
          </div>
        </div>
      </section>

      {/* 최근 내역 */}
      <section className="home__recent">
        <h2 className="home__section-title">Recent Transactions</h2>
        <div className="home__list">
          {recentTransactions.map(item => (
            <div key={item.id} className="mini-card">
              <div className="mini-card__icon">📄</div>
              <div className="mini-card__info">
                <span className="mini-card__title">{item.memo || item.category}</span>
                <span className="mini-card__date">{item.date}</span>
              </div>
              <span className="mini-card__amount">-${item.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
