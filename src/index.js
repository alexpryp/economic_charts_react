import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

//data
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const quarters = ["I кв.", "II кв.", "III кв.", "IV кв."];
const gdpCategories = [
    "Другие услуги", 
    "Торговля и ремонт автотранспорта", 
    "Сельское, лесное и рыбное хозяйство", 
    "Перерабатывающая промышленность", 
    "Налоги", 
    "Транспорт, складское хозяйство, почтовая и куръерская доставка", 
    "Операции с недвижимостью", 
    "Образование", 
    "Добывающая промышленность"]
const salar2019 = [9223, 9429, 10237, 10269, 10239, 10783, 10971, 10537, 10687, 10727, 10679, 12264];
const salar2018 = [7711, 7828, 8382, 8480, 8725, 9141, 9170, 8977, 9042, 9218, 9161, 10573];
const salar2017 = [6008, 6209, 6752, 6659, 6840, 7360, 7339, 7114, 7351, 7377, 7479, 8777];
const gdp2019 = [807755, 927773, 1105520, 1176822];
const gdp2018 = [705013, 810820, 994850, 1048023];
const gdp2017 = [591008, 664760, 833130, 894022];
const gdpStruct2019 = [31.30, 13.15, 10.12, 10.07, 10.88, 8.14, 7.24, 4.68, 4.43];
const gdpStruct2018 = [30.66, 12.81, 10.87, 10.48, 10.73, 8.01, 7.08, 4.90, 4.46];
const gdpStruct2017 = [30.31, 12.80, 10.44, 10.79, 10.77, 8.21, 7.01, 5.14, 4.53];
/* const ipi2019 = [86.2, 98.1, 112.0, 98.2, 99.5, 96.3, 103.6, 98.6, 101.7, 105.6, 95.4, 98.3];
const ipi2018 = [86.1, 96.5, 107.6, 95.0, 103.1, 100.2, 101.4, 99.5, 101.7, 110.0, 97.9, 98.3];
const ipi2017 = [82.5, 97.8, 108.9, 93.1, 103.4, 100.1, 100.3, 103.0, 102.5, 106.9, 100.3, 101.0]; */
const ipi2019 = [-13.8, -1.9, 12.0, -1.8, -0.5, -3.7, 3.6, -1.4, 1.7, 5.6, -4.6, -1.7];
const ipi2018 = [-13.9, -3.5, 7.6, -5.0, 3.1, 0.2, 1.4, -0.5, 1.7, 10.0, -2.1, -1.7];
const ipi2017 = [-17.5, -2.2, 8.9, -6.9, 3.4, 0.1, 0.3, 3.0, 2.5, 6.9, 0.3, 1.0];




function createDataArray (periods, values, periodName, valueName) {
    let array = [];

    for (let i = 0; i < periods.length; i++) {
        let obj = {
            [periodName]: periods[i],
            [valueName]: values[i]
        };

        array.push(obj);
    }

    return array;
}

let dataSalar = createDataArray(months, salar2017, "month", "salary");
let dataGdp = createDataArray(quarters, gdp2017, "quarter", "value");
let dataGdpStruct = createDataArray(gdpCategories, gdpStruct2017, "category", "value");
let dataIpi = createDataArray(months, ipi2017, "month", "value");

function DataTable(props) {
    let table = [];
    let row = "";
    let salar = salar2017;
    let gdp = gdp2017;
    let gdpStruct = gdpStruct2017;
    let ipi = ipi2017;

    if (props.year === "2017") {
        salar = salar2017;
        gdp = gdp2017;
        gdpStruct = gdpStruct2017;
        ipi = ipi2017;
    } else if (props.year === "2018") {
        salar = salar2018;
        gdp = gdp2018;
        gdpStruct = gdpStruct2018;
        ipi = ipi2018;
    } else if (props.year === "2019") {
        salar = salar2019;
        gdp = gdp2019;
        gdpStruct = gdpStruct2019;
        ipi = ipi2019;
    }

    let header = (
        <tr key={"header"}>
            <th>{props.periodName}</th>
            <th>{props.valueName}</th>
        </tr>
    );

    table.push(header);

    if (props.typeData === "salary") {
        for(let i = 0; i < 12; i++) {
            row = (
                <tr key={salar[i]}>
                    <td>{months[i]}</td>
                    <td>{salar[i]}</td>
                </tr>
            )

            table.push(row);
        }

        dataSalar = createDataArray(months, salar, "month", "salary");
    } else if (props.typeData === "gdp") {
        for(let i = 0; i < 4; i++) {
            row = (
                <tr key={gdp[i]}>
                    <td>{quarters[i]}</td>
                    <td>{gdp[i]}</td>
                </tr>
            )

            table.push(row);
        }

        dataGdp = createDataArray(quarters, gdp, "quarter", "value");
    } else if (props.typeData === "gdpStruct") {
        for (let i = 0; i < gdpStruct.length; i++) {
            row = (
                <tr key={gdpStruct[i]}>
                    <td>{gdpCategories[i]}</td>
                    <td>{gdpStruct[i]}</td>
                </tr>
            );

            table.push(row);
        }

        dataGdpStruct = createDataArray(gdpCategories, gdpStruct, "category", "value");
    } else if (props.typeData === "ipi") {
        for (let i = 0; i < 12; i++) {
            row = (
                <tr key={months[i]}>
                    <td>{months[i]}</td>
                    <td>{ipi[i]}</td>
                </tr>
            );

            table.push(row);
        }

        dataIpi = createDataArray(months, ipi, "month", "value");
    }

    return <table><tbody>{table}</tbody></table>;
}


