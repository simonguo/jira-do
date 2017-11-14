const workFlow = {
  1: open,        // 开放
  3: inProgress,  // 处理中
  4: open,        // 重新打开
  5: resolved,    // 已解决
  6: closed,      // 已关闭

  10000: open,    // Backlog
  10001: inProgress, // Selected for Development
  10002: closed,  // 完成
  10100: open     // 待办
};

// 开放
const open = [
  {
    laebl: '解决问题',
    value: 5
  }, {
    laebl: '开始处理',
    value: 3
  }, {
    laebl: '关闭问题',
    value: 6
  }
];

// 已解决
const resolved = [
  {
    laebl: '重新打开',
    value: 4
  }, {
    laebl: '关闭问题',
    value: 6
  }
];

// 已关闭
const closed = [
  {
    laebl: '重新打开',
    value: 4
  },
];

// 处理中
const inProgress = [
  {
    laebl: '停止处理',
    value: 1
  }, {
    laebl: '关闭问题',
    value: 6
  }, {
    laebl: '解决问题',
    value: 5
  }
];

// 重新打开
const reOpened = [
  {
    laebl: '解决问题',
    value: 5
  }, {
    laebl: '开始处理',
    value: 3
  }, {
    laebl: '关闭问题',
    value: 6
  }
];

const backlog