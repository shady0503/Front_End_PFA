import { Link } from 'react-router-dom'
import './ChartBox.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ChartBox(props) {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src={props.icon} alt="" />
                    <span>{props.title}</span>
                </div>
                <h1 className='dataNumber'>{props.number}</h1>
                <Link to="/Dashboard">View ALL</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart width={300} height={100} data={props.chartData}>
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 10, y: 80 }}
                            />
                            <Line type="monotone" dataKey={props.dataKey} stroke={props.color} strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span className="percentage"  style={{color: props.percentage<0 ? "red" : "green"}}>{props.percentage}%</span>
                    <span className="duration">This month</span>
                </div>
            </div>
        </div>
    )
}