/**
 * Copyright (c) 2015 Christian Katzorke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function() {
    'use strict';
    angular.module('csrfMetaInterceptor', [])
        .factory('csrfMetaInterceptor', ['$injector', '$document', '$log',
            function($injector) {
                // get _csrf meta element and value and add it as header
                // defined with 	 _csrf_header meta element value
                var $document = $injector.get('$document');
                var $log = $injector.get('$log');
                var HTTP_METHODS = ['POST', 'PUT', 'DELETE'];
                var getMetaElement = function(name) {
                    var meta = $document[0].head.children.namedItem(name);
                    if (meta === null) {
                        //fail  safe
                        $log.error('csrfMetaInterceptor cannot be initialized, meta element with name "' + name + '" is not available!');
                        meta = {
                            'content': 'notavailable'
                        };
                    }
                    return meta;
                };
                var _csrf_token = getMetaElement('_csrf').content;
                var _csrf_header = getMetaElement('_csrf_header').content;
                $log.debug('Using HTTP header ' + _csrf_header + ': ' + _csrf_token);
                return {
                    'request': function(config) {
                        if (HTTP_METHODS.indexOf(config.method.toUpperCase()) > -1) {
                            config.headers[_csrf_header] = _csrf_token;
                        }
                        return config;
                    }
                };
            }
        ]).config(['$httpProvider',
            function($httpProvider) {
                $httpProvider.interceptors.push('csrfMetaInterceptor');
            }
        ]);
}());
