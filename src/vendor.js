import 'whatwg-fetch';
import '@babel/polyfill';
import 'chart.js';
import 'chartjs-plugin-deferred';

if (!global.Intl) {
  require.ensure([
      'intl',
      'intl/locale-data/jsonp/it.js'
  ], function (require) {
      require('intl');
      require('intl/locale-data/jsonp/it.js');
  });
}

console.log('Vendor JS');

// Global chartsjs configurations
Chart.defaults.global.hover.mode = 'nearest';
Chart.defaults.global.elements.line.fill = false;
Chart.defaults.global.tooltips.mode = 'index';
Chart.defaults.global.tooltips.intersect = false;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.legend.labels.boxWidth = 10;
Chart.defaults.global.legend.labels.fontSize = 12;
Chart.defaults.global.defaultFontColor = '#fff';
Chart.defaults.global.plugins.deferred.yOffset = '50%';
Chart.defaults.global.plugins.deferred.delay = 150;
Chart.defaults.scale.gridLines.color = "rgba(0255, 255, 255, 0.25";