$(document).ready(function() {
  initGenerateClickEvent();
  initComponentClickEvent();
  initCopyToClipboardEvent();
});

function initGenerateClickEvent() {
  $("#generate").click(function() {
    var generate = $(this);
    generateMetricViewJSON();
  });
}

function generateMetricViewJSON() {
  console.log("Generating MV JSON...");
  var form = $("#mv-form")
  var json = {};
  json.id = $("#mv-id").val();
  json.title = $("#mv-title").val();
  json.type = $("#metric-view-type").val();
  json.borderless = $("#mv-borderless").is(":checked");
  json.size = $("#mv-size").val();
  json.format = getFormat(form.find("#mv-format").val());
  json.metrics = getFormMetrics(form);
  if($("#mv-comparisons").val().length > 0) {
    json.comparisons = getFormComparisons(form);
  }
  console.log(json);
  console.log(JSON.stringify(json, null, 2));
  $("#result").text(JSON.stringify(json, null, 2));
  $("#component-results").show();
  console.log("Finished...") }

function getFormat(format) {
  var formattedFormat = {};
  formattedFormat.id = format;
  formattedFormat.display = (format == 'Number' ? '#' : '%');
  return formattedFormat;
}

function getFormMetrics(form) {
  var metricsPairs = $("#mv-metrics").val().split("\n");
  return $.map(metricsPairs, function(pair) {
    var metricsFormatted = {};
    var metric = pair.split(", ");
    metricsFormatted.id = metric[0];
    metricsFormatted.computePeriod = metric[1];
    return metricsFormatted;
  });
}

function getFormComparisons(form) {
  var comparisonSets = $("#mv-comparisons").val().split("\n");
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
  $("#component-page").show();
  $("#component-results").hide();
}

function setMetricViewType(component) {
  $("#metric-view-type").attr("value", component.attr("id"));
  $("#component-title").text(component.attr("label"));
}

function initCopyToClipboardEvent() {
  $("#copy-to-clipboard").click(function() {
    $('#result').select();
    document.execCommand("copy");
  });
}
