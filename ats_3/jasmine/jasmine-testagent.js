if (window.testagent == undefined)
{
  testagent =
  {
    log: function (severity, entry)
    {
      console.log (entry);
    },
  
    outcome: function (outcome)
    {
      console.log ('Outcome = ' + outcome);
    }
  };
}
  
jasmine.TestagentReporter = function ()
{
  // Assume it passes until we learn otherwise
  this.outcome = 'pass';
  
  this.reportRunnerStarting = function (runner)
  {
    testagent.log ({severity: 'info', entry: 'Jasmine starting: ' + runner.env.versionString ()});
  };
  
  this.reportRunnerResults = function (runner)
  {
    // Quit Rho/EB once the tests have finished running
    testagent.log ({severity: 'info', entry: 'Jasmine stopping'});
    testagent.outcome ({value: this.outcome});
    Rho.Application.quit ();
  };
  
  this.reportSuiteResults = function (suite)
  {
  };
  
  this.reportSpecStarting = function (spec)
  {
  };

  this.reportSpecResults = function (spec)
  {
    var results = spec.results();
    if (results.failedCount == 0)
    {
        testagent.log ({severity: 'info', entry: spec.suite.description + ': ' + spec.description + ': passed'});
    }
    else
    {
      this.outcome = 'fail';
      
      var items = spec.results().getItems();
      for (n in items)
      {
        if (!items[n].passed())
          testagent.log ({severity: 'error', entry: spec.suite.description + ': ' + spec.description + ': ' + items[n].toString()});
      }
    }
  };
};