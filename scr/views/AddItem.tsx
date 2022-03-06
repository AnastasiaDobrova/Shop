import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, RadioButton, HelperText, TextInput, IconButton, Dialog, Provider, Portal, Paragraph } from "react-native-paper";
import { ItemsContext } from "../context/Context";
import { StackViews } from "../helpers/types";
import { tokens } from "../translations/Structure";
import { translate } from "../translations/translation";
import { ItemType } from '../context/Context';
import { style } from "../../style"


interface PropsEditItem extends NativeStackScreenProps<StackViews, "EditItem"> { }


export const AddItem: React.FC<PropsEditItem> = (props) => {
  const params = props.route.params
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemType, setItemType] = useState("0");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const { items, addItem, editItem } = useContext(ItemsContext);

  const showHideDialog = () => setDialogVisible(!dialogVisible);

  const goBack = () => {
    if (edit) {
      showHideDialog();
    } else {
      props.navigation.navigate("List");
    }
  };

  const getViewName = () => {
    if (params.add) {
      return translate(tokens.screens.editItem.createProduct);
    } else {
      return translate(tokens.screens.editItem.editProduct);
    }
  };

  const getInvalidValue = (type: number) => {
    if (type === 1) {
      console.log("type1", type);
      return translate(tokens.screens.editItem.notValidPrice);
    } else {
      console.log("type", type);
      return translate(tokens.screens.editItem.notValidRange);
    }
  };

  const notValidName = () => {
    if (name.trim() === "") {
      console.log("1");
      console.log("value 1: ", name);

      return true;
    } else {
      if (items.find((item) => item.name === name && item.id !== id)) {
        console.log("2");
        return true;
      } else {
        console.log("3");
        console.log("value 3: ", name);
        return false;
      }
    }
  };

  const notValidPrice = () => {
    if (Number(itemType) === 1 && Number(price) > 0) {
      return false;
    }
    else {
      if (price === "") {
        console.log("price1", Number(price));
        return true;
      } else {
        if (Number(price) >= 1000 && Number(price) <= 2600) {
          console.log("price2", Number(price));
          return false;
        } else {
          console.log("price3", Number(price));
          return true;
        }
      }
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      title: getViewName(),
      headerLeft: () => (
        <IconButton icon="arrow-left" onPress={() => {
          goBack();
        }}
        />
      ),
    });
    setId(params.item.id);
    setName(params.item.name);
    setPrice(String(params.item.price));
    setItemType(String(params.item.type));
  }, [edit]);


  return (
    <View style={style.container}>
      <TextInput
        mode="outlined"
        label={translate(tokens.screens.editItem.nameProduct)}
        value={name}
        onChangeText={(output) => {
          setName(output.trim());
          setEdit(true);
        }}/>

      <HelperText style={style.helper} type="error" visible={notValidName()}>
        {translate(tokens.screens.editItem.notValidName)}
      </HelperText>

      <TextInput
        mode="outlined"
        label={translate(tokens.screens.editItem.priceProduct)}
        value={String(price)}
        keyboardType="numeric"
        onChangeText={(output) => {
          setPrice(output);
          setEdit(true);
        }}/>

      <HelperText type="error" visible={notValidPrice()} style={style.helper}>
        {getInvalidValue(Number(itemType))}
      </HelperText>

      <View >
        <RadioButton.Group
          onValueChange={(newValue) => {
            setItemType(newValue);
            setEdit(true);
          }}
          value={itemType}>

          <Text style={style.title}>
            {translate(tokens.screens.editItem.typeProduct)}
          </Text>

          <View style={styles.radioButton}>
            <RadioButton
              value={"0"} />
            <Text>{translate(tokens.screens.editItem.integratedProduct)}</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton value={"1"} />
            <Text>{translate(tokens.screens.editItem.peripheralProduct)}</Text>
          </View>

        </RadioButton.Group>
      </View>

      <Button
        style={style.btn}
        icon="content-save-outline"
        mode="contained"
        onPress={() => {
          if (!notValidName() && !notValidPrice()) {
            if (params.add) {
              addItem({
                id: Math.random() * 5 + Math.random() * 16 + Math.random(),
                name: name,
                price: Number(price),
                type: ItemType.peripheral});
            } else {
              editItem({
                id: id,
                name: name,
                price: Number(price),
                type: ItemType.peripheral
              });}
            props.navigation.navigate("List");}}}>
        {translate(tokens.screens.editItem.saveProduct)}
      </Button>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={showHideDialog}>
          <Dialog.Title>
            {translate(tokens.screens.editItem.titleGoBack)}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {translate(tokens.screens.editItem.textGoBack)}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                props.navigation.navigate("List");}}>
              {translate(tokens.screens.editItem.goBack)}
            </Button>
            <Button onPress={showHideDialog}>
              {translate(tokens.screens.editItem.goBackCancel)}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
  }
});