myApp.controller('LoginController', function($http, $location, UserService) {
    console.log('LoginController created');
    var vm = this;
    vm.truthValue = false;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('LoginController -- login -- sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.email) {
            console.log('LoginController -- login -- success: ', response.data);
            vm.user.username = '';
            vm.user.password = '';
            // location works with SPA (ng-route)
            $location.path('/user'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ', response);
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Wrong!!";
        });
      }
    };

    vm.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/home');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }

    vm.verifyEmail = function (aParam) {
      vm.truthValue = true

      $http({
          url: '/email/send',
          method: 'GET',
          params: {to: aParam}
      }).then(function(response){
          console.log(response.data);
          if (response.data == 'sent'){
              vm.greeting = 'Email has been sent to ' + vm.user.username + '. Please check Inbox!'
              console.log(vm.greeting);
          }
      })
  }
});
