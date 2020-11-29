from pyserum.connection import conn
from pyserum.market import Market

cc = conn("https://api.mainnet-beta.solana.com/")
# market_address = "5LgJphS6D5zXwUVPU7eCryDBkyta3AidrJ5vjNU6BcGW" # Address for BTC/USDC
market_address = "EXnGBBSamqzd3uxEdRLUiYzjJkTwQyorAaFXdfteuGXe" # Address for BTC/USDT

# Load the given market
market = Market.load(cc, market_address)
asks = market.load_asks()
# Show all current ask order
print("Ask Orders:")
for ask in asks:
    print("Order id: %d, price: %f, size: %f." % (
          ask.order_id, ask.info.price, ask.info.size))

print("\n")
# Show all current bid order
print("Bid Orders:")
bids = market.load_bids()
for bid in bids:
    print("Order id: %d, price: %f, size: %f." % (
          bid.order_id, bid.info.price, bid.info.size))