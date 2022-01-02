//function for generating plots
async function main() {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //testing
    // console.log(data.metadata[0]); //access metadata
    // console.log(data.samples[0]); //access sample info

    //arrays of data for initial load, already sorted by descending sample_values
    let sample_values = Object.values(data.samples[0].sample_values);
    let otu_labels = Object.values(data.samples[0].otu_labels);
    let otu_ids = Object.values(data.samples[0].otu_ids);
    //add "OTU" to beginning of otu id numbers for trace1
    let otu_ids_labeled = otu_ids.map(id => "OTU " + id);

    
    //Trace 1, horizontal bar chart of top 10 OTUs/individual
    //already sorted from least to greatest, so slice first 10, then 
    //reverse array order so highest # appears at top of graph
    let trace1 = [{
        x: sample_values.slice(0,10).reverse(), 
        y: otu_ids_labeled.slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h' 
    }];

    const layout1 = {
        title: 'Top 10 Occuring OTUs'
    }; 

    Plotly.newPlot('bar', trace1, layout1);


    //Trace 2, Bubble chart of each sample
    let trace2 =[{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids, //change color scheme?
          size: sample_values
        }
    }];

    let layout2 = {
        title: 'Number of samples per OTU',
        xaxis: {
          title: 'OTU ID',
          }, 
    };
    
    Plotly.newPlot('bubble', trace2, layout2);


    //Display the sample metadata (individual's demographic information)
    //each key-value pair becomes an unordered list item, 
    //added to target element with class="panel-body"
    

    //transform data.metadata object into array of strings "id: 928"
    // console.log(data.metadata[0]); //values
    // console.log(Object.keys(data.metadata[0])); //keys

  
    //need an array of objects
    let metadataStrings = (metadataObject).map((item,index) => `${index}: ${item}`);
    console.log(metadataStrings);

   


    //add each pair to ul
    // const newUl = document.createElement('ul');
    // for (let i=0; i<data.metadata[0]; i++) {
    //     newUl.textContent = data.metadata[0].i;
    //     console.log(newUl);
    //     document.querySelector('.panel-body').append(newUl);
    // };
    
    // newUl.textContent = data.metadata[0];
    // console.log(newUl);
    // document.querySelector('.panel-body').append(newUl);
    

    //************************************************************* */
    //Add eventListener to change which sample is displayed

};

//call main to initialize page
main();