import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionRepository);
    const transaction = await transactionsRepository.findOne(id);

    console.log('transaction', transaction);

    if (!transaction) {
      throw new AppError('Transação não existe!');
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
