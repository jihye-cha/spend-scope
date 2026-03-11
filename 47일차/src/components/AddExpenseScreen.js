import React, { useState } from 'react';
import { useExpenses } from '../contexts/ExpenseContext';
import './AddExpenseScreen.css';

const AddExpenseScreen = ({ onComplete }) => {
  const { addExpense } = useExpenses();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('식비');
  const [subCategory, setSubCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [memo, setMemo] = useState('');

  const CATEGORIES = ['식비', '교통', '카페', '쇼핑', '기타'];
  const FOOD_SUBS = ['Dining Out', 'Grocery'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    
    addExpense({
      amount: parseInt(amount),
      category,
      subCategory: category === '식비' ? subCategory : null,
      date,
      memo
    });
    
    onComplete();
  };

  return (
    <div className="add-expense">
      <header className="add-expense__header">
        <h1 className="add-expense__title">Add Expense</h1>
      </header>

      <form className="add-expense__form" onSubmit={handleSubmit}>
        {/* 금액 입력부 */}
        <section className="form-section">
          <label className="form-section__label">Amount</label>
          <div className="amount-input-wrapper">
            <span className="amount-input-wrapper__currency">$</span>
            <input 
              type="number" 
              className="amount-input" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </section>

        {/* 카테고리 선택부 */}
        <section className="form-section">
          <label className="form-section__label">Category</label>
          <div className="category-buttons">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`category-button ${category === cat ? 'category-button--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 식비 세부 카테고리 (라디오 버튼 형태) */}
          {category === '식비' && (
            <div className="sub-category-selection">
              {FOOD_SUBS.map(sub => (
                <label key={sub} className="radio-label">
                  <input 
                    type="radio" 
                    name="subCategory" 
                    value={sub}
                    checked={subCategory === sub}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* 날짜 선택부 */}
        <section className="form-section">
          <label className="form-section__label">Date</label>
          <input 
            type="date" 
            className="form-input" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </section>

        {/* 메모 입력부 */}
        <section className="form-section">
          <label className="form-section__label">Memo</label>
          <textarea 
            className="form-input form-input--textarea" 
            placeholder="Write memo here..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </section>

        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default AddExpenseScreen;
