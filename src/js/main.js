require.config({
    baseUrl: "/lib/",
    paths: {
         jquery: 'jquery-2.0.3.min'
    }
});

require(['jquery'], function($) {
 alert($);
});