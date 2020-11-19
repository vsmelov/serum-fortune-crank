import pprint
from pyserum.connection import get_live_markets, get_token_mints
print("tokens: ")
pprint.pprint(get_token_mints())
print("markets: ")
pprint.pprint(get_live_markets())
