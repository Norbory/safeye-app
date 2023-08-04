import { StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions } from "react-native";
import Card from "../components/Card"

const { width } = Dimensions.get("window");


export function HomeScreen() {
  
  const cardsData = [
    {
      backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZcyRTo3pKbz74GcVSvfZOJLlJZWqnyYu1w&usqp=CAU",
    },
    {
      backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZcyRTo3pKbz74GcVSvfZOJLlJZWqnyYu1w&usqp=CAU",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {cardsData.map((cardData, index) => (
            <Card
              key={index}
              backgroundImage={cardData.backgroundImage}
              onGreenButtonPress={() => {}}
              onRedButtonPress={() => {}}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex:1,
    marginHorizontal: 20,
    
  },
});
