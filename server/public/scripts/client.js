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
            // self.getTasks();
        }).catch(function (err) {
            console.log('Error from client POST:', err);
        });
    };
}])