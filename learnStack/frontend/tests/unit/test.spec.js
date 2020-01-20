import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Test from '@/components/Index.vue'
describe('Index.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Test, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
