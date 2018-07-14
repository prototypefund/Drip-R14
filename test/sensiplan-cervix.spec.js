import chai from 'chai'
import dirtyChai from 'dirty-chai'

const expect = chai.expect
chai.use(dirtyChai)

import getSensiplanCervix from '../lib/sensiplan-cervix'

describe.only('getSensiplanCervix', () => {

  describe('results in lowest fertility value for:', () => {
    it('low & closed position and hard consistency of cervix', function () {
      const sensiplanValue = getSensiplanCervix(0, 0)
      expect(sensiplanValue).to.eql(0)
    })
  })

  describe('results in low-medium fertility value for:', () => {
    it('low & closed position and soft consistency of cervix', function () {
      const sensiplanValue = getSensiplanCervix(0, 1)
      expect(sensiplanValue).to.eql(1)
    })

    it('medium position and hard consistency of cervix', function () {
      const sensiplanValue = getSensiplanCervix(1, 0)
      expect(sensiplanValue).to.eql(1)
    })
  })

  describe('results in medium-high fertility value for:', () => {
    it('medium position and soft consistency of cervix', function () {
      const sensiplanValue = getSensiplanCervix(1, 1)
      expect(sensiplanValue).to.eql(2)
    })

    it('high & open position and hard consistency of cervix', function () {
      const sensiplanValue = getSensiplanCervix(2, 0)
      expect(sensiplanValue).to.eql(2)
    })
  })

  describe('results in highest fertility value for:', () => {
    it('high & open position and soft consistency of cervix', function () {
      const sensiplanValue = getSensiplanCervix(2, 1)
      expect(sensiplanValue).to.eql(3)
    })
  })
})
