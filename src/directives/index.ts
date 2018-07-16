import Vue from 'vue';
import highlightjs from './highlight';
import clickoutside from './clickoutside';
import RepeatClick from './repeat-click';
import mousewheel from './mousewheel';

Vue.directive('highlightjs', highlightjs);
Vue.directive('clickoutside', clickoutside);
Vue.directive('repeatClick', RepeatClick);
Vue.directive('mousewheel', mousewheel);
