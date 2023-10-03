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
  VictoryArea, 
  VictoryGroup 
} from 'victory-native';
import useReports from "../hooks/useReports";
import { Report } from "../types";


export function StatisticsScreen() {
  const [data,setData] = useState([
    {
      EPP: "Casco", 
      status:{aprobados: 0, descartados:0}
    },
    {
      EPP: "Mandil", 
      status:{aprobados: 0, descartados:0}
    },
    {
      EPP: "Guantes",
      status:{aprobados: 0, descartados:0}
    },
    {
      EPP: "Lentes", 
      status:{aprobados: 0, descartados:0}
    },
    {
      EPP: "Orejeras", 
      status:{aprobados: 0, descartados:0}
    },
    {
      EPP: "Respirador", 
      status:{aprobados: 0, descartados:0}
    }
  ]);
  
  const [selectedLine, setSelectedLine] = useState("todas");
  const reportList = useReports();
  
  // Datos para la tabla
  useEffect(() => {
    const updateData = [
      {
        EPP: "Casco", 
        status:{aprobados: 0, descartados:0}
      },
      {
        EPP: "Mandil", 
        status:{aprobados: 0, descartados:0}
      },
      {
        EPP: "Guantes",
        status:{aprobados: 0, descartados:0}
      },
      {
        EPP: "Lentes", 
        status:{aprobados: 0, descartados:0}
      },
      {
        EPP: "Orejeras", 
        status:{aprobados: 0, descartados:0}
      },
      {
        EPP: "Respirador", 
        status:{aprobados: 0, descartados:0}
      }
    ];
      if (reportList.length > 0) {
        reportList.forEach((report: Report) => {
          const epps = report.EPPs;
          epps.forEach((epp: string) => {
            for (let i=0; i<6; i++){
              if(updateData[i].EPP === epp){
                if(report.Reported===true){
                  updateData[i].status.aprobados++
                } else{
                  updateData[i].status.descartados++
                }
              }
            }
          });
        });
      }
      setData(updateData);
  }, [reportList]);

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
        <Pressable style={styles.button} onPress={() => handleLineButtonClick("primera linea")}>
          <Text>Casco</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleLineButtonClick("segunda linea")}>
          <Text>Mandil</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleLineButtonClick("tercera linea")}>
          <Text>Guantes</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop:"5%"}}>
      <Pressable style={styles.button} onPress={() => handleLineButtonClick("cuarta linea")}>
          <Text>Lentes</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleLineButtonClick("quinta linea")}>
          <Text>Orejeras</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleLineButtonClick("sexta linea")}>
          <Text>Respirador</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop:"5%"}}>
        <Pressable style={styles.button} onPress={() => handleLineButtonClick("todas")}>
          <Text>Todos</Text>
        </Pressable>
      </View>

      <VictoryChart width={400} height={400} >
        <VictoryAxis
          label="Dia"
          style={{
            axisLabel: { padding: 30, fill: "white" },
            tickLabels: { fill: "white", padding: 20 },
            axis: { stroke: "white" },
          }}
          tickLabelComponent={<VictoryLabel dy={-10}/>}
        />
        <VictoryAxis dependentAxis
          style={{
            tickLabels: { fill: "white" },
            axis: { stroke: "white" }
          }}
        />
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity:0 }
          }}
        >
          {selectedLine === "primera linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: {stroke: "cyan" }
            }}
            data={[
              { x: "Lu", y: 2 },
              { x: "Ma", y: 3 },
              { x: "Mi", y: 5 },
              { x: "Ju", y: 4 },
              { x: "Vi", y: 7 },
              { x: "Sa", y: 7 },
              { x: "Do", y: 4 }
            ]}
          />
          ) : null}
          {selectedLine === "segunda linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: {stroke: "magenta" }
            }}
            data={[
              { x: "Lu", y: 3 },
              { x: "Ma", y: 2 },
              { x: "Mi", y: 6 },
              { x: "Ju", y: 2 },
              { x: "Vi", y: 6 },
              { x: "Sa", y: 5 },
              { x: "Do", y: 4 }
            ]}
          />
          ) : null}
          {selectedLine === "tercera linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: {stroke: "white" }
            }}
            data={[
              { x: "Lu", y: 2 },
              { x: "Ma", y: 1 },
              { x: "Mi", y: 4 },
              { x: "Ju", y: 2 },
              { x: "Vi", y: 7 },
              { x: "Sa", y: 2 },
              { x: "Do", y: 4 }
            ]}
          />
          ) : null}
          {selectedLine === "cuarta linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: {stroke: "tomato" }
            }}
            data={[
              { x: "Lu", y: 2 },
              { x: "Ma", y: 2 },
              { x: "Mi", y: 3 },
              { x: "Ju", y: 3 },
              { x: "Vi", y: 2 },
              { x: "Sa", y: 3 },
              { x: "Do", y: 5 }
            ]}
          />
          ) : null}
          {selectedLine === "quinta linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: {stroke: "gold" }
            }}
            data={[
              { x: "Lu", y: 1 },
              { x: "Ma", y: 9 },
              { x: "Mi", y: 1 },
              { x: "Ju", y: 4 },
              { x: "Vi", y: 3 },
              { x: "Sa", y: 2 },
              { x: "Do", y: 4 }
            ]}
          />
          ) : null}
          {selectedLine === "sexta linea" || selectedLine === "todas" ? (
          <VictoryArea
            style={{
              data: {stroke: "orange" }
            }}
            data={[
              { x: "Lu", y: 2 },
              { x: "Ma", y: 1 },
              { x: "Mi", y: 5 },
              { x: "Ju", y: 1 },
              { x: "Vi", y: 4 },
              { x: "Sa", y: 3 },
              { x: "Do", y: 8 }
            ]}
          />
          ) : null}
        </VictoryGroup>
      </VictoryChart>
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
