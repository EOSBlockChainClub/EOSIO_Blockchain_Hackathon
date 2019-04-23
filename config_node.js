//additional libraries to setup the server and web3-instance
var express = require("express");
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var csv = require('csv-parser');
var fs = require('fs');
// var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

var app = express();

app.use( bodyParser.json() );
app.use ( express.static(".") );
app.use ( express.static("/components/EntryPage") );
app.use (express.static("/core"));
app.use(express.static(path.join(__dirname + '/pics', 'assets/pics')));
app.use(express.static("/node_modules/angular-ui-router/release"));

// app.use(redirectToHTTPS([/localhost:(\d{4})/], 301));
var highConsumer = {}
var medConsumer = {}
var lowConsumer = {}
let currentDate = ''
var energyProdDict = {}

app.post('/getAllResidentsInfo',function(req,res){
    currentDate = getStartingDate(req.body.startingMonth)
    var displayDate = getDisplayDate(currentDate)

    res_body = [{
        houseId: '1',
        displayingDate: displayDate,
        houseTokens: 1340
    },{
        houseId: '2',
        displayingDate: displayDate,
        houseTokens: 1560
    },{
        houseId: '3',
        displayingDate: displayDate,
        houseTokens: 4470
    },{
        houseId: '4',
        displayingDate: displayDate,
        houseTokens: 2800
    },{
        houseId: '5',
        displayingDate: displayDate,
        houseTokens: 2110
    },{
        houseId: '6',
        displayingDate: displayDate,
        houseTokens: 1090
    },{
        houseId: '7',
        displayingDate: displayDate,
        houseTokens: 1500
    },{
        houseId: '8',
        displayingDate: displayDate,
        houseTokens: 1560
    },{
        houseId: '9',
        displayingDate: displayDate,
        houseTokens: 970
    },{
        houseId: '10',
        displayingDate: displayDate,
        houseTokens: 3800
    },{
        houseId: '11',
        displayingDate: displayDate,
        houseTokens: 2110
    },{
        houseId: '12',
        displayingDate: displayDate,
        houseTokens: 2340
    }]


    res.send(res_body)

})

app.get('/getUpdatedTokenInfo',function(req,res){
    // console.log(currentDate)
    var formattedDate = removeYearFromDate(currentDate);

    var prodEnergy = energyProdDict[(currentDate.getMonth()+1)+'' + currentDate.getDate()+'99'+(currentDate.getHours())]

    var highHouses = getHouseEnergy(highConsumer, formattedDate,prodEnergy,'high')
    var medHouses = getHouseEnergy(medConsumer, formattedDate,prodEnergy,'medium')
    var lowHouses = getHouseEnergy(lowConsumer, formattedDate,prodEnergy,'low')


    var displayDate = getDisplayDate(currentDate)

    res_body = [{
        houseId: '1',
        displayingDate: displayDate,
        houseTokens: highHouses[0]
    },{
        houseId: '2',
        displayingDate: displayDate,
        houseTokens: highHouses[1]
    },{
        houseId: '3',
        displayingDate: displayDate,
        houseTokens: highHouses[2]
    },{
        houseId: '4',
        displayingDate: displayDate,
        houseTokens: highHouses[3]
    },{
        houseId: '5',
        displayingDate: displayDate,
        houseTokens: medHouses[0]
    },{
        houseId: '6',
        displayingDate: displayDate,
        houseTokens: medHouses[1]
    },{
        houseId: '7',
        displayingDate: displayDate,
        houseTokens: medHouses[2]
    },{
        houseId: '8',
        displayingDate: displayDate,
        houseTokens: medHouses[3]
    },{
        houseId: '9',
        displayingDate: displayDate,
        houseTokens: lowHouses[0]
    },{
        houseId: '10',
        displayingDate: displayDate,
        houseTokens: lowHouses[1]
    },{
        houseId: '11',
        displayingDate: displayDate,
        houseTokens: lowHouses[2]
    },{
        houseId: '12',
        displayingDate: displayDate,
        houseTokens: lowHouses[3]
    }]

    currentDate = updateTime(currentDate)
    res.send(res_body)
})


