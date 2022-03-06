import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet, View, SafeAreaView, Text, Pressable } from "react-native";
import { FAB } from "react-native-paper";
import { ItemsContext, DefinitionItem, IMyItem, ItemType } from "../context/Context";
import { tokens } from "../translations/Structure";
import { translate } from "../translations/translation";
import { useContext } from "react";
import { StackViews } from "../helpers/types";
import { SwipeListView } from "react-native-swipe-list-view";
import { Entypo } from "@expo/vector-icons";
import { style } from "../../style";

export const ItemsList: React.FC<NativeStackScreenProps<StackViews, "List">> = (props) => {
  const { items, deleteItem } = useContext(ItemsContext);

  const component = ({ item }: { item: IMyItem }) => {
    return (
      <DefinitionItem
        id={item.id}
        name={item.name}
        price={item.price}
        type={item.type}
        onClick={() => {
          props.navigation.navigate("EditItem", {
            item: {
              id: item.id,
              name: item.name,
              price: item.price,
              type: ItemType.peripheral},
              add: false});
            }}/>
            );
          };

  return (
    <SafeAreaView style={style.container}>
      <SwipeListView
        ListEmptyComponent={
          <View style={styles.noContent}>
            <Text style={styles.firstText}>
              {translate(tokens.screens.list.noData)}
            </Text>
          </View>
        }
        data={items}
        renderItem={component}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <Pressable>
              <Entypo
                name="trash"
                size={25}
                color="#000000"
                onPress={() => {
                  deleteItem(data.item.id);
                }}
              />
            </Pressable>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />

      <View style={styles.fabContainer}>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {
            props.navigation.navigate("EditItem", {
              item: {
                id: -1,
                name: "",
                price: 0,
                type: ItemType.peripheral
              },
              add: true,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  rowBack: {
    position: "absolute",
    right: 0,
    top: "35%",
    bottom: 0,
    marginRight: 24,
    alignItems: "center",
  },
  noContent: {
    flex: 4,
    marginTop: "60%",
    marginHorizontal: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  firstText: {
    textAlign: "center",
    top: -165,
    fontSize: 25,
    fontWeight: "bold",
  },

  fabContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  fab: {
    position: "absolute",
    backgroundColor: "#C12121",
    margin: 40,
    right: 0,
    bottom: 0,
  },
});