import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface allTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private allTransactions: allTransactions;

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    this.allTransactions = {
      transactions: this.transactions,
      balance: this.balance,
    };
  }

  public all(): allTransactions {
    return this.allTransactions;
  }

  public getBalance(): Balance {
    this.balance.income = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') {
        return (total += elemento.value);
      }
      return total;
    }, 0);

    this.balance.outcome = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome') {
        return (total += elemento.value);
      }
      return total;
    }, 0);

    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
