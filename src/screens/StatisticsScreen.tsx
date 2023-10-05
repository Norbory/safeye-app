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

  const filteredReports = seeAdmonished
  ? reportList.filter((report) => report.Reported)
  : reportList.filter((report) => !report.Reported);

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

  return (
    <ScrollView style={styles.container}>
      <VictoryChart domainPadding={2}>
        <VictoryLabel
          text="Estadísticas de Incidencias de la semana"
          x={195}
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
            axisLabel: { padding: 32, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" }
          }}
        />
        <VictoryStack
          colorScale={["green", "tomato"]}
        >
          <VictoryBar 
            data={[
              {x:"Casco", y:ContadorA("Casco",reportList)},
              {x:"Mandil", y:ContadorA("Mandil",reportList)},
              {x:"Guantes", y:ContadorA("Guantes",reportList)},
              {x:"Lentes", y:ContadorA("Lentes",reportList)},
              {x:"Orejeras", y:ContadorA("Orejeras",reportList)},
              {x:"Respirador", y:ContadorA("Respirador",reportList)}
            ]}
            labelComponent={<VictoryLabel dy={25} />}
            style={{ labels: { fill: "white",}}}
          />
          <VictoryBar 
            data={[
              {x:"Casco", y:ContadorD("Casco",reportList)},
              {x:"Mandil", y:ContadorD("Mandil",reportList)},
              {x:"Guantes", y:ContadorD("Guantes",reportList)},
              {x:"Lentes", y:ContadorD("Lentes",reportList)},
              {x:"Orejeras", y:ContadorD("Orejeras",reportList)},
              {x:"Respirador", y:ContadorD("Respirador",reportList)}
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
        colorScale={["tomato", "orange", "gold", "cyan", "navy", "black" ]}
        data={[
          {x:1, y:ContadorD("Casco",reportList)+ContadorA("Casco",reportList), label:`Casco`},
          {x:2, y:ContadorD("Mandil",reportList)+ContadorA("Mandil",reportList), label:"Mandil"},
          {x:3, y:ContadorD("Guantes",reportList)+ContadorA("Guantes",reportList), label:"Guantes"},
          {x:4, y:ContadorD("Lentes",reportList)+ContadorA("Lentes",reportList), label:"Lentes"},
          {x:5, y:ContadorD("Orejeras",reportList)+ContadorA("Orejeras",reportList), label:"Orejeras"},
          {x:6, y:ContadorD("Respirador",reportList)+ContadorA("Respirador",reportList), label:"Respirador"},
        ]}
        labelRadius={({ innerRadius }) => innerRadius + 50 }
        radius={({ datum }) => 80 + datum.y * 20}
        innerRadius={50}
        style={{
          labels: {
            fill: "white", // Cambiar el color del texto de las etiquetas a blanco
            fontSize: 16, // Establecer el tamaño de fuente deseado para las etiquetas
            fontWeight: "normal" // Establecer la fuente como normal
          } 
        }}
      />
      <View style={{height:20}}></View>
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
