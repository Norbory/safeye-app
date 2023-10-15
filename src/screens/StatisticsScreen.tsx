import React, {useState,useEffect} from "react";
import { 
  StyleSheet, 
  Button, 
  View, 
  ScrollView, 
  Pressable, 
  Text
} from "react-native";
import { 
  VictoryBar,
  VictoryChart, 
  VictoryAxis,
  VictoryStack, 
  VictoryLabel,
  VictoryPie, 
  VictoryGroup 
} from 'victory-native';
import useReports from "../hooks/useReports";
import { Report } from "../types";


export function StatisticsScreen() {
  const [seeAdmonished, setSeeAdmonished] = useState(true);

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
  const mandilY = ContadorD("Mandil", reportList.filter((report) => report.Deleted)) + ContadorA("Mandil", reportList.filter((report) => report.Deleted));
  const guantesY = ContadorD("Guantes", reportList.filter((report) => report.Deleted)) + ContadorA("Guantes", reportList.filter((report) => report.Deleted));
  const lentesY = ContadorD("Lentes", reportList.filter((report) => report.Deleted)) + ContadorA("Lentes", reportList.filter((report) => report.Deleted));
  const orejerasY = ContadorD("Orejeras", reportList.filter((report) => report.Deleted)) + ContadorA("Orejeras", reportList.filter((report) => report.Deleted));
  const respiradorY = ContadorD("Respirador", reportList.filter((report) => report.Deleted)) + ContadorA("Respirador", reportList.filter((report) => report.Deleted));
  const totalitale = cascoY+mandilY+guantesY+lentesY+orejerasY+respiradorY

  const porcentaje = (epp:string)=>{
    let porcen;
    switch(epp){
      case("Casco"):
        porcen = Math.round(cascoY * 100/ totalitale);
        break;
      
      case("Mandil"):
        porcen = Math.round(mandilY * 100/ totalitale);
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
    { x: ".", y: mandilY, label: mandilY !== 0 ? `Mandil ${porcentaje("Mandil")}%` : "" },
    { x: ".", y: guantesY, label: guantesY !== 0 ? `Guantes ${porcentaje("Guantes")}%` : "" },
    { x: ".", y: lentesY, label: lentesY !== 0 ? `Lentes ${porcentaje("Lentes")}%` : "" },
    { x: ".", y: orejerasY, label: orejerasY !== 0 ? `Orejeras ${porcentaje("Orejeras")}%` : "" },
    { x: ".", y: respiradorY, label: respiradorY !== 0 ? `Respirador ${porcentaje("Respirador")}%` : "" },
  ];
  return (
    <ScrollView style={styles.container}>
      <VictoryChart domainPadding={3}>
        <VictoryLabel
          text="Estadísticas de Incidencias de la semana"
          x={205}
          y={30}
          textAnchor="middle"
          style={{ fill: "white" }}
        />
        <VictoryAxis
          label="EPPs"
          style={{
            axisLabel: { padding: 30, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" }
          }}
        />
        <VictoryAxis dependentAxis
          label="Incidencias"
          style={{
            axisLabel: { padding: 25, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" }
          }}
        />
        <VictoryStack
          colorScale={["green", "tomato"]}
        >
          <VictoryBar 
            data={[
              {x:"Casco", y:ContadorA("Casco",reportList.filter((report) => report.Deleted))},
              {x:"Mandil", y:ContadorA("Mandil",reportList.filter((report) => report.Deleted))},
              {x:"Guantes", y:ContadorA("Guantes",reportList.filter((report) => report.Deleted))},
              {x:"Lentes", y:ContadorA("Lentes",reportList.filter((report) => report.Deleted))},
              {x:"Orejeras", y:ContadorA("Orejeras",reportList.filter((report) => report.Deleted))},
              {x:"Respirador", y:ContadorA("Respirador",reportList.filter((report) => report.Deleted))}
            ]}
            labelComponent={<VictoryLabel dy={25} />}
            style={{ labels: { fill: "white",}}}
          />
          <VictoryBar 
            data={[
              {x:"Casco", y:ContadorD("Casco",reportList.filter((report) => report.Deleted))},
              {x:"Mandil", y:ContadorD("Mandil",reportList.filter((report) => report.Deleted))},
              {x:"Guantes", y:ContadorD("Guantes",reportList.filter((report) => report.Deleted))},
              {x:"Lentes", y:ContadorD("Lentes",reportList.filter((report) => report.Deleted))},
              {x:"Orejeras", y:ContadorD("Orejeras",reportList.filter((report) => report.Deleted))},
              {x:"Respirador", y:ContadorD("Respirador",reportList.filter((report) => report.Deleted))}
            ]}
            labelComponent={<VictoryLabel dy={25} />}
            style={{ labels: { fill: "white" } }}
          />
        </VictoryStack>
      </VictoryChart>
      <Text style={{
          textAlign: "center", // Centrar el texto horizontalmente
          color: "white", // Cambiar el color del texto a blanco
          fontSize: 24, // Establecer el tamaño de fuente deseado
          fontWeight: "bold", // Otras propiedades de estilo como negrita, cursiva, etc.
          marginBottom: 10,
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
            fill: "white", // Cambiar el color del texto de las etiquetas a blanco
            fontSize: 16, // Establecer el tamaño de fuente deseado para las etiquetas
            fontWeight: "normal" // Establecer la fuente como normal
          } 
        }}
      />
      {/* <View style={{height:20}}></View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"20%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4390c6',
  },
});
