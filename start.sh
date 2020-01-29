export DB_HOST=127.0.0.1
export DB_NAME=bitcore-tbtg
export BITCORE_CONFIG_PATH=$HOME/bitcore/tbtg.json
export NETWORK=mainnet
export CHAIN=BTG

case $1 in
node)
  exec 1>debug.node 2>&1
  npm run node
;;
insight)
  exec 1>debug.insight 2>&1
  npm run insight
;;
*)
  echo 'Unknown command; qed'
esac