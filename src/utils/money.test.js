import assert from 'node:assert/strict'
import test from 'node:test'
import { formatMoney } from './money.js'

test('formatMoney renders yen the way checkout charges it', () => {
  assert.equal(formatMoney(4980), '¥4,980 JPY')
  assert.equal(formatMoney(0), '¥0 JPY')
})

test('formatMoney does not invent a number', () => {
  assert.equal(formatMoney(null), '—')
  assert.equal(formatMoney('nope'), '—')
})
