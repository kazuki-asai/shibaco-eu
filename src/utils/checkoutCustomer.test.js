import assert from 'node:assert/strict'
import test from 'node:test'
import { buildCheckoutCustomer } from './checkoutCustomer.js'

test('buildCheckoutCustomer keeps the country readable in the joined address', () => {
  const customer = buildCheckoutCustomer(
    {
      lastName: 'Smith',
      firstName: 'Jane',
      email: 'jane@example.com',
      phone: '+49 170 0000000',
      zip: '10115',
      city: 'Berlin',
      address1: 'Torstrasse 1',
      address2: 'c/o Müller',
      countryCode: 'DE',
    },
    { code: 'DE', name: 'Germany' },
  )

  assert.equal(customer.countryCode, 'DE')
  assert.equal(
    `${customer.prefecture}${customer.address1}${customer.address2}`,
    'Germany, Torstrasse 1, Berlin, 10115, c/o Müller',
  )
})
