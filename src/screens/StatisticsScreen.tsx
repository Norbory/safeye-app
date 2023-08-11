import React, {useState} from "react";
import { 
  StyleSheet, 
  Button, 
  View, 
  ScrollView 
} from "react-native";
import { 
  VictoryBar,
  VictoryChart, 
  VictoryAxis,
  VictoryStack, 
  VictoryLabel, 
  VictoryArea, 
  VictoryGroup 
} from 'victory-native';

export function StatisticsScreen() {
  const [selectedLine, setSelectedLine] = useState("todas");

  // Datos para la tabla
  const data= [
    {
      EPP: "Casco", 
      status:{aprobados: 4, descartados:2}
    },
    {
      EPP: "Mandiles", 
      status:{aprobados: 3, descartados:2}
    },
    {
      EPP: "Guantes", 
      status:{aprobados: 5, descartados:2}
    },
    {
      EPP: "Lentes", 
      status:{aprobados: 2, descartados:2}
    },
    {
      EPP: "Orejeras", 
      status:{aprobados: 2, descartados:2}
    }
  ];

  const handleLineButtonClick = (line: any) => {
    setSelectedLine(line);
  };

  return (
    <ScrollView style={styles.container}>
      <VictoryChart domainPadding={10}>
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
            axisLabel: { padding: 25, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" }
          }}
        />
        <VictoryStack
          colorScale={["green", "red"]}
        >
          <VictoryBar 
            data={data}
            x="EPP"
            y={["status","aprobados"]}
            labels={({ datum }) => datum.status.aprobados}
            labelComponent={<VictoryLabel dy={25} />}
            style={{ labels: { fill: "white",}}}
          />
          <VictoryBar 
            data={data}
            x="EPP"
            y={["status","descartados"]}
            labels={({ datum }) => datum.status.descartados}
            labelComponent={<VictoryLabel dy={25} />}
            style={{ labels: { fill: "white" } }}
          />
        </VictoryStack>
      </VictoryChart>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop:"5%"}}>
        <Button title="Helmet" onPress={() => handleLineButtonClick("primera linea")}/>
        <Button title="Gloves" onPress={() => handleLineButtonClick("segunda linea")} />
        <Button title="All" onPress={() => handleLineButtonClick("todas")} />
      </View>
      <VictoryChart width={400} height={400} >
        <VictoryAxis
          label="Dia"
          style={{
            axisLabel: { padding: 40, fill: "white" },
            tickLabels: { fill: "white", padding: 20 },
            axis: { stroke: "white" },
          }}
          tickLabelComponent={<VictoryLabel angle={-60} dy={8} dx={-8}/>}
        />
        <VictoryAxis dependentAxis
          style={{
            tickLabels: { fill: "white" },
            axis: { stroke: "white" }
          }}
        />
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.4 }
          }}
        >
          {selectedLine === "primera linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: { fill: "cyan", stroke: "cyan" }
            }}
            data={[
              { x: "Monday", y: 2 },
              { x: "Tuesday", y: 3 },
              { x: "Wednesday", y: 5 },
              { x: "Thursday", y: 4 },
              { x: "Friday", y: 7 },
              { x: "Saturday", y: 7 },
              { x: "Sunday", y: 4 }
            ]}
          />
          ) : null}
          {selectedLine === "segunda linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: { fill: "magenta", stroke: "magenta" }
            }}
            data={[
              { x: "Monday", y: 3 },
              { x: "Tuesday", y: 2 },
              { x: "Wednesday", y: 6 },
              { x: "Thursday", y: 2 },
              { x: "Friday", y: 6 },
              { x: "Saturday", y: 5 },
              { x: "Sunday", y: 4 }
            ]}
          />
          ) : null}
        </VictoryGroup>
      </VictoryChart>
      <View style={{height:40}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"20%",
  },
});
