import React, {useState,useEffect} from "react";
import { 
  StyleSheet, 
  ScrollView,
  View,
  Text,
  TouchableOpacity
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
  const [selectedDateRange, setSelectedDateRange] = useState("semana");
  const [filteredReportList, setFilteredReportList] = useState<Report[]>(reportList);

  useEffect(() => {
    filterReportsByDateRange();
  }, [selectedDateRange]);

  const filterReportsByDateRange = () => {
    const currentDate = new Date();
    const endDate = new Date();
    
    switch (selectedDateRange) {
      case "semana":
        endDate.setDate(endDate.getDate() - 7);
        break;
      case "mes":
        endDate.setMonth(endDate.getMonth() - 1);
        break;
      case "anual":
        endDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        break;
    }

    const filteredReports = reportList.filter((report) => {
      const reportDate = new Date(report.date);
      return reportDate >= endDate && reportDate <= currentDate;
    });

    setFilteredReportList(filteredReports);
  };

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

  const cascoD = ContadorD("Casco", filteredReportList.filter((report) => report.Deleted));
  const ChalecoD = ContadorD("Chaleco", filteredReportList.filter((report) => report.Deleted));
  const guantesD = ContadorD("Guantes", filteredReportList.filter((report) => report.Deleted));
  const lentesD = ContadorD("Lentes", filteredReportList.filter((report) => report.Deleted));
  const orejerasD = ContadorD("Orejeras", filteredReportList.filter((report) => report.Deleted));
  const respiradorD = ContadorD("Respirador", filteredReportList.filter((report) => report.Deleted));

  const cascoA = ContadorA("Casco", filteredReportList.filter((report) => report.Deleted));
  const ChalecoA = ContadorA("Chaleco", filteredReportList.filter((report) => report.Deleted));
  const guantesA = ContadorA("Guantes", filteredReportList.filter((report) => report.Deleted));
  const lentesA = ContadorA("Lentes", filteredReportList.filter((report) => report.Deleted));
  const orejerasA = ContadorA("Orejeras", filteredReportList.filter((report) => report.Deleted));
  const respiradorA = ContadorA("Respirador", filteredReportList.filter((report) => report.Deleted));

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
    { x: cascoY !== 0 ? `Casco ${porcentaje("Casco")}%` : ".", y: cascoY  },
    { x: ChalecoY !== 0 ? `Chaleco ${porcentaje("Chaleco")}%` : "." , y: ChalecoY},
    { x: guantesY !== 0 ? `Guantes ${porcentaje("Guantes")}%` : ".", y: guantesY},
    { x: lentesY !== 0 ? `Lentes ${porcentaje("Lentes")}%` : "." , y: lentesY},
    { x: orejerasY !== 0 ? `Orejeras ${porcentaje("Orejeras")}%` : "." , y: orejerasY},
    { x: respiradorY !== 0 ? `Respirador ${porcentaje("Respirador")}%` : ".", y: respiradorY },
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

  return (
    <ScrollView style={styles.container}>
      {/* Grafica de barras */}
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>
        Estadísticas de la semana
      </Text>
      {/* Los botones selectores */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.dateButton, selectedDateRange === "semana" && styles.selectedButton]}
          onPress={() => setSelectedDateRange("semana")}
        >
          <Text style={styles.buttonText}>Última semana</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateButton, selectedDateRange === "mes" && styles.selectedButton]}
          onPress={() => setSelectedDateRange("mes")}
        >
          <Text style={styles.buttonText}>Último mes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateButton, selectedDateRange === "anual" && styles.selectedButton]}
          onPress={() => setSelectedDateRange("anual")}
        >
          <Text style={styles.buttonText}>Último año</Text>
        </TouchableOpacity>
      </View>

      {/* Si no hay reportes para mostrar */}
      {filteredReportList.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay reportes para estadísticas</Text>
      )}

      {/* <Boton title="Ramdom" onPress={updateChartData} /> */}
      {filteredReportList.length > 0 && (
        <View style={{ marginTop: 0, marginLeft:15 }}>
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
          colorScale={["tomato", "green"]}
        >
          <VictoryBar 
            data={barDataD}
          />

          <VictoryBar 
            data={barDataA}
          />

        </VictoryStack>
      </VictoryChart>
      </View>
      )}
      
      {/* Grafica de pie */}
        <>
        {filteredReportList.length > 0 && (
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
        )}
        <VictoryPie
          colorScale={["#f4f1de", "#e07a5f", "#90e0ef", "#81b29a", "#f2cc8f", "#fcbf49"]}
          data={data}
          labelRadius={({ innerRadius = 0 }) => (innerRadius as number) + 40 }
          innerRadius={40}
          style={{
            labels: {
              fill: "#252525", 
              fontSize: 13, 
              fontWeight: "bold",
              textAnchor: "middle"
            }
          }}
        />
        </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"20%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  dateButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
