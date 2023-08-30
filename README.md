## Setup:

- install Node v18
- change test's parameters in [data/config.json](./data/config.json):

## Running:

To run the TPS server for EVM (Frontier):

```shell
npm run evm
```

After the initial setup is done, you can trigger an "auto" run by:
```shell
curl -X GET "http://0.0.0.0:8181/auto"
```

That command will send `50,000` transactions to the target using `80` threads (set by `transactions` and `workers` in the [data/config.json](./data/config.json)).


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
