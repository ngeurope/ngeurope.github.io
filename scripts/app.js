"use strict";angular.module("ngEuropeApp",["ui.scrollpoint"]).value("config",{imagesPath:"images/",speakers:window.speakers,organizers:window.organizers,sponsors:window.sponsors}).run(["$rootScope","config",function(o,n){o.config=n}]).controller("MainCtrl",["$scope","$window",function(o,n){o.openUrl=function(o){return n.open(o),!1},o.titles={speakers:"SPEAKERS",location:"Location",tickets:"Tickets",schedule:"Schedule",sponsors:"Sponsors",about:"About"}}]);