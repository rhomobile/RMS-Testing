var callbackFunction = function(args) {
  processArgs(args);
  if((args.status && args.status == 'complete') || !args.status) {
    callbackCalled = true;
  }; 
};

var okCallbackFunction = function(args) {
  processArgs(args);
  if((args.status && args.status == 'ok') || !args.status) {
    callbackCalled = true;
  };
};

var processArgs = function(args) {
  if(args.error_code) {
    loginCallback_paramsValue.error_code = args.error_code.toString();
  }
  if(args.error_message) {
    loginCallback_paramsValue.error_message = args.error_message.toString();
  }
};

var createProducts = function(count, data) {
  for(var i = 0; i < count; i++) {
    Product.create({brand: data + '-brand', name: data + '-name'});
  }
};

var createCustomers = function(count, data) {
  for(var i = 0; i < count; i++) {
    Customer.create({first: data + '-first', last: data + '-last'});
  }
};

var buildErrorMessage = function(data) {
  return [
    {"version": 3},
    {"token": ""},
    {"count": 0},
    {"progress_count": 0},
    {"total_count": 0},
    {"source-error": data}
  ]
}
