## Setup:

- install Node v18
```shell
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install v18
```

- create the `data/config.json` file using the following template:
```json
{
  "tpsServerHost": "0.0.0.0",
  "tpsServerPort": 8181,
  "endpoint": "https://rpc-dev.arthera.net",
  "deployer": {
    "address": "0x..................",
    "privateKey": "0x........................."
  },
  "fundSenders": true,
  "accounts": 100,
  "workers": 80,
  "sendRawTransaction": true,
  "timeout": 15000,
  "tokenMethod": "transferLoop",
  "tokenAmountToMint": 1000000000,
  "tokenTransferMultiplier": 1,
  "tokenAssert": true,
  "transactions": 1000,
  "gasLimit": "200000",
  "txpoolMaxLength": -1,
  "txpoolMultiplier": 2,
  "txpoolLimit": 7500,
  "checkersInterval": 250,
  "estimate": false,
  "verbose": true
}
```

## Running:

To run the TPS server for EVM (Frontier):

```shell
npm run evm
```

After the initial setup is done, you can trigger an "auto" run by:
```shell
curl -X GET "http://0.0.0.0:8181/auto"
```

That command will send `50,000` transactions to the target using `80` threads (set by `transactions` and `workers` in `data/config.json`).


Or sending requests via `artillery`/`wrk` to:
```shell
artillery quick --count 50 --num 500 http://0.0.0.0:8181/sendRawTransaction
```

That command will send 25,000 (`50` "users" sending `500` requests each) requests to `/sendRawTransaction`.

```
wrk -t 50 -c 50 -d 600 --latency --timeout 1m http://0.0.0.0:8181/sendRawTransaction
```

That command will spawn 50 threads to send requests to `/sendRawTransaction` in 600 seconds.

To run it using a different JSON files directory (other than `data/`) by setting `EVM_TPS_ROOT_DIR`:

```shell
EVM_TPS_ROOT_DIR="path/to/dir" npx hardhat run scripts/tps-server.ts --network local
```
