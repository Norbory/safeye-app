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
  VictoryLabel,
  VictoryPie, 
  VictoryLegend 
} from 'victory-native';
import useReports from "../hooks/useReports";
import { Report } from "../types";


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

  const cascoY = ContadorD("Casco", reportList.filter((report) => report.Deleted)) + ContadorA("Casco", reportList.filter((report) => report.Deleted));
  const ChalecoY = ContadorD("Chaleco", reportList.filter((report) => report.Deleted)) + ContadorA("Chaleco", reportList.filter((report) => report.Deleted));
  const guantesY = ContadorD("Guantes", reportList.filter((report) => report.Deleted)) + ContadorA("Guantes", reportList.filter((report) => report.Deleted));
  const lentesY = ContadorD("Lentes", reportList.filter((report) => report.Deleted)) + ContadorA("Lentes", reportList.filter((report) => report.Deleted));
  const orejerasY = ContadorD("Orejeras", reportList.filter((report) => report.Deleted)) + ContadorA("Orejeras", reportList.filter((report) => report.Deleted));
  const respiradorY = ContadorD("Respirador", reportList.filter((report) => report.Deleted)) + ContadorA("Respirador", reportList.filter((report) => report.Deleted));
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
  return (
    <ScrollView style={styles.container}>
      {/* Grafica de barras */}
      <View style={{ marginTop: 20 }}>
      <VictoryChart domainPadding={12}>
        <VictoryLegend x={105} y={25}
          orientation="horizontal"
          gutter={30}
          style={{ border: { stroke: "#252525" } }}
          data={[
            { name: "Descartados", symbol:{fill:"tomato"}}, { name: "Amonestados", symbol:{fill:"green"}}
          ]}
        />
        <VictoryLabel
          text="Estadísticas de Incidencias de la semana"
          x={198}
          y={10}
          textAnchor="middle"
          style={{ fill: "#252525", fontSize:18, fontWeight: "bold" }}
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
            axisLabel: { padding: 30, fill: "#252525" },
            tickLabels: { fill: "#252525" },
            axis: { stroke: "#252525" }
          }}
        />
        <VictoryStack
          colorScale={["green", "tomato"]}
        >
          <VictoryBar 
            data={[
              {x:"Casco", y:ContadorA("Casco",reportList.filter((report) => report.Deleted))},
              {x:"Chaleco", y:ContadorA("Chaleco",reportList.filter((report) => report.Deleted))},
              {x:"Guantes", y:ContadorA("Guantes",reportList.filter((report) => report.Deleted))},
              {x:"Lentes", y:ContadorA("Lentes",reportList.filter((report) => report.Deleted))},
              {x:"Orejeras", y:ContadorA("Orejeras",reportList.filter((report) => report.Deleted))},
              {x:"Respirador", y:ContadorA("Respirador",reportList.filter((report) => report.Deleted))}
            ]}
            style={{}}
          />
          <VictoryBar 
            data={[
              {x:"Casco", y:ContadorD("Casco",reportList.filter((report) => report.Deleted))},
              {x:"Chaleco", y:ContadorD("Chaleco",reportList.filter((report) => report.Deleted))},
              {x:"Guantes", y:ContadorD("Guantes",reportList.filter((report) => report.Deleted))},
              {x:"Lentes", y:ContadorD("Lentes",reportList.filter((report) => report.Deleted))},
              {x:"Orejeras", y:ContadorD("Orejeras",reportList.filter((report) => report.Deleted))},
              {x:"Respirador", y:ContadorD("Respirador",reportList.filter((report) => report.Deleted))}
            ]}
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
        labelRadius={({ innerRadius }) => innerRadius + 50 }
        innerRadius={50}
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
