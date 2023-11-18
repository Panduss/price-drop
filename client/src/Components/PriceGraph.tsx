import "../App.css";
import * as Plot from "@observablehq/plot";
import {useRef, useEffect, LegacyRef, useState} from "react";
import { iPrice } from "../models";

const PriceGraph = ({data,}: {data:iPrice[]}) => {
    const ref: LegacyRef<HTMLDivElement> = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log({data})
        const mappedData = data.map(i => ({price:parseFloat(i.price), date: i.date}))

        const barChart = Plot.plot({
            marks: [
                Plot.barY(mappedData, {
                    x: "date",
                    y: "price",
                })
            ],
            y: { grid: true },
            marginLeft: 50,
            marginTop: 50,
            marginBottom: 50,
        })

        if (ref.current !== null) {
            ref.current.append(barChart);
        }

        return () => barChart.remove();
    }, [data]);

    return (
        <div>
            <div className="plot" ref={ref}></div>
        </div>
    );
}

export default PriceGraph;