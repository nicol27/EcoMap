app.controller('MapCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi','$rootScope','uiGmapIsReady',"$state",
  function($scope, $http, uiGmapGoogleMapApi,$rootScope, uiGmapIsReady,$state) {

 if(!$rootScope.mapParams){
   $rootScope.mapParams = {
    center: {
      latitude: 49.357826, 
      longitude: 31.518239
    },
    zoom: 6
  };
 }

  $rootScope.getMapParams = function() {
    return $rootScope.mapParams;
  };

  $rootScope.zoomMarker = function(data) {
    $state.go("detailedProblem",{
      'id':data.model.problem_id
    });
    console.log(data);
    $rootScope.mapParams = {
      center: {
        latitude: data.model.latitude,
        longitude: data.model.longitude
      },
      zoom: 17
    }
  };

  $scope.markers = [];
  $scope.loadProblems = function() {
    $http({
      method: 'GET',
      url: '/api/problems'
    }).then(function successCallback(response) {
      $scope.markers = response.data;
      angular.forEach($scope.markers, function(value, key){
        latLng = new google.maps.LatLng({'lat': value['latitude'], 'lng': value['longitude']})
        if ($scope.check(latLng)) {
            $scope.markers[key].iconUrl = "/image/markers/" + value.problem_type_Id + ".png";
        };
      });
    }, function errorCallback(error) {});
  };

  $scope.loadProblems();

  $scope.polygons = [
    {
      id: 1,
      path: [{longitude: 34.7005452322, latitude: 46.1761271363},
             {longitude: 34.5663821427, latitude: 45.9859642162},
             {longitude: 34.405191271, latitude: 46.0127361827},
             {longitude: 34.5369003069, latitude: 46.1844642802},
             {longitude: 33.671027243, latitude: 46.215473131},
             {longitude: 34.1394361569, latitude: 45.9401271081},
             {longitude: 34.6365182206, latitude: 45.9374182446},
             {longitude: 34.4633911835, latitude: 45.7692911804},
             {longitude: 34.986645237, latitude: 45.631927042},
             {longitude: 35.1330452347, latitude: 45.3250000194},
             {longitude: 35.3430362173, latitude: 45.3324999788},
             {longitude: 34.7340911176, latitude: 46.1073822867},
             {longitude: 35.4579001424, latitude: 45.2984640873},
             {longitude: 36.1362363365, latitude: 45.4583182131},
             {longitude: 36.6368002428, latitude: 45.377909107},
             {longitude: 36.4311002917, latitude: 45.2711001909},
             {longitude: 36.4534632094, latitude: 45.0772820905},
             {longitude: 35.8569360669, latitude: 44.9863821943},
             {longitude: 35.5265822954, latitude: 45.1184541666},
             {longitude: 35.0829821385, latitude: 44.7912362328},
             {longitude: 34.5185910452, latitude: 44.7444271591},
             {longitude: 33.9302733063, latitude: 44.3791540436},
             {longitude: 33.3690542605, latitude: 44.5843641563},
             {longitude: 33.5544363106, latitude: 44.6236000128},
             {longitude: 33.5462451795, latitude: 45.1084641115},
             {longitude: 32.481100246, latitude: 45.3940181191},
             {longitude: 33.7694002764, latitude: 45.9253000242},
             {longitude: 33.6140180637, latitude: 46.1426271838},
             {longitude: 32.5004093011, latitude: 46.0762451927},
             {longitude: 31.7901362118, latitude: 46.2841640012},
             {longitude: 32.0070001874, latitude: 46.4480362437},
             {longitude: 31.5145092274, latitude: 46.5790911559},
             {longitude: 32.3480452441, latitude: 46.4591541678},
             {longitude: 32.6416182185, latitude: 46.6422821565},
             {longitude: 32.0136002657, latitude: 46.6342910176},
             {longitude: 31.9808271918, latitude: 47.0075001191},
             {longitude: 31.7515181016, latitude: 47.2523541193},
             {longitude: 31.9650271366, latitude: 46.9253732257},
             {longitude: 31.908191295, latitude: 46.6535911879},
             {longitude: 31.4777361417, latitude: 46.6319642013},
             {longitude: 31.595691145, latitude: 46.7970731098},
             {longitude: 31.1890543431, latitude: 46.6245452111},
             {longitude: 30.8327731657, latitude: 46.5483272243},
             {longitude: 30.5091631383, latitude: 46.0963729921},
             {longitude: 29.8227731086, latitude: 45.6483272414},
             {longitude: 29.6361002454, latitude: 45.8206821376},
             {longitude: 29.5930452585, latitude: 45.557073126},
             {longitude: 29.7604092342, latitude: 45.3222090133},
             {longitude: 29.6643271426, latitude: 45.2118002374},
             {longitude: 29.4113820912, latitude: 45.4358179998},
             {longitude: 28.7008090973, latitude: 45.2200911131},
             {longitude: 28.2148360729, latitude: 45.4486449939},
             {longitude: 28.5158271993, latitude: 45.5149180203},
             {longitude: 28.5244360844, latitude: 45.7111001527},
             {longitude: 28.9682541707, latitude: 46.0061000623},
             {longitude: 28.9944362189, latitude: 46.4783271008},
             {longitude: 30.1287092226, latitude: 46.4050912274},
             {longitude: 29.8994361746, latitude: 46.5351999904},
             {longitude: 29.9443001438, latitude: 46.8182541792},
             {longitude: 29.5742361001, latitude: 46.947418134},
             {longitude: 29.5670092231, latitude: 47.3377001664},
             {longitude: 29.1901003496, latitude: 47.439536267},
             {longitude: 29.1448541656, latitude: 47.9835182642},
             {longitude: 27.7631913006, latitude: 48.4495820893},
             {longitude: 26.6349911534, latitude: 48.257164102},
             {longitude: 26.1586092054, latitude: 47.9852541564},
             {longitude: 25.3338820661, latitude: 47.9166640367},
             {longitude: 24.9289181244, latitude: 47.7131450567},
             {longitude: 24.5563911423, latitude: 47.9530451846},
             {longitude: 23.1741631693, latitude: 48.1083271498},
             {longitude: 22.894800203, latitude: 47.9545361575},
             {longitude: 22.1514450829, latitude: 48.4119181749},
             {longitude: 22.5580542245, latitude: 49.0794361818},
             {longitude: 22.8860733007, latitude: 49.0029181228},
             {longitude: 22.7038091509, latitude: 49.1698911666},
             {longitude: 22.6784632815, latitude: 49.5694360402},
             {longitude: 24.1113821551, latitude: 50.5669361651},
             {longitude: 23.954382235, latitude: 50.7917000845},
             {longitude: 24.1434731097, latitude: 50.8595732162},
             {longitude: 23.60463626, latitude: 51.5276910321},
             {longitude: 24.0430540537, latitude: 51.6102732305},
             {longitude: 24.3942271316, latitude: 51.8847181989},
             {longitude: 25.2409633047, latitude: 51.9598542497},
             {longitude: 27.1700003232, latitude: 51.764164135},
             {longitude: 27.7479092471, latitude: 51.4665180586},
             {longitude: 27.832082163, latitude: 51.6091641371},
             {longitude: 28.2567363688, latitude: 51.6592911033},
             {longitude: 28.7571542623, latitude: 51.4156452706},
             {longitude: 29.1180542036, latitude: 51.6369362322},
             {longitude: 29.3422181464, latitude: 51.3731822137},
             {longitude: 30.1799912151, latitude: 51.4915182583},
             {longitude: 30.5514181563, latitude: 51.2518451124},
             {longitude: 30.5650001922, latitude: 51.6433272657},
             {longitude: 30.9596632778, latitude: 52.079345153},
             {longitude: 31.7838823062, latitude: 52.1080451248},
             {longitude: 32.2249911938, latitude: 52.0794361804},
             {longitude: 32.3891633408, latitude: 52.3340182176},
             {longitude: 33.8316632327, latitude: 52.3631822115},
             {longitude: 34.4222182692, latitude: 51.8041642535},
             {longitude: 34.10186327, latitude: 51.6477002723},
             {longitude: 34.3822090983, latitude: 51.2636091136},
             {longitude: 35.0764450922, latitude: 51.2206451541},
             {longitude: 35.3688271658, latitude: 51.0421272122},
             {longitude: 35.4410541933, latitude: 50.5119730083},
             {longitude: 35.5979002217, latitude: 50.3736001917},
             {longitude: 36.1484631864, latitude: 50.4222821179},
             {longitude: 36.6084630397, latitude: 50.2130451712},
             {longitude: 37.4619362514, latitude: 50.4361731108},
             {longitude: 38.024227175, latitude: 49.9030820557},
             {longitude: 38.3048541323, latitude: 50.0738821088},
             {longitude: 38.9418631851, latitude: 49.8110271332},
             {longitude: 39.1837360776, latitude: 49.8804091751},
             {longitude: 39.8124270973, latitude: 49.5505450744},
             {longitude: 40.139763216, latitude: 49.6010540878},
             {longitude: 40.1676362293, latitude: 49.2516640084},
             {longitude: 39.6979091772, latitude: 49.0168000633},
             {longitude: 40.0748540929, latitude: 48.8762360495},
             {longitude: 39.6601911157, latitude: 48.6039180729},
             {longitude: 39.9988823663, latitude: 48.2972181999},
             {longitude: 39.8032542777, latitude: 47.8686000244},
             {longitude: 38.845963316, latitude: 47.8568001487},
             {longitude: 38.7581912108, latitude: 47.6895640808},
             {longitude: 38.3008271307, latitude: 47.5551270707},
             {longitude: 38.2358273154, latitude: 47.1094270794},
             {longitude: 37.5595731861, latitude: 47.086445242},
             {longitude: 36.7638823005, latitude: 46.7511000471},
             {longitude: 35.9072001611, latitude: 46.6510912015},
             {longitude: 34.9967273255, latitude: 46.0742271657},
             {longitude: 35.3343000949, latitude: 46.3216542426},
             {longitude: 35.1980452176, latitude: 46.4433180704},
             {longitude: 34.7005452322, latitude: 46.1761271363}],
      stroke: {
        color: '#6060FB',
        weight: 3
        },
      editable: false,
      draggable: false,
      geodesic: false,
      visible: true,
      fill: {
        color: '#ff0000',
        opacity: 0.3
        }
    }
  ];

  $scope.ukraine = new google.maps.Polygon({'paths': [{lng: 34.7005452322, lat: 46.1761271363},
                                                      {lng: 34.5663821427, lat: 45.9859642162},
                                                      {lng: 34.405191271, lat: 46.0127361827},
                                                      {lng: 34.5369003069, lat: 46.1844642802},
                                                      {lng: 33.671027243, lat: 46.215473131},
                                                      {lng: 34.1394361569, lat: 45.9401271081},
                                                      {lng: 34.6365182206, lat: 45.9374182446},
                                                      {lng: 34.4633911835, lat: 45.7692911804},
                                                      {lng: 34.986645237, lat: 45.631927042},
                                                      {lng: 35.1330452347, lat: 45.3250000194},
                                                      {lng: 35.3430362173, lat: 45.3324999788},
                                                      {lng: 34.7340911176, lat: 46.1073822867},
                                                      {lng: 35.4579001424, lat: 45.2984640873},
                                                      {lng: 36.1362363365, lat: 45.4583182131},
                                                      {lng: 36.6368002428, lat: 45.377909107},
                                                      {lng: 36.4311002917, lat: 45.2711001909},
                                                      {lng: 36.4534632094, lat: 45.0772820905},
                                                      {lng: 35.8569360669, lat: 44.9863821943},
                                                      {lng: 35.5265822954, lat: 45.1184541666},
                                                      {lng: 35.0829821385, lat: 44.7912362328},
                                                      {lng: 34.5185910452, lat: 44.7444271591},
                                                      {lng: 33.9302733063, lat: 44.3791540436},
                                                      {lng: 33.3690542605, lat: 44.5843641563},
                                                      {lng: 33.5544363106, lat: 44.6236000128},
                                                      {lng: 33.5462451795, lat: 45.1084641115},
                                                      {lng: 32.481100246, lat: 45.3940181191},
                                                      {lng: 33.7694002764, lat: 45.9253000242},
                                                      {lng: 33.6140180637, lat: 46.1426271838},
                                                      {lng: 32.5004093011, lat: 46.0762451927},
                                                      {lng: 31.7901362118, lat: 46.2841640012},
                                                      {lng: 32.0070001874, lat: 46.4480362437},
                                                      {lng: 31.5145092274, lat: 46.5790911559},
                                                      {lng: 32.3480452441, lat: 46.4591541678},
                                                      {lng: 32.6416182185, lat: 46.6422821565},
                                                      {lng: 32.0136002657, lat: 46.6342910176},
                                                      {lng: 31.9808271918, lat: 47.0075001191},
                                                      {lng: 31.7515181016, lat: 47.2523541193},
                                                      {lng: 31.9650271366, lat: 46.9253732257},
                                                      {lng: 31.908191295, lat: 46.6535911879},
                                                      {lng: 31.4777361417, lat: 46.6319642013},
                                                      {lng: 31.595691145, lat: 46.7970731098},
                                                      {lng: 31.1890543431, lat: 46.6245452111},
                                                      {lng: 30.8327731657, lat: 46.5483272243},
                                                      {lng: 30.5091631383, lat: 46.0963729921},
                                                      {lng: 29.8227731086, lat: 45.6483272414},
                                                      {lng: 29.6361002454, lat: 45.8206821376},
                                                      {lng: 29.5930452585, lat: 45.557073126},
                                                      {lng: 29.7604092342, lat: 45.3222090133},
                                                      {lng: 29.6643271426, lat: 45.2118002374},
                                                      {lng: 29.4113820912, lat: 45.4358179998},
                                                      {lng: 28.7008090973, lat: 45.2200911131},
                                                      {lng: 28.2148360729, lat: 45.4486449939},
                                                      {lng: 28.5158271993, lat: 45.5149180203},
                                                      {lng: 28.5244360844, lat: 45.7111001527},
                                                      {lng: 28.9682541707, lat: 46.0061000623},
                                                      {lng: 28.9944362189, lat: 46.4783271008},
                                                      {lng: 30.1287092226, lat: 46.4050912274},
                                                      {lng: 29.8994361746, lat: 46.5351999904},
                                                      {lng: 29.9443001438, lat: 46.8182541792},
                                                      {lng: 29.5742361001, lat: 46.947418134},
                                                      {lng: 29.5670092231, lat: 47.3377001664},
                                                      {lng: 29.1901003496, lat: 47.439536267},
                                                      {lng: 29.1448541656, lat: 47.9835182642},
                                                      {lng: 27.7631913006, lat: 48.4495820893},
                                                      {lng: 26.6349911534, lat: 48.257164102},
                                                      {lng: 26.1586092054, lat: 47.9852541564},
                                                      {lng: 25.3338820661, lat: 47.9166640367},
                                                      {lng: 24.9289181244, lat: 47.7131450567},
                                                      {lng: 24.5563911423, lat: 47.9530451846},
                                                      {lng: 23.1741631693, lat: 48.1083271498},
                                                      {lng: 22.894800203, lat: 47.9545361575},
                                                      {lng: 22.1514450829, lat: 48.4119181749},
                                                      {lng: 22.5580542245, lat: 49.0794361818},
                                                      {lng: 22.8860733007, lat: 49.0029181228},
                                                      {lng: 22.7038091509, lat: 49.1698911666},
                                                      {lng: 22.6784632815, lat: 49.5694360402},
                                                      {lng: 24.1113821551, lat: 50.5669361651},
                                                      {lng: 23.954382235, lat: 50.7917000845},
                                                      {lng: 24.1434731097, lat: 50.8595732162},
                                                      {lng: 23.60463626, lat: 51.5276910321},
                                                      {lng: 24.0430540537, lat: 51.6102732305},
                                                      {lng: 24.3942271316, lat: 51.8847181989},
                                                      {lng: 25.2409633047, lat: 51.9598542497},
                                                      {lng: 27.1700003232, lat: 51.764164135},
                                                      {lng: 27.7479092471, lat: 51.4665180586},
                                                      {lng: 27.832082163, lat: 51.6091641371},
                                                      {lng: 28.2567363688, lat: 51.6592911033},
                                                      {lng: 28.7571542623, lat: 51.4156452706},
                                                      {lng: 29.1180542036, lat: 51.6369362322},
                                                      {lng: 29.3422181464, lat: 51.3731822137},
                                                      {lng: 30.1799912151, lat: 51.4915182583},
                                                      {lng: 30.5514181563, lat: 51.2518451124},
                                                      {lng: 30.5650001922, lat: 51.6433272657},
                                                      {lng: 30.9596632778, lat: 52.079345153},
                                                      {lng: 31.7838823062, lat: 52.1080451248},
                                                      {lng: 32.2249911938, lat: 52.0794361804},
                                                      {lng: 32.3891633408, lat: 52.3340182176},
                                                      {lng: 33.8316632327, lat: 52.3631822115},
                                                      {lng: 34.4222182692, lat: 51.8041642535},
                                                      {lng: 34.10186327, lat: 51.6477002723},
                                                      {lng: 34.3822090983, lat: 51.2636091136},
                                                      {lng: 35.0764450922, lat: 51.2206451541},
                                                      {lng: 35.3688271658, lat: 51.0421272122},
                                                      {lng: 35.4410541933, lat: 50.5119730083},
                                                      {lng: 35.5979002217, lat: 50.3736001917},
                                                      {lng: 36.1484631864, lat: 50.4222821179},
                                                      {lng: 36.6084630397, lat: 50.2130451712},
                                                      {lng: 37.4619362514, lat: 50.4361731108},
                                                      {lng: 38.024227175, lat: 49.9030820557},
                                                      {lng: 38.3048541323, lat: 50.0738821088},
                                                      {lng: 38.9418631851, lat: 49.8110271332},
                                                      {lng: 39.1837360776, lat: 49.8804091751},
                                                      {lng: 39.8124270973, lat: 49.5505450744},
                                                      {lng: 40.139763216, lat: 49.6010540878},
                                                      {lng: 40.1676362293, lat: 49.2516640084},
                                                      {lng: 39.6979091772, lat: 49.0168000633},
                                                      {lng: 40.0748540929, lat: 48.8762360495},
                                                      {lng: 39.6601911157, lat: 48.6039180729},
                                                      {lng: 39.9988823663, lat: 48.2972181999},
                                                      {lng: 39.8032542777, lat: 47.8686000244},
                                                      {lng: 38.845963316, lat: 47.8568001487},
                                                      {lng: 38.7581912108, lat: 47.6895640808},
                                                      {lng: 38.3008271307, lat: 47.5551270707},
                                                      {lng: 38.2358273154, lat: 47.1094270794},
                                                      {lng: 37.5595731861, lat: 47.086445242},
                                                      {lng: 36.7638823005, lat: 46.7511000471},
                                                      {lng: 35.9072001611, lat: 46.6510912015},
                                                      {lng: 34.9967273255, lat: 46.0742271657},
                                                      {lng: 35.3343000949, lat: 46.3216542426},
                                                      {lng: 35.1980452176, lat: 46.4433180704},
                                                      {lng: 34.7005452322, lat: 46.1761271363}]})

  $scope.check = function(latLng) {
    return google.maps.geometry.poly.containsLocation(latLng, $scope.ukraine);
  };

  uiGmapIsReady.promise()
    .then(function(instances) {
      var maps = instances[0].map;
      google.maps.event.trigger(maps, 'resize');
    });
}]);
