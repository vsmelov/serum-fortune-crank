import { Account, Connection, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from '@solana/web3.js';
import { Market } from '@project-serum/serum';

// todo: do not place the acc with real money to GIT
// let myAcc = new Account('4MjCn2q9jzT9s6cYcSX8yf3eEuxQ3bmcAjEEBvQneMBpjoFYZovczXLnx2zHANurSQjsS5m7o8JmjTgw9uiQ5bNX')
let myAcc = new Account()

//////////// init market ////////////

let connection = new Connection('https://solana-api.projectserum.com');
let programAddress = new PublicKey('EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o');
let marketAddress = new PublicKey('EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe');
console.log('programAddress:', programAddress.toString());
console.log('marketAddress:', marketAddress.toString());
let market = await Market.load(connection, marketAddress, undefined, programAddress);

// see also:
// https://github.com/project-serum/serum-js/issues/1
// https://explorer.solana.com/
// https://explorer.solana.com/?history=&cluster=testnet
// Serum: BTC / USDT https://explorer.solana.com/address/8AcVjMG2LTbpkjNoyq8RwysokqZunkjy3d5JDzxC6BJa
// mainnet serum https://explorer.solana.com/address/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt
// https://explorer.solana.com/address/EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe


// Fetching orderbooks
let bids = await market.loadBids(connection);
let asks = await market.loadAsks(connection);

// L2 orderbook data
console.log('bids top5:');
for (let [price, size] of bids.getL2(5)) {
    console.log(price, size);
}

// Full orderbook data
for (let order of asks) {
    console.log(
        order.side,
        order.price,
        order.size,
        order.orderId,
    );
}

console.log('market._decoded: ', market._decoded.eventQueue);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

while (true) {
    let requests = await market.loadRequestQueue(connection)
    console.log('requests: ', requests);
    if (requests.length > 0) {
        console.log('turn the crank because of requests.length=', requests.length)
        let tx = await market.matchOrders(connection, myAcc, 100)
        console.log('tx: ', tx);
    }
    await sleep(1000);
}
