sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function(Controller,MessageBox,JSONModel) {
	"use strict";

	return Controller.extend("com.sapSOAPCALL.controller.main", {
			//step4: define the call back functions(success or errors)
		resSuccess: function(data,status,req){
		debugger;	
		var responseTotal = "";
			
			var dataXml = req.responseText;
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(dataXml, "text/xml");
			responseTotal = xmlDoc.getElementsByTagName("AddIntegerResult")[0].childNodes[0].nodeValue;
			MessageBox.show(responseTotal);
		},
		resError: function(data,status,req){
		debugger;	
		},
		
		onCallSOAP: function(oEvent){
			//jquery and Ajax
			//step1: read the values from num1and num2
			var sNum1 = this.getView().byId('num1').getValue();
			var sNum2 = this.getView().byId("num2").getValue();
			//step2: prepare the URL of SOAP service to call and add the numbers
			var sUrl = "/csp/samples/SOAP.Demo.cls?soap_method=AddInteger&Arg1=" + sNum1 + "&Arg2=" + sNum2;
			//step3: make a call to the soap service using ajax
			$.ajax({
				type: "GET",
				url: sUrl,
				contentType:"text/xml",
				dataType:"xml",
				success:this.resSuccess,
				error:this.resError
				
			});
		
			
		},
		
		
			onRESTCall: function(){
			var sURL = "/V2/Northwind/Northwind.svc/Customers?$format=json";
			$.ajax({
				type: "GET",
				url: sURL,
				contentType: "application/json",
				dataType: "json",
				success: this.successREST.bind(this),
				error: [this.errorREST,this]
			});
		},
		successREST: function(data){
			debugger;
				var myData = data.value;
			//Step 1: Create a New JSON Model and set this data to model object
			
			var oModel = new JSONModel();
			oModel.setData({
				"newData": myData
			});
		
			var oList = this.getView().byId("restdata");
			//step 3: Set the model to the list level as default model
			oList.setModel(oModel);
			//Step 2: Bind our list control we entity set where array is present
			oList.bindItems({
				path: "/newData",
				template: new sap.m.DisplayListItem({
					label: "{CustomerID}",
					value: "{CompanyName}"
				})
			});
			
		},
		ErrorRest: function(error){
			debugger;
		}

	});
});