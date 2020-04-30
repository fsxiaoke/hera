module.exports = {
  extApi: [
    {
      name: 'testApi',
      fn: function (params) {
        this.showToast(params)
      },
      params: {
        title: ''
      }
    },
    {
      name: 'openPage',
      params: {
        name: '',
        param: {}
      }
    },
    {
      name: 'openLink',
      params: {
        url: ''
      }
    }
  ]
}
