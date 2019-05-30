module.exports = {
  configureWebpack: {
    devServer: {
      port: 8089,
      open: true,
      //mock接口编写的地方
      before(app) {
        // app.get('请求地址', (req, res) => {
        //   res.json({

        //   });
        // })
        //注册接口
        //用户信息池
        let userpool = [{
            username: 'User1',
            password: '1234567'
          },
          {
            username: 'User2',
            password: '1234567'
          },
          {
            username: 'User3',
            password: '1234567'
          },
          {
            username: 'User4',
            password: '1234567'
          },
          {
            username: 'User5',
            password: '1234567'
          },
        ]
        app.get('/api/register', (req, res) => {
          const {
               username,
            password
          } = req.query
          const lenth = userpool.filter(v => v.username == username).length
          if (lenth > 0)
            res.json({
              success: false,
              message: '用户名已存在'
            })
          else {

            res.json({
              success: true,
              message: '用户注册成功'
            })
          }
        })
        //登录接口
        let tokenLogin = 'myn'
        app.get('/api/login', (req, res) => {
          const {
            username,
            password
          } = req.query
          const lenth = userpool.filter(u => u.username == username && u.password == password).length
          if (lenth > 0) {
            res.json({
              code: 0,
              message: '登录成功',
              token: tokenLogin + '-' + username + '-' + (new Date().getTime() + 60 * 60 * 1000)
            })
          } else {
            res.json({
              code: 1,
              message: '登录失败,账户密码错误',
            })
          }
        })
        var index_items1 = [{
            url: "http://www.didichuxing.com/",
            image: "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"
          },
          {
            url: "http://www.didichuxing.com/",
            image: "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png"
          },
          {
            url: "http://www.didichuxing.com/",
            image: "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png"
          }
        ]

        app.get('/api/banner', (req, res) => {
          res.json({
            items1: index_items1,
          })
        })

      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}