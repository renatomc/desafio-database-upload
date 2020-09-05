import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const totalIncomeReduce = transactions.reduce(
      (totalIncome: number, transaction: Transaction) => {
        if (transaction.type === 'income') {
          totalIncome += Number(transaction.value);
        }
        return totalIncome;
      },
      0,
    );

    const totalOutComeReduce = transactions.reduce(
      (totalOutcome: number, transaction: Transaction) => {
        if (transaction.type === 'outcome') {
          totalOutcome += Number(transaction.value);
        }
        return totalOutcome;
      },
      0,
    );

    return {
      income: totalIncomeReduce,
      outcome: totalOutComeReduce,
      total: totalIncomeReduce - totalOutComeReduce,
    };
  }
}

export default TransactionsRepository;
