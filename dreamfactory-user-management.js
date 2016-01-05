'use strict';

// Module definition and dependencies
angular.module('dfUserManagement', ['ngRoute', 'ngCookies'])

    // Set constants for path resolution.
    .constant('MODUSRMNGR_ROUTER_PATH', '/user-management')
    .constant('MODUSRMNGR_ASSET_PATH', 'bower_components/dreamfactory-user-management/')

    // Define a router to handle module routes.  None used here
    .config(['$routeProvider', 'MODUSRMNGR_ROUTER_PATH', 'MODUSRMNGR_ASSET_PATH',
        function ($routeProvider, MODUSRMNGR_ROUTER_PATH, MODUSRMNGR_ASSET_PATH) {

            $routeProvider
                .when(MODUSRMNGR_ROUTER_PATH, {
                    templateUrl: MODUSRMNGR_ASSET_PATH + 'views/main.html'
                });
        }])

    .run(['$cookieStore', '$http', 'UserDataService', function ($cookieStore, $http, UserDataService) {

        // Let us know what the module is up to
        //console.log('RUN BLOCK: Check for and set current user');

        var cookie = $cookieStore.get('CurrentUserObj');

        // Check if there is a CurrentUserObj in the cookie
        if (cookie) {

            // There is so store it for a sec
            UserDataService.setCurrentUser($cookieStore.get('CurrentUserObj'));

            $http.defaults.headers.common['X-DreamFactory-Session-Token'] = cookie.session_id;

        }
    }])
    // Part of the DreamFactory Angular module definition.  We don't use this yet.
    // Future versions will also include directives/templates for editing current user profile
    // and password stuff to complete the module.
    .controller('UserManagementCtrl', ['$scope', function ($scope) {
    }])

    // Part of the DreamFactory Angular module definition.  We don't use this yet.
    // Future versions will require this as a nav component to move between sections of the
    // module for editing user profile/password information
    .directive('modusrmngrNavigation', ['MODUSRMNGR_ASSET_PATH',
        function (MODUSRMNGR_ASSET_PATH) {

            return {
                restrict: 'E',
                templateUrl: MODUSRMNGR_ASSET_PATH + 'views/navigation.html',
                link: function (scope, elem, attrs) {

                }
            }
        }])

    // Directive for Login.  This is does our login work and provides the attachment point for
    // the login portion of our module.
    .directive('dreamfactoryUserLogin', ['MODUSRMNGR_ASSET_PATH', 'DSP_URL', '$http', '$cookies', '$cookieStore', 'UserEventsService', 'UserDataService', 'dfObjectService',
        function (MODUSRMNGR_ASSET_PATH, DSP_URL, $http, $cookies, $cookieStore, UserEventsService, UserDataService, dfObjectService) {

            return {

                // only allow as HTML tag
                restrict: 'E',

                // don't show directive tag
                replace: true,

                // isolate scope
                scope: {

                    // define optional options attribute
                    options: '=?'
                },

                // template path
                templateUrl: MODUSRMNGR_ASSET_PATH + 'views/login.html',

                // link it up
                link: function (scope, elem, attrs) {


                    // CREATE SHORT NAMES
                    scope.es = UserEventsService.login;

                    // PUBLIC VARS
                    // This holds our options object.  If we don't provide an options object
                    // it defaults to showing the template.  This is currently the only option

                    var defaults = {showTemplate: true};

                    scope.options = dfObjectService.mergeObjects(scope.options, defaults);

                    // This is included on the top level tag of our directive template and
                    // controls whether the template is rendered or not.
                    scope.showTemplate = scope.options.showTemplate;

                    scope.loginActive = true;

                    // PUBLIC API
                    // The public api section contains any functions that we wish to call
                    // in our HTML templates.  Functions placed here should be the only
                    // functions that are 'accessible' or called through our HTML template.
                    // The only logic that should ever be included is logic pertaining to whether
                    // or not we should run the complex implementation.  Things like using a confirm
                    // function to decide whether a record should be deleted or not go here.

                    // This is the function we call in the UI for login.
                    scope.login = function (credsDataObj) {

                        // This calls our complex implementation of login()
                        scope._login(credsDataObj);
                    };

                    scope.showForgotPassword = function () {
                        scope._toggleForms();
                    };

                    scope.showLoginForm = function () {
                        scope._toggleForms();
                    };


                    // PRIVATE API
                    // The private api section contains functions that do most of our heavy lifting
                    // Although they are on the $scope(scope) of the directive we never call these
                    // from the HTML templates.  They are meant to be called from the 'Complex Implementation'
                    // section below.

                    // POST to the DreamFactory(DF) rest api to login
                    scope._loginRequest = function (credsDataObj) {

                        // Return the posted request data as a promise
                        return $http.post(DSP_URL + '/rest/user/session', credsDataObj);
                    };


                    // Set the session token
                    scope._setSessionToken = function (sessionDataObj) {

                        // Set the session id from a passed in session data object
                        // as a cookie
                        $cookies.PHPSESSID = sessionDataObj.session_id;
                    };

                    // Store the logged in user
                    scope._setCurrentUser = function (sessionDataObj) {

                        // Stores the logged in user in a cookie
                        $cookieStore.put('CurrentUserObj', sessionDataObj)
                    };

                    // Call our cookie setting functions
                    scope._setCookies = function (sessionDataObj) {

                        // Check if the session id has been updated.  If so use that to set the cookie
                        // If it hasn't just use the old session id
                        $cookies.PHPSESSID = $cookies.PHPSESSID === sessionDataObj.session_id ? $cookies.PHPSESSID : sessionDataObj.session_id;

                        // call set current user with the session data obj
                        scope._setCurrentUser(sessionDataObj);
                    };

                    // toggle login/forgot password forms
                    scope._toggleFormsState = function () {

                        scope.loginActive = !scope.loginActive;
                        scope.resetPasswordActive = !scope.resetPasswordActive;
                    };

                    // COMPLEX IMPLEMENTATION
                    // The complex implementation section is where our Private Api is called to action.
                    // This is where the magic happens for our public api.  Generally, these functions relate
                    // directly with our Public Api and are denoted as so with an underscore preceding the
                    // function name.

                    // Run login implementation
                    scope._login = function (credsDataObj) {

                        // call private login request function with a credentials object
                        scope._loginRequest(credsDataObj).then(

                            // success method
                            function (result) {

                                // remove unnecessary apps data
                                // this is temporary and cleans up our
                                // session obj that is returned by the login function
                                // this data will be removed from the session object in
                                // DSP v2 so if you use it for anything currently
                                // beware and use at your own risk
                                delete result.data.no_group_apps;
                                delete result.data.app_groups;

                                // Set the cookies
                                scope._setCookies(result.data);

                                // Set the DreamFactory session header
                                $http.defaults.headers.common['X-DreamFactory-Session-Token'] = $cookies.PHPSESSID;

                                // Set the current user in the UserDataService service
                                UserDataService.setCurrentUser(result.data);

                                // Emit a success message so we can hook in
                                scope.$emit(scope.es.loginSuccess, result.data);
                            },

                            // Error method
                            function (reject) {

                                // Throw a DreamFactory error object
                                throw {
                                    module: 'DreamFactory User Management',
                                    type: 'error',
                                    provider: 'dreamfactory',
                                    exception: reject
                                }
                            }
                        )
                    };

                    scope._toggleForms = function () {

                        scope._toggleFormsState();

                    };

                    // WATCHERS AND INIT
                    // We define any watchers or init code that needs to be run here.

                    // HANDLE MESSAGES
                    // We handle messages passed to our directive here.  Most commonly this will
                    // serve as a way to invoke directive functionality without the need to call
                    // the public api function directly

                    // Invoke the complex implementation for _login().  This requires you
                    // to pass the proper creds object
                    scope.$on(scope.es.loginRequest, function (e, userDataObj) {

                        // Call the complex implementation to handle the login request
                        scope._login(userDataObj);
                    });
                }
            }
        }])

    // Forgot Password Email Confirmation
    .directive('dreamfactoryForgotPwordEmail', ['MODUSRMNGR_ASSET_PATH', 'DSP_URL', '$http', 'UserEventsService', function (MODUSRMNGR_ASSET_PATH, DSP_URL, $http, UserEventsService) {


        return {
            restrict: 'E',
            replace: true,
            scope: false,
            templateUrl: MODUSRMNGR_ASSET_PATH + 'views/fp-email-conf.html',
            link: function (scope, elem, attrs) {


                // CREATE SHORT NAMES
                scope.es = UserEventsService.password;

                // PUBLIC API
                scope.requestPasswordReset = function (emailDataObj) {

                    // Pass email address in object to the _requestPasswordReset function
                    scope._requestPasswordReset(emailDataObj);
                };


                // PRIVATE API
                scope._resetPasswordRequest = function (requestDataObj) {

                    // Post request for password change and return promise
                    return $http.post(DSP_URL + '/rest/user/password', requestDataObj);
                };


                // COMPLEX IMPLEMENTATION
                scope._requestPasswordReset = function (requestDataObj) {

                    // Add property to the request data
                    // this contains an object with the email address
                    requestDataObj['reset'] = true;


                    // Ask the DSP to resset the password via email confirmation
                    scope._resetPasswordRequest(requestDataObj).then(

                        // handle successful password reset
                        function (data) {

                            // Emit a confirm message indicating that is the next step
                            scope.$emit(scope.es.passwordResetRequestSuccess, requestDataObj.email);
                        },

                        // handle error
                        function (reject) {
                            // Throw a DreamFactory error object
                            throw {
                                module: 'DreamFactory User Management',
                                type: 'error',
                                provider: 'dreamfactory',
                                exception: reject
                            }
                        }
                    )
                };

                // WATCHERS AND INIT


                // HANDLE MESSAGES
                scope.$on(scope.es.passwordResetRequest, function (e, resetDataObj) {

                    scope._requestPasswordReset(resetDataObj);
                });
            }
        }
    }])

    // Forgot Password Security Question
    .directive('dreamfactoryForgotPwordQuestion', ['MODUSRMNGR_ASSET_PATH', function (MODUSRMNGR_ASSET_PATH) {

        return {
            restrict: 'E',
            scope: false,
            templateUrl: MODUSRMNGR_ASSET_PATH + 'views/fp-security-question.html',
            link: function (scope, elem, attrs) {


            }
        }
    }])

    .directive('dreamfactoryPasswordReset', ['MODUSRMNGR_ASSET_PATH', 'DSP_URL', '$http', 'UserEventsService', 'dfStringService', 'dfObjectService',
        function (MODUSRMNGR_ASSET_PATH, DSP_URL, $http, UserEventsService, dfStringService, dfObjectService) {

            return {
                restrict: 'E',
                scope: {
                    options: '=?'
                },
                templateUrl: MODUSRMNGR_ASSET_PATH + 'views/password-reset.html',
                link: function (scope, elem, attrs) {


                    // CREATE SHORT NAMES
                    scope.es = UserEventsService.password;


                    // PUBLIC VARS
                    // This holds our options object.  If we don't provide an options object
                    // it defaults to showing the template.
                    var defaults = {showTemplate: true, login: false};
                    scope.options = dfObjectService.mergeObjects(scope.options, defaults);

                    // This is included on the top level tag of our directive template and
                    // controls whether the template is rendered or not.
                    scope.showTemplate = scope.options.showTemplate;

                    // Holds value to for identical password check
                    scope.identical = true;


                    // PUBLIC API
                    scope.resetPassword = function (credsDataObj) {

                        if (scope.identical) {
                            scope._resetPassword(credsDataObj)
                        } else {
                            throw 'Passwords do not match.'
                        }
                    };

                    scope.verifyPassword = function (user) {

                        scope._verifyPassword(user);
                    };


                    // PRIVATE API
                    scope._setPasswordRequest = function (requestDataObj) {

                        return $http({
                            url: DSP_URL + '/rest/user/password',
                            method: 'POST',
                            params: {
                                login: scope.options.login
                            },
                            data: requestDataObj
                        });
                    };

                    // Test if our entered passwords are identical
                    scope._verifyPassword = function (userDataObj) {

                        scope.identical = dfStringService.areIdentical(userDataObj.new_password, userDataObj.verify_password);
                    };


                    // COMPLEX IMPLEMENTATION
                    scope._resetPassword = function (credsDataObj) {

                        var requestDataObj = {
                            email: credsDataObj.email,
                            code: credsDataObj.code,
                            new_password: credsDataObj.new_password
                        };

                        scope._setPasswordRequest(requestDataObj).then(
                            function (result) {

                                console.log(result);
                                scope.$emit(scope.es.passwordSetSuccess)
                            },
                            function (reject) {
                                // Throw a DreamFactory error object
                                throw {
                                    module: 'DreamFactory User Management',
                                    type: 'error',
                                    provider: 'dreamfactory',
                                    exception: reject
                                }
                            }
                        )
                    };


                    // WATCHERS AND INIT


                    //HANDLE MESSAGES

                    scope.$on(scope.es.passwordSetRequest, function (e, credsDataObj) {

                        scope._resetPassword(credsDataObj);
                    });
                }
            }
        }])

    // Logout Directive
    .directive('dreamfactoryUserLogout', ['DSP_URL', '$http', '$cookieStore', 'UserEventsService', 'UserDataService',
        function (DSP_URL, $http, $cookieStore, UserEventsService, UserDataService) {
            return {

                restrict: 'E',
                scope: {},
                link: function (scope, elem, attrs) {

                    // CREATE SHORT NAMES
                    scope.es = UserEventsService.logout;

                    // PUBLIC API ** See login directive for more info **
                    // No methods defined here.


                    // PRIVATE API ** See login directive for more info **

                    // DELETE request for logging out user
                    scope._logoutRequest = function () {

                        // return a promise object from the rest call
                        return $http.delete(DSP_URL + '/rest/user/session');
                    };

                    // COMPLEX IMPLEMENTATION ** See login directive for more info **

                    scope._logout = function () {

                        // Call to server for logout request
                        scope._logoutRequest().then(

                            // success method
                            function () {

                                // remove session cookie
                                $cookieStore.remove('PHPSESSID');

                                // remove current user cookie
                                $cookieStore.remove('CurrentUserObj');

                                // remove user from UserDataService
                                UserDataService.unsetCurrentUser();

                                // Unset DreamFactory header
                                $http.defaults.headers.common['X-DreamFactory-Session-Token'] = '';

                                // Emit success message so we can hook in
                                scope.$emit(scope.es.logoutSuccess, false);
                            },

                            // Error method
                            function (reject) {

                                // Throw DreamFactory error object
                                throw {
                                    module: 'DreamFactory User Management',
                                    type: 'error',
                                    provider: 'dreamfactory',
                                    exception: reject
                                }
                            })
                    };

                    // WATCHERS AND INIT ** See login directive for more info **
                    // No watchers defined

                    // HANDLE MESSAGES ** See login directive for more info **

                    // Handle logout request message from application
                    scope.$on(scope.es.logoutRequest, function (e) {

                        // call complex implementation of logout
                        scope._logout();
                    });

                    // CALL METHOD ON INVOKE
                    // If we include our logout directive in a template this will automatically
                    // run when we hit the route and subsequently log us out.
                    scope._logout();
                }
            }
        }])

    // Register Directive.  Takes care of registering a user for our application
    .directive('dreamfactoryRegisterUser', ['MODUSRMNGR_ASSET_PATH', 'DSP_URL', '$http', '$rootScope', '$cookieStore', 'UserEventsService', 'dfStringService', 'dfObjectService', 'dfXHRHelper',
        function (MODUSRMNGR_ASSET_PATH, DSP_URL, $http, $rootScope, $cookieStore, UserEventsService, dfStringService, dfObjectService, dfXHRHelper) {


            return {
                restrict: 'E',
                templateUrl: MODUSRMNGR_ASSET_PATH + 'views/register.html',
                scope: {
                    options: '=?'
                },
                link: function (scope, elem, attrs) {


                    // CREATE SHORT NAMES
                    scope.es = UserEventsService.register;

                    // PUBLIC VARS
                    // This holds our options object.  If we don't provide an options object
                    // it defaults to showing the template.  It also defines a confirmationRequired attribute
                    // which can be set at the time of instantiation.  If it's not set then it will default
                    // to the DSP settings.
                    var defaults = {showTemplate: true, login: false};
                    scope.options = dfObjectService.mergeObjects(scope.options, defaults);

                    // This is included on the top level tag of our directive template and
                    // controls whether the template is rendered or not.
                    scope.showTemplate = scope.options.showTemplate;

                    // Holds value to for identical password check
                    scope.identical = true;

                    // PUBLIC API ** See login directive for more info **

                    // Public register function used in our HTML template
                    scope.register = function (registerDataObj) {

                        // Call complex implementation
                        scope._register(registerDataObj);
                    };

                    scope.verifyPassword = function (user) {

                        scope._verifyPassword(user);
                    };


                    // PRIVATE API ** See login directive for more info **

                    // Registers a user via REST API
                    scope._registerRequest = function (registerDataObj) {

                        return $http({
                            url: DSP_URL + '/rest/user/register',
                            method: 'POST',
                            params: {
                                login: scope.options.login
                            },
                            data: registerDataObj
                        });
                    };

                    // Returns the system configuration object
                    scope._getSystemConfig = function () {

                        return $http.get(DSP_URL + '/rest/system/config');
                    };


                    // COMPLEX IMPLEMENTATION ** See login directive for more info **
                    scope._register = function (registerDataObj) {

                        if (scope.identical != true) {
                            // Throw an error
                            throw {
                                module: 'DreamFactory User Management',
                                type: 'error',
                                provider: 'dreamfactory',
                                exception: 'Password and confirm password do not match.'
                            }
                        }


                        // Store our implementation of registering a user
                        scope._runRegister = function (registerDataObj) {

                            // Add auto login bool


                            // Pass registerDataObj to scope._registerRequest function and
                            // then handle the response
                            scope._registerRequest(registerDataObj).then(

                                // success
                                function (result) {

                                    // The scope.options.confirmationRequired value should be set to
                                    // the value of the System Config's open_reg_email_service_id value.
                                    // This let's us know if the admin has required email confirmation for the
                                    // system.  Null means no confirmation required.

                                    // Do we need confirmation
                                    if (scope.options.confirmationRequired == null) {

                                        // Build a login object
                                        var userCredsObj = {
                                            email: registerDataObj.email,
                                            password: registerDataObj.new_password
                                        };

                                        // No we don't.  Send the success event and the registered user data
                                        scope.$emit(scope.es.registerSuccess, userCredsObj);

                                    } else {

                                        // We do require confirmation so Send the confirmation event and the user data
                                        scope.$emit(scope.es.registerConfirmation, result.data);
                                    }
                                },

                                // error
                                function (reject) {

                                    // Throw an error
                                    throw {
                                        module: 'DreamFactory User Management',
                                        type: 'error',
                                        provider: 'dreamfactory',
                                        exception: reject
                                    }
                                });
                        };


                        // If we have a SystemConfig and we have passed in the proper value(see scope.options explanation above)
                        // then we don't waste a call to the system.
                        // If we have not then we need to know this about the system.
                        if (scope.options.confirmationRequired == null) {

                            // We did not pass in a usable options object
                            // Ask the server for the config
                            scope._getSystemConfig().then(

                                // success
                                function (result) {

                                    // store the config object
                                    var systemConfigDataObj = result.data;


                                    // Set the options object to the proper values
                                    // The success method of scope._registerRequest function looks
                                    // for this property to determine which message to emit back up to
                                    // the application.  If this value is null the scope._registerRequest will emit a
                                    // 'user:register:success' method indicating that we are done registering
                                    // the user.  If it contains a value (denoting that an email service has been selected)
                                    // We emit a 'user:register:confirmation' message.  How you handle these messages is left
                                    // up to you.  We just notify you of the current state and the actions that have been taken as
                                    // a result of your config.
                                    scope.options.confirmationRequired = systemConfigDataObj.open_reg_email_service_id;


                                    // Now that we have all the info we need, lets run the
                                    // register routine
                                    scope._runRegister(registerDataObj);

                                },

                                // There was an error retrieving the config
                                function (reject) {

                                    // Throw an error
                                    throw {
                                        module: 'DreamFactory User Management',
                                        type: 'error',
                                        provider: 'dreamfactory',
                                        exception: reject
                                    }
                                }
                            )
                        }
                        else {

                            // We were passed an options object
                            // Run the register routine
                            scope._runRegister(registerDataObj);
                        }
                    };

                    // Test if our entered passwords are identical
                    scope._verifyPassword = function (userDataObj) {

                        scope.identical = dfStringService.areIdentical(userDataObj.new_password, userDataObj.verify_password);
                    };


                    // WATCHERS AND INIT ** See login directive for more info **

                    // Watch our options object
                    scope.$watchCollection('options', function (newValue, oldValue) {

                        // If we don't have a confirmationRequiredProperty set
                        if (!newValue.hasOwnProperty('confirmationRequired')) {

                            // We go askthe server to get it.  Everything stops until this guy returns.
                            // SYNCHRONOUS
                            //scope.options.confirmationRequired = xhrHelper.getSystemConfigFromServer().allow_open_registration;

                            scope.options.confirmationRequired = dfXHRHelper.get({
                                url: 'system/config'
                            });

                        }

                    });

                    // HANDLE MESSAGES ** See login directive for more info **
                    // We received a message to register a user.
                    scope.$on(scope.es.registerRequest, function (e, registerDataObj) {

                        // register the user
                        scope._register(registerDataObj);
                    });

                }
            }

        }])

    // This service gives us a way to pass namespaced events around our application
    // We inject this service in order to request and respond to different module events.
    .service('UserEventsService', [function () {

        return {
            login: {
                loginRequest: 'user:login:request',
                loginSuccess: 'user:login:success',
                loginError: 'user:login:error'
            },
            logout: {
                logoutRequest: 'user:logout:request',
                logoutSuccess: 'user:logout:success',
                logoutError: 'user:logout:error'

            },
            register: {
                registerRequest: 'user:register:request',
                registerSuccess: 'user:register:success',
                registerError: 'user:register:error',
                registerConfirmation: 'user:register:confirmation'
            },
            password: {
                passwordResetRequest: 'user:passwordreset:request',
                passwordResetRequestSuccess: 'user:passwordreset:requestsuccess',
                passwordSetRequest: 'user:passwordset:request',
                passwordSetSuccess: 'user:passwordset:success'
            }
        }
    }])

    // This service gives us access to the current user.  While it's pretty sparse
    // at the moment it does give us access to critical user/session data.  Inject this
    // service where ever you need to access the current user.
    .service('UserDataService', [function () {

        // Stored user.
        var currentUser = false;


        // Private methods
        // return current user
        function _getCurrentUser() {

            return currentUser;
        }

        // set the current user
        function _setCurrentUser(userDataObj) {

            currentUser = userDataObj;
        }

        // remove/unset current user
        function _unsetCurrentUser() {

            currentUser = false;
        }

        // check if we have a user
        function _hasUser() {

            return !!currentUser;
        }


        return {

            // Public methods
            // These can be called via UserDataService.METHOD_NAME

            getCurrentUser: function () {

                return _getCurrentUser();
            },


            setCurrentUser: function (userDataObj) {

                _setCurrentUser(userDataObj);
            },

            unsetCurrentUser: function () {

                _unsetCurrentUser();
            },

            hasUser: function () {

                return _hasUser();
            }
        }
    }])
    .service('dfStringService', [function () {

        return {
            areIdentical: function (stringA, stringB) {

                stringA = stringA || '';
                stringB = stringB || '';


                function _sameLength(stringA, stringB) {
                    return  stringA.length == stringB.length;
                }

                function _sameLetters(stringA, stringB) {

                    var l = Math.min(stringA.length, stringB.length);

                    for (var i = 0; i < l; i++) {
                        if (stringA.charAt(i) !== stringB.charAt(i)) {
                            return false;
                        }
                    }
                    return true;
                }

                if (_sameLength(stringA, stringB) && _sameLetters(stringA, stringB)) {
                    return true;
                }

                return false;
            }
        }

    }])
    .service('dfObjectService', [function () {

        return {

            self: this,

            mergeObjects: function (obj1, obj2) {

                for (var key in obj1) {
                    obj2[key] = obj1[key]
                }

                return obj2;
            },

            deepMergeObjects: function (obj1, obj2) {

                var self = this;

                for (var _key in obj1) {
                    if (obj2.hasOwnProperty(_key)) {
                        if(typeof obj2[_key] === 'object') {

                            obj2[_key] = self.deepMergeObjects(obj1[_key], obj2[_key]);

                        }else {
                            obj2[_key] = obj1[_key];
                        }
                    }
                }

                return obj2;

            }
        }

    }])
    .service('dfXHRHelper', ['DSP_URL', 'DSP_API_KEY', '$cookies', function (DSP_URL, DSP_API_KEY, $cookies) {

        function _isEmpty(obj) {

            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        }

        // Set DreamFactory Headers as well as additional passed in headers
        function _setHeaders(_xhrObj, _headersDataObj) {

            // Setting Dreamfactory Headers
            _xhrObj.setRequestHeader("X-DreamFactory-Application-Name", DSP_API_KEY);
            _xhrObj.setRequestHeader("X-DreamFactory-Session-Token", $cookies.PHPSESSID);

            // Set additional headers
            for (var _key in _headersDataObj) {

                xhr_obj.setRequestHeader(_key, _headersDataObj[_key]);
            }
        }

        // Create url params
        function _setParams(_paramsDataObj) {

            // Set a return var
            var params = '';

            // Check if we have any params
            if (!_isEmpty(_paramsDataObj)) {

                // We do.
                // begin query string
                params = '?';

                // Loop through object
                for (var _key in _paramsDataObj) {

                    // Create URL params out of object properties/values
                    params += _key + '=' + _paramsDataObj[_key] + '&';
                }
            }

            // Check if params is empty string
            // Did we have any params
            if (params !== '') {

                // We did so trim of the trailing '&' from building the string
                params = params.substring(0, params.length -1);

                // Encode the params
                encodeURI(params);
            }

            // Return our final params value
            return params;
        }


        function _makeRequest(_method, _url, _async, _params, _headers, _mimeType) {


            var xhr;

            // Create XHR object
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xhr = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            // set and encode params
            var params = _setParams(_params);


            // Do XHR
            xhr.open(_method, DSP_URL + '/rest/' + _url + params, _async);

            // Set headers
            _setHeaders(xhr, _headers);

            // Set mime type override
            xhr.overrideMimeType(_mimeType);

            // Send our request
            xhr.send();

            // Check response
            if (xhr.readyState == 4 && xhr.status == 200) {

                // Good response.
                return angular.fromJson(xhr.responseText);
            } else {

                // Dad response
                return xhr.status;
            }
        }


        function _get(optionsDataObj) {

            // We need a valid URL
            // Do we have one?
            if (!optionsDataObj.url || optionsDataObj.url === '') {

                // No.  Throw an error
                throw {
                    module: 'DreamFactory System Config Module',
                    type: 'error',
                    provider: 'dreamfactory',
                    exception: 'XHRHelper Request Failure: No URL provided'
                }
            }

            // Default xhr options
            var defaults = {
                method: "GET",
                url: '',
                async: false,
                params: {},
                headers:{},
                mimeType: "application/json"
            };


            // Merge user xhr options object with default xhr options object
            for (var _key in defaults) {

                if (optionsDataObj.hasOwnProperty(_key)) {
                    defaults[_key] = optionsDataObj[_key];
                }
            }

            // Make the request with the merged object
            return _makeRequest(defaults.method, defaults.url, defaults.async, defaults.params, defaults.headers, defaults.mimeType);

        }


        return {

            get: function(requestOptions) {

                return _get(requestOptions);
            }
        }

}]);