app.listen(8000, function() {
    console.log ("Server running (8000)... yayyy");

    getCsvData('data/USA_VA_Blacksburg-Virginia.Tech.AP.724113_TMY3_HIGH.csv', highConsumer)
    getCsvData('data/USA_VA_Blacksburg-Virginia.Tech.AP.724113_TMY3_BASE.csv',medConsumer)
    getCsvData('data/USA_VA_Blacksburg-Virginia.Tech.AP.724113_TMY3_LOW.csv', lowConsumer)
    getProdCsvData('data/pvwatts_hourly.csv', energyProdDict)


});

function getCsvData(fileName,tempDict){
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (row) => {
            tempDict[(row['Date/Time']).trim()] = row['Net']
        })
        .on('end', () => {
        });
}

function getProdCsvData(fileName,tempDict){
    fs.createReadStream(fileName)
        .pipe(csv())
        .on('data', (row) => {
            tempDict[(row['DateTime']).trim()] = row['EnergyProd']
        })
        .on('end', () => {
        });
}

function getStartingDate(month){
    switch(month){
        case 'January':
            return new Date('01/01/2018')
        case 'February':
            return new Date('02/01/2018')
        case 'March':
            return new Date('03/01/2018')
        case 'April':
            return new Date('04/01/2018')
        case 'May':
            return new Date('05/01/2018')
        case 'June':
            return new Date('06/01/2018')
        case 'July':
            return new Date('07/01/2018')
        case 'August':
            return new Date('08/01/2018')
        case 'September':
            return new Date('09/01/2018')
        case 'October':
            return new Date('10/01/2018')
        case 'November':
            return new Date('11/01/2018')
        case 'December':
            return new Date('12/01/2018')
    }

}

function removeYearFromDate(currentDateTime){
    var dateOptions = { day: '2-digit' , month: '2-digit'}
    var dateMonth = currentDateTime.toLocaleDateString("en-US",dateOptions)

    var timeOptions = {hour12: false}
    var timeMonth = currentDateTime.toLocaleTimeString("en-US",timeOptions)
    if(timeMonth == '00:00:00'){
        // console.log('yeah')
        timeMonth = '24:00:00'
        console.log(highConsumer[dateMonth + "  " + timeMonth])
    }
    return dateMonth + "  " + timeMonth


}

function updateTime(currentDateTime){
    var updatedDate = new Date(currentDateTime.getTime() + 3600000)
    var timeOptions = {hour12: false}
    var timeMonth = currentDateTime.toLocaleTimeString("en-US",timeOptions)

    return updatedDate
}

function getHouseEnergy(energyDict,time,prodEnergy,tag){
    houseEnergy = []

    for(i=0;i<4;i++){
        consumptionEnergy = parseFloat(energyDict[time])
        productionEnergy = parseFloat(prodEnergy)
        productionEnergy = productionEnergy/4451
        switch(tag){
            case 'high':
                consumptionEnergy = consumptionEnergy/3819
                break;
            case 'medium':
                consumptionEnergy = consumptionEnergy/2546
                break;
            case 'low':
                consumptionEnergy = consumptionEnergy/1273
                break;
        }
        switch(i){
            case 0:
                consumptionEnergy = consumptionEnergy * 532
                productionEnergy = productionEnergy*531
                break;
            case 1:
                consumptionEnergy = consumptionEnergy * 937
                productionEnergy = productionEnergy*937
                break;
            case 2:
                consumptionEnergy = consumptionEnergy * 1372
                productionEnergy = productionEnergy*1372
                break;
            case 3:
                consumptionEnergy = consumptionEnergy * 1610
                productionEnergy = productionEnergy*1610
                break;
        }

        houseEnergy.push(Math.floor(productionEnergy - (consumptionEnergy) + (Math.random() * 2) -1))
    }

    return houseEnergy.slice(0)

}

function getDisplayDate(currentDate){
    var dateOptions = { day: '2-digit' , month: '2-digit', year: 'numeric'}
    var dateMonth = currentDate.toLocaleDateString("en-US",dateOptions)

    var timeOptions = {hour12: false}
    var timeMonth = currentDate.toLocaleTimeString("en-US",timeOptions)

    return dateMonth + " " + timeMonth

}