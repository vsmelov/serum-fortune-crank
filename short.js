import {Connection, PublicKey} from '@solana/web3.js';
import {Market} from '@project-serum/serum';


let connection = new Connection('https://solana-api.projectserum.com');
let programAddress = new PublicKey('EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o');
let marketAddress = new PublicKey('EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe');
let market = await Market.load(connection, marketAddress, undefined, programAddress);

let events = await market.loadEventQueue(connection)
console.log('events: ', events);

let requests = await market.loadRequestQueue(connection)
console.log('requests: ', requests);
