
import tool from '../src/tool.js'
import chai from 'chai'
let expect = chai.expect
describe('工具方法的测试', () =>{

  it('对象类型检测', () => {
    let data = {
      a: 1,
      b: 2
    }
    expect(tool.isObject(data)).to.be.ok
  })

  it('元素节点类型检测', () => {
    expect(true).to.be.equal(true)
  })

  it('文本节点类型检测', () => {
    expect(false).to.be.not.ok
  })

  it('根据key值自动获取所在对象对应的value值',() =>{
    let data = {
      name: 'liming',
      info: {
        sex: 'nan'
      }
    }
    expect(tool.getValueFromObject(data,'name')).to.be.equal('liming')
    expect(tool.getValueFromObject(data,'sex')).to.be.equal('nan')
  })
})
