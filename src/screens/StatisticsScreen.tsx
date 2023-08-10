import React from "react";
import { 
  StyleSheet, 
  StatusBar, 
  Text, 
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
      <VictoryChart width={400} height={400}>
        <VictoryAxis
          label="Dia"
          style={{
            axisLabel: { padding: 30, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
          }}
          tickLabelComponent={<VictoryLabel angle={-60} dy={5} dx={-10}/>}
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
          <VictoryArea
            style={{
              data: { fill: "cyan", stroke: "cyan" }
            }}
            data={[
              { x: "Lunes", y: 2 },
              { x: "Martes", y: 3 },
              { x: "Miercoles", y: 5 },
              { x: "Jueves", y: 4 },
              { x: "Viernes", y: 7 },
              { x: "Sabado", y: 7 },
              { x: "Domingo", y: 4 }
            ]}
          />
          <VictoryArea
            style={{
              data: { fill: "magenta", stroke: "magenta" }
            }}
            data={[
              { x: "Lunes", y: 3 },
              { x: "Martes", y: 2 },
              { x: "Miercoles", y: 6 },
              { x: "Jueves", y: 2 },
              { x: "Viernes", y: 6 },
              { x: "Sabado", y: 5 },
              { x: "Domingo", y: 4 }
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
      <VictoryChart width={400} height={400}>
        <VictoryAxis
          label="Dia"
          style={{
            axisLabel: { padding: 100, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
          }}
          tickLabelComponent={<VictoryLabel angle={-60} dy={5} dx={-10}/>}
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
          <VictoryArea
            style={{
              data: { fill: "cyan", stroke: "cyan" }
            }}
            data={[
              { x: "Lunes", y: 2 },
              { x: "Martes", y: 3 },
              { x: "Miercoles", y: 5 },
              { x: "Jueves", y: 4 },
              { x: "Viernes", y: 7 },
              { x: "Sabado", y: 7 },
              { x: "Domingo", y: 4 }
            ]}
          />
          <VictoryArea
            style={{
              data: { fill: "magenta", stroke: "magenta" }
            }}
            data={[
              { x: "Lunes", y: 3 },
              { x: "Martes", y: 2 },
              { x: "Miercoles", y: 6 },
              { x: "Jueves", y: 2 },
              { x: "Viernes", y: 6 },
              { x: "Sabado", y: 5 },
              { x: "Domingo", y: 4 }
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
