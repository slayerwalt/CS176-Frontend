# Application Layer Protocol

## 1 Modules

```
module.exports = {
    parseStateMachine,
    packet,
    seq,// 生成数据包的随机序列号
};
```

`parseStateMachine`

```
解析协议的状态机
const psm = new parseStateMachine({callBack: function() {}})
callBack把字节流交给psm.run()处理
```

packet

```
封包函数packet(string, seq);seq可以不传，默认生成
```

## 2 Get Start

### 2.1 Start Server

```
node server.js
```

### 2.2 Start Client

```
node client.js
```

### 2.3 Start Delay Client

```
node delayClient.js
```
