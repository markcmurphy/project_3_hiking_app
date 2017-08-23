const app = angular.module('hikeApp', [])

app.controller('appController', ['$http', function($http){
  const controller = this;
  this.toggle = true;
  this.message = 'Weather is....',
  this.cityTemps = {},
  this.wind = {},
  this.min = {},
  this.wear = {},
  this.water = {},
  this.hikes  = [],
  this.edit = 1,
  this.toggleView =  () => {
   this.toggle = !this.toggle;
 };
  this.getHikes = function(){
    $http({
      method: 'GET',
      url: '/hikes'
    }).then(
      function(res){
        controller.hikes = res.data
        console.log(controller.hikes);
      },
      function(err){
        console.log(err);
      }
    );
  },
  this.createHikes = function(){
    $http({
      method: 'POST',
      url: '/hikes',
      data: {
        Id: this._id,
        hikeName: this.hikeName,
        location: this.location,
        description: this.description,
      }
    }).then(
      function(res){
        controller.getHikes();
      },
      function(err){
        console.log(err);
      }
    );
  },
  this.editHike = function(hike){
    $http({
      method: 'PUT',
      url: '/hikes/' + hike._id,
      data: {
        hikeName: this.editedhikeName,
        location: this.editedlocation,
        description: this.editeddescription
      }
    }).then(
      function(res){
        controller.getHikes();
      },
      function(err){
        console.log(err);
      }
    );
  },
  this.deleteHike = function(hike){
    $http({
      method: 'DELETE',
      url: '/hikes/' + hike._id
    }).then(
      function(res){
        controller.getHikes();
      },
      function(err){
        console.log(err);
      }
    );
  },

  // this.getWeather = function() {
  //   console.log('called')
  //     $http({
  //         method: 'GET',
  //         url: '/weather'
  //     }).then(
  //         function(response){
  //             console.log(response, ' this is response')
  //             controller.message = response.data.main.temp + "°F in " + response.data.name
  //             // $scope.photos = response
  //         },
  //         function(err){
  //             console.log(err);
  //         }
  //     );
  // }
  // end of this.getWeather

  // this.postWeather = function() {
  //   console.log('called')
  //   const data = {
  //     city: controller.query
  //   }
  //   console.log(controller.query, 'post')
  //   $http({
  //     method: 'POST',
  //     url: '/weather',
  //     data: data
  //
  //   }).then(
  //     function(response) {
  //       console.log(response.data)
  //       controller.message = response.data.main.temp + "°F in " + response.data.name;
  //     },
  //     function(err) {
  //       console.log(err);
  //     }
  //   );
  // }
// end of this.postWeather

this.getWeatherByCity = function(hike) {
console.log(controller.min);
  $http({
      method: 'GET',
      url: '/hikes' + '/byCity/' + hike,
  }).then(
      function(response) {
        controller.cityTemps[response.data.name] = response.data.main.temp + "°F in " + response.data.name;
        controller.message[response.data.name] = response.data.main.temp + "°F in " + response.data.name;
        controller.wind[response.data.name] = response.data.wind.speed + " mph wind";
        controller.min[response.data.name] = response.data.main.temp_min + ' F minimum temp';

        if (response.data.main.temp > 65 && response.data.main.temp < 80) {
          controller.wear[response.data.name] = 'No jacket or special clothing required'
          controller.water[response.data.name] = 32 + ' liters of water per two hours recommended'
        } else if (response.data.main.temp > 80) {
          controller.wear[response.data.name] = 'Heat advisory. Wear sunscreen, bring sunglasses and protect body from sun'
          controller.water[response.data.name] = 36 + ' liters of water per two hours recommended'
        } else if (response.data.main.temp < 65 && response.data.main.temp > 40 || controller.min[response.data.name] < 65 && controller.min[response.data.name] > 40) {
          controller.wear[response.data.name] = 'Its going to be cold. Bring layers and a jacket '
          controller.water[response.data.name] = 32 + ' liters of water per two hours recommended'
        } else if (response.data.main.temp < 40 || controller.min[response.data.name] < 40) {
          controller.wear[response.data.name] = 'Winter advisory: Temperatures require special winter clothing such as jacket, gloves, and winter boots. '
          controller.water[response.data.name] = 32 + ' oz of water per two hours recommended'
        console.log(controller.wear);
      }
    },
      function(err){
          console.log(err);
      }
  );
}
// // end of this.getWeather
// this.getOne = function ( hike ){
//          currentHike = hike;
//   this.showOne = {
//     Id: this._id,
//     hikeName: this.hikeName,
//     location: this.location,
//     description: this.description,
//     water[response.data.name]ToConsume: this.water[response.data.name]ToConsume,
//     clothingToWear: this.clothingToWear
//      };
//      console.log(this.showOne.id);
//        }

this.getHikes();
}]);
// end of weather controller
