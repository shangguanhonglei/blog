const md5 = require('blueimp-md5')
import { hasKey } from '@/utils/'
import { formatSize, getFileTypeBySuffix } from '@/utils/files'
import Model from '@/models/model'
import Bus from '@/utils/bus'
import { EVENT_MEDIA_UPLOAD_QUEUE, EVENT_MEDIA_UPLOAD_UPLOADING, EVENT_MEDIA_UPLOAD_COMPLETE } from '@/utils/constants'



// 等待上传
const STATUS_WAITING = 0
// 上传中
const STATUS_PROCESSING = 1

// 等待上传
const FILE_STATUS_PENDING = 0
// 上传中
const FILE_STATUS_PROCESSING = 1
// 上传成功
const FILE_STATUS_RESOLVE = 2
// 上传失败
const FILE_STATUS_REJECT = 3



// 文件后缀
const FILE_SUFFIX_REG = /\.(\w+)$/i

export default {
  name: 'nova-uploader',
  props: {
    id: {
      type: String,
      default() {
        return 'nova-uploader-' + Date.now()
      }
    },
    multiple: Boolean,
    accept: String,
    disabled: Boolean,
    onChange: Function,
    // 在初始时注册额外的属性给file，方便Vue实现监听
    customFileFields: Object,
  },
  data() {
    return {
      files: [],
      index: 0,
      signatureData: {},
      status: STATUS_WAITING,
    }
  },
  methods: {

    /**
     * 生成file对象
     * @param {*} file 
     */
    genFile(file) {
      const data = Object.create(null)
      // 保存原始file对象
      data.$origin = file
      const match = file.name.match(FILE_SUFFIX_REG)
      if (!match) {
        return
      }
      const suffix = match[1]
      const name = file.name.replace(FILE_SUFFIX_REG, '')
      data.suffix = suffix
      data.shortName = name
      data.saveName = file.name
      data.size = formatSize(file.size)
      const { type, typeCode } = getFileTypeBySuffix(suffix)
      data.type = type
      data.hash = md5(file.name)
      data.typeCode = typeCode
      // 状态
      data.status = FILE_STATUS_PENDING
      // 进度
      data.progress = 0
      if (this.customFileFields) {
        for (let k in this.customFileFields) {
          // 不能覆盖原有属性
          if (!hasKey(k, data)) {
            data[k] = this.customFileFields[k]
          }
        }
      }

      return data
    },


    // 文件域改变时触发
    onFileChange(e) {
      const { files } = e.target
      // 处理files
      const list = []
        ;[...files].forEach(file => {
          const _file = this.genFile(file)
          if (_file) {
            list.push(_file)
          }
        })

      this.files = list
      if (this.onChange) {
        const res = this.onChange(list)
        if (res && Array.isArray(res)) {
          this.files = res
        }
      }

      e.target.value = null
    },


    /**
     * 获取每次上传的表单数据
     * @param {*} file 
     */
    getFormData(file) {
      const { signatureData } = this
      const formData = new FormData()
      formData.append('key', `${signatureData.dir}${file.saveName}`)
      formData.append('policy', signatureData.policy)
      formData.append('OSSAccessKeyId', signatureData.OSSAccessKeyId)
      formData.append('success_action_status', '200')
      formData.append('signature', signatureData.signature)
      formData.append('callback', signatureData.callback)
      formData.append('file', file.$origin)
      formData.append('name', file.saveName)
      return formData
    },


    /**
     * upload next file
     * 
     */
    next() {
      const queueLen = this.files.length - 1
      // 本次上传完成
      if (this.index === queueLen) {
        this.index = 0
        this.status = STATUS_WAITING
        this.$emit('onUploadComplete')
        Bus.$emit(EVENT_MEDIA_UPLOAD_COMPLETE, true)
        Bus.$emit(EVENT_MEDIA_UPLOAD_UPLOADING, false)
      }
      else if (this.index < queueLen) {
        this.index++
        this.upload(this.files[this.index])
        Bus.$emit(EVENT_MEDIA_UPLOAD_COMPLETE, false)
        Bus.$emit(EVENT_MEDIA_UPLOAD_UPLOADING, true)
      }
    },


    /**
     * upload file to oss
     * @param {*} file 
     */
    upload(file) {
      file.status = FILE_STATUS_PROCESSING
      file.progress = 0
      const formData = this.getFormData(file)
      const instance = this
      Model.Http({
        url: this.signatureData.host,
        method: 'post',
        data: formData,
        onUploadProgress(event) {
          const progress = parseFloat(event.loaded / event.total * 100)
          if (isNaN(progress)) {
            file.status = FILE_STATUS_REJECT
          } else {
            file.status = FILE_STATUS_PROCESSING
            file.progress = progress.toFixed(2)
          }
          instance.$emit('onUploadProgress', progress, file)
        }
      })
        .then(response => {
          const { data } = response
          if (+(data.status) === 10000000) {
            file.progress = 100
            file.status = FILE_STATUS_RESOLVE
            instance.$emit('onUploadSuccess', file)
          } else {
            //失败
            file.status = FILE_STATUS_REJECT
            instance.$emit('onUploadFail', 'fail', file)
          }
          this.next()
        })
        .catch(err => {
          file.status = FILE_STATUS_REJECT
          instance.$emit('onUploadFail', err, file)
          this.next()
        })
    },


    /**
     * 开始上传
     * @param {*} oss 
     * @param {*} files 
     */
    start(oss, files) {
      this.signatureData = {
        policy: oss.policy,
        OSSAccessKeyId: oss.accessid,
        signature: oss.signature,
        callback: oss.callback,
        host: oss.host,
        dir: oss.dir
      }
      if (files && Array.isArray(files)) {
        this.files = files
      }
      if (this.status === STATUS_PROCESSING || !this.files.length) {
        return
      }
      this.index = 0
      this.status = STATUS_PROCESSING
      this.upload(this.files[0])
    }
  },
}