var customerApp = angular.module('customerApp', []);

customerApp.controller('CustomerController', ['$scope', '$http', '$q', function($scope, $http, $q) {
	var company = "BODYENERGY";                               //ok
	var user = "RMS";                                         //ok
	var pass = "rms5a853";                                    //ok
	var apiKey = "4sYyQQopL5u2NTCecuVVWehaGNpfmRFLQR8JeLZ8";  //ok
	var server = "localhost";                                 //ok
	var port = "81";                                          //ok
	var_store = "01";
	var_categ_cod = "FULLSTAFF";
	var_terms_cod = "NET30";

	var encodedCredentials = btoa(company + '.' + user + ':' + pass);
	var absoluteUrl = "https://" + server + ":" + port + "/customer";

	$scope.title = 'Customer Form';
	$http.defaults.headers.common.Accept = 'application/json';
	$http.defaults.headers.common.Authorization = 'Basic ' + encodedCredentials;
	$http.defaults.headers.common.APIKey = apiKey;
	$http.defaults.headers.common['Content-Type'] = 'application/json';

	  $scope.submit = function (custno, firstName, lastName, adrs_1, adrs_2, city, zip, phone, email) {
		
        try {
            return $http({
                method: 'POST',
                url: absoluteUrl,
                data:  { "AR_CUST" : { "FST_NAM" : firstName
				                     , "LST_NAM" : lastName
									 , "ADRS_1" : adrs_1 
									 , "ADRS_2" : adrs_2
                                     , "CITY" : city
                                     , "ZIP_COD" : zip
									 , "PHONE_1" : phone
									 , "EMAIL_ADRS_1" : email
									 , "CATEG_COD" : var_categ_cod
									 , "TERMS_COD" : var_terms_cod
							//	 , "STR_ID" : var_store
							} }
            }).then(function (successResult) {
				alert("Customer " + successResult.data.CUST_NO + " successfully added.")
				$scope.clear();
                return successResult;
            },
            function (failureResult) { // optional
				alert("Failure adding customer. Please try again");//" + failureResult.data.Message)
                return failureResult;
            });
        }
        catch (err) {
            alert(err);
        }

    };

	  $scope.retrieve = function (CustNo) {
		
        try {
            return $http({
                method: 'GET',
                url: absoluteUrl,
                data:  {"AR_CUST": {"CUST_NO": CustNo,
                                    "FST_NAM": firstName
				                   } 
						}
            }).then(function (successResult) {
				alert("Customer " + successResult.data.CUST_NO + " successfully added.")
				$scope.clear();
                return successResult;
            },
            function (failureResult) { // optional
				alert("Failure adding customer. Please try again");//" + failureResult.data.Message)
                return failureResult;
            });
        }
        catch (err) {
            alert(err);
        }

    };
	
	
	
	
	
	
	
	
	
	
	
	
	
	$scope.clear = function () {
		$scope.formFirstName = null;
		$scope.formLastName = null;
        $scope.formAadrs_1 = null;
        $scope.formAadrs_2 = null;
		$scope.formCity = null;
		$scope.formZip = null;
		$scope.formPhone = null;
		$scope.formEMail = null;
	};

}]);