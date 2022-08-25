import React from "react";
import { useTranslation } from "react-i18next";
import Select, { components, MultiValueGenericProps, MultiValueRemoveProps } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { ITagModel } from "../../../stores/TagStore";

interface Props extends StateManagerProps<ITagModel> {}

const TagSelect = React.forwardRef<any, Props>((props, ref) => {
  const { t } = useTranslation();

  const TagMultiValueLabel = (innerProps: MultiValueGenericProps<ITagModel>) => {
    return (
      <components.MultiValueLabel {...innerProps}>
        <div className="text-sm pl-1" style={{ backgroundColor: innerProps.data.color, color: innerProps.data.textColor }}>
          {t(innerProps.data.title)}
        </div>
      </components.MultiValueLabel>
    );
  };

  const TagMultiValueRemove = (innerProps: MultiValueRemoveProps<ITagModel>) => {
    return (
      <components.MultiValueRemove {...innerProps}>
        <div className="text-sm pl-1 pr-1" style={{ backgroundColor: innerProps.data.color, color: innerProps.data.textColor }}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </components.MultiValueRemove>
    );
  };
  return (
    <Select
      ref={ref}
      isMulti
      styles={{
        multiValueRemove: (base) => ({
          ...base,
          padding: 0,
        }),
        multiValueLabel: (base) => ({
          ...base,
          padding: 0,
          paddingLeft: 0,
        }),
      }}
      components={{ MultiValueLabel: TagMultiValueLabel, MultiValueRemove: TagMultiValueRemove }}
      getOptionLabel={(option) => t(option.title)}
      getOptionValue={(option) => option._id.toString()}
      {...props}
    />
  );
});

export default TagSelect;
