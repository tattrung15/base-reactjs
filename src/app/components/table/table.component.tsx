import { OrderType } from "@app/constants";
import clsx from "clsx";
import { useState, ChangeEvent, useEffect, ReactNode } from "react";
import Checkbox from "../checkbox";
import { Images } from "@assets/images";
import { Select } from "../select/select";

export interface Order {
  order: string;
  orderBy: string;
}

export interface TableConfig<D = any> {
  columnConfig: ColumnConfig[];

  hasCheckBox?: boolean;

  dataTable: D[];

  onRowClick?: (data: D) => void;

  onRowClickOrder?: (data?: Order) => void;

  onItemSelected?: (isSelectedAll: boolean, selectedItems: D[]) => void;

  /**
   * @default true
   * @summary
   * use useArrowTable for on/off arrow showing in the end of table row
   */
  useArrowTable?: boolean;

  componentEmpty?: ReactNode;

  hasFooter?: boolean;

  emptyWithHeader?: boolean;

  /**
   * Default: ''
   */
  tableClassName?: string;
}

export interface ColumnConfig {
  label: string;

  dataKey: string;
  /**
   * width can be '%' or 'px,rem,em...' - if width is '%', table cannot have horizontal scroll (horizontal scroll is shown only if some of them is 'px')
   */
  width: string;

  headerClassName?: string;

  theadClassName?: string;

  component?: any;
  /**
   * @default false
   * @description
   * If we don't pass this value, it will have `undefined` value. So that default value of it is false
   */
  hiddenAble?: boolean;

  hasOrder?: boolean;
}

/**
 * @summary
 * if u want table has horizontal scroll, u must set at least 2 `width` of `TableConfig` are 'px'
 */
