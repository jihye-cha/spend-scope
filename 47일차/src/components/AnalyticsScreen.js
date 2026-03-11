import React from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import './AnalyticsScreen.css';

const AnalyticsScreen = () => {
  const { totalAmount, expenses } = useExpenses();

  // 1. 카테고리별 데이터 계산
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // 2. 파이 차트용 CSS 변수 생성 (가장 비중이 높은 3가지 + 기타 예시)
  const categories = Object.keys(categoryTotals);
  let accumulatedPercent = 0;
  const pieStyles = categories.map((cat, idx) => {
    const percent = (categoryTotals[cat] / totalAmount) * 100;
    const start = accumulatedPercent;
    accumulatedPercent += percent;
    return `--percent-${idx}: ${start.toFixed(1)}% ${accumulatedPercent.toFixed(1)}%`;
  }).join('; ');

  // 3. 식비 세부 데이터 (외식 vs 장보기)
  const diningOutPercent = foodTotal > 0 ? (diningOut / foodTotal) * 100 : 0;
  const groceryPercent = foodTotal > 0 ? (grocery / foodTotal) * 100 : 0;

  return (
    <div className="analytics">
      <header className="analytics__header">
        <h1 className="analytics__title">Analytics</h1>
      </header>

      {/* 1. 지출 총액 카드 */}
      <section className="analytics__total-card">
        <div className="total-box">
          <span className="total-box__label">Monthly Spending</span>
          <span className="total-box__amount">${totalAmount.toLocaleString()}</span>
        </div>
      </section>

      {/* 2. 파이 차트 (Dynamic CSS Variables) */}
      <section className="analytics__chart-section">
        <div className="pie-chart">
          <div 
            className="pie-chart__main" 
            style={{ 
              background: `conic-gradient(
                #10b981 var(--percent-0, 0% 0%), 
                #6366f1 var(--percent-1, 0% 0%), 
                #f59e0b var(--percent-2, 0% 0%), 
                #f43f5e var(--percent-3, 0% 0%),
                #e5e7eb var(--percent-4, 0% 100%)
              )`.replace(/\s+/g, ' ') 
            }}
          >
            <span className="pie-chart__label">Category Breakdown</span>
          </div>
        </div>
      </section>

      {/* 3. 식비 세부 분석 바 차트 */}
      <section className="analytics__food-analysis">
        <h2 className="analytics__section-title">Food Analysis</h2>
        
        <div className="bar-analysis">
          <div className="bar-item">
            <div className="bar-item__info">
              <span className="bar-item__dot bar-item__dot--dining"></span>
              <span className="bar-item__label">Dining Out</span>
              <span className="bar-item__value">${diningOut.toLocaleString()}</span>
            </div>
            <div className="bar-container">
              <div className="bar-fill bar-fill--dining" style={{width: `${diningOutPercent}%`}}></div>
            </div>
          </div>

          <div className="bar-item">
            <div className="bar-item__info">
              <span className="bar-item__dot bar-item__dot--grocery"></span>
              <span className="bar-item__label">Grocery</span>
              <span className="bar-item__value">${grocery.toLocaleString()}</span>
            </div>
            <div className="bar-container">
              <div className="bar-fill bar-fill--grocery" style={{width: `${groceryPercent}%`}}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsScreen;
