# 配合本地的 go-get-v2 对中国主流网站视频进行下载

读取打开页面的视频接口自动生成配置文件提供给本地的go-get-v2进行下载

**注意，各大网站的接口可能会改变，因此此程序可能在未来会失效**

[go-get-v2](https://github.com/schwarzeni/go-get-v2)

将extension加入到chrome插件中，[详见](https://jingyan.baidu.com/article/e5c39bf5cc39cc39d76033cd.html)，但添加的不是crx文件，而是extension文件夹

## 使用方法

打开需要下载视频的播放页，右击鼠标，选择 `Get current video info` 选项，查看是否抓取成功，同时也可以修改保存路径

保存位置：必须是一个**空文件夹**！！！

店家浏览器url右侧的小图标，选择菜单的第一个唤出管理页面

第一个按钮是刷新抓取列表

第二个按钮是下载配置文件

第三个是清空抓取列表

最后可以设置默认保存路径

点击列表选项可以进行保存路径的设置和删除
