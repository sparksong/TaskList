const app = angular.module('TaskApp', []);

app.controller('TaskController', ['$http', function ($http) {
    let self = this;
    self.taskList = [];

    self.addTask = function (newTask) {
        console.log('Got to client POST', newTask);
        newTask.completed = false;
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
            console.log('Error from client POST:', err);
        });
    };

    self.getTasks = function () {
        $http({
            url: '/tasks',
            method: 'GET',
        }).then(function (response) {
            self.taskList = response.data;
        }).catch(function (err) {
            console.log('Error on GET', err);
        });
    }

    self.delete = function (id) {
        $http({
            url: `/tasks/${id}`,
            method: 'DELETE',
        }).then(function (response) {
            self.getTasks();
        }).catch(function (err) {
            console.log('Error on DELETE', err);
        });
    };

    self.getTasks();
}])