import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const salar2019 = [9223, 9429, 10237, 10269, 10239, 10783, 10971, 10537, 10687, 10727, 10679, 12264];

function SalarTable() {
    let table = [];
    let row = "";

    let header = (
        <tr>
            <th>{"Месяц"}</th>
            <th>{"Зарплата грн."}</th>
        </tr>
    )

    table.push(header);

    for(let i = 0; i < 12; i++) {
        row = (
            <tr>
                <td>{months[i]}</td>
                <td>{salar2019[i]}</td>
            </tr>
        )

        table.push(row);
    }

    console.dir(table);

    return <table>{table}</table>;
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div>
                <header>
                    <h1>Средняя зарплата и ВВП в Украине</h1>
                    <h2>Выберите год</h2>
                </header>
                <SalarTable />
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
