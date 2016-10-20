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
  json.format = form.find("#format").val();
  json.metrics = getFormMetrics(form);

  console.log(json);
  console.log("Finished...")
}

function getFormMetrics(form) {
  var metricsPairs = form.find("#metrics").val().split("\n");
  return $.map(metricsPairs, function(pair) {
    var metricsFormatted = {};
    var metric = pair.replace(/ /g, "").split(",");
    metricsFormatted.id = metric[0];
    metricsFormatted.computePeriod = metric[1];
    return metricsFormatted;
  });
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
}
