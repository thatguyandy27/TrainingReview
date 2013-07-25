/// <reference path="../Models/EmployeeTrainingModel.js" />
/// <reference path="../Models/TrainingModel.js" />
/// <reference path="../datasource.js" />

if (!window.App)
    window.App = {};

window.App.TrainingViewController = function TrainingReviewController($scope, dataSource, trainingId) {
    var self = this;
    self.dataSource = dataSource;
    self.scope = $scope;
    function trainingReviewContoller() {
        
    }

    return new trainingReviewContoller();
    
}($scope, TrainingReviewDataSource(null), 1);