# csrf-meta-interceptor
An AngularJS $http interceptor, sending a CSRF token from html meta elements, e.g. supported in Spring Framework.
Inspired by https://github.com/aditzel/spring-security-csrf-token-interceptor.

# Usage

Install it
```
npm install csrf-meta-interceptor --save
```
You can find the source in _node_modules/csrf-meta-interceptor/src/csrfMetaInterceptor.js'_ and the uglified version in _node_modules/csrf-meta-interceptor/dist/csrfMetaInterceptor.js'_. Load the source into your html, e.g.
```
<script src="node_modules/csrf-meta-interceptor/dist/csrfMetaInterceptor.js"></script>
```

Add interceptor as dependency
```
var app = angular.module('csrfDemoApp', ['csrfMetaInterceptor']);
```

That's it, here is how to see it action
```
app.controller('CsrfCtrl', function ($scope, $http) {
	$scope.result = "";

	$scope.testPost = function () {
		$http.post('/api/test').then(function (result) {
			$scope.result = result;
		}, function (result) {
			$scope.result = "Failed: " + result.status;
		});
	};
});
```

# TODO

Possible enhancements include
- tests
- configuration of meta element names, instead of fixed values '\_csrf' and '\_csrf_header'
- configuration of supported methods (currently fixed POST, PUT, DELETE)
- optionally support for response headers, see https://github.com/aditzel/spring-security-csrf-token-interceptor especially when generating new tokens after validation
