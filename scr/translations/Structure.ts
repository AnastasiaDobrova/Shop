enum List {
    myList = "list-screen-my-list",
    productNameText = "list-screen-product-name",
    noData = "list-screen-no-data"
}


enum EditItem {
  createProduct = "edit-item-create",
  editProduct = "edit-item-edit",
  notValidPrice = "edit-item-not-valid-price",
  notValidRange = "edit-item-not-valid-range",
  nameProduct = "edit-item-name",
  notValidName = "edit-item-not-valid-name",
  priceProduct = "edit-item-price-product",
  typeProduct = "edit-item-type-product",
  integratedProduct = "edit-item-integrated",
  peripheralProduct = "edit-item-peripheral",
  saveProduct = "edit-item-save-product",
  titleGoBack = "edit-item-title-go-back",
  textGoBack = "edit-item-text-go-back",
  goBack = "edit-item-go-backt",
  goBackCancel = "edit-item-go-back-cancel",

}

export const tokens = {
    screens: {
        list: List,
        editItem: EditItem
    }
}