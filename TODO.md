# Todo

> 2.13

- [x] 购物车删除，购物车点击单条数据进入商品详情
- [x] 购物车数量同步，点击购物车页面进入购物车
- [x] 收货地址距离不在范围内显示
- [x] 客户要腾讯地图 key
- [x] 领取优惠券

> 2.14

- [x] 收货地址路由
- [x] 我的收货地址添加按钮动态高度
- [x] 超市真实经纬度替换
  - 北京市大兴区新源大街 27 号院万科天地 2 号楼 101
  - http://www.gpsspg.com/maps.htm
  - 39.7143000000,116.3163900000
  - 旺小喵宠物会所
    > 2.15
- [x] 首页 banner 图 没有点
- [x] 首页邀请有礼，图片加叉号按钮点击隐藏
- [X]点击获取验证码按钮大小
- [x] 商品单个列表点击购物车不跳转直接加入购物车，购物车徽标显示购物数量
- [x] index,sort 地址选择不好点
- [x] 筛掉小程序后 再次扫码进入还会提示授权
- [x] 分类模块：领取优惠券只在第一个分类里展示
- [x] 配送费联动价格动态提示

> 2.17

- [x] 二级分类 flex
- [x] 购物车选择收货地址，如果没有地址 显示添加收货地址(文字提示) 添加收货地址 ID 返给我
- [x] 刚进入小程序时提示授权定位，加入购物车、领取优惠券、查看订单、管理地址、充值会员、点击我的页面授权登录按钮时提示授权登录
- [x] 商品名称，简介左对齐，会员 6 折居中对齐
- [x] 商品左边划删除效果

> 2.18

- [x] 商品详情间距控制
- [x] 首页、购物车、我的订单页需要下拉刷新
- [x] 商品详情点击购物车显示加减按钮

> 2.19

- [x] 优惠金额减
- [x] 我的订单- 下拉刷新
- [x] sort 页面
- [x] 待付款详情 商品
- 附近的地址 六洲大厦

- [x] 确认订单可以改地址
- [x] 库存修改

> 2.27

- [x] 发布订阅事件 remove 清理，影响华为手机添加收货地址选择地址
- [x] 添加收货地址选择地址暂不显示当前的地址
- [x] 购物车删除，onShow，下拉加载中
      评价订单
- 小程序部分不支持

```js
 <block wx:elif="{{Info.score > jifenShouldOver}}">
                <view class='name'>当前可用{{Info.score}}积分抵现</view>
                <view class='content selectJF' bindtap='useJifen' data-score="{{Info.score}}">
                    {{userJifenNum == 0? '':'- ￥' + userJifenNum/100}}
                    <image mode="widthFix" src="{{default_useJifen ? checked:normal}}" style='width:30rpx;'></image>
     </view>
 </block>
```

> 3.6 记录

- [x] 分类商品`全部`分类下一直滚动数据重复加载

> 4.11

- [x] render padding
- [x] 图片间距跳转
- [x] 客服电话

  > 4.24

- [x] 优惠券样式分类换行样式

> 4.25

- [x] 优惠券多次领取节流
- [x] authorization 组件

> 4.26

- [x] 优惠券显示类型文字调整
- [x] 商品单个详情标题不显示

> 4.28

- [x] filterImgUrl 切换线上静态资源地址

## 优化

- [x] 弱网加载优化
