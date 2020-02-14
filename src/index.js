import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const quarters = ["I кв.", "II кв.", "III кв.", "IV кв."];
const salar2019 = [9223, 9429, 10237, 10269, 10239, 10783, 10971, 10537, 10687, 10727, 10679, 12264];
const salar2018 = [7711, 7828, 8382, 8480, 8725, 9141, 9170, 8977, 9042, 9218, 9161, 10573];
const salar2017 = [6008, 6209, 6752, 6659, 6840, 7360, 7339, 7114, 7351, 7377, 7479, 8777];
const gdp2019 = [807755, 927773, 1105520, 1176822];
const gdp2018 = [705013, 810820, 994850, 1048023];
const gdp2017 = [591008, 664760, 833130, 894022];


function createDataArray (months, salary) {
    let array = [];

    for (let i = 0; i < months.length; i++) {
        let obj = {
            "month": months[i],
            "salary": salary[i]
        };

        array.push(obj);
    }

    return array;
}

let data = createDataArray(months, salar2017);




/* am4core.ready( */
function buildChart(data) {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart3D);

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
}
/*     );  */

function SalarTable(props) {
    let table = [];
    let row = "";
    let salar = salar2017;

    if (props.year === "2017") {
        salar = salar2017;
    } else if (props.year === "2018") {
        salar = salar2018;
    } else if (props.year === "2019") {
        salar = salar2019;
    }

    let header = (
        <tr key={"header"}>
            <th>{"Месяц"}</th>
            <th>{"Зарплата грн."}</th>
        </tr>
    )

    table.push(header);

    for(let i = 0; i < 12; i++) {
        row = (
            <tr key={salar[i]}>
                <td>{months[i]}</td>
                <td>{salar[i]}</td>
            </tr>
        )

        table.push(row);
    }

    data = createDataArray(months, salar);

    return <table><tbody>{table}</tbody></table>;
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
        
        if (e.target.classList.contains("year2017")) {
            document.querySelector('.year2017').classList.add('year2017-active');
            document.querySelector('.year2018').classList.remove('year2018-active');
            document.querySelector('.year2019').classList.remove('year2019-active');
            document.querySelector('h1').classList.remove('header-2018', 'header-2019');
            document.querySelector('h1').classList.add('header-2017');
        } else if (e.target.classList.contains("year2018")) {
            document.querySelector('.year2017').classList.remove('year2017-active');
            document.querySelector('.year2018').classList.add('year2018-active');
            document.querySelector('.year2019').classList.remove('year2019-active');
            document.querySelector('h1').classList.remove('header-2017', 'header-2019');
            document.querySelector('h1').classList.add('header-2018');
        } else if (e.target.classList.contains("year2019")) {
            document.querySelector('.year2017').classList.remove('year2017-active');
            document.querySelector('.year2018').classList.remove('year2018-active');
            document.querySelector('.year2019').classList.add('year2019-active');
            document.querySelector('h1').classList.remove('header-2017', 'header-2018');
            document.querySelector('h1').classList.add('header-2019');
        }
       console.dir(e.target);
    }

    componentDidMount() {
        buildChart(data);
    }

    componentDidUpdate() {
        buildChart(data);
    }
    
    render() {
        return (
            <div>
                <header>
                    <h1 className="header-2017">Средняя зарплата и ВВП в Украине</h1>
                    <h2>Выберите год</h2>
                    <div className="year-buttons">
                        <div className="year-button year2017 year2017-active" data-year="2017" onClick={this.changeYear}>2017</div>
                        <div className="year-button year2018" data-year="2018" onClick={this.changeYear}>2018</div>
                        <div className="year-button year2019" data-year="2019" onClick={this.changeYear}>2019</div>
                    </div>
                </header>
                <div className="average-salary-container">
                    <h2>Средняя зарплата в Украине за {this.state.year} год.</h2>
                    <div className="average-salary">
                        <SalarTable year={this.state.year} />
                        <div id="chartdiv"></div>
                    </div>
                </div>
            </div>
        );
    }
}




ReactDOM.render(<App />, document.getElementById('root'));