import React, {useState,useEffect} from "react";
import { 
  StyleSheet, 
  ScrollView,
  View,
  Text
} from "react-native";
import { 
  VictoryBar,
  VictoryChart, 
  VictoryAxis,
  VictoryStack, 
  VictoryPie, 
  VictoryLegend 
} from 'victory-native';
import useReports from "../hooks/useReports";
import { Report } from "../types";
// import Boton from "../components/button";

export function StatisticsScreen() {

  const reportList = useReports();

  const ContadorA = (epp: string, reports: Report[]) => {
    let cuenta = 0;
    reports.forEach((item) => {
      const epps = item.EPPs;
      if ((epps.includes(epp)) && (item.Reported === true)) {cuenta++;}
    });
    return cuenta;
  };

  const ContadorD = (epp: string, reports: Report[]) => {
    let cuenta = 0;
    reports.forEach((item) => {
      const epps = item.EPPs;
      if ((epps.includes(epp)) && (!item.Reported)) {cuenta+=1;}
    });
    return cuenta;
  };

  const cascoD = ContadorD("Casco", reportList.filter((report) => report.Deleted));
  const ChalecoD = ContadorD("Chaleco", reportList.filter((report) => report.Deleted));
  const guantesD = ContadorD("Guantes", reportList.filter((report) => report.Deleted));
  const lentesD = ContadorD("Lentes", reportList.filter((report) => report.Deleted));
  const orejerasD = ContadorD("Orejeras", reportList.filter((report) => report.Deleted));
  const respiradorD = ContadorD("Respirador", reportList.filter((report) => report.Deleted));

  const cascoA = ContadorA("Casco", reportList.filter((report) => report.Deleted));
  const ChalecoA = ContadorA("Chaleco", reportList.filter((report) => report.Deleted));
  const guantesA = ContadorA("Guantes", reportList.filter((report) => report.Deleted));
  const lentesA = ContadorA("Lentes", reportList.filter((report) => report.Deleted));
  const orejerasA = ContadorA("Orejeras", reportList.filter((report) => report.Deleted));
  const respiradorA = ContadorA("Respirador", reportList.filter((report) => report.Deleted));

  const cascoY = cascoA + cascoD;
  const ChalecoY = ChalecoA + ChalecoD;
  const guantesY = guantesA + guantesD;
  const lentesY = lentesA + lentesD;
  const orejerasY = orejerasA + orejerasD;
  const respiradorY = respiradorA + respiradorD;
  const totalitale = cascoY+ChalecoY+guantesY+lentesY+orejerasY+respiradorY

  const porcentaje = (epp:string)=>{
    let porcen;
    switch(epp){
      case("Casco"):
        porcen = Math.round(cascoY * 100/ totalitale);
        break;
      
      case("Chaleco"):
        porcen = Math.round(ChalecoY * 100/ totalitale);
        break;
      
      case("Guantes"):
        porcen = Math.round(guantesY * 100/ totalitale);
        break;
      
      case("Lentes"):
        porcen = Math.round(lentesY * 100/ totalitale);
        break;
      
      case("Orejeras"):
        porcen = Math.round(orejerasY * 100/ totalitale);
        break;
      
      case("Respirador"):
        porcen = Math.round(respiradorY * 100/ totalitale);
        break;
      
    }
    return porcen;
  }

  const data = [
    { x: ".", y: cascoY, label: cascoY !== 0 ? `Casco ${porcentaje("Casco")}%` : "" },
    { x: ".", y: ChalecoY, label: ChalecoY !== 0 ? `Chaleco ${porcentaje("Chaleco")}%` : "" },
    { x: ".", y: guantesY, label: guantesY !== 0 ? `Guantes ${porcentaje("Guantes")}%` : "" },
    { x: ".", y: lentesY, label: lentesY !== 0 ? `Lentes ${porcentaje("Lentes")}%` : "" },
    { x: ".", y: orejerasY, label: orejerasY !== 0 ? `Orejeras ${porcentaje("Orejeras")}%` : "" },
    { x: ".", y: respiradorY, label: respiradorY !== 0 ? `Respirador ${porcentaje("Respirador")}%` : "" },
  ];

  const barDataD = [
    { x: "Casco", y: cascoD },
    { x: "Chaleco", y: ChalecoD },
    { x: "Guantes", y: guantesD },
    { x: "Lentes", y: lentesD },
    { x: "Orejeras", y: orejerasD },
    { x: "Respirador", y: respiradorD },
  ];
  const barDataA = [
    { x: "Casco", y: cascoA },
    { x: "Chaleco", y: ChalecoA },
    { x: "Guantes", y: guantesA },
    { x: "Lentes", y: lentesA },
    { x: "Orejeras", y: orejerasA },
    { x: "Respirador", y: respiradorA },
  ];

  const [chartData, setChartData] = useState(barDataA);

  const updateChartData = () => {
    console.log("Updating chart data");
    const newChartData = chartData.map((bar) => {
      if (bar.x === "Respirador") {
        return { ...bar, y: respiradorA};
      }
      return bar;
    });
  
    setChartData(newChartData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Grafica de barras */}
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>
        Estadísticas de la semana
      </Text>
      {/* <Boton title="Ramdom" onPress={updateChartData} /> */}
      <View style={{ marginTop: 20, marginLeft:15 }}>
      <VictoryChart domainPadding={12}>
        <VictoryLegend x={105} y={25}
          orientation="horizontal"
          gutter={30}
          style={{ border: { stroke: "#252525" } }}
          data={[
            { name: "Descartados", symbol:{fill:"tomato"}}, { name: "Amonestados", symbol:{fill:"green"}}
          ]}
        />
        
        <VictoryAxis
          label="EPPs"
          style={{
            axisLabel: { padding: 30, fill: "#252525" },
            tickLabels: { fill: "#252525", fontSize: 10 },
            axis: { stroke: "#252525" }
          }}
        />
        <VictoryAxis dependentAxis
          label="Incidencias"
          style={{
            axisLabel: { padding: 40, fill: "#252525" },
            tickLabels: { fill: "#252525" },
            axis: { stroke: "#252525" }
          }}
        />
        
        <VictoryStack
          colorScale={["green", "tomato"]}
        >
          <VictoryBar 
            data={barDataD}
            style={{}}/>

          <VictoryBar 
            data={barDataA}
            style={{}}
          />

        </VictoryStack>
      </VictoryChart>
      </View>
      

      {/* Grafica de pie */}
      <Text style={{
          textAlign: "center",
          color: "#252525", 
          fontSize: 18, 
          fontWeight: "bold",
          marginTop:10,
          marginBottom: -40,
        }}>
        Grafica de incidentes
        </Text>
      <VictoryPie
        colorScale={["#007BFF", "#00D68F", "#FFD700", "#D2B48C", "#FFA500"]}
        data={data}
        labelRadius={({ innerRadius = 0 }) => (innerRadius as number) + 50 }
        innerRadius={45}
        style={{
          labels: {
            fill: "#252525", 
            fontSize: 16, 
            fontWeight: "normal" 
          } 
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"20%",
  }
});