function Table({
  columnConfig,
  hasCheckBox,
  dataTable,
  useArrowTable = true,
  hasFooter = true,
  emptyWithHeader = false,
  componentEmpty,
  tableClassName = "",
  onItemSelected = () => {},
  onRowClick = () => {},
  onRowClickOrder = () => {},
}: TableConfig<any>) {
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    setIsSelectedAll(false);
    setSelectedRow([]);
  }, [dataTable]);

  const onClickCheckAllItems = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = e.target.checked;

    setIsSelectedAll(isChecked);
    setSelectedRow([]);
    onItemSelected(isChecked, []);
  };

  const handleRowSelected = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    let listSelected = [];

    if (e.target.checked) {
      listSelected = [...selectedRow, item];
      setSelectedRow(listSelected);
    } else {
      listSelected = isSelectedAll
        ? dataTable.filter((it) => it.id !== item.id)
        : selectedRow.filter((it) => it.id !== item.id);
      setSelectedRow(listSelected);
    }

    if (listSelected.length === dataTable.length) {
      setIsSelectedAll(true);
      onItemSelected(true, listSelected);

      return;
    }

    setIsSelectedAll(false);
    onItemSelected(false, listSelected);
  };

  const isRowChecked = (id: string) => {
    return isSelectedAll || selectedRow.filter((it) => it.id === id).length > 0;
  };

  const handleClickHeader = (item: any) => {
    if (item.hasOrder) {
      const orderBy = item.dataKey;
      const orderType =
        order === OrderType.ASC ? OrderType.DESC : OrderType.ASC;

      setOrderBy(orderBy);
      setOrder(orderType);
      onRowClickOrder({ order: orderType, orderBy });
    }
  };

  return dataTable.length || emptyWithHeader ? (
    <div className="overflow-x-auto overflow-y-hidden">
      <table
        className={`table-auto max-w-[calc(100vw-212px)] md_max:max-w-[calc(100vw-12px)] ${tableClassName}`}
      >
        <thead>
          <tr className="bg-[#666] border-b border-solid border-[#212121] text-white h-[40px]">
            {hasCheckBox && (
              <th className="w-[50px] hover:bg-[#9e9e9e]">
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <Checkbox
                      onChange={onClickCheckAllItems}
                      checked={isSelectedAll}
                      label=""
                      name="checkAll"
                      isMultiLanguage={false}
                      checkboxClassName="w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </th>
            )}

            {columnConfig?.map((it) => (
              <th
                key={it.dataKey}
                className={clsx(
                  `text-left p-2 font-normal ${it.theadClassName}`,
                  {
                    "md_max:hidden": it.hiddenAble,
                  },
                  {
                    "bg-[#0d1014]": it.dataKey === orderBy,
                  },
                  {
                    "cursor-pointer": it.hasOrder,
                  }
                )}
                style={{ width: it.width }}
                onClick={() => handleClickHeader(it)}
              >
                <div className={`flex items-center ${it.headerClassName}`}>
                  {it.label}

                  {it.hasOrder && (!order || it.dataKey !== orderBy) && (
                    <span className="ml-2 mt-1">
                      <img
                        src={Images.SpriteSortIcon.default}
                        alt="sort-icon"
                        className="w-4"
                      />
                    </span>
                  )}

                  {it.hasOrder &&
                    order === OrderType.ASC &&
                    orderBy === it.dataKey && (
                      <span className="ml-2  mt-1">
                        <img
                          src={Images.ArrowUpIcon.default}
                          alt="arrow-up-icon"
                          className="w-4"
                        />
                      </span>
                    )}

                  {it.hasOrder &&
                    order === OrderType.DESC &&
                    orderBy === it.dataKey && (
                      <span className="ml-2  mt-1">
                        <img
                          src={Images.ArrowDownIcon.default}
                          alt="arrow-down-icon"
                          className="w-4"
                        />
                      </span>
                    )}
                </div>
              </th>
            ))}

            {useArrowTable && <th></th>}
          </tr>
        </thead>

        <tbody>
          {dataTable?.map((it, idx: number) => (
            <tr
              key={idx}
              className={clsx(
                {
                  "bg-[#E9E9E9]": idx % 2 !== 0,
                },
                {
                  "cursor-pointer": !!onRowClick,
                },
                "hover:bg-[#29b6f61a] border-b border-solid border-[#e0e0e0] h-[45px]"
              )}
              onClick={() => onRowClick(it)}
            >
              {hasCheckBox && (
                <td
                  className="p-2 align-middle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mt-2 px-auto text-center">
                    <label className="inline-flex items-center">
                      <Checkbox
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleRowSelected(e, it)
                        }
                        checked={isRowChecked(it.id)}
                        label=""
                        name="checkRow"
                        isMultiLanguage={false}
                        checkboxClassName="w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>
                </td>
              )}

              {columnConfig?.map((col) => (
                <td
                  key={col.dataKey}
                  className={clsx("p-2", {
                    "md_max:hidden": col.hiddenAble,
                  })}
                >
                  {col.component ? (
                    <col.component data={it} />
                  ) : (
                    it[col.dataKey]
                  )}
                </td>
              ))}

              {useArrowTable && (
                <td className="p-2">
                  <div className="w-4 h-4">
                    <img
                      src={Images.SpriteIcon.default}
                      alt="icon-left"
                      width={16}
                      height={16}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}

          {hasFooter && (
            <tr className="border-b border-solid border-[#e0e0e0]">
              <td
                colSpan={
                  columnConfig.length +
                  (hasCheckBox ? 1 : 0) +
                  (useArrowTable ? 1 : 0)
                }
              >
                <div className="max-w-[calc(100vw-228px)] md_max:max-w-[calc(100vw-28px)] sticky left-0">
                  <div className="flex justify-end p-2 items-center">
                    <button className="cursor-default">
                      <div className="mt-2 bg-gray-300 rounded w-9 h-9 flex justify-center">
                        <img
                          src={Images.ArrowThinLeftIcon.default}
                          alt="ava"
                          width={16}
                          height={16}
                        />
                      </div>
                    </button>

                    <div className="mx-1">
                      <Select
                        width={120}
                        defaultValue={1}
                        options={[
                          {
                            label: "Page 1",
                            value: 1,
                          },
                        ]}
                        className="font-[Arial] text-black"
                      />
                    </div>

                    <button className="cursor-default">
                      <div className="mt-2 bg-gray-300 rounded w-9 h-9 flex justify-center">
                        <img
                          src={Images.ArrowThinRightIcon.default}
                          alt="ava"
                          width={16}
                          height={16}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <>{componentEmpty}</>
  );
}

export default Table;
