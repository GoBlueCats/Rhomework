    var myApp = angular.module('myApp',[]);

    myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
        console.log("hello world from controller");

        //version too old method fail
        /*
        $http.get('/contactlist').success(function(response){
            console.log("I got the data requested");
            $scope.contactlist = response;
        });
        */

        //using new version
        $http({
            method: 'GET',
            url: '/contactlist'
        }).then(function(response){
            
            console.log("I got the data requested");
            var data = response.data;
            $scope.results = data;
            console.log("data",data);
            var x = [];
            var y = [];
            
            //here I define a function to gain relavant value I wanted

            function getYs(input, fielda, fieldb, diff) {
                var output = [];
                if ( diff == 1){
                    
                    for (var i=0; i < input.length ; ++i){
                        if (input[i]["age"] < fieldb){
                            output.push(input[i][fielda]);
                        }
                    }
                }else{

                    for (var i=0; i < input.length ; ++i){
                        if (input[i]["age"] >= fieldb){
                            output.push(input[i][fielda]);
                        }
                    }
                }
                return output;
            }

            
            function getXs(num,y){  
                var input = [];
                for (var i =0; i < y.length; ++i){
                    input.push(num);
                }
                return input;
            }

            //here to get the the value of sub1 when age < 40; >=40
            var y1 = getYs(data, "sub1", 40, 1); 
            var y2 = getYs(data, "sub1", 40, 2); 
            console.log("y1:",y1);
            console.log("y2:",y2);

            var x1 = getXs(1,y1);
            var x2 = getXs(1,y2);
            console.log("x1:",x1);
            console.log("x2:",x2);

            //here to get the the value of oxr1 when age < 40; >=40
            var y3 = getYs(data, "oxr1", 40, "small"); 
            var y4 = getYs(data, "oxr1", 40, "large"); 

            var x3 = getXs(2,y3);
            var x4 = getXs(2,y4);

            //here to get the the value of oxr1 when age < 40; >=40
            var y5 = getYs(data, "sod1", 40, "small"); 
            var y6 = getYs(data, "sod1", 40, "large"); 


            var x5 = getXs(3,y5);
            var x6 = getXs(3,y6);

            //$scope.results = response.data;

            var trace1 = {
                x: x1,
                y: y1,
                mode: 'markers'
            };

            var trace2 = {
                x: x2,
                y: y2,
                mode: 'markers'
            };

            var trace3 = {
                x: x3,
                y: y3,
                mode: 'markers'
            };

            var trace4 = {
                x: x4,
                y: y4,
                mode: 'markers'
            };

            var trace5 = {
                x: x5,
                y: y5,
                mode: 'markers'
            };

            var trace6 = {
                x: x6,
                y: y6,
                mode: 'markers'
            };
            
            var data = [ trace1, trace2, trace3, trace4, trace5, trace6 ];

            var layout = {
              title:'Gene Graph',
              height: 1500,
              width: 900,
              xaxis: {
                title: 'Gene',
                showgrid: false,
                zeroline: false
              },
              yaxis: {
                title: 'Value',
                showline: false
              }
            };

            Plotly.newPlot('myDiv', data, layout);

        },function(response){
            console.log("I dont find the url");
        });



    }]);

    //using scope to glue view(html) and controller
