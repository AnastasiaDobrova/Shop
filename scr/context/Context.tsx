import React, { createContext, useState, FC, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Caption, Card, Divider, IconButton, Paragraph, Title, useTheme} from "react-native-paper";
import {StyleSheet, Text, View} from 'react-native';

export enum ItemType {
  integrated = 1,
  peripheral = 0,
}

export interface DefinitionItem {
  id: number;
  name: string;
  price: number;
  type: ItemType.peripheral;
}

export interface IMyItem {
  id: number;
  name: string;
  price: number;
  type: ItemType.peripheral;
}

interface IMyItemComp extends IMyItem {
  onClick: () => void;
}

export const DefinitionItem: React.FC<IMyItemComp> = (props) => {
  
  return (
    <Card.Title 
      title={props.name}
      left={() => <Text>${props.price}</Text>}
      right={() => <IconButton icon="eye" onPress={props.onClick} />}
      style={styles.card}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#a1f0c7",
    paddingBottom: 4,
    margin: 8,
    borderRadius: 6
  }
  
});
export interface IMyList extends Array<DefinitionItem> {}

export interface ItemsContextState {
  items: IMyList;
  addItem: (item: DefinitionItem) => void;
  editItem: (item: DefinitionItem) => void;
  deleteItem: (id: Number) => void;
};

export const contextItemDefault: ItemsContextState = {
  items: [],
  addItem: () => {},
  editItem: () => {},
  deleteItem: () => {},
};


export const ItemsContext = createContext<ItemsContextState>(contextItemDefault);

const ItemsProvider: React.FC = ({ children }) => {
  const [items, setItems] = useState(contextItemDefault.items);

  useEffect(() => {
    const init = async () => {
      const itemsText = await AsyncStorage.getItem("items");
      if (itemsText && itemsText.length > 0) {
        setItems(JSON.parse(itemsText) as DefinitionItem[]);
      }
    };
    init();
  }, []);

  const addItem = async (newItem: DefinitionItem) => {
    setItems((items) => [...items, newItem]);
    await saveDataToAsyncStorage([...items, newItem]);
  };

  const editItem = (updItem: DefinitionItem) => {
    items.filter(async (item: DefinitionItem) => {
      if (item.id === updItem.id) {
        item.id = updItem.id;
        item.name = updItem.name;
        item.price = updItem.price;
        item.type = updItem.type;
        setItems([...items]);
        await saveDataToAsyncStorage([...items]);
      }
    });
  };

  const deleteItem = async (id: Number) => {
    const newList = items.filter((item) => item.id !== id);
    setItems(newList);
    await saveDataToAsyncStorage(newList);
  };

  const saveDataToAsyncStorage = async (value: DefinitionItem[]) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        addItem,
        editItem,
        deleteItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;