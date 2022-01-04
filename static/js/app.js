//function for generating plots
async function optionChanged(valueSel) {

    //load data from json file
    const response = await fetch("./samples.json");
    const data = await response.json();

    //populate drop-down with sample ID names
    let names = Object.values(data.names); 
    for (i=0; i<names.length; i++) {
        //set create methods as variables (have to do this inside the loop)
        const newOption = document.createElement('option');
        const attributeVal = document.createAttribute('value');
        
        //set display text and value to sample id name
        newOption.textContent = names[i];
        attributeVal.value = names[i];
        
        //add newOption
        document.querySelector("#selDataset").append(newOption);
        //add value attribute 
        newOption.setAttributeNode(attributeVal);
    }; 


    //declare variable to hold index # outside for/if loop
    let indexSel = 0;

    if (valueSel) {  //if a selection from the drop-down is made
        // console.log(valueSel);
        //find matching sample id index number    
        for (let i=0; i<names.length;i++) {
            if (data.samples[i].id === valueSel){
                indexSel = i;
                // console.log(indexSel);
            }
        };

        //update arrays with new sample:
        let sample_values = Object.values(data.samples[indexSel].sample_values);
        let otu_labels = Object.values(data.samples[indexSel].otu_labels);
        let otu_ids = Object.values(data.samples[indexSel].otu_ids);
        //add "OTU" to beginning of otu id numbers for trace1
        let otu_ids_labeled = otu_ids.map(id => "OTU " + id);
        let metadataStrings = (Object.entries(data.metadata[indexSel]))
            .map(item => `${item[0]}: ${item[1]}`);
        

        //two plotly updates
        let trace1 = [{
            x: sample_values.slice(0,10).reverse(), 
            y: otu_ids_labeled.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h' 
        }];
    
        const layout1 = {
            title: '10 Most Frequently Occuring OTUs'
        }; 
    
        Plotly.newPlot('bar', trace1, layout1);

        //Trace 2, Bubble chart of each sample
        let trace2 =[{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
            color: otu_ids,
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
           
        //update metadata
        metadataStrings.map(item => {
            let newP = document.createElement('p');
            newP.textContent = item;
            document.querySelector('.panel-body').append(item);
            document.querySelector('.panel-body').append(document.createElement('br')); //line break for next element
        });
    
    }
    else { 
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
            title: '10 Most Frequently Occuring OTUs'
        }; 

        Plotly.newPlot('bar', trace1, layout1);


        //Trace 2, Bubble chart of each sample
        let trace2 =[{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
            color: otu_ids,
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
        //transform data.metadata object into array of strings e.g. "id: 928"
        let metadataStrings = (Object.entries(data.metadata[0]))
            .map(item => `${item[0]}: ${item[1]}`);

        //add to element with class="panel-body"
        metadataStrings.map(item => {
            let newP = document.createElement('p');
            newP.textContent = item;
            document.querySelector('.panel-body').append(item);
            document.querySelector('.panel-body').append(document.createElement('br')); //line break for next element
        });
    };

    

};

//call to initialize page
optionChanged();