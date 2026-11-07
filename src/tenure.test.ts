import assert from 'node:assert/strict'
import { test } from 'node:test'
import { tenure } from './tenure.ts'

const NOV_2026 = new Date(2026, 10, 15)

test('counts both end months', () => {
  assert.equal(tenure('May 2025 – Aug 2025'), '4 mos')
  assert.equal(tenure('Feb 2025 – May 2025'), '4 mos')
})

test('a current role runs through the current month', () => {
  assert.equal(tenure('Sep 2026 – Present', NOV_2026), '3 mos')
  assert.equal(tenure('Nov 2026 – Present', NOV_2026), '1 mo')
})

test('shows years and months across year boundaries', () => {
  assert.equal(tenure('Aug 2023 – May 2025'), '1 yr 10 mos')
  assert.equal(tenure('Jan 2024 – Dec 2024'), '1 yr')
  assert.equal(tenure('Jan 2022 – Feb 2024'), '2 yrs 2 mos')
})

test('anything it cannot read shows nothing', () => {
  assert.equal(tenure('2023 – 2025'), '')
  assert.equal(tenure('Foo 2023 – May 2025'), '')
  assert.equal(tenure('Dec 2026 – Present', NOV_2026), '')
})
