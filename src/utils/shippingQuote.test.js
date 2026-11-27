import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeShippingList, quoteFromPayload } from './shippingQuote.js'

test('a numeric amount is a quote, including zero', () => {
  assert.deepEqual(quoteFromPayload({ country_code: 'de', amount: 1800 }), {
    status: 'quoted',
    amount: 1800,
    countryCode: 'DE',
    message: null,
  })
  assert.equal(quoteFromPayload({ country_code: 'FR', amount: 0 }).status, 'quoted')
  assert.equal(quoteFromPayload({ country_code: 'FR', amount: 0 }).amount, 0)
})

test('null amount is unavailable, not free', () => {
  const quote = quoteFromPayload({
    country_code: 'DE',
    country_name: 'ドイツ',
    amount: null,
  })
  assert.equal(quote.status, 'unavailable')
  assert.equal(quote.amount, null)
})

test('an unavailable flag wins over an amount', () => {
  const quote = quoteFromPayload({ country_code: 'DE', amount: 1000, unavailable: true })
  assert.equal(quote.status, 'unavailable')
  assert.equal(quote.amount, null)
})

test('the list keeps only rows with a country code and English names', () => {
  const rows = normalizeShippingList([
    { country_code: 'DE', country_name: 'ドイツ', amount: 2000 },
    { country_name: 'フランス', amount: 1000 },
    { country_code: 'AT', country_name: 'オーストリア', amount: null },
  ])
  assert.deepEqual(
    rows.map((row) => [row.countryCode, row.countryName, row.status]),
    [
      ['AT', 'Austria', 'unavailable'],
      ['DE', 'Germany', 'quoted'],
    ],
  )
})
