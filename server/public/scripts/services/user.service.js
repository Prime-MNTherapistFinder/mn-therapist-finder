myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = { list: [] };
  self.therapist = {list: []}

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.email) {
            self.userObject.list = response.data;
            // user has a curret session on the server
            // self.userObject.email = response.data.email;
            console.log('UserService -- getuser -- User Data: ', self.userObject.list);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  self.getTherapist = function() {
    console.log('hit');
    $http.get('/user/therapist').then(function(response){
      self.therapist.list = response.data;
      console.log(self.therapist.list);
    })
  }
   
});
