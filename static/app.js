//Step 1: Plotly

//Use the D3 library to read in samples.json.
function generateDash(inputID) {
    d3.json("./data/samples.json").then((data) => {   
        // var inputID = "940"
        var dropDownId = d3.select("#selDataset")
        var inputID = dropDownId.property("value");
        console.log(inputID)
        console.log(data)
        
        //defining the sample data set
        var sampleData = data.samples
        console.log(sampleData)
        //filtering the data based on the input value
        var filteredData = sampleData.filter(x => x.id === inputID)[0]
        console.log(filteredData)
    
        //adding variable arrays for the data in the individual's sample
        var otuIds = filteredData.otu_ids
        var otuLabels = filteredData.otu_labels
        var values = filteredData.sample_values
    
        //slicing for the top 10 otuIDs in each individual's sample. using this in bar graph
        var top10otuIds = otuIds.slice(0,10).reverse()
        var top10otuLabels = otuLabels.slice(0,10).reverse()
        var top10values = values.slice(0,10).reverse()
    
        for ( var i = 0; i < top10otuIds.length; i++ ) {
            top10otuIds[i] = "OTU " + top10otuIds[i];
        }
    
        console.log(top10otuIds)
        console.log(top10values)
    
        // adding trace for bar chart
        var traceBar = {
            x: top10values,
            y: top10otuIds,
            text: top10otuLabels,
            name: "940",
            type: "bar",
            orientation: "h"
        };
        var chartData = [traceBar];
    
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData);
    
        // Create a bubble chart that displays each sample.
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.
    
        var traceCircle = {
            x: otuIds,
            y: values,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: values,
                color: otuIds
            }  
        }
        var bubbleData = [traceCircle]
    
        Plotly.newPlot('bubble', bubbleData);
    
        // Display the sample metadata, i.e., an individual's demographic information.
        // Display each key-value pair from the metadata JSON object somewhere on the page.
    
        //defining the metadata data set
        var metaData = data.metadata
        console.log(metaData)
    
        //filtering the data based on the input value
        var filteredMeta = metaData.filter(x => x.id === parseFloat(inputID))
        console.log(filteredMeta)
        //adding variables for metadata values
        // var metaID = filteredMeta.id
        // var metaEth = filteredMeta.ethnicity
        // var meta
        var metaTable = d3.select("#sample-metadata")
        console.log(metaTable)
        
        // clearing table <p> contents
        // clearTR();
        pAll = d3.selectAll("p")
        pAll.remove()

        filteredMeta.forEach((id) => {
            Object.entries(id).forEach(([k, v]) => {
                var row = metaTable.append("p");
                row.text(`${k}: ${v}`)
            });
        });
    });
}
//console.log(data)
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// d3.json("./data/samples.json").then((data) => {   
    // var inputID = "940"
    // console.log(data)

    // //defining the sample data set
    // var sampleData = data.samples
    // console.log(sampleData)
    // //filtering the data based on the input value
    // var filteredData = sampleData.filter(x => x.id === inputID)[0]
    // console.log(filteredData)

    // //adding variable arrays for the data in the individual's sample
    // var otuIds = filteredData.otu_ids
    // var otuLabels = filteredData.otu_labels
    // var values = filteredData.sample_values


    // //slicing for the top 10 otuIDs in each individual's sample. using this in bar graph
    // var top10otuIds = otuIds.slice(0,10).reverse()
    // var top10otuLabels = otuLabels.slice(0,10).reverse()
    // var top10values = values.slice(0,10).reverse()

    // for ( var i = 0; i < top10otuIds.length; i++ ) {
    //     top10otuIds[i] = "OTU " + top10otuIds[i];
    // }

    // console.log(top10otuIds)
    // console.log(top10values)

    // // adding trace for bar chart
    // var traceBar = {
    //     x: top10values,
    //     y: top10otuIds,
    //     text: top10otuLabels,
    //     name: "940",
    //     type: "bar",
    //     orientation: "h"
    // };
    // var chartData = [traceBar];


    // // Render the plot to the div tag with id "plot"
    // Plotly.newPlot("bar", chartData);

    // // Create a bubble chart that displays each sample.
    // // Use otu_ids for the x values.
    // // Use sample_values for the y values.
    // // Use sample_values for the marker size.
    // // Use otu_ids for the marker colors.
    // // Use otu_labels for the text values.

    // var traceCircle = {
    //     x: otuIds,
    //     y: values,
    //     mode: "markers",
    //     text: "otuLabels",
    //     marker: {
    //         size: values,
    //         color: otuIds
    //     }  
    // }
    // var bubbleData = [traceCircle]

    // Plotly.newPlot('bubble', bubbleData);

    // // Display the sample metadata, i.e., an individual's demographic information.
    // // Display each key-value pair from the metadata JSON object somewhere on the page.

    // //defining the metadata data set
    // var metaData = data.metadata
    // console.log(metaData)

    // //filtering the data based on the input value
    // var filteredMeta = metaData.filter(x => x.id === parseFloat(inputID))
    // console.log(filteredMeta)
    // //adding variables for metadata values
    // // var metaID = filteredMeta.id
    // // var metaEth = filteredMeta.ethnicity
    // // var meta
    // var metaTable = d3.select("#sample-metadata")
    // console.log(metaTable)

    // filteredMeta.forEach((id) => {
    //     Object.entries(id).forEach(([k, v]) => {
    //         var row = metaTable.append("p");
    //         row.text(`${k}: ${v}`)
    //     });
    // });
    
    // var tbody = table.select("tbody");
    // var trow;
    // for (var i = 0; i < 12; i++) {
    //   trow = tbody.append("tr");
    //   trow.append("td").text(dates[i]);
    //   trow.append("td").text(openPrices[i]);
    //   trow.append("td").text(highPrices[i]);
    //   trow.append("td").text(lowPrices[i]);
    //   trow.append("td").text(closingPrices[i]);
    //   trow.append("td").text(volume[i]);
    // }


// });

//creating an option tag with all the available ID's
d3.json("./data/samples.json").then((data) => {  
    var dataNames = data.names
    var dropDown = d3.select("#selDataset")
    // console.log(dataNames)
    dataNames.forEach((d) => {
        var row = dropDown.append("option");
        row
            .text(d)
            .attr('value', d)

    });
});

var dropDownId = d3.select("#selDataset")
var DDV = dropDownId.property("value");
console.log(DDV)

// Call generateDash() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", generateDash);
