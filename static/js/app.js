//function for generating plots
async function main() {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //test
    console.log(data.metadata[0]); //access metadata
    console.log(data.samples[0]);


    //arrays of data



    //Trace 1, horizontal bar chart (dropdown menu?) of top 10 OTUs/individual
    //Use sample_values as the values for the bar chart.
    //Use otu_ids as the labels for the bar chart.
    //Use otu_labels as the hovertext for the chart.
    // let trace = [{
    //     values: , 
    //     labels: , 
    //     type: 'bar',
    //     orientation: 'h' 
    // }];

    // const layout = {
        
    // }; 

    // Plotly.newPlot('bar', trace, layout);

    //Trace 2, Bubble chart of each sample
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.


    //Display the sample metadata, i.e., an individual's demographic information.
    //Display each key-value pair from the metadata JSON object somewhere on the page.


    //Add eventListener to change which sample is displayed

};

//call main to initialize page
main();