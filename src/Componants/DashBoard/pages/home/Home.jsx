import "./home.css"
import TopBox from "../../maincomponants/TopBox/TopBox"
import ChartBox from "../../maincomponants/ChartBox/ChartBox"
import BarChartBox from "../../maincomponants/BarChartBox/BarChartBox"
import PieChartBox from "../../maincomponants/PieChartBox/PieChartBox"
import BigChartBox from "../../maincomponants/BigChartComponant/BigChartBox"
import { Sales, barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser, soldProducts } from "../../../../data"



export default function Home(){
    return(
        <div className="home">
            <div className="box box1">
                <TopBox></TopBox>
            </div>
            <div className="box box2"><ChartBox {...chartBoxUser}></ChartBox></div>
            <div className="box box3"><ChartBox {...chartBoxProduct}></ChartBox></div>
            <div className="box box4"><PieChartBox data={[...soldProducts]}></PieChartBox></div>
            <div className="box box5"><ChartBox {...chartBoxConversion}></ChartBox></div>
            <div className="box box6"><ChartBox {...chartBoxRevenue}></ChartBox></div>
            <div className="box box7"><BigChartBox data={[...Sales]}/></div>
            <div className="box box8"><BarChartBox {...barChartBoxRevenue}></BarChartBox></div>
            <div className="box box9"><BarChartBox {...barChartBoxVisit}></BarChartBox></div>


        </div>
    )
}