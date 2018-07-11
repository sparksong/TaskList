const app = angular.module('TaskApp', []);

app.controller('TaskController', ['$http', function ($http) {
    let self = this;
    self.taskList = [];

    self.addTask = function (newTask) {
        console.log('Entering addTask in client for (POST): ', newTask);
        newTask.completed = false;
        newTask.createDate = getCurrentDate();

        $http({
            url: '/tasks',
            method: 'POST',
            data: newTask
        }).then(function (response) {
            console.log('Response from POST: ', response);
            self.newTask.task = '';
            self.newTask.category = '';
            self.getTasks();
        }).catch(function (err) {
            console.log('Error in addTask in client for (POST): ', err);
        });
    };

    self.getTasks = function () {
        $http({
            url: '/tasks',
            method: 'GET',
        }).then(function (response) {
            self.taskList = response.data;
        }).catch(function (err) {
            console.log('Error retrieving tasks in getTasks for (GET): ', err);
        });
    }

    self.delete = function (id) {
        console.log('Entering delete in client for (DELETE) task id: ', id);
        $http({
            url: `/tasks/${id}`,
            method: 'DELETE',
        }).then(function (response) {
            self.getTasks();
        }).catch(function (err) {
            console.log('Error deleting task in delete for (DELETE): ', err);
        });
    };

    self.toggleComplete = function (task) {
        console.log(`Entering toggleComplete method. Task: ${task}`);
        task.completed = !task.completed;

        $http({
            url: `/tasks/${task._id}`,
            method: 'PUT',
            data: task
        }).then(function (response) {
            console.log(`PUT response : ${response}`);
            self.getTasks();
        }).catch(function (err) {
            console.log(`Error: ${err}`);
        });
    };

    getCurrentDate = function () {
        console.log('Entering getCurrentDate in client');

        let today = new Date();
        let currentDate = today.toDateString();

        console.log(currentDate);
        return currentDate;
    }

    self.getTasks();
}])