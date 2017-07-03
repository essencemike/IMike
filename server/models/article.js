const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');

const articleSchema = new Schema({
  title: String,
  content: String,
  abstract: String,
  publish: {
    type: Boolean,
    default: false,
  },
  createTime: Date,
  lastEditTime: {
    type: Date,
    default: Date.now,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }]
});

// 必须先set后get
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true, virtuals: true });
articleSchema.path('createTime').get(function(v) {
  return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});
articleSchema.path('lastEditTime').get(function(v) {
  return moment(v).format('YYYY MMMM Do, h:mm:ss a');
});

exports = module.exports = mongoose.model('article', articleSchema);
