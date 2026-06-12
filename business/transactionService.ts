import { getTransactions, createTransaction } from '@/data/transactionRepository'

export const fetchTransactions = async (
    page: number,
    limit: number,
    sortBy?: string,
    order?: string) => {
    return await getTransactions(page, limit, sortBy, order);
}

export const makeTransaction = async (data: any) => {
    return await createTransaction(data)
}