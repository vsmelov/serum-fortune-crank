# serum-supercrane

## Usage

### Run with docker

```bash
docker build -t serum-fortune-crank .
docker run --rm -ti serum-fortune-crank
```

### environment to run

```bash
# install nodenv
curl -fsSL https://raw.githubusercontent.com/nodenv/nodenv-installer/master/bin/nodenv-installer | bash

# install recent nodejs
/home/v/.nodenv/bin/nodenv install 14.15.1

# check
/home/v/.nodenv/versions/14.15.1/bin/node --version
/home/v/.nodenv/versions/14.15.1/bin/npm --version

# TODO switch to this version in WebStorm

# install dependencies
/home/v/.nodenv/versions/14.15.1/bin/npm i
```

### Dex utils 

```bash
git clone https://github.com/project-serum/serum-dex.git
cd serum-dex
./do.sh build dex
cd crank 
sudo apt install -y libudev-dev
cargo run -- help
solana-keygen grind --starts-with p2p:1  # generate new wallet
/home/v/PycharmProjects/serum-dex/p2pKhhBC7X9JBcHXnYAF3miLRkGa76YBuW2UrLDNCfY.json

cargo rustc --release --all-targets --target-dir ./target
./target/release/crank print-event-queue EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe

KEYPAIR=~/.config/solana/id.json
solana balance -k $KEYPAIR

avgElapsedMs when using JS: 150ms

it's possbile to use serum-dex to monitor queue
./target/release/crank monitor-queue --dex-program-id EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o --market EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe --port 7000
but then it takes 700ms

```

## Market address

![serum-market-address.png](static/serum-market-address.png)

## References

про биржу - https://docs.google.com/document/d/1isGJES4jzQutI0GtQGuqtrBUqeHxl_xJNXdtOv4SdII/edit

про то как заработать - https://github.com/project-serum/rfcs/blob/master/text/0001-registry.md

the `process_requests` method - https://github.com/project-serum/serum-dex/blob/master/dex/src/matching.rs#L75

The current set of cranks that are operating use the Rust crank util here: https://github.com/project-serum/serum-dex#using-the-client-utility
Its probably the case that the existing cranks are cranking events out of the event queue before your client can observe them. If you loop fetching the queue you should eventually see some events
project-serum has only released a Rust implementation of crank turning thus far. The Rust CLI is what is used by production crank turners to keep markets working

