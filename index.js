//处理UTC时间格式
function dealUTCFormat(data) {
  $scope.baseinfo.timeModule = +data.reportIsUTC === 1 ? 1 : 2;
  $scope.baseinfo.reportWeek = $scope.baseinfo.reportWeekServertoUTC = data.reportWeek + ''; //周
  $scope.baseinfo.reportDate = $scope.baseinfo.reportDateServertoUTC = data.reportDate ? (data.reportDate + '') : '1'; //哪一天
  $scope.baseinfo.reportTime = $scope.baseinfo.reportTimeServertoUTC = data.reportTime ? (data.reportTime + '') : '09:00'; //时间
  $scope.baseinfo.reportZone = data.reportZone || '+8';//时区
  $scope.baseinfo.reportTimeZone = config.TIMEZONE[data.reportZone];
  var params = main.convertUTCAndTime({
      time: $scope.baseinfo.reportTime,
      zone: $scope.baseinfo.reportZone,
      week: $scope.baseinfo.reportWeek,
      date: $scope.baseinfo.reportDate
  });
  $scope.baseinfo.reportWeekServer = params.week;
  $scope.baseinfo.reportDateServer = params.date;
  $scope.baseinfo.reportTimeServer = params.time;
  tabChange($scope.baseinfo.timeModule);

}

editorRoportSetting

          TIMEZONE: {
            '+8': langApp.Beijing,
            '+5': langApp.NewDelhi,
            '+1': langApp.Berlin,
            '+9': langApp.Tokyo,
            '+10': langApp.Canberra,
            '-5': langApp.Washington
        },

        'UTCTime': 'UTC',
        'Beijing': 'Beijing',
        'NewDelhi': 'New Delhi',
        'Berlin': 'Berlin',
        'Tokyo': 'Tokyo',
        'Canberra': 'Canberra',
        'Washington': 'Washington',

        'UTCTime': 'UTC时间',
        'Beijing': '北京时间',
        'NewDelhi': '新德里时间',
        'Berlin': '柏林时间',
        'Tokyo': '东京时间',
        'Canberra': '堪培拉时间',
        'Washington': '华盛顿时间',