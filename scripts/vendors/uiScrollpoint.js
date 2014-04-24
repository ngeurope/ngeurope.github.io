"use strict";window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/60)}}(),angular.module("ui.scrollpoint",[]).controller("uiScrollContainerController",["$element","$rootScope",function(n,e){function i(n,e){var i=angular.copy(n.element[0].getBoundingClientRect()),t=e.$eval(n.attr.offset);if(t)for(var o=Object.keys(i),r=0,l=o.length;l>r;++r)t[o[r]]&&(i[o[r]]+=t[o[r]]);return i}function t(){l=n[0].getBoundingClientRect();for(var i=0,t=r.points.length;t>i;++i)r.evalPoints(r.points[i]);e.$apply(),o=!1}var o,r={},l=n[0].getBoundingClientRect(),c="document"===n.attr("ui-scroll-container")?angular.element(window):n;return r.points=[],r.add=function(n,e){var i=r.points;i.push({element:n,oldScroll:n[0].scrollTop,attr:e,locals:{$isVisible:!1}}),r.evalPoints(i[i.length-1])},r.remove=function(n){r.points.splice(r.points.findIndex(function(e){return n===e.element}),1)},r.evalPoints=function(n){var e=n.element.scope();if(e){var t=i(n,e),o=!1,r=t.bottom>=0&&t.top<=(c[0].innerHeight||l.bottom);n.locals.$isVisible!==r&&(o=!0,n.locals.$isVisible=r),o&&e.$eval(n.attr.uiScrollpoint,n.locals)}},c.on("scroll",function(){o||(o=!0,window.requestAnimationFrame(t))}),r}]).directive("uiScrollContainer",function(){return{restrict:"AE",controller:"uiScrollContainerController"}}).directive("uiScrollpoint",function(){return{restrict:"AE",require:"?^uiScrollContainer",link:function(n,e,i,t){t&&(t.add(e,i),e.on("$destroy",function(){t.remove(e)}))}}}).directive("uiScrollpointLoop",["$timeout","requestAnimationFrameFIFOService",function(n,e){var i='<div ui-scrollpoint="$isVisible && checkStillVisible()" ng-transclude></div>';return{restrict:"AE",transclude:!0,template:i,require:"?^uiScrollContainer",scope:!0,link:{pre:function(i,t,o,r){var l;r&&(i.checkStillVisible=function(){i.$eval(o.uiScrollpointLoop),l=n(function(){var n=r.points.findIndex(function(n){return t.children()[0]===n.element[0]});0>n||(r.points[n].locals.$isVisible=!1,e.push(function(){r.evalPoints(r.points[n])}))},1e3)},t.on("$destroy",function(){n.cancel(l)}))}}}}]);