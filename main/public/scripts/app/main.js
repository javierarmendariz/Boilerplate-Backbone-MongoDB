"use strict";
(function () {
	requirejs.config({
		paths: {
			'jquery'	: '/scripts/libraries/bower_components/jquery/dist/jquery',
			'underscore': '/scripts/libraries/bower_components/underscore/underscore',
			'backbone'	: '/scripts/libraries/bower_components/backbone/backbone',
			'router'	: '/scripts/app/routes/router',
			'text'		: '/scripts/libraries/requirejs/plugins/text',
			'amplifyStore'	: '/scripts/libraries/bower_components/amplify/lib/amplify.store.min',
			'json2'		: '/scripts/libraries/bower_components/json2/json2',

			// Require Less
			'less': '/scripts/libraries/bower_components/require-less/less',
			'lessc': '/scripts/libraries/bower_components/require-less/lessc',
			'normalize': '/scripts/libraries/bower_components/require-less/normalize',

			// Bootstrap
			'bootstrap'	: '/scripts/libraries/bower_components/bootstrap/dist/js/bootstrap'
		},
		shim: {
			'backbone': {
				'deps': ['underscore']
			},
			'bootstrap': {
				'deps': ['jquery']
			},
			'less': {
				'deps': ['lessc', 'normalize']
			},
			'amplifyStore': {
				'deps': ['json2']
			}
		},
		// Cache bust, for DEV use only
		urlArgs: "bust=" +  (new Date()).getTime()
	});
	requirejs(['backbone', 'less', 'bootstrap', 'appconfig', 'router', 'amplifyStore'], function (Backbone, Less, Bootstrap, AppConfig, Router, AmplifyStore) {

		Router.initialize();
		AppConfig({
			router: Router.getInstance()
		});

	});
})(window);