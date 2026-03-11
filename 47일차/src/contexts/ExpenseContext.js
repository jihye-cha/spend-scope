import React, { createContext, useContext, useState } from "react";

// SpendScope 지출 데이터 컨텍스트 생성
const ExpenseContext = createContext();

/**
 * 초기 더미 데이터 (5건)
 * 요구사항: [id, amount, category, subCategory, date, memo]
 */
const initialExpenses = [
  {
    id: 1,
    amount: 15000,
    category: "식비",
    subCategory: "점심 식사",
    date: "2026-03-10",
    memo: "팀원들과 돈까스",
  },
  {
    id: 2,
    amount: 5500,
    category: "식비",
    subCategory: "커피",
    date: "2026-03-10",
    memo: "아이스 아메리카노",
  },
  {
    id: 3,
    amount: 45000,
    category: "교통",
    subCategory: null, // 식비가 아닐 때는 사용하지 않음
    date: "2026-03-09",
    memo: "주유비",
  },
  {
    id: 4,
    amount: 12000,
    category: "식비",
    subCategory: "저녁 식사",
    date: "2026-03-08",
    memo: "편의점 도시락",
  },
  {
    id: 5,
    amount: 30000,
    category: "생활",
    subCategory: null,
    date: "2026-03-07",
    memo: "생필품 구매",
  },
];

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  // 새로운 지출 추가
  const addExpense = (newExpense) => {
    setExpenses((prev) => [{ ...newExpense, id: Date.now() }, ...prev]);
  };

  // 지출 삭제
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    totalAmount: expenses.reduce((acc, curr) => acc + curr.amount, 0),
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

// 컨텍스트 사용을 위한 커스텀 훅
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
