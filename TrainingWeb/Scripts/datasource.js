/// <reference path="Models/TrainingModel.js" />
/// <reference path="Models/EmployeeTrainingModel.js" />

function TrainingReviewDataSource(dataSource) {
    function trainingReviewDataSource() {
        var self = this;
        if (dataSource == null)
            self.dataSource = new testDataSource();

        self.retrieveTraining = function retrieveTraining(trainingId) {
            return self.dataSource.getTrainingById(trainingId);
        };

        self.retrieveEmployeeTrainingRecords = function retrieveEmployeeTrainingRecords(trainingId) {
            return self.dataSource.retrieveEmployeeTrainingRecords(trainingId);
        };

        self.createEmployeeTrainingRecord = function () {
        };
    }

    return new trainingReviewDataSource();
};


function testDataSource() {
    this.getTrainingById = function getTrainingById(trainingId) {
        return new Training("The Trusted Advisor", 1);
    };
    this.retrieveEmployeeTrainingRecords = function retrieveEmployeeTrainings(trainingId) {
        return [new EmployeeTraining("Vickie - 5/5/2013", 1, "This was the greatest book ever!", 1, "Vickie S.", new Date(2013, 5, 5), 5),
            new EmployeeTraining("Shari - 4/4/2013", 2, "I could have written this book", 2, "Shari S.", new Date(2013, 4, 4), 1),
            new EmployeeTraining("Dave - 1/1/2013", 3, "All I can say was Meh", 3, "Dave H.", new Date(2013, 5, 5), 3),
            new EmployeeTraining("Hodor - 5/5/2013", 4, "Hodor! Hodor! Hodor!", 4, "Hodor H.", new Date(2013, 6, 6), 4)];
    };

}