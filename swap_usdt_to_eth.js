const path = require('path');
const Web3 = require('web3');
const fs = require('fs');

// 打印 Web3 版本
console.log(`Web3 version: ${Web3.version}`);

// 配置 RPC URL 和其他必要的参数
const RPC_URL = 'https://mainnet.era.zksync.io';  // 替换为你的 zkSync RPC URL
const ROUTER_ADDRESS = '0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4';
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // 主网地址
const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

// 初始化 Web3 实例
const web3 = new Web3(RPC_URL);

// 打印 Web3 实例版本
console.log(`Web3 instance version: ${web3.version}`);

// 从 keys.json 文件读取私钥
const keysPath = path.join(__dirname, 'keys.json');
const keysContent = fs.readFileSync(keysPath, 'utf-8');
const keys = JSON.parse(keysContent);

const privateKey = keys.privateKey;

if (!privateKey) {
    throw new Error("Private key must be defined in the keys.json file");
}

// 使用 Buffer 处理私钥
const account = web3.eth.accounts.wallet.add(`0x${privateKey}`);
web3.eth.defaultAccount = account.address;

// 路由器合约的 ABI (只包含我们需要的方法)
const routerAbi = [
    // 你需要添加路由器合约的 ABI
];

const routerContract = new web3.eth.Contract(routerAbi, ROUTER_ADDRESS);

// USDT 合约的 ABI (只包含我们需要的方法)
const usdtAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    // 你可能会有其他方法，但这是你所需要的
];

const usdtContract = new web3.eth.Contract(usdtAbi, USDT_ADDRESS);

// 执行交易的函数
async function executeSwap(percentage) {
    try {
        // 获取账户的 USDT 余额
        const usdtBalance = await usdtContract.methods.balanceOf(account.address).call();
        console.log('USDT Balance:', usdtBalance);

        // 在这里继续编写你的交易逻辑
        // 你可能需要调用路由器合约的其他方法

    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

const percentageToSwap = 23; // 设置要交易的 USDT 数量的百分比
executeSwap(percentageToSwap);
