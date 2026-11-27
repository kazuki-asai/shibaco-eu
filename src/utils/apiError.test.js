import assert from 'node:assert/strict'
import test from 'node:test'
import { apiErrorMessage } from './apiError.js'

test('maps the shipping fee mismatch and hides other Japanese text', () => {
  const mismatch = { response: { data: { error: 'shipping_fee が送料の計算結果と一致しません' } } }
  assert.match(apiErrorMessage(mismatch, 'fallback'), /could not confirm this shipping cost/i)

  const other = { response: { data: { errors: ['メールアドレスは不正です'] } } }
  assert.equal(apiErrorMessage(other, 'Please try again.'), 'Please try again.')
})

test('keeps an English API message', () => {
  const error = { response: { data: { error: 'Cart is empty' } } }
  assert.equal(apiErrorMessage(error, 'fallback'), 'Cart is empty')
})
