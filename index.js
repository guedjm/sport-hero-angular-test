var rankingService = function ($http) {

  var service = {};
  var baseUrl = 'http://localhost/';

  service.getRanking = function (rankingId) {
    // Fetching ranking
    var ranking = $http.get(baseUrl + '/ranking/' + rankingId);

    // Building user id array
    var userIdArray = ranking.map(function (rank) {
      return rank.user;
    });

    // Fetching users information
    var users = $http.get(baseUrl + '/users?ids=' + userIdArray.join());

    return ranking.map(function (rank) {

      // Getting the related user
      var fUser = users.find(function (user) {
        return user.id === rank.user;
      });

      // Returning the array element
      return {
        position: rank.position,
        score: rank.score,
        firstName: fUser.firstName,
        lastName: fUser.lastName
      }
    });

  };

  return service;
};