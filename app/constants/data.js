const filter = [
  {
    name: '我未完成的问题',
    jql: 'assignee = currentUser() AND resolution = Unresolved order by updated DESC'
  },
  {
    name: '我的报告',
    jql: 'reporter = currentUser() order by created DESC'
  }
];
