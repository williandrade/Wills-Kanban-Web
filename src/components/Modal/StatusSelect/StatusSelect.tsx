import React from "react";
import { useTranslation } from "react-i18next";
import Select, { components, OptionProps, SingleValueProps } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { IStatusModel } from "../../../stores/StatusStore";

interface Props extends StateManagerProps<IStatusModel> {}

const StatusSelect = React.forwardRef<any, Props>((props, ref) => {
  const { t } = useTranslation();

  const StatusOptions = (innerProps: OptionProps<IStatusModel>) => (
    <components.Option {...innerProps} className="u-flex u-items-center u-gap-2">
      <div className="small-dot" style={{ backgroundColor: innerProps.data.color }}></div>
      {t(innerProps.data.title)}
    </components.Option>
  );

  const StatusSingleValue = (innerProps: SingleValueProps<IStatusModel>) => {
    return (
      <components.SingleValue {...innerProps} className="u-flex u-items-center u-gap-2">
        <div className="small-dot" style={{ backgroundColor: innerProps.data.color }}></div>
        <div>{t(innerProps.data.title)}</div>
      </components.SingleValue>
    );
  };

  return (
    <Select
      ref={ref}
      getOptionLabel={(option) => option.title}
      getOptionValue={(option) => option._id.toString()}
      components={{ Option: StatusOptions, SingleValue: StatusSingleValue }}
      placeholder="Status"
      {...props}
    />
  );
});

export default StatusSelect;
