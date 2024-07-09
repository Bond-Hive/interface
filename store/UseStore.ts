import { pool } from '@/app/constants/poolOptions'
import { create } from 'zustand'

const UseStore: any = create((set: any) => ({
    connectorWalletAddress: null,
    userBalance: 0.00,
    poolReserve: {},
    selectedNetwork: {},
    transactionsStatus: {},
    selectedPool: {},
    allPools: pool,
    setUserBalance: (balance: string) => set(() => ({userBalance: balance})),
    setConnectorWalletAddress: (address: string) => set(() => ({ connectorWalletAddress: address })),
    setPoolReserve: (value: string) => set(() => ({poolReserve: value})),
    setSelectedNetwork: (network: any) => set(() => ({selectedNetwork: network})),
    setTransactionsStatus: (data: any) => set(() => ({transactionsStatus: data})),
    setSelectedPool: (data: any) => set(() => ({selectedPool: data})),
    setAllPools: (data: any) => set(() => ({allPools: data}))
}))

export default UseStore