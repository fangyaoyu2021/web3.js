import {
	EthExecutionAPI,
	Web3APIPayload,
	JsonRpcResponse,
	JsonRpcResponseWithResult,
} from 'web3-common';
import HttpProvider from '../../src/index';
import {
	getSystemTestAccounts,
	getSystemTestProvider,
	describeIf,
} from '../fixtures/system_test_utils';

describeIf(getSystemTestProvider().startsWith('http'))('HttpProvider - implemented methods', () => {
	let httpProvider: HttpProvider;
	let jsonRpcPayload: Web3APIPayload<EthExecutionAPI, 'eth_getBalance'>;

	beforeAll(async () => {
		httpProvider = new HttpProvider(getSystemTestProvider());
		jsonRpcPayload = {
			jsonrpc: '2.0',
			id: 42,
			method: 'eth_getBalance',
			params: [(await getSystemTestAccounts())[0], 'latest'],
		} as Web3APIPayload<EthExecutionAPI, 'eth_getBalance'>;
	});

	describe('httpProvider.request', () => {
		it('should return expected response', async () => {
			const response: JsonRpcResponse = await httpProvider.request(jsonRpcPayload);
			expect(Number((response as JsonRpcResponseWithResult).id)).toBeGreaterThan(0);
		});
	});
});