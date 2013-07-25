/// <reference path="Models/TrainingModel.js" />
/// <reference path="Models/EmployeeTrainingModel.js" />
/// <reference path="Libraries/jquery-2.0.3.min.js" />
/// <reference path="Libraries/angular.min.js" />
angular.module('trainingReview.service', []).
  value('training', {
      retrieve: function (id, callback) {
          window.setTimeout(function () {
              callback(new Training("The Trusted Advisor", 1));
          }, 1000);
      }
  }).
  value('employeetraining', {
      retrieve: function (trainingId, callback) {
          window.setTimeout(function(){
              callback([new EmployeeTraining("Vickie - 5/5/2013", 1, "This was the greatest book ever!", 1, "Vickie S.", new Date(2013, 5, 5), 5),
                  new EmployeeTraining("Shari - 4/4/2013", 2, "I could have written this book", 2, "Shari S.", new Date(2013, 4, 4), 1),
                  new EmployeeTraining("Dave - 1/1/2013", 3, "All I can say was Meh", 3, "Dave H.", new Date(2013, 5, 5), 3),
                  new EmployeeTraining("Hodor - 5/5/2013", 4, "Hodor! Hodor! Hodor!", 4, "Hodor H.", new Date(2013, 6, 6), 4)]);
          },
          1000);
      }
  }).
  value('user', {
      retrieve: function(){
          return {Name: "Andy M.",
              Id: 5};
      }
  });

angular.module('trainingReview.directive', []).directive('starRating', function () {

    return {
        restrict: "E",
        replace: true,
        scope: {
            rating: '=rating',
            isEditable: '=isEditable'
        },
        template: ['<div class="star-rating">',
            '<img ng-src="{{rating > 0 ? \'images/stargold32.png\'  : \'images/starwhite32.png\'}}" />',
            '<img ng-src="{{rating > 1 ? \'images/stargold32.png\'  : \'images/starwhite32.png\'}}" />',
            '<img ng-src="{{rating > 2 ? \'images/stargold32.png\'  : \'images/starwhite32.png\'}}" />',
            '<img ng-src="{{rating > 3 ? \'images/stargold32.png\'  : \'images/starwhite32.png\'}}" />',
            '<img ng-src="{{rating > 4 ? \'images/stargold32.png\'  : \'images/starwhite32.png\'}}" />'].join(''),
        link: function (scope, element, attrs, transclusion) {
            // Title element
            //var title = angular.element(element.children()[0]),
                // Opened / closed state
            //   opened = true;
            var isEditable = !!attrs.iseditable;
            if (isEditable) {
                var rating = scope.rating;
                $('img', element).mouseover(function () {
                    var img = $(this);
                    scope.rating = img.prevAll().length + 1;
                    scope.$root.$digest();
                    img.nextAll().attr('src', 'images/starwhite32.png');
                    img.prevAll().attr('src', 'images/stargold32.png');
                    img.attr('src', 'images/stargold32.png');
                });
            }
        }
    };
});

angular.module('trainingReview.filter', []);

angular.module('trainingReview', ['trainingReview.service', 'trainingReview.directive', 'trainingReview.filter']).
  run(function (training, employeetraining) {
      // This is effectively part of the main method initialization code
      
  });


// A Controller for your app
var trainingController = function ($scope, training, employeetraining, user) {
    var scope = $scope;
    scope.isLoaded = false;
    training.retrieve(1, function retrieveCallback(result) {
        $scope.training = result;
        employeetraining.retrieve(result.Id, function retrieveTrainingsCallback(results) {
            $scope.training.EmployeeTrainings = results;
            scope.isLoaded = true;
            scope.$digest();

        });
    });

    $scope.user = user.retrieve();
    $scope.addReview = function () {
        var length = $scope.training.EmployeeTrainings.length;
        for (var i = 0; i < length; i++) {
            if ($scope.training.EmployeeTrainings[i].UserId == $scope.user.Id) {
                alert('You already have a review yo!');
                return false;
            }
        }
        var newTraining = new EmployeeTraining("New training", null, "", $scope.user.Id,
                $scope.user.Name, new Date(), 0);
        newTraining.IsEditable = true;
        $scope.training.EmployeeTrainings.push(newTraining);
    }

    $scope.saveRecord = function (employeeTraining) {
        employeeTraining.IsEditable = false;
    };

    $scope.editRecord = function (employeeTraining) {
        if (employeeTraining.UserId == $scope.user.Id) {
            employeeTraining.IsEditable = true;
        }
    };

    $scope.formatDate = function (date) {
        if (!date)
            return '';
        else 
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    };
}