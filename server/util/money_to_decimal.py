from re import sub
from decimal import Decimal

def money_to_decimal(money):
    return Decimal(Decimal(sub(r'[^\d.]', '', money)))