/**
 * ShopWorks stores the address as prefecture + address1 + address2 with no
 * separator (`Api::CheckoutsController#create_guest_customer`). Commas are
 * included here so the saved address stays readable until that changes.
 *
 * `countryCode` is sent for a future overseas checkout. The current API ignores it.
 */
export function buildCheckoutCustomer(form, country) {
  const street = String(form.address1 || '').trim()
  const city = String(form.city || '').trim()
  const extra = String(form.address2 || '').trim()
  const zip = String(form.zip || '').trim()
  const locality = [street, city, zip].filter(Boolean).join(', ')

  return {
    lastName: String(form.lastName || '').trim(),
    firstName: String(form.firstName || '').trim(),
    email: String(form.email || '').trim(),
    phone: String(form.phone || '').trim(),
    zip,
    prefecture: `${country.name}, `,
    address1: extra ? `${locality}, ` : locality,
    address2: extra,
    countryCode: country.code,
  }
}
