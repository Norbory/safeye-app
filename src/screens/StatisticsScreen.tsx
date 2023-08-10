import { StyleSheet, Text, View } from "react-native";
import { VictoryBar,VictoryChart, VictoryAxis } from 'victory-native';

export function StatisticsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <VictoryChart domainPadding={40}>

      </VictoryChart>
      {/* <VictoryChart
                    domainPadding={{x: 40}}
      >
        <VictoryBar
          data={[
            { experiment: "trial 1", expected: 3.75, actual: 3.21 },
            { experiment: "trial 2", expected: 3.75, actual: 3.38 },
            { experiment: "trial 3", expected: 3.75, actual: 2.05 },
            { experiment: "trial 4", expected: 3.75, actual: 3.71 }
          ]}
          x="experiment"
          y={(d) => (d.actual / d.expected) * 100}
        />
        <VictoryAxis
          label="experiment"
          style={{
            axisLabel: { padding: 30 }
          }}
        />
        <VictoryAxis dependentAxis
          label="percent yield"
          style={{
            axisLabel: { padding: 40 }
          }}
        />
      </VictoryChart> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
