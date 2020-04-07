'use strict';
const moment = require('moment');
exports.relativeTime = (time) => {
  return moment(new Date(time * 1000)).fromNow();
};