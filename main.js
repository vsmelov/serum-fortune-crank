import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';


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
for (let [price, size] of bids.getL2(20)) {
    console.log(price, size);
}
// Full orderbook data
for (let order of asks) {
    console.log(
        order.orderId,
        order.price,
        order.size,
        order.side, // 'buy' or 'sell'
    );
}

// Placing orders
let owner = new Account('...');
let payer = new PublicKey('...'); // spl-token account
await market.placeOrder(connection, {
    owner,
    payer,
    side: 'buy', // 'buy' or 'sell'
    price: 123.45,
    size: 17.0,
    orderType: 'limit', // 'limit', 'ioc', 'postOnly'
});

// Retrieving open orders by owner
let myOrders = await market.loadOrdersForOwner(connection, owner.publicKey);

// Cancelling orders
for (let order of myOrders) {
    await market.cancelOrder(connection, owner, order);
}

// Retrieving fills
for (let fill of await market.loadFills(connection)) {
    console.log(
        fill.orderId,
        fill.price,
        fill.size,
        fill.side,
    );
}

// Settle funds
for (let openOrders of await market.findOpenOrdersAccountsForOwner(
    connection,
    owner.publicKey,
)) {
    if (openOrders.baseTokenFree > 0 || openOrders.quoteTokenFree > 0) {
        // spl-token accounts to which to send the proceeds from trades
        let baseTokenAccount = new PublicKey('...');
        let quoteTokenAccount = new PublicKey('...');

        await market.settleFunds(
            connection,
            owner,
            openOrders,
            baseTokenAccount,
            quoteTokenAccount,
        );
    }
}
