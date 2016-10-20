$(document).ready(function() {
  initForm();
  initGenerateClickEvent();
  initComponentClickEvent();
});

function initForm() {
  $("form").hide();
}

function initGenerateClickEvent() {
  $("#generate").click(function() {
    var generate = $(this);
    generateMetricViewJSON();
  });
}

function generateMetricViewJSON() {
  console.log("Generating MV JSON...");
  var form = $("form")
  var json = {};
  json.id = form.find("#id").val();
  json.title = form.find("#title").val();
  json.type = form.find("#metric-view-type").val();
  json.borderless = form.find("#borderless").is(":checked");
  json.size = form.find("#size").val();
  json.format = getFormat(form.find("#format").val());
  json.metrics = getFormMetrics(form);
  json.comparisons = getFormComparisons(form);
  console.log(json);
  console.log(JSON.stringify(json, null, 2))
  $("#result").text(JSON.stringify(json, null, 2))
  console.log("Finished...") }

  function getFormat(format) {
    var formattedFormat = {};
    formattedFormat.id = format.toLowerCase();
    formattedFormat.display = (format == 'Number' ? '#' : '%');
    return formattedFormat;
  }

function getFormMetrics(form) {
  var metricsPairs = form.find("#metrics").val().split("\n");
  return $.map(metricsPairs, function(pair) {
    var metricsFormatted = {};
    var metric = pair.split(", ");
    metricsFormatted.id = metric[0];
    metricsFormatted.computePeriod = metric[1];
    return metricsFormatted;
  });
}

function getFormComparisons(form) {
  var comparisonSets = form.find("#comparisons").val().split("\n");
  return $.map(comparisonSets, function(set) {
    var comparison = set.split(", ");
    return formatComparison(comparison);
  });
}

function formatComparison(comparison) {
  formattedComparison = {};
  formattedComparison.type = comparison[0];
  formattedComparison.display = comparison[1];
  formattedComparison.id = comparison[0] + "-" + $.map(comparison[1].split(/ /g), function(string) { return string.toLowerCase() }).join('-');
  switch(comparison[0]) {
    case 'location-level':
      formattedComparison.level = comparison[2];
      break;
    case 'time-period':
      formattedComparison.time = comparison[2];
      break;
    case 'metric':
      formattedComparison.metric = { id: comparison[2], computePeriod: comparison[3], name: comparison[4] };
      break;
  }
  return formattedComparison;
}

function initComponentClickEvent() {
  $(".component").click(function() {
    var component = $(this);
    showForm();
    setMetricViewType(component);
  });
}

function showForm() {
  $("form").show();
}

function setMetricViewType(component) {
  $("#metric-view-type").attr("value", component.attr("id"));
  $("#component-title").text(component.attr("label"));
}