function buildSalarChart(data) {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdivSalary", am4charts.XYChart3D);

    // Add data
    chart.data = data;
    
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = "right";
    categoryAxis.tooltip.label.verticalCenter = "middle";
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Зарплата грн./мес.";
    valueAxis.title.fontWeight = "bold";
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "salary";
    series.dataFields.categoryX = "month";
    series.name = "Visits";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .6;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");
    
    columnTemplate.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })
    
    columnTemplate.adapter.add("stroke", function(stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

    return chart;
}

function buildGDPChart(data) {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdivGDP", am4charts.XYChart3D);
    
    // Add data
    data = data.map(function(item) {
        item["color"] = chart.colors.next();

        return item;
      })
    
    chart.data = data;
    
    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "quarter";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    
    valueAxis.title.text = "ВВП млн. грн./квартал";
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueX = "value";
    series.dataFields.categoryY = "quarter";
    series.name = "Income";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.tooltipText = "{valueX}";
    series.columns.template.column3D.stroke = am4core.color("#fff");
    series.columns.template.column3D.strokeOpacity = 0.2;
    
};

function buildGDPStructChart(data) {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdivGDPStruct", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = data;

    chart.innerRadius = am4core.percent(40);
    chart.depth = 120;

    chart.legend = new am4charts.Legend();

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.depthValue = "value";
    series.dataFields.category = "category";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;

}

function buildIPIChart(data) {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdivIPI", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart.data = data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.minGridDistance = 40;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "% относительно предыдущего месяца";

    var series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = "month";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;

    series.columns.template.fillOpacity = 0.75;

    var hoverState = series.columns.template.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.tension = 0.4;

    chart.cursor = new am4charts.XYCursor();

    // Add distinctive colors for each column using adapter
    series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
    });

    chart.scrollbarX = new am4core.Scrollbar();

}



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "year": "2017",
        };

        this.changeYear = this.changeYear.bind(this);
    }

    changeYear(e) {
        this.setState({
            "year": e.target.dataset.year,
          });
        
        const year2017Button = document.querySelector('.year2017');
        const year2018Button = document.querySelector('.year2018');
        const year2019Button = document.querySelector('.year2019');
        const mainHeader = document.querySelector('h1');
        
        if (e.target.classList.contains("year2017")) {
            year2017Button.classList.add('year2017-active');
            year2018Button.classList.remove('year2018-active');
            year2019Button.classList.remove('year2019-active');
            mainHeader.classList.remove('header-2018', 'header-2019');
            mainHeader.classList.add('header-2017');
        } else if (e.target.classList.contains("year2018")) {
            year2017Button.classList.remove('year2017-active');
            year2018Button.classList.add('year2018-active');
            year2019Button.classList.remove('year2019-active');
            mainHeader.classList.remove('header-2017', 'header-2019');
            mainHeader.classList.add('header-2018');
        } else if (e.target.classList.contains("year2019")) {
            year2017Button.classList.remove('year2017-active');
            year2018Button.classList.remove('year2018-active');
            year2019Button.classList.add('year2019-active');
            mainHeader.classList.remove('header-2017', 'header-2018');
            mainHeader.classList.add('header-2019');
        }
    }

    componentDidMount() {
        buildSalarChart(dataSalar);
        buildGDPChart(dataGdp);
        buildGDPStructChart(dataGdpStruct);
        buildIPIChart(dataIpi);
    }

    componentDidUpdate() {
        buildSalarChart(dataSalar);
        buildGDPChart(dataGdp);
        buildGDPStructChart(dataGdpStruct);
        buildIPIChart(dataIpi);
    }
    
    render() {

        return (
            <div>
                <header>
                    <h1 className="header-2017">Средняя зарплата и ВВП в Украине</h1>
                    <h2>Выберите год:</h2>
                    <div className="year-buttons">
                        <div className="year-button year2017 year2017-active" data-year="2017" onClick={this.changeYear}>2017</div>
                        <div className="year-button year2018" data-year="2018" onClick={this.changeYear}>2018</div>
                        <div className="year-button year2019" data-year="2019" onClick={this.changeYear}>2019</div>
                    </div>
                </header>
                <div className="average-salary-container">
                    <h2>Средняя зарплата в Украине за {this.state.year} год</h2>
                    <div className="average-salary">
                        <DataTable year={this.state.year} periodName={"Месяц"} valueName={"Зарплата грн./мес."} periodNamesArray={months} typeData={"salary"} />
                        <div id="chartdivSalary"></div>
                    </div>
                </div>
                
                <div className="gdp-struct-container">
                    <h2>Структура внутреннего валового продукта в Украине за {this.state.year} год</h2>
                    <div className="gdp-struct">
                        <DataTable year={this.state.year} periodName={"Категория"} valueName={"% от валового ВВП"} periodNamesArray={gdpCategories} typeData={"gdpStruct"} />
                        <div id="chartdivGDPStruct"></div>
                    </div>
                </div>
                <div className="ipi-container">
                    <h2>Индекс промышленного производства в Украине за {this.state.year} год</h2>
                    <div className="ipi">
                        <DataTable year={this.state.year} periodName={"Месяц"} valueName={"% относительно предыдущего месяца"} periodNamesArray={months} typeData={"ipi"} />
                        <div id="chartdivIPI"></div>
                    </div>
                </div>
                <div className="gdp-container">
                    <h2>Внутренний валовый продукт в Украине за {this.state.year} год.</h2>
                    <div className="gdp">
                        <DataTable year={this.state.year} periodName={"Квартал"} valueName={"ВВП млн. грн./квт."} periodNamesArray={quarters} typeData={"gdp"} />
                        <div id="chartdivGDP"></div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));