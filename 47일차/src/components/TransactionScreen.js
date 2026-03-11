import React, { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import '../styles/TransactionScreen.css';

const CATEGORIES = ['전체', '식비', '교통', '카페', '쇼핑', '기타'];

const TransactionScreen = () => {
  const { expenses } = useExpenses();
  const [activeFilter, setActiveFilter] = useState('전체');

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (category) => {
    switch (category) {
      case '식비': return '🍱';
      case '교통': return '🚌';
      case '카페': return '☕';
      case '쇼핑': return '🛍️';
      default: return '💸';
    }
  };

  // 카테고리별 모디파이어 클래스 매핑
  const getCategoryModifier = (category) => {
    switch (category) {
      case '식비': return 'food';
      case '교통': return 'transport';
      case '카페': return 'cafe';
      case '쇼핑': return 'shopping';
      default: return 'etc';
    }
  };

  // 날짜 그룹화 함수
  const groupExpensesByDate = (filteredExpenses) => {
    const groups = {};
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(expense => {
      let dateLabel = expense.date;
      if (expense.date === today) dateLabel = '오늘';
      else if (expense.date === yesterday) dateLabel = '어제';

      if (!groups[dateLabel]) groups[dateLabel] = [];
      groups[dateLabel].push(expense);
    });

    return groups;
  };

  // 필터링된 데이터
  const filteredExpenses = activeFilter === '전체' 
    ? expenses 
    : expenses.filter(e => e.category === activeFilter);

  const groupedData = groupExpensesByDate(filteredExpenses);

  return (
    <div className="transactions">
      {/* 필터 바 */}
      <div className="filter-bar">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`filter-button ${activeFilter === category ? 'filter-button--active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 지출 리스트 */}
      <div className="transactions__list">
        {Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([date, items]) => (
            <div key={date} className="transaction-group">
              <h3 className="transaction-group__date">{date}</h3>
              {items.map(item => (
                <div key={item.id} className="transaction-card">
                  <div className={`transaction-card__icon-wrapper transaction-card__icon-wrapper--${getCategoryModifier(item.category)}`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="transaction-card__content">
                    <div className="transaction-card__category">
                      {item.category} {item.subCategory && <span style={{fontSize: '11px', color: '#9ca3af', fontWeight: '400'}}>({item.subCategory})</span>}
                    </div>
                    {item.memo && <div className="transaction-card__memo">{item.memo}</div>}
                  </div>
                  <div className="transaction-card__amount transaction-card__amount--negative">
                    -{item.amount.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div style={{textAlign: 'center', padding: '40px', color: '#9ca3af'}}>
            해당 카테고리의 지출 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionScreen;
