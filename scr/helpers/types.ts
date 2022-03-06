
  import { DefinitionItem } from "../context/Context";

  export type StackViews = {
    List: undefined;
    EditItem: {
      item: DefinitionItem;
      add: boolean;
    };
  };

